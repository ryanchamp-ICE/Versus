var challonge = require('../lib/challonge');

var viewModel = {};

module.exports.controller = function(app) {
	app.namespace('/tournament', function() {
		app.get('/', function(req, res) {
			challonge.tournaments(function (status, data) {
				if (status == 200) {
					viewModel.tournaments = {};
					viewModel.errors = {};

					data.forEach(function (element, index, array) {
						var tourney = {
							id: element.id,
							name: element.name,
							type: element.tournament_type,
							gameName: element.game_name,
							liveImage: element.live_image_url
						};

						viewModel.tournaments.push(tourney);
					});
				}
				else {
					data.forEach(function (element, index, array) {
						viewModel.errors.push(data);
					});
				}

				renderPage('tournament/index', viewModel, res);
			});
		});
	});
};

// Private methods below
//------------------------------------------------------------------------------
function renderPage(templateName, viewModel, res) {
	res.render(templateName, {viewModel: viewModel}, function (err, html) {
		if (err) {
			logger.error(err);
			return;
		}
		
		res.send(html);
	});
}