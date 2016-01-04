var net = require('net');
var request = require('request@2.56.0');

var timerCheckpoints = {
  1:  'start mash',
  10: 'start step 69c',
  55: 'start step 75c',
  65: 'end mash'
};

// TODO error handling
// nice to have: PUT instead of GET
module.exports = function (ctx, done) {

  // TODO data cleaning (strings, cast numbers, etc.)
  // TODO data validation
  var recipe = ctx.data.recipe;
  var timer = ctx.data.timer;
  var temp = ctx.data.temp;
  var ifttt = ctx.data.ifttt;
  var carbon = ctx.data.carbon

  // send to hostedgraphite (carbon/graphite)
  // https://docs.hostedgraphite.com/languageguide/lg_nodejs.html
  var now = Math.round((new Date()).getTime() / 1000);
  var stat = ("mashWatcher." + recipe + ".temp " + temp + " " + now + "\n" )
  console.log(stat)

  var socket = net.createConnection(2003, carbon, function() {
    socket.write(stat);
    socket.end();
  });

  // send to ifttt
  // TODO do not send to ifttt more than once
  if(timer in timerCheckpoints) {
    var value = timerCheckpoints[timer];
    request({
      url: 'https://maker.ifttt.com/trigger/mashWatcher/with/key/' + ifttt, //URL to hit
      method: 'POST',
      //Lets post the following key/values as form
      json: {
        value1: value,
      }
    }, function(error, response, body){
      console.log(response.statusCode, body)
      if(error) {
        console.log(error);
      } else {
        console.log(response.statusCode, body);
      }
    });
  }

  // TODO return HTTP 204, with no content
  done(null, {
    'recipe': recipe,
    'timer': timer,
    'temp': temp,
  });
};