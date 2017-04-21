var should = require("should");
var YF = require("yf-fpm-client-nodejs").default;

YF.init({appkey: '123123', masterKey: '1b7e5703602b6fce1cae7364ac0f2244', endpoint: 'http://localhost:9999/api'});


describe('Websocket', function(){
  it('broadcast function', function(done){
    var func = new YF.Func('websocket.broadcast');
    func.invoke({ip: '12.12.12.12'})
      .then(function(data){
        console.log(data);
        done();
      }).catch(function(err){
        done(err);
      });
  });
})
