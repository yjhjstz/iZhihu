var request = require('request');
var qiniu = require('qiniu');
var config = require('../config');
//var fs = require('fs');

qiniu.conf.ACCESS_KEY = config.qiniu.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.qiniu.SECRET_KEY;
var bucketname = config.qiniu.buckname;
var domain = config.qiniu.domain;
var log = require('util').log;
var redis = require('./redis');
var uptoken = getUptoken(bucketname);

function getUptoken(bucketname) {
  var putPolicy = new qiniu.rs.PutPolicy(bucketname);
  return putPolicy.token();
}

function onret(err, ret, res) {
  if (!err) {
    log("====== uploaded: " + ret.key + " ======");
  } else {
    log(err);

  }
}

function uploadData(body, key, callback) {
  var callback = callback || onret;
  log("====== uploadData: " + key + " ======");
 　qiniu.io.put(uptoken, key, body, null, callback);
  /*
  fs.writeFile(key, body, function (err) {
     if (err) throw err;
     log(key + "saved");
  });
  */
}

function uploadFile(localFile, key, callback) {
  var callback = callback || onret;
  log("====== uploadFile: " + key + " ======");
  qiniu.io.putFile(uptoken, key, localFile, null, callback);
}
//TODO retry 3
function uploadLink(url, key, callback) {
  var opts = {
    url: url,
    key: key
  };
  //log("push" + url);
  redis.rpush(bucketname, JSON.stringify(opts));
}

function processQueue() {
  //redis.blpop(bucketname, 0, function(err, result){
    redis.lpop(bucketname, function(err, result){
    if(err){
      log(err);
    }else {
      
       if (result == null) {
         return;
       }
       //var req = result;
       var req = JSON.parse(result);
       var headers = {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36',
          'Content-Type': 'application/x-www-form-urlencoded'
       }
       // log("pop" + req.url);
       request.get(req.url, { headers:headers, encoding: null, timeout: 10000 }, function (err, res, data) {
         if (err || res.statusCode != 200) {
           log(err);
           return;
         }

         uploadData(data, req.key, onret);
       });
    }
  });
}

var client = new qiniu.rs.Client();

function deleteFile(key) {
  log("====== deleteFile: " + key + " ======");
  client.remove(bucketname, key, function (err, res) {
  });
}

exports.updateUptoken = function () {
  uptoken = getUptoken(bucketname);
}


exports.uploadData = uploadData;
exports.uploadFile = uploadFile;
exports.uploadLink = uploadLink;
exports.deleteFile = deleteFile;
exports.processQueue = processQueue;

