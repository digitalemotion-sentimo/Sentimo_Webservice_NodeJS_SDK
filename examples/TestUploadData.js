/*Data upload test Script*/
const SecuredUpload = require('../sentimo_developer_cloud/secured_upload');
const config = require('../config');

const hostname = config.hostname;
const token = config.token;
const path = config.path;
const timeout = config.timeout;

/**
 * Create a instance of the SentiMo REST SDK
 */
const service = new SecuredUpload({hostname, path, token, timeout});

dataset = '{"data":[{"post_id":"x0003","source":"DummySource2","user_id":"user2","post_time":"2016-02-08-19-03-02","content":"Trains are very crowded today."}]}';

//Upload dataset to the server
function test1(){
  
    service.upload_data_set(dataset = dataset,function(errors, res){
		if(errors){
			console.log("1.) Upload Data.");
			console.log('Failed to retrieve data.')
			console.log(errors)
		}else{
			console.log("1.) Upload Data.");
			console.log('Get Response')
			console.log(res)
		}
	});
}

var stringSample1 = 'The MRT is very croweded today.';
var inputString1 = service._construct_upload_data(stringSample1);

// 2). Analyze general sentiments on the fly
function test2(){

	service.upload_data(content = stringSample1, function(errors, res){
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

service.upload_data(content = 'The MRT is very croweded today.', function(errors, res){
	if(errors){
		console.log(errors)
	}else{
		console.log(res)
	}
});

const stringSample2 = ['The MRT is very croweded today.', 'It is raining today.'];
const inputString2 = service._construct_upload_data(stringSample2);

function test3(){

	service.upload_data_set(dataset = inputString2,function(errors, res){
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

test1();
test2();
test3();