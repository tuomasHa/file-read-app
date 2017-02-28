var winston = require('winston');

(function(){

  var errorLogger = new (winston.Logger)({
    exitOnError: false,
    transports: [
      new (winston.transports.Console)({
        handleExceptions: true,
        level: 'warn'
      }),
      new (winston.transports.File)({
        filename: 'logs/errors.log',
        level: 'verbose',
        handleExceptions: true,
        json: false,
        maxsize: 1000000,
        maxFiles: 5,
        tailable: true
      })
    ]}),
  imageLogger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        level: 'info'
      }),
      new (winston.transports.File)({
        filename: 'logs/images.log',
        level: 'verbose',
        json: false,
        maxsize: 1000000,
        maxFiles: 5,
        tailable: true
      })
    ]}),
    articleLogger = new (winston.Logger)({
      transports: [
        new (winston.transports.Console)({
          level: 'info'
        }),
        new (winston.transports.File)({
          filename: 'logs/articles.log',
          level: 'verbose',
          json: false,
          maxsize: 1000000,
          maxFiles: 5,
          tailable: true
        })
      ]}),
      pageLogger = new (winston.Logger)({
        transports: [
          new (winston.transports.Console)({
            level: 'info'
          }),
          new (winston.transports.File)({
            filename: 'logs/pages.log',
            level: 'verbose',
            json: false,
            maxsize: 1000000,
            maxFiles: 5,
            tailable: true
          })
        ]});

  module.exports = {
    errorLogger,
    imageLogger,
    articleLogger,
    pageLogger
  };
}());
