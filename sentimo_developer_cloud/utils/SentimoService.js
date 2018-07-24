var http = require('https')

// var headers = {};
/**
 *	The SentiMo API Client
 */
module.exports = class SentimoService{
	
    /**
     * Create a instance of the API client
     *
     * @param {string} hostname - The API hostname
     * @param {string} path - The API function address
     * @param {string} token - The API pid
     * @param {string} timeout - The API server communication period
     */
	
	constructor(hostname, path, token, timeout) {
        /**
         * The API hostname
         *
         * @type {string}
         * @protected
         */
        this.hostname = hostname;
        
        /**
         * The API function address
         *
         * @type {string}
         * @protected
         */
		this.path = path;
		
        /**
         * The API token
         *
         * @type {string}
         * @protected
         */
		this.token = token;
		
        /**
         * The API timeout
         *
         * @type {string}
         * @protected
         */
		this.timeout = timeout;
    }
	
    /**
     * Do a POST call to the SentiMo API server
     *
     * @param {string} partialUrl - The api endpoint to call
     * @param {Object} data - The post data to send to the server
     * @param {Object} params - Query parameters to send in this call
     * @param {api-callback} callback - The callback for this call
     */
    doPost(partialUrl, postData, callback){

        var headers = {
            'Content-Type' : 'application/json', 
            'User-Agent' : 'Sentimo Node JS SDK v1.0.0',
            'pid' : this.token,
            'Accpet' : 'application/json'
        };

        var options = {
            hostname: this.hostname,
            path: this.path + partialUrl,
            method : 'POST',
            headers : headers,
            "rejectUnauthorized": false, 
        }

        var req = http.request(options, function(res){
            res.setEncoding('utf-8');
            // console.log(res);

            var resResult = '';

            res.on('data', function(data){
                
                // Retrieve response result
                resResult = data;
                console.log(typeof(resResult));
            });

            res.on('end', function(){

                if(res.statusCode != 200){
                    //Retrieve HTTP error message
                    var result = {
                        code: res.statusCode,
                        message: res.statusMessage
                    }
                    callback(result, null);
                }else{
                    //Send out the final result
                    console.log();
                    callback(null, JSON.parse(resResult));
                }
            });
        })

        // Send post data to request
        req.write(postData);

        req.on('error', function(e){
            //Retrieve HTTP request error
            console.log(e)
            callback(e,null);
        });
        req.end();
    }
    
    /**
     * Do a GET call to the SentiMo API server
     *
     * @param {string} partialUrl - The api endpoint to call (gets prefixed by `server` and `/rest/v3/`)
     * @param {Object} params - Query parameters to send in this call
     * @param {api-callback} callback - The callback for this call
     */
    doGet(partialUrl, callback){
     
        var headers = {
            'Content-Type' : 'application/json', 
            'User-Agent' : 'Sentimo Node JS SDK v1.0.0',
            'pid' : this.token,
            'Accpet' : 'application/json'
        };

        var options = {
            hostname: this.hostname,
            path: this.path + partialUrl,
            method : 'GET',
            headers : headers,
            "rejectUnauthorized": false, 
        }

        var req = http.request(options, function(res){
            res.setEncoding('utf-8');

            var resResult = '';

            res.on('data', function(data){
                
                //Retrieve results;
                resResult = data;
                console.log(typeof(resResult));
            });

            res.on('end', function(){

                if(res.statusCode != 200){
                    var result = {
                        code: res.statusCode,
                        message: res.statusMessage
                    }
                    callback(result, null);
                }else{
                    console.log();
                    callback(null, resResult);
                }
            });
        })

        req.on('error', function(e){

            //Retrieve HTTP request error
            console.log(e)
            callback(e,null);
        });
        req.end();
    }


    /**
     * Wrap a callback to process possible API and network errors
     *
     * @param {api-callback} callback - The final callback
     * @returns {function(err: Object, res: Object)} - The super agent callback
     *
     * @private
     */
    * wrapCallback(callback = () => null) {
        return (err, res) => {
            if (!err) {
                callback(undefined, res.body, res);
                return;
            }

            let errors = [
                {
                    message: `Could not communicate with ${this.url}`,
                    code: "COMMUNICATION_ERROR",
                },
            ];
            if (res && res.body && res.body.errors) {
                errors = res.body.errors;
            }
            callback(errors, res ? res.body : undefined, res);
        };
    }
	
}