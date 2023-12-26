const cli = require("@caporal/core").default;
const { lectureDonnees, cheminDonnees } = require("../fonctions.js");
const { ICalCalendar } = require('ical-generator');
const fs = require('fs');
const colors = require('colors');

// Fonction pour formater la date au format ISO 8601
function formatISODate(dateString, timeString) {
    const [year, month, day] = dateString.split('-');
    const [hour, minute] = timeString.split(':');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`;
}

cli
    .command('generateICalendar', "Génère un fichier iCalendar pour certains cours")
    .argument('<dateDebut>', 'La date de début (format: YYYY-MM-DD)')
    .argument('<dateFin>', 'La date de fin (format: YYYY-MM-DD)')
    .argument('<cours>', 'Le cours')
    .action(({args, logger}) => {
        if (new Date(args.dateDebut) >= new Date(args.dateFin)) {
            logger.info("La date de début doit être antérieure à la date de fin.".red);
            return;
        }

        let parserResult = lectureDonnees(cheminDonnees);

        if (parserResult.errorCount > 0) {
            logger.info("Le fichier .cru contient une erreur".red);
            return;
        }

        const selectedCourses = parserResult.listeCreneaux.filter(creneau => creneau.nomUe === args.cours);

        if (selectedCourses.length === 0) {
            logger.info("Le cours n'existe pas.".red);
            return;
        }

        // Crée un objet iCalendar
        const cal = new ICalCalendar();

        function mapJourToICalDay(jour) {
            const jourMapping = {
                L: 'MO',
                MA: 'TU',
                ME: 'WE',
                J: 'TH',
                V: 'FR',
                S: 'SA',
            };

            return [jourMapping[jour]];
        }

        function adjustStartDate(d, jour) {
            date = new Date(d);
            switch (jour) {
              case "L":
                date.setDate(date.getDate() + (1 + 7 - date.getDay()) % 7);
                break;
              case "MA":
                date.setDate(date.getDate() + (2 + 7 - date.getDay()) % 7);
                break;
              case "ME":
                date.setDate(date.getDate() + (3 + 7 - date.getDay()) % 7);
                break;
              case "J":
                date.setDate(date.getDate() + (4 + 7 - date.getDay()) % 7);
                break;
              case "V":
                date.setDate(date.getDate() + (5 + 7 - date.getDay()) % 7);
                break;
              case "S":
                date.setDate(date.getDate() + (6 + 7 - date.getDay()) % 7);
                break;
            }
            return(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
        }

        // Crée un événement pour chaque occurrence du cours entre les dates de début et de fin
        selectedCourses.forEach(course => {
            //

            // Formate la date de début et de fin
            let startDate = formatISODate(adjustStartDate(args.dateDebut, course.jour), course.heureDebut);
            let endDate = formatISODate(adjustStartDate(args.dateDebut, course.jour), course.heureFin);
            //startDate = adjustStartDate(startDate, course.jour);


            // Crée un événement récurrent pour chaque semaine
            cal.createEvent({

                start: startDate,
                end: endDate,
                summary: `${args.cours} - ${course.type}`,
                description: `Capacité: ${course.capacitaire}, Salle: ${course.salle}, Index: ${course.index}`,
                location: course.salle,
                repeating: {
                    freq: 'WEEKLY',
                    until: args.dateFin,
                    byDay: mapJourToICalDay(course.jour),
                },
            });
        });

        // Génère chaîne iCalendar
        const generateICalendarString = cal.toString();

        const filename = `icalendar_${args.cours}.ics`;
        fs.writeFileSync(filename, generateICalendarString);

        logger.info(`Fichier iCalendar généré avec succès : ${filename.green}`);
    });

module.exports = cli;
