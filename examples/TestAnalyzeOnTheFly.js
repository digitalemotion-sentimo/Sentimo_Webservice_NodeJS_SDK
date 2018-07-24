/*Analyze on the fly test Script*/
const AnalyzeOnTheFly = require('../sentimo_developer_cloud/analyze_on_the_fly')
const config = require('../config')

const hostname = config.hostname
const token = config.token;
const path = config.path;
const timeout = config.timeout;

/**
 * Create a instance of the SentiMo REST SDK
 */
const service = new AnalyzeOnTheFly({hostname, path, token, timeout});

dataset = '[{"title":"-","type":"string","user_id":"123456","screen_name":"123456","userjoindate":0,"postcount":"1", "post_time":"2017-03-08T19:03:01.002Z","post_id":"x0004","content":"I love frozen yogurt, although I do not like regular yogurt","reply_to_post_id":"-","reply_to_uid":"123456","msg_from":"dee","likes":0,"url":"string","source":"123456"}]';

// 1). Analyze general sentiments on the fly.
function test1(){

	service.analyze_sentiment_full_dataset_on_the_fly(dataset = dataset, domain = '' , targets = '',function(errors, res){
		if(errors){
			console.log("1.) Analyze general sentiments on the fly.");
			console.log('Failed to retrieve data.')
			console.log(errors)
		}else{
			console.log("1.) Analyze general sentiments on the fly.");
			console.log('Get Response')
			console.log(res)
		}
	});
}

const stringSample1 = 'The MRT is very croweded today.';
const inputString1 = service._construct_aoa_data(stringSample1);

// 2). Analyze general sentiments on the fly
function test2(){

	service.analyze_sentiment_full_dataset_on_the_fly(dataset = inputString1, targets = 'sir,phone',domain = 'transport' ,function(errors,res){
		if(errors){
			console.log('2.) Analyze general sentiments on the fly to upload data');
			console.log('Failed to retrieve data.')
			console.log(errors)
		}else{
			console.log('2.) Analyze general sentiments on the fly to upload data');
			console.log('Get Response')
			console.log(res)
		}
	});

}

var stringSample2 = ['The MRT is very croweded today.', 'It is raining today.'];
var inputString2 = service._construct_aoa_data(stringSample2);

function test3(){

	service.analyze_sentimo_full_dataset_on_the_fly(dataset = inputString2, targets = 'sir,phone',domain = 'transport' ,function(errors, res){
		if(errors){
			console.log('3.) Analyze general sentiments on the fly to upload data');
			console.log('Failed to retrieve data.')
			console.log(errors)
		}else{
			console.log('3.) Analyze general sentiments on the fly to upload data');
			console.log('Get Response')
			console.log(res)
		}
	});
}


//Analyze on the fly with sentence
function test4(){

	service.analyze_sentiment_on_the_fly(content = stringSample1,targets = '' ,domain ='' ,function(errors, res){
		if(errors){
			console.log('4.) Analyze on the fly with sentence');
			console.log('Failed to retrieve data.')
			console.log(errors)
		}else{
			console.log('4.) Analyze on the fly with sentence');
			console.log('Get Response')
			console.log(res)
		}
	});

}

//Analyze on the fly with sentence
function test5(){

	service.analyze_sentimo_on_the_fly(content = stringSample2,'' ,'' ,function(errors, res){
		if(errors){
			console.log('5.) Analyze on the fly with sentence array');
			console.log('Failed to retrieve data.')
			console.log(errors)
		}else{
			console.log('5.) Analyze on the fly with sentence array');
			console.log('Get Response')
			console.log(res)
		}
	});

}

test1();
test2();
test3();
test4();
test5();