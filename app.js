const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    
    res.sendFile(__dirname+ "/index.html");
    
})

app.post('/', (req, res) => {

    const query = req.body.cityName
    const apiKey = "36acc71bc9a715a1a98f19596d522d29"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit +""
    
    https.get(url, (response)=>{
        console.log(response.statusCode);

        response.on('data', function (data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write('<head><meta charset="utf-8"></head>')
            res.write("<p>The weather is currrently "+ weatherDescription + "</p>")
            res.write("<h1>The temparature in "+query+" is "+ temp +" degree Celcius.</h1>")
            res.write('<img src'+ imageUrl +'>')
            res.send()
        })  
    });


    
})


app.listen(3000, ()=> {
    console.log('server is running on port 3000');
})




