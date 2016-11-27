var express = require('express');

var images = require('./images');
var articles = require('./articles');

var app = express(),
server, host, port;

images.init();
articles.init();


//Express server

//Serve static files from public-folder
app.use(express.static('files'));

app.get('/', function(req, res){
    res.sendFile('index.html', {root: __dirname});
});

app.get('/script', function(req, res){
    res.sendFile('build/bundle.js', {root: __dirname});
});

app.get('/style', function(req, res){
    res.sendFile('build/bundle.css', {root: __dirname});
});

app.get('/res/:folder/:file', function(req, res){
  res.sendFile('res/' + req.params.folder + '/' + req.params.file, {root: __dirname});
});

app.get('/images', function(req, res){
    res.send(images.getImages());
});

app.get('/articles', function(req, res){
    res.send(articles.getArticles());
});

server = app.listen(8081, function () {
  host = server.address().address;
  port = server.address().port;
  console.log("file-read app listening at http://%s:%s", host, port)
});
