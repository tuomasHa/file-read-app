var express = require('express');

var Images = require('./back-end/images'),
Articles = require('./back-end/articles'),
Pages = require('./back-end/pages');

var app = express(),
server, host, port;

var images = new Images(),
articles = new Articles(),
pages = new Pages();


//Express server

//Serve static files from files-folder
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
    res.send(images.images);
});

app.get('/articles', function(req, res){
    res.send(articles.articles);
});

app.get('/pages', function(req, res){
    res.send(pages.pages);
});

server = app.listen(8081, function () {
  host = server.address().address;
  port = server.address().port;
  console.log("file-read app listening at http://%s:%s", host, port)
});
