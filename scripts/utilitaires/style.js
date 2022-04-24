const keyAPI = "3d92bdd24a5c4cbf5d16866367bc6d59";
let resultAPI;

const temps = document.querySelector(".temps");
const temperature = document.querySelector(".température");
const localisation = document.querySelector(".localisation");
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const jourDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJourDiv = document.querySelectorAll('.jour-prevision-temps')
const imgIcon = document.querySelector('.logo-meteo');

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( position => {
        console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long, lat);
    }, () => {
        alert(`Vous avez refusé la géolocalisation, l'application ne pourra pas fonctionner, veuillez l'activer !`)
    })
}

AppelAPI = (long, lat) => {
 fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${keyAPI} `)
     .then((response) => {
         return response .json()
     })
     .then((data) => {
         console.log("data ====> ",data)
        resultAPI= data;
        temps.innerText = resultAPI.current.weather[0].description;
        // console.log('temps ===>', temps.innetText)
        temperature.innerText = `${Math.trunc(resultAPI.current.temp)}°`;
        localisation.innerText = resultAPI.timezone;

        //   les heures par tranches de trois, avec leur température

        let heureActuelle = new Date().getHours();

        for (let i = 0; i < heure.length; i++) {

            let heureInc = heureActuelle + i * 3;
            console.log(heureInc)
            if(heureInc > 24) {
                heure[i].innerText = `${heureInc - 24} h`;
            } else if (heureInc === 24) {
                heure[i].innerText = `00 h`;
            } else {
                heure[i].innerText = `${heureInc} h`;
            }
          ;
        }
        //  temp pour 3h

        for (let j = 0; j < tempPourH.length; j++ ) {
            tempPourH[j].innerText = `${Math.trunc(resultAPI.hourly[j * 3].temp)}°`
        }
        //  trois premieres lettres du jour

        for (let k = 0; k < tabJourEnOrdre.length;k++) {
            jourDiv[k].innerText = tabJourEnOrdre[k].slice(0 , 3);
        }

        //  Temp par jour 
         for (let m = 0; m < 7; m++) {
             tempJourDiv[m].innerText = `${Math.trunc(resultAPI.daily[m + 1].temp.day)}°`
         }
     })
}