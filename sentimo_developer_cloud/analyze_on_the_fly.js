//Import SentimoService
var SentimoService = require('./utils/SentimoService');
var Utils = require('./utils/utils');

/**
 * SentiMo SDK Client
*/
module.exports = class AnalyzeOnTheFly{

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
    
    //----------------------------------
	// General Setniment Service
    //----------------------------------
    /**
     * @param {string} content - Main content to be analyzed
     * @param {string} targets - Target objects, up to 5 targets can be defined
     * @param {string} domain - Analysis domain
     * @param {object} callback - Callback paramaters to process the response
     */
    analyze_sentiment_on_the_fly(content, targets, domain, callback){

        var address = '/aoa/sentiment/analyze/';

        if((targets != null) && (targets != '')){
            targets = targets.replace(',', '%2C');
        }
		if((domain !== null) && (domain !== '')){
			domain = '?domain=' + domain.replace(',', '%2C');
        }
        
        if(typeof(content) == 'string'){
            content = [content];
        }

        var dataset = Utils.construct_aoa_data_array(content);
		
		address = address + targets + domain;
        return this.service.doPost(address, dataset, callback);	
    }

    /**
     * @param {JSON} dataset - An array containing the elements below
     *      @param {string} title 
     *      @param {string} type
     *      @param {string} user_id
     *      @param {string} screen_name
     *      @param {string} userjoindate
     *      @param {string} postcount
     *      @param {string} post_time - In the format 'YYYY-MM-DDThh:mm:ss.sTZD'
     *      @param {string} post_id
     *      @param {string} content
     *      @param {string} reply_to_post_id
     *      @param {string} reply_to_uid
     *      @param {string} msg
     *      @param {string} likes
     *      @param {string} url
     *      @param {string} source     
     * @param {string} targets - Target objects, up to 5 targets can be defined
     * @param {string} domain - Analysis domain
     * @param {object} callback - Callback paramaters to process the response
     */
    analyze_sentiment_full_dataset_on_the_fly(dataset, target, domain, callback){

        var address = '/aoa/sentiment/analyze/';
        if((targets != null) && (targets != '')){
            targets = targets.replace(',', '%2C');
        }
		if((domain !== null) && (domain !== '')){
			domain = '?domain=' + domain.replace(',', '%2C');
		}
		
		address = address + targets + domain;
        return this.service.doPost(address, dataset, callback);	
    }

    //----------------------------------
	// Fine-grained emotion Service
    //----------------------------------
    /**
     * @param {string} content - Main content to be analyzed
     * @param {string} targets - Target objects, up to 5 targets can be defined
     * @param {string} domain - Analysis domain
     * @param {object} callback - Callback paramaters to process the response
     */
    analyze_sentimo_on_the_fly(content, targets, domain, callback){
		
        var address = '/aoa/sentimo/analyze/';

        if((targets != null) && (targets != '')){
            targets = targets.replace(',', '%2C');
        }
		if((domain !== null) && (domain !== '')){
			domain = '?domain=' + domain.replace(',', '%2C');
        }
        
        if(typeof(content) == 'string'){
            content = [content];
        }

        var dataset = Utils.construct_aoa_data_array(content);
		
		address = address + targets + domain;
        return this.service.doPost(address, dataset, callback);	
    }

    /**
     * @param {JSON} dataset - An array containing the elements below
     *      @param {string} title 
     *      @param {string} type
     *      @param {string} user_id
     *      @param {string} screen_name
     *      @param {string} userjoindate
     *      @param {string} postcount
     *      @param {string} post_time - In the format 'YYYY-MM-DDThh:mm:ss.sTZD'
     *      @param {string} post_id
     *      @param {string} content
     *      @param {string} reply_to_post_id
     *      @param {string} reply_to_uid
     *      @param {string} msg
     *      @param {string} likes
     *      @param {string} url
     *      @param {string} source     
     * @param {string} targets - Target objects, up to 5 targets can be defined
     * @param {string} domain - Analysis domain
     * @param {object} callback - Callback paramaters to process the response
     */
    analyze_sentimo_full_dataset_on_the_fly(dataset, targets, domain, callback){
		
        var address = '/aoa/sentimo/analyze/';
        if((targets != null) && (targets != '')){
            targets = targets.replace(',', '%2C');
        }
		if((domain !== null) && (domain !== '')){
			domain = '?domain=' + domain.replace(',', '%2C') ;
		}
		
		address = address + targets + domain;
        return this.service.doPost(address, dataset, callback);	
    }

    //----------------------------------
	// Support Function
    //----------------------------------
    _construct_aoa_data(content){
        //Verify the type of input content (string:array)
        if(typeof(content) == 'string'){
            content = [content];
        }
        return Utils.construct_aoa_data_array(content);
    }
}