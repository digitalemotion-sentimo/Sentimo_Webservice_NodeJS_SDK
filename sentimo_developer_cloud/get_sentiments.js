//import ApiClinent from "./utils/ApiClient";
var SentimoService = require('./utils/SentimoService')

/**
 * The SentiMo SDK Client
 */
module.exports = class GetSentiments{
	
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
	// General Sentiment Analysis Service
	//-----------------------------------
    /**
     * @param {string} dataIds - Data ID previously retruned by database, multiple 
	 * 							data Ids to be separated by comma
     * @param {string} domains - Multiple domains to be separated by comma
     * @param {object} callback - Callback paramaters to process the response
     */	
	retrieve_sentiment(dataIds, domains, callback){
		
		var address = '/ar/sentiment/';
		
		if(typeof(dataIds) == 'string'){
			dataIds = dataIds.replace(',', '%2C'); 
		}
		if((domains !== null) && (domains !== '')){
			domains = domains.replace(',', '%2C') + '/'
		}
		
		address = address + domains + dataIds;
		return this.service.doGet(address,callback);
			
	}

	/**
     *
     * @param {string} dataId - Data ID previously retruned by database
     * @param {string} domains - Multiple domains to be separated by comma
     * @param {string} num - Range of data set from calling dataId
     * @param {object} callback - Callback paramaters to process the response
     */	
	retrieve_sentiment_set(dataId, domains, num, callback){
		
		var address = '/ar/sentiment/'
		if((domains !== null) && (domains !== '')){
			domains = domains.replace(',', '%2C') + '/'
		}
		
		address = address + domains + 'start/' + dataId + '?max=' + num;
		return this.service.doGet(address, callback);
			
	}

	//------------------------------------------
	// Fine-grained Emotion Analysis Service
	//------------------------------------------
	/**
     * @param {string} dataIds - Data ID previously retruned by database, multiple 
	 * 							data Ids to be separated by comma
     * @param {string} domains - Multiple domains to be separated by comma
     * @param {object} callback - Callback paramaters to process the response
     */	
	retrieve_sentimo(dataIds, domains, callback){
		
		var address = '/ar/sentimo/'
		
		if(typeof(dataIds) == 'string'){
			dataIds = dataIds.replace(',', '%2C'); 
		}
		if((domains !== null) && (domains !== '')){
			domains = domains.replace(',', '%2C') + '/'
		}
		
		address = address + domains + dataIds;
		return this.service.doGet(address, callback);
			
	}

	/**
     *
     * @param {string} dataId - Data ID previously retruned by database
     * @param {string} domains - Multiple domains to be separated by comma
     * @param {string} num - Range of data set from calling dataId
     * @param {object} callback - Callback paramaters to process the response
     */	
	retrieve_sentimo_set(dataId, domains, num, callback){
		
		var address = '/ar/sentimo/'
		
		if((domains !== null) && (domains !== '')){
			domains = domains.replace(',', '%2C') + '/'
		}
		
		address = address + domains + 'start/' + dataId + '?max=' + num;
		return this.service.doGet(address, callback);
			
	}
}