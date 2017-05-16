const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerPartials(__dirname+'/views/partials/');

app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err) {
            console.log('#######################################');
            console.log(err);
            console.log('#######################################');
        }
    });
    next();
});

/* app.use((req,res,next)=>{
    res.render('maintenance');
}); */


app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.get('/',(req,resp)=>{
    resp.render('home.hbs',{
        pageTitle:'Home page',
        welcomeMessage: 'welcome message here dynamic!!'        
    });
});

app.get('/about',(req,resp)=>{
    resp.render('about.hbs',{
        pageTitle:'About page',
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Errorrr com todos os RRRRR990'
    });
});

app.listen(3000);