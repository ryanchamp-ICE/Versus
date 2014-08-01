require('./global')({
	loggerOverride: { fileName: 'server.log' },
	onConnectedToDb: onConnectedToDb
});

function onConnectedToDb() {
	logger.info('Connected to db... Starting app');
}
