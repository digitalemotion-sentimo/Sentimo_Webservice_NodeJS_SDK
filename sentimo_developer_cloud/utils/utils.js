exports.construct_aoa_data_array = function(content, title, data_type, user_id, 
            screen_name, post_count, post_time, msg_from, url, source){
    
    var params = [];

    for(var i in content){
        // console.log(i);
        // console.log(content[i]);
        var param = this.construct_aoa_data(content[i], title, data_type, user_id, screen_name, post_count, post_time, msg_from, url, source);
        params.push(param);
    }

    in_json = JSON.stringify(params);
    return in_json;
}

exports.construct_aoa_data = function(content, title, data_type, user_id, 
    screen_name, post_count, post_time, msg_from, url, source){

    if(title == null) title = 'default';
    if(data_type == null) data_type = 'String';
    if(source == null) source = 'default';
    if(user_id == null) user_id = 'default';
    if(screen_name == null) screen_name = 'default';
    if(post_count == null) post_count ='0';
    if(msg_from == null) msg_from ='default';
    if(url == null) url = 'default';
    if(post_time == null) {
        var post_time = new Date().toISOString().replace(/\..+/, '') ;
    }

    param = {'title' : title,
                  'type' : data_type , 
                  'user_id' : user_id,
                  'source': source,
                  'screen_name': screen_name,
                  'userjoindate' : 0,
                  'postcount' : post_count,
                  'post_time' : post_time,
                  'post_id': "default",
                  'content' : content,
                  'reply_to_post_id': "-",
                  'reply_to_uid': "-",
                  'msg_from': msg_from,
                  'likes' : 0,
                  'url' : url};
    
    return param;
}

exports.construct_upload_data= function(content, post_id, source, user_id, post_time){

    var params = [];

    for (var i in content){

        if(post_id == null) post_id = 'default';
        if(source == null) source = 'default';
        if(user_id == null) user_id = 'default';
        if(post_time == null) post_time = new Date().toISOString().replace(/\..+/, '');

        var param = {'post_id': post_id, 
                'source': source, 
                'user_id' : user_id, 
                'post_time': post_time, 
                'content': content[i]};
        params.push(param);
    }

    var data = {'data' : params};
    var dataString = JSON.stringify(data);

    return dataString;
}
