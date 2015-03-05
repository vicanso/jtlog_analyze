'use strict';
var JTStatsClient = require('jtstats_client');
var config = require('../config');
var client = null;
exports.init = function init(server){
  client = new JTStatsClient({
    host : server.host,
    port : server.port,
    category : config.app
  });
};

exports.getClient = function(){
  return client;
};