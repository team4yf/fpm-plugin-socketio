const { init, Func } = require("fpmc-jssdk");
const assert = require('assert');
init({ appkey:'123123', masterKey:'123123', endpoint: 'http://localhost:9999/api' });

describe('socketio', function(){
  it('broadcast function', function(done){
    var func = new Func('socketio.broadcast');
    func.invoke({ip: '12.12.12.12'})
      .then(function(data){
        console.log(data);
        done();
      }).catch(function(err){
        done(err);
      });
  });
  it('send function', function(done){
    var func = new Func('socketio.send');
    func.invoke({id: '3ZLu9Zvy_BGlaIjwAAAA', content: 'babababa'})
      .then(function(data){
        console.log(data);
        done();
      }).catch(function(err){
        done(err);
      });
  });
})
