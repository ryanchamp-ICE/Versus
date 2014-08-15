module.exports = (function () {
	
	console.log('!!!!NODE_ENV='+process.env.NODE_ENV);
    
    //Determine current environment
    if(process.env.NODE_ENV == null || process.env.NODE_ENV.length === 0) {
        process.env.NODE_ENV = 'local'; //this is set as an ENV var on the server in other cases
    }

    switch(process.env.NODE_ENV) {
    	case 'local':
    	case 'test':
    	return {
    		port: 1906,
    		nodeEnv: process.env.NODE_ENV,
    		dbUri: 'mongodb://localhost/versus-dev',
    		logger: {
                path: './logs/',
                level: null,
                timestamp: false
            },
            challonge: {
            	username: 'IceColdEdge',
            	apiKey: 'HFM5cOhuJH8AZYPm0Pl5hrMVtlpJIzKL6gJzqvPs',
            	baseUrl: 'https://api.challonge.com/v1/',
            	fullUrl: 'https://IceColdEdge:HFM5cOhuJH8AZYPm0Pl5hrMVtlpJIzKL6gJzqvPs@api.challonge.com/v1/'
            }
    	};

    }
})();