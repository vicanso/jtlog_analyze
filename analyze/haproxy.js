// '<134>Feb  9 13:16:41 [HAPROXY][3241]: 127.0.0.1:51906 [09/Feb/2015:13:16:41.918] 80port varnish/<NOSRV> 0/-1/-1/-1/0 503 212 vicanso=110ec58a-a0f2-4ac4-8393-c866d813b8d1 - SC-- 0/0/0/0/0 0/0 {localhost|http://localhost:100} "GET / HTTP/1.1"\n'
// '<134>Feb  9 13:18:27 [HAPROXY][3241]: 192.168.2.2:52046 [09/Feb/2015:13:18:27.159] 80port varnish/<NOSRV> 154/-1/-1/-1/155 503 212 - - SC-- 1/1/0/0/0 0/0 {192.168.2.2|} "GET / HTTP/1.1"\n'
// '<134>Feb  9 13:18:27 [HAPROXY][3241]: 192.168.2.2:52047 [09/Feb/2015:13:18:27.159] 80port varnish/<NOSRV> 295/-1/-1/-1/295 503 212 - - SC-- 0/0/0/0/0 0/0 {192.168.2.2|} "GET /favicon.ico HTTP/1.1"\n'

module.exports = function(msg){
  var reg = /[\s\S]+\[HAPROXY\]\[(\d+)\]\:\s(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):\d{1,5}\s/gi;
  console.dir(reg.exec(msg));
  // console.dir(RegExp.$1);
  // console.dir(msg);
};