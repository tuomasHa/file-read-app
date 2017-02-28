var chokidar = require('chokidar');

(function(){

    module.exports = class Watcher {

      constructor(name, path, callback, logger) {
        this.ready = false;
        this.prefix = typeof name === 'string' ? name : '';
        this.logger = logger;
        logger.info('Creating watcher for %s', this.prefix);
        this.watch = chokidar.watch(path, {cwd: '.'})
        .on('all', (event, path) =>{
          let message = '%s - ';
          switch(event) {
            case 'add':
              message += 'Added file';
              break;
            case 'addDir':
              message += 'Added directory';
              break;
            case 'unlink':
              message += 'Deleted file';
              break;
            case 'unlinkDir':
              message += 'Deleted directory';
              break;
            default:
              message += event;
          }
          message += ' \'%s\'';
          logger.verbose(message, this.prefix, path);
          if(this.ready) {
            callback();
          }
        }).on('ready', () => {
          this.ready = true;
          logger.info('%s ready', this.prefix);
          callback();
        })
      .on('error', error => console.log(this.prefix + 'error ' + error));
      }
    };
}());
