# GL02_COAT
SRU

## Installation

[npm](https://www.npmjs.com/)

```bash
npm install
```

## Liste des commandes : 
#### Capacité d'une salle.

```bash
node index.js capacite <nomSalle>
```
###### Exemple: 
```bash
 node index.js capacite D108
```
#### Classements des chambres selon leurs capacités.

```bash
node index.js classementsalles
```
#### Générez un fichier ICalendar pour un cours d'une date de début à une date de fin.

```bash
node index.js generateICalendar <dateDebut> <dateFin> <nomDuCours>
```
###### Exemple: 
```bash
 node index.js generateICalendar 2023-12-03 2023-12-28 CL02
# index.js generateICalendar 2023-12-03 2023-12-28 "CL02"
```
##### Classements des chambres selon leurs taux d'occupation.
```bash
node index.js classementTauxOccupation
```
##### Générer un visuel synthétique du taux d'occupation des salles.

```bash
node index.js visuelOccupation
```
#### Consulter les disponibilités d’une salle de cours.

```bash
node index.js disposalle <salle>
```

#### Consulter les salles disponibles à un horaire donné.

```bash
node index.js dispoHo <jour> <heure>
```
###### Exemple: 
```bash
 node index.js dispoHo J 10:00
```