var express = require('express');

var images = require('./back-end/images');
var articles = require('./back-end/articles');
var pages = require('./back-end/pages');

var app = express(),
server, host, port;

images.init();
articles.init();
pages.init();


//Express server

//Serve static files from public-folder
app.use(express.static('files'));

app.get('/', function(req, res){
    res.sendFile('front-end/src/index.html', {root: __dirname});
});

app.get('/script', function(req, res){
    res.sendFile('build/bundle.js', {root: __dirname});
});

app.get('/style', function(req, res){
    res.sendFile('build/bundle.css', {root: __dirname});
});

app.get('/config', function(req, res){
    res.sendFile('files/config/config.json', {root: __dirname});
});

app.get('/res/:folder/:file', function(req, res){
  res.sendFile('front-end/res/' + req.params.folder + '/' + req.params.file, {root: __dirname});
});

app.get('/fonts/:folder/:file', function(req, res){
  res.sendFile('front-end/res/fonts/' + req.params.folder + '/' + req.params.file, {root: __dirname});
});

app.get('/images', function(req, res){
    res.send(images.getImages());
});

app.get('/articles', function(req, res){
    res.send(articles.getArticles());
});

app.get('/pages', function(req, res){
    res.send(pages.getPages());
});

server = app.listen(8081, function () {
  host = server.address().address;
  port = server.address().port;
  console.log("file-read app listening at http://%s:%s", host, port)
});
