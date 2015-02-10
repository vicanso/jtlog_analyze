var JTStatsClient = require('jtstats_client');
var statsUrl = process.env.stats || 'udp://127.0.0.1:6000';
var url = require('url');
var urlInfo = url.parse(statsUrl);
module.exports = new JTStatsClient({
  host : urlInfo.hostname,
  port : urlInfo.port
});