const http = require('http');
const fs = require('fs');
const requests = require('requests');
const homeFile = fs.readFileSync('home.html','utf-8');

//we want to read all the data 
const replaceVal = (tempVal,orgVal) =>
{
    let temperature = tempVal.replace("{%tempVal%}", orgVal.main.temp);
     temperature = temperature.replace("{%tempMin%}", orgVal.main.temp_min);
     temperature = temperature.replace("{%tempMax%}", orgVal.main.temp_max);
     temperature = temperature.replace("{%location%}", orgVal.name);
     temperature = temperature.replace("{%country%}", orgVal.sys.country);
     temperature = temperature.replace("{%tempStatus%}", orgVal.weather[0].main);

     
return temperature
}


const server = http.createServer((req,res)=>
{
    if(req.url == '/')
    {
        requests('http://api.openweathermap.org/data/2.5/weather?q=Lucknow&appid=bb18017ba358eb4bb0c9f9a893dadda4&units=metric',)
        .on('data', function (chunk) {
            //json to object
            const objData = JSON.parse(chunk);
            //obj to array of obj
            const arrData = [objData];
const realTimeData = arrData.map((val) => replaceVal(homeFile,val)).join("");
res.write(realTimeData);
        })
        .on('end', function (err) {
          if (err) return console.log('connection closed due to errors', err);
         
          res.end();
        });
    }
})


server.listen(3000,'127.0.0.1');