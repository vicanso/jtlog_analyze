var jtLogger = require('jtlogger');
var zmq = require('zmq');
var socket = zmq.socket('sub');
var requireTree = require('require-tree');
var analyzeList = requireTree('./analyze');
var tcpUrl = process.env.tcp || 'tcp://127.0.0.1:2910';
var _ = require('lodash');
socket.connect(tcpUrl);

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

// console.dir(analyzeList);



// var haproxy = require('./lib/haproxy');



// var haproxySock = zmq.socket('sub');
// haproxySock.subscribe('haproxy');
// haproxySock.connect('tcp://127.0.0.1:2910');
// haproxySock.on('message', function(topic, msg){
//   console.dir(topic);
// });
// // subber.js
// var zmq = require('zmq')
//   , sock = zmq.socket('sub');

// sock.connect('tcp://127.0.0.1:3000');
// sock.subscribe('kitty cats');
// console.log('Subscriber connected to port 3000');

// sock.on('message', function(topic, message) {
//   console.log('received a message related to:', topic, 'containing message:', message);
// });