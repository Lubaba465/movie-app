//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https=require("https");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/',function (req,res){









    res.render('home');


})



app.post("/",function (req,res){
    const q=req.body.calorie;

    const apiKey="c3c534aca07cfd73b1fa881938e3f95f";

    const ur="https://api.themoviedb.org/3/search/movie?language=en-US&page=1&include_adult=false&api_key="+apiKey+"&query="+q+"";





    https.get(ur,function (response){


        console.log(response.statusCode);
        var data;
        response.on("data", function(chunk) {
            if (!data) {
                data = chunk;
            } else {
                data += chunk;
            }
        });

        response.on("end", function() {

            const Data=JSON.parse(data);
            console.log(Data);




            res.render('movie',{mealsitem:Data.results});









        });


    })


})









app.listen(4020, function() {
    console.log("Server started on port 3000");
});