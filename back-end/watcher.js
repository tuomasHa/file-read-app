var chokidar = require('chokidar');

(function(){

    module.exports = class Watcher {

      constructor(name, path, callback) {
        this.ready = false;
        this.prefix = typeof name === 'string' ? name + ': ' : '';
        this.watch = chokidar.watch(path, {cwd: '.'})
        .on('all', (event, path) =>{

            console.log(this.prefix + event + ' ' + path)
            if(this.ready && typeof callback === 'function') {
              callback();
            }
        }).on('ready', () => {
          this.ready = true;
          console.log(this.prefix + 'ready');
          if(typeof callback === 'function') {
            callback();
          }
        })
      .on('error', error => console.log(this.prefix + 'error ' + error));
      }
    };
}());
