# Weather-Web

https://adriib38.github.io/Weather-web/

A simple Web project using the APIs MetaWeather and Yahoo Weather with RapidApi and Boostrap

![imagen](https://user-images.githubusercontent.com/39964431/156899315-ec737222-00d8-460a-bfdd-1b0a4aa5559c.png)


## Yahoo request


```javascript

async function getDesc(city) {
    console.log("desc:")

    const res = await fetch(`https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=f`, {
        "method": "GET",Cancel changes
        "headers": {
            "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
            "x-rapidapi-key": "YOUR RAPIDAPI KEY"
        }
    })

    data2 = await res.json();

}

```

## MetaWeather request

```javascript

const getWeatherData = async (city) => {
    //Hacer un request a la API y obtener un objeto que contenga los datos

    const res = await fetch(`https://community-open-weather-map.p.rapidapi.com/climate/month?q=${city}&lang=c`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "YOU RAPIDAPI KEY"
        }
    })
  
    const data = await res.json();
    console.log(data);

    displayData(data);

}


```

