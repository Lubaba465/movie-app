//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https=require("https");

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/',function (req,res){

    const apiKey="c3c534aca07cfd73b1fa881938e3f95f";

    let page=req.body.page;

if(page===''){
    page=1;
}else {

}

    const url="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page="+page+"&api_key="+apiKey+"";


    https.get(url,function (response) {
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


            l=1;

            res.render('home',{item:Data.results,pag:l,last:m});

        })})









})
var l=1;
var m=1;
let page=2;
app.post("/",function (req,res){

    page=req.body.page;

    const apiKey="c3c534aca07cfd73b1fa881938e3f95f";

    const ur="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page="+page+"&api_key="+apiKey+"";

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



 l=parseInt(page)+1;
m=l-2;
if(m<=0){
m=1;}
if(parseInt(page)+1===1){
    l=2;
}
if(l>1000){
    l=1;
}




res.render('home',{item:Data.results,pag:l,last:m });













        });


    })


})

app.post("/movie",function (req,res){
    const q=req.body.movie;

    const apiKey="c3c534aca07cfd73b1fa881938e3f95f";
    const url="https://api.themoviedb.org/3/search/movie?language=en-US&page=1&include_adult=false&api_key="+apiKey+"&query="+q+"";


    https.get(url,function (response){


        console.log(response.statusCode);
        if(response.statusCode==200){

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







            res.render('movie',{item:Data.results});









        });}else {
            res.render('failure');

        }



    })


})





app.listen(process.env.PORT ||3000, function() {
    console.log("Server started on port 3000");
});