const express = require("express");
const https = require("https")
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

 app.get("/",function(req ,res)
 {
    res.sendFile(__dirname + "/index.html");
 });

 app.post("/",function(req,res){
    const query = req.body.cityName
    const apiId = "5b7fd239cc76e08e40f89b2609db2209";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" +apiId + "&units=" +units+ "&q="+query;

     
    https.get(url,function(responce)
    {
        console.log(responce.statusCode);

        responce.on("data",function(data){
            //As date will give us the data i.e JSON in hexadecimal we convert it by parse
            const weatherdata = JSON.parse(data);
            const tempp = weatherdata.main.temp;
            const weatherdescription = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            //we can have multiple res.writes but not res.sends

            res.write("<h1>The Temperature in " + query + " is " + tempp + "</h1>");
            res.write("<h2>The weather is currently " + weatherdescription + "</h2>");
            res.write("<img src = " +imageUrl+ ">");
            res.send();
        });
    });
})

app.listen(3000,function(){
    console.log("Server is running on port 3000"); 
})