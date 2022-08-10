


let container = document.getElementById("container-g")
let searchInput = document.getElementById("search_input");
let searchForm = document.getElementById("search_submit");

let pCiudad0 = document.getElementById("p-ciudad-0");
let pAdmin0 = document.getElementById("p-admin-0");

let weatherIcon0 = document.getElementById("p-icon-0");
let pDate0 = document.getElementById("p-date-0");
let pEstado0 = document.getElementById("p-estado-0");

let state = "";
let nomComunidad = "";

let data2;

let modeloPoblacion = document.getElementById("modelo-ciudades")

cargarCiudades()


function cargarCiudades() {
    var str = "";
    fetch('es.json')
        .then(respuesta => respuesta.json())

        .then(ciudades => {
            ciudades.forEach(ciudad => {
                if (ciudad.admin_name == "Valencia") {
                    ciudad.admin_name = "País Valencià";
                }
                if (ciudad.admin_name == "Catalonia") {
                    ciudad.admin_name = "Catalunya";
                }
                if (ciudad.admin_name == "Basque Country") {
                    ciudad.admin_name = "Euskal Herria";
                }
                if (ciudad.admin_name == "Madrid") {
                    ciudad.admin_name = "C. Madrid";
                }
                if (ciudad.admin_name == "Andalusia") {
                    ciudad.admin_name = "Andalucia";
                }
         
                str += `<option value="${ciudad.city+", "+ciudad.admin_name}">`
                
            })
            modeloPoblacion.innerHTML = str;
 
        })
     
}



const displayData = (obj) => {
    moment.locale('c')
    //Set data por days
    let contador = 0;
    while (contador < 5) {
        let dateSpanish = new Date(obj.list[contador].dt * 1000);
        //Mostrarla en console y html como ultima actualización
        console.log(dateSpanish);
        //Manipular el DOM para incluir esa hora
        let fDate = "p-date-" + contador;
        document.getElementById(fDate).innerHTML = `${moment(dateSpanish).format('LL')}`;


        console.log(obj)

        let nomCiudad = (obj.city.name);
        let nomPais = (obj.city.country);
        let link = `https://www.google.es/maps/search/${nomCiudad + ", " + nomPais}/`
    
        document.getElementById("btnMaps").href = link;

        let gradesCelsiusMedia = Math.floor(obj.list[contador].temp.average) - 273;
        let gradesCelsiusMax = Math.floor(obj.list[contador].temp.average_max) - 273;
        let gradesCelsiusMin = Math.floor(obj.list[contador].temp.average_min) - 273;
        let humedad = obj.list[contador].humidity;
        let presion = obj.list[contador].pressure;


        console.log(nomCiudad)

        let elementGrados = "p-grados-" + contador;
        console.log(elementGrados)
        document.getElementById(elementGrados).innerHTML = `${gradesCelsiusMedia}ºC`;

        let elementGradosMaximos = "p-gradosMax-" + contador;
        document.getElementById(elementGradosMaximos).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/></svg>${gradesCelsiusMax}ºC`;
        let elementGradosMinimos = "p-gradosMin-" + contador;
        document.getElementById(elementGradosMinimos).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/></svg>${gradesCelsiusMin}ºC`;

        pAdmin0.textContent = ""
        pCiudad0.textContent = nomCiudad + ", " + nomPais;
       
                nomComunidad = buscarComunidad(nomCiudad)
     


            
        function buscarComunidad(nomCiudad){
            let nomComunidad = "X";
            fetch('es.json')
                .then(respuesta => respuesta.json())
               
                .then(ciudades => {
                    ciudades.forEach(ciudad => {        
                        
                        if(ciudad.city.toLowerCase() === nomCiudad.toLowerCase()){
                            if (ciudad.admin_name == "Valencia") {
                                ciudad.admin_name = "País Valencià";
                            }
                            if (ciudad.admin_name == "Catalonia") {
                                ciudad.admin_name = "Catalunya";
                            }
                            if (ciudad.admin_name == "Basque Country") {
                                ciudad.admin_name = "Euskal Herria";
                            }
                            if (ciudad.admin_name == "Madrid") {
                                ciudad.admin_name = "C. Madrid";
                            }
                            if (ciudad.admin_name == "Andalusia") {
                                ciudad.admin_name = "Andalucia";
                            }
       
                            pCiudad0.textContent = nomCiudad;
                            pAdmin0.textContent = ciudad.admin_name
                        }
                       
                        
                    })
                   
                })
       
        }



        let elementHumedad = "p-humedad-" + contador;
        document.getElementById(elementHumedad).innerHTML = `Humitat: ${humedad}%`;

        let elementPresion = "p-presion-" + contador;
        document.getElementById(elementPresion).innerHTML = `${presion} hPa`;

        console.log(state)

        //getDesc(nomCiudad);


        setTimeout(() => {
            let dateDos = data2;
            let stateF = dateDos.forecasts[0].text
            setIcon(stateF);


        }, 2000);

        console.log()
        contador++;
    }




    function setIcon(state) {
        let finalPos = "p-icon-0"
        console.log(finalPos)

        if (state == "Rain") {
            cadena = `<img src="https://www.metaweather.com/static/img/weather/s.svg" alt="Pluja" title="Pluja" width="62px" height="62px">`;

            document.getElementById(finalPos).innerHTML = cadena;
        } else if (state == "Showers") {
            cadena = `<img src="https://www.metaweather.com/static/img/weather/hr.svg" alt="Pluja forta" title="Pluja forta" width="62px" height="62px">`;

            document.getElementById(finalPos).innerHTML = cadena;
        } else if (state == "Partly Cloudy") {
            cadena = `<img src="https://www.metaweather.com/static/img/weather/hc.svg" alt="Parcialment ennuvolat" title="Parcialment ennuvolat" width="62px" height="62px">`;

            document.getElementById(finalPos).innerHTML = cadena;
        } else if (state.includes("Cloudy")) {
            cadena = `<img src="https://www.metaweather.com/static/img/weather/hc.svg" alt="Núvols" title="Núvols" width="62px" height="62px">`;

            document.getElementById(finalPos).innerHTML = cadena;
        } else if (state == "Scattered Showers") {
            cadena = `<img src="https://www.metaweather.com/static/img/weather/lr.svg" width="62px" alt="Ruixats dispersos" title="Ruixats dispersos" height="62px">`;

            document.getElementById(finalPos).innerHTML = cadena;
        } else if (state.includes("Sunny")) {
            cadena = `<img src="https://www.metaweather.com/static/img/weather/c.svg" width="62px" alt="Solejat" title="Solejat"  height="62px">`;

            document.getElementById(finalPos).innerHTML = cadena;
        } else if (state == "Rain And Snow") {
            cadena = `<img src="https://www.metaweather.com/static/img/weather/sl.svg" alt="Pluja i neu" title="Pluja i neu" width="62px" height="62px"><div>Pluja i neu</div>`;

            document.getElementById(finalPos).innerHTML = cadena;
        } else if (state == "Snow") {
            cadena = `<img src="https://www.metaweather.com/static/img/weather/sn.svg" alt="Neu" title="Neu" width="62px" height="62px"><div></div>`;

            document.getElementById(finalPos).innerHTML = cadena;
        } else if (state == "Thunderstorms") {
            cadena = `<img src="https://www.metaweather.com/static/img/weather/t.svg" alt="Tempestats elèctriques" title="Tempestats elèctriques" width="62px" height="62px"><div</div>`;


            document.getElementById(finalPos).innerHTML = cadena;
        } else {
            //Icono no encontrado
            cadena = `<div><p><p></div>`;

            document.getElementById(finalPos).innerHTML = cadena;
        }
    }
}

const getWeatherData = async (city) => {
    //Hacer un request a la API y obtener un objeto que contenga los datos

    const res = await fetch(`https://community-open-weather-map.p.rapidapi.com/climate/month?q=${city}&lang=c`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "79c1399bb4msh98f55315e3d967cp1c0c75jsnaaf3c0300f3b"  //YOUR RAPIDAPI KEY
        }
    })

    const data = await res.json();
    console.log(data);

    displayData(data);

}


async function getDesc(city) {
    console.log("desc:")

    const res = await fetch(`https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=f`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
            "x-rapidapi-key": "79c1399bb4msh98f55315e3d967cp1c0c75jsnaaf3c0300f3b"  //YOUR RAPIDAPI KEY
        }
    })

    data2 = await res.json();

}

searchForm.addEventListener("submit", event => {
    event.preventDefault();
    getWeatherData(searchInput.value);
    getDesc(searchInput.value);
});

let buscar_ciudad = document.getElementById("buscar-ciudad");
buscar_ciudad.addEventListener("click", event => {
    event.preventDefault();
    getWeatherData(searchInput.value);
    getDesc(searchInput.value);
});

window.onload = () => {

    getWeatherData("Valencia");
    getDesc("Valencia")
}
