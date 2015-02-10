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

analyzeList.haproxy('<134>Feb  9 13:16:41 [HAPROXY][3241]: 127.0.0.1:51906 [09/Feb/2015:13:16:41.918] 80port varnish/<NOSRV> 0/-1/-1/-1/0 503 212 vicanso=110ec58a-a0f2-4ac4-8393-c866d813b8d1 - SC-- 0/0/0/0/0 1/2 {localhost|http://afeafe:100} "GET / HTTP/1.1"\n');

analyzeList.haproxy('<134>Feb  9 13:18:27 [HAPROXY][3241]: 192.168.2.2:52047 [09/Feb/2015:13:18:27.159] 80port varnish/<NOSRV> 295/-1/-1/-1/295 503 212 - - SC-- 0/0/0/0/0 0/0 {192.168.2.2|} "GET /favicon.ico HTTP/1.1"\n');
