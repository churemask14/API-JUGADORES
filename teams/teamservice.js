const superagent = require('superagent')
//const request = require('request');


/*async function getByIdTeam (id){
     //return await superagent.get('http://10.0.4.135:5000/team/'+ id);
     const HOST = 'https://10.0.4.135:5000';
     request.get(HOST + '/team/' + id, {json:true}, function(err, r) {
		if (err) {
			console.log(err);
		} else {
			return r.body;
		}
	});
}*/
    

async function getByIdTeam (id){
    //return await superagent.get('http://10.0.4.135:5000/team/'+ id, {json:true}); 
    return await superagent.get('https://murmuring-castle-20672.herokuapp.com/team/'+ id, {json:true}); 
}

module.exports= {
    getByIdTeam}
