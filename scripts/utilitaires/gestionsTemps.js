const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

let ajd = new Date();
console.log("date du jour ==>", ajd)
let options = {weekday : 'long'};
let jourActuel = ajd.toLocaleDateString('fr-FR', options);
console.log("le jour actuel ===>", jourActuel)

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);
let tabJourEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0,joursSemaine.indexOf(jourActuel)));
console.log(tabJourEnOrdre);


