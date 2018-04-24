var should = require("chai").should();
var YF = require("yf-fpm-client-nodejs").default;

YF.init({appkey: '123123', masterKey: '123123', endpoint: 'http://localhost:9999/api'});


describe('Websocket', function(){
  // it('broadcast function', function(done){
  //   var func = new YF.Func('websocket.broadcast');
  //   func.invoke({ip: '12.12.12.12'})
  //     .then(function(data){
  //       console.log(data);
  //       done();
  //     }).catch(function(err){
  //       done(err);
  //     });
  // });
  it('send function', function(done){
    var func = new YF.Func('websocket.send');
    func.invoke({id: 'pDqADoLNk2QagL_MAAAB', content: 123})
      .then(function(data){
        console.log(data);
        done();
      }).catch(function(err){
        done(err);
      });
  });
})
