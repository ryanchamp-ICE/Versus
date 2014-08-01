require('./global')({
	loggerOverride: { fileName: 'server.log' },
	onConnectedToDb: onConnectedToDb
});

function onConnectedToDb() {
	logger.info('Connected to db... Starting app');

	var express = require('express');

	require('express-namespace');

	var app = module.exports = express();
	var bodyParser = require('body-parser');
	var errorHandler = require('errorhandler');
	var fs = require('fs');

	// app configuration
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.set('view options', {
		layout: false
	});

	app.use(bodyParser.urlencoded());
	app.use(bodyParser.json());

	app.use(express.static(__dirname + '/public'));

	var env = process.env.NODE_ENV || 'local';
    switch(env) {
        case 'test':
        case 'local':
        {
            app.use(errorHandler({ dumpExceptions: true, showStack: true }));
            app.get('/config/', function(req, res){

                res.send(nodeUtil.format('%j', config));

            });
        }
        break;

        case 'production':
            app.use(errorHandler());
            break;

        default:
            throw "No env set";
    }

    // Dynamically add routes from controllers directory
    // http://timstermatic.github.io/blog/2013/08/17/a-simple-mvc-framework-with-node-and-express/
    fs.readdirSync('./controllers').forEach(function (file) {
        if(file.substr(-3) == '.js') {
            route = require('./controllers/' + file);
            route.controller(app);
        }
    });

    if (config.host) {
        app.listen(config.port, config.host);
    } else {
        app.listen(config.port);
    }
    logger.info("Express server listening on port "+config.port+" in "+app.settings.env+" mode");
}
