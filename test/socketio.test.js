var should = require("chai").should();
var fpmc = require("yf-fpm-client-js").default;

fpmc.init({appkey: '123123', masterKey: '123123', domain: 'http://localhost:9999'});


describe('socketio', function(){
  it('broadcast function', function(done){
    var func = new fpmc.Func('socketio.broadcast');
    func.invoke({ip: '12.12.12.12'})
      .then(function(data){
        console.log(data);
        done();
      }).catch(function(err){
        done(err);
      });
  });
  it('send function', function(done){
    var func = new fpmc.Func('socketio.send');
    func.invoke({id: 'FD8AJXLpxt8n8c51AAAA', content: 123})
      .then(function(data){
        console.log(data);
        done();
      }).catch(function(err){
        done(err);
      });
  });
})
