'use strict';
var zmq = require('zmq');
var socket = zmq.socket('sub');
var config = require('./config');
var _ = require('lodash');
var stats = require('./lib/stats');
var util = require('util');

var request = require('request');
var requireTree = require('require-tree');
var analyzeList = requireTree('./analyze');

initLog();

/**
 * [getServers 获取服务器列表]
 * @param  {[type]} cbf [description]
 * @return {[type]}     [description]
 */
function getServers(cbf){
  request.get('http://jt-service.oss-cn-shenzhen.aliyuncs.com/server.json', function(err, res, data){
    if(err){
      cbf(err);
      return;
    }
    try{
      data = JSON.parse(data);
    }catch(err){
      cbf(err);
      return;
    }
    cbf(null, data[config.env]);
  });
}


/**
 * [initLog 初始化log配置]
 * @return {[type]} [description]
 */
function initLog(){
  var jtLogger = require('jtlogger');
  jtLogger.appPath = __dirname + '/';
  jtLogger.logPrefix = util.format('[%s]', config.app);
  jtLogger.add(jtLogger.transports.Console);
  
}


function initZmq(server){
  var tcpUrl = 'tcp://' + server.host + ':' + server.port;
  socket.connect(tcpUrl);
  console.info('zmq connect to:%s', tcpUrl);
  _.forEach(analyzeList, function(analyze, topic){
    socket.subscribe(topic);
  });
  socket.on('message', function(topic, msg){
    topic = topic.toString();
    msg = msg.toString();
    var analyze = analyzeList[topic];
    if(analyze){
      analyze(msg);
    }
  });
}


getServers(function(err, serverList){
  if(err){
    console.error(err);
    return;
  }
  console.info('serverList:%j', serverList);
  stats.init(serverList.stats);
  initZmq(serverList.zmq);
});
