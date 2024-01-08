# GL02_COAT
Le présent programme est à destination du service informatique et logistique, des étudiants ainsi du corps enseignant de l'Université centrale de la république de Sealand. Il a été commandé par le groupe *La Mélodie du Code* au groupe *COAT*.

## Licence
Le programme est sous licence MIT, il peut donc être récupéré et réutilisé par tout tiers. Les auteurs du programme ne peuvent cependant pas être tenus responsables de tout problème causé par celui-ci.

## Installation
Pour installer le programme, vérifier que vous avez bien [Node.js®](https://nodejs.org/en) installé dans votre système.

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
#### Salle de cours.

```bash
node index.js sallescours <nomDuCours>
```
###### Exemple: 
```bash
 node index.js sallescours CL02
```
#### Classements des salles selon leurs capacités.

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
##### Classements des salles selon leurs taux d'occupation.
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
