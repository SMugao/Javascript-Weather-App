window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/29b35122b349fbf0da6eb3bd63a0e67a/${lat},${long}?units=si`;

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                const {temperature, summary, icon} = data.currently;
                //Set DOM elements  from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //Set Icon
                setIcons = (icon, document.querySelector('.icon'));
            });
        });

    }else{
        h1.textContent = "Please enable location"
    }

   function setIcons(icon, iconID){
       const skycons = new Skycons({ color: "white" });
       const currentIcon = icon.replace(/-/g, "_").toUpperCase();
       skycons.play();
       return skycons.set(iconID, Skycons[currentIcon]);
    }
});