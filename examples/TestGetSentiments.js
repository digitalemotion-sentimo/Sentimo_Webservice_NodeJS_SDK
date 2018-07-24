/*Get sentiments test Script*/
const GetSentiments = require('../sentimo_developer_cloud/get_sentiments');
const config = require('../config');

const hostname = config.hostname
const token = config.token;
const path = config.path;
const timeout = config.timeout;

/**
 * Create a instance of the SentiMo REST SDK
 */
const service = new GetSentiments({hostname, path, token, timeout})

const id = '165996';

// 1). Retrieve general sentiment from exact ID
function test1(){
	
	service.retrieve_sentiment(dataIds = id, domains = 'general,education' , function(errors, res){
		if(errors){
			console.log("1.) test get id");
			console.log('Failed to retrieve data.')
			console.log(errors)
		}else{
			console.log("1.) test get id");
			console.log('Get general Sentiment:')
			console.log(res);
		}
	});
}

// 2). Retrieve 50 of general sentiment set from exact ID
function test2(){
	
	// var id = '165571';

	service.retrieve_sentiment_set(dataId = id, domains = '', num = 50, function(errors, res){
		if(errors){
			console.log("2.) test get set from exact id");
			console.log('Failed to retrieve data.')
			console.log(errors)
		}else{
			console.log("2.) test get set from exact id");
			console.log('Get general Sentiment Set:')
			console.log(res);
		}
	});
}

// 3). Retrieve fine-grained emotion result from exact ID
function test3(){
	
	
	var id = '165996,165997';

	service.retrieve_sentimo(dataIds = id, domains = '' , function(errors, res){
		if(errors){
			console.log("3.) test get id");
			console.log('Failed to retrieve data.')
			console.log(errors)
		}else{
			console.log("3.) test get id");
			console.log('Get fine-grained emotion:')
			console.log(res);
		}
	});
}

// 4). Retrieve 50 of fine-grained emotion set from exact ID
function test4(){
	
	// var id = '165571';

	service.retrieve_sentimo_set(dataId = id, domains = null, num = 50, function(errors, res){
		if(errors){
			console.log("4.) test get set from exact id");
			console.log('Failed to retrieve data.')
			console.log(errors)
		}else{
			console.log("4.) test get set from exact id");
			console.log('Get fine-grained emotion Set:')
			console.log(res);
		}
	});
}

test1();
test2();
test3();
test4();
