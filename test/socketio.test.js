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
    func.invoke({topic: '#s2d/sxcq56iYodXifP7tAAAB', id: 'sxcq56iYodXifP7tAAAB', content: 'babababa'})
      .then(function(data){
        console.log(data);
        done();
      }).catch(function(err){
        done(err);
      });
  });
})
