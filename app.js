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



analyzeList.haproxy('<134>Feb 11 09:34:24 [HAPROXY][1940]: 127.0.0.1:53136 [11/Feb/2015:09:34:24.895] 80port varnish/<NOSRV> 0/-1/-1/-1/0 503 212 vicanso=110ec58a-a0f2-4ac4-8393-c866d813b8d1 - SC-- 0/0/0/0/0 0/0 {localhost||Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.21} "GET / HTTP/1.1"\n');

analyzeList.haproxy('<134>Feb 11 09:34:25 [HAPROXY][1940]: 127.0.0.1:53138 [11/Feb/2015:09:34:25.504] 80port varnish/<NOSRV> 0/-1/-1/-1/0 503 212 vicanso=110ec58a-a0f2-4ac4-8393-c866d813b8d1 - SC-- 0/0/0/0/0 0/0 {localhost||Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.21} "GET /favicon.ico HTTP/1.1"\n');
