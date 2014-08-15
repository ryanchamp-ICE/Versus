var Client = require('node-rest-client').Client;

var restClient = new Client();

var challonge = (function () {

	var challonge = {};

	challonge.tournaments = function (callback) {
		restClient.methods.get_tournaments(function (data, response, callback) {
			return callback(response.status, data);
		});
	};
	
	return challonge;
})();

registerAPICalls(restClient);

module.exports = challonge;

// Private methods below
//------------------------------------------------------------------------------
function registerAPICalls(client) {
	client.registerMethod('get_tournaments', config.challonge.fullUrl + 'tournaments', 'GET');
}