var request = require('request');
var qiniu = require('qiniu');
var config = require('../config');


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
  redis.rpush(bucketname, JSON.stringify(opts));
}

function processQueue() {
  redis.blpop(bucketname, 0, function(err, result){
    if(err){
      log(err);
    }else {
       if (result[0] != bucketname) {
         log(err);
         return;
       }
       var req = JSON.parse(result[1]);
       request.get(req.url, function (err, res, data) {
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

