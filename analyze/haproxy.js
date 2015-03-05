'use strict';

var stats = require('../lib/stats');

var moment = require('moment');
module.exports = function(msg){
  // 1: harpoxy pid
  // 2: client ip
  // 3: accept date
  // 4: frontend_name
  // 5: backend_name
  // 6: server_name
  // 7-11: Tq Tw Tc Tr Tt
  // 12: status_code
  // 13: bytes_read
  // 14: cookie eg:vicanso=110ec58a-a0f2-4ac4-8393-c866d813b8d1 or -
  // 15-19: actconn feconn beconn srv_conn retries
  // 20-21: srv_queue backend_queue
  // 22: host
  // 23: Referer
  // 24: user-agent
  // 25: method
  // 26: url
  var reg = /[\s\S]+\[HAPROXY\]\[(\d+?)\]\:\s(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):\d{1,5}\s\[(\S+?)\]\s(\S+?)\s(\S+?)\/(\S+?)\s(\S+?)\/(\S+?)\/(\S+?)\/(\S+?)\/(\S+?)\s(\d+?)\s(\d+?)\s(\S+?)\s[\s\S]*?(\S+?)\/(\S+?)\/(\S+?)\/(\S+?)\/(\S+?)\s(\S+?)\/(\S+?)\s\{([\s\S]*?)\|([\s\S]*?)\|([\s\S]*?)\}\s\"(\S+?)\s(\S+?)\s/gi;
  var result = reg.exec(msg);
  if(result && result.length > 25){
    var uuidPrefix = 'jtuuid=';
    var uuid = '';
    if(result[14].indexOf(uuidPrefix) !== -1){
      uuid = result[14].substring(uuidPrefix.length);
    }
    var data = {
      pid : parseInt(result[1]),
      clientIP : result[2],
      date : moment(result[3], 'DD/MMM/YYYY:HH:mm:ss.SSS').format('YYYY-MM-DDTHH:mm:ss.SSS'),
      frontend : result[4],
      backend : result[5],
      server : result[6],
      tq : parseInt(result[7]),
      tw : parseInt(result[8]),
      tc : parseInt(result[9]),
      tr : parseInt(result[10]),
      tt : parseInt(result[11]),
      statusCode : parseInt(result[12]),
      length : parseInt(result[13]),
      uuid : uuid,
      actConn : parseInt(result[15]),
      feConn : parseInt(result[16]),
      beConn : parseInt(result[17]),
      srvConn : parseInt(result[18]),
      retries : parseInt(result[19]),
      srvQueue : parseInt(result[20]),
      backendQueue : parseInt(result[21]),
      host : result[22],
      referer : result[23],
      userAgent : result[24],
      method : result[25],
      url : result[26]
    };
    console.info('haproxy:%j', data);
  }
};