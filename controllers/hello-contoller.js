var viewModel = {};

module.exports.controller = function(app) {
	app.namespace('/hello', function () {

		app.get('/', function (req, res) {
			renderPage('hello/index', viewModel, res);
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