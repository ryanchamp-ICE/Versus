module.exports = function (options) {
	options = options || {};

	var nodeUtil = require('util');
	var _ = require('underscore');
	var path = require('path');

	// global configuration
	global.config = require('./config');
	if (options.loggerOverride) {
		_.extend(config.logger, options.loggerOverride);
	}

    // global logger
    var winston = require('winston');
    global.winstonStream = {
    	write: function (str) {
    		winston.info(str);
    	}
    };

    var transports = [];
    if(!config.logger || config.logger.console !== false) {
    	transports.push(new (winston.transports.Console)());
    }

    if (config.logger && config.logger.fileName) {
		transports.push(new (winston.transports.File)({ 
            level: config.logger.level, 
            filename: path.normalize((config.logger.path || './') + config.logger.fileName), 
            timestamp: config.logger.timestamp,
            handleExceptions: true,
            maxsize: 10 * 1024 * 1024, //10 MB
            maxFiles: 10
        }));
    }
    var logger = new (winston.Logger)({
    	exitOnError: false,
    	transports: transports
    });
    global.logger = logger;

    // global uncaught exception handler
    if(!options.passExceptions) {
        process.on('uncaughtException', function(err) {
            logger.error('!!!uncaughtException = ' + err.stack);
            throw err;
        });        
    }

    logger.info('________________________________________________________________________');
    logger.info('Running with config =>\n' + nodeUtil.inspect(global.config));

    // global mongoose and schema
    global.mongoose = require('mongoose');
    global.mongoose.set('debug', true);
    global.Schema = mongoose.Schema;

    logger.info('Mongoose: connecting to ' + config.dbUri);
    var db = mongoose.connect(config.dbUri);
    
    db.connection.on('error', function (err) {
    	logger.error("Mongoose Error: " + err);
    });

    db.connection.on('open', function (db) {
    	if (options.onConnectedToDb) {
    		options.onConnectedToDb();
    	}
    });
};
