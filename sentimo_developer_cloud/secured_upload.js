var SentimoService =require("./utils/SentimoService");
var Utils = require('./utils/utils');

/**
 * The SentiMo SDK Client
 */
module.exports = class SecuredUpload {
	
    /**
     * Create a instance of the SDK Client
     *
     * @param {Object} config - The API config
     * @param {string} config.hostname - The API hostname
     * @param {string} config.path
     * @param {string} config.token - The API token
     * @param {string} config.timeout - The timeout value of API calls
     */

    constructor({hostname, path, token, timeout}){
		if (!hostname || !timeout){
			throw new Error("You need to specify your SDK address and PID!");
		}

		this.service = new SentimoService(hostname, path, token, timeout)
		
    }

	
	//-----------------------------------
	// Upload Data Service
	//-----------------------------------
    /**
     * @param {string} content - Main content of data
     * @param {object} callback - Callback paramaters to process the response
     */
	upload_data(content, callback) {
		//Verify the type of input content (string:array)
		if(typeof(content)== 'string'){
			content = [content];
		}
		var dataset  = Utils.construct_upload_data(content);
		
		var address = '/upload/';

		return this.service.doPost(address, dataset,callback);		
	}
	
    /**
     * @param {JSON} data - An array containing the elements below
     *      @param {string} user_id - User ID of poster of data
     *      @param {string} post_time - Time when post was uploaded to the source 
	 * 								(In the format 'YYYY-MM-DDThh:mm:ss.sTZD')
     *      @param {string} post_id - The domain name under which this set of 
	 * 								results was produced.
     *      @param {string} content - Main content of data
     *      @param {string} source  - Source of data  
     * @param {object} callback - Callback paramaters to process the response
     */
	upload_data_set(dataset, callback) {
		var address = '/upload/';

		return this.service.doPost(address, dataset, callback);
	}

	//----------------------------------
	// Support Function
	//----------------------------------
	_construct_upload_data(content){
		if(typeof(content) == 'string'){
            content = [content];
		}
		return Utils.construct_upload_data(content);
	}
}
