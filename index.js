const express = require('express'), //boilerplate
      app = express(), //boilerplate
      port = process.env.PORT || 8080, //boilerplate, kinda
      bodyParser = require('body-parser'), //required to parse request's body
      path = require('path'), 
      lalaList = require('./lala'); // the file that has all the information
      
app.use(bodyParser.json()); //set up body-parser to parse json.

//when a GET request is made to `/`, serve `index.html`
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

//when a GET request is made to `/isLala`, do ... stuff.
app.get('/islala', function(req,res){
  
  let coname = req.query.coname.toLowerCase(); //get company name that we sent from `index.html` and make it lowercase, lol

  let myLala = lalaList.find(function(lala){
    return lala.tags.indexOf(coname) > -1;
  }); //find by matching tags.
  
  let responseString = '';
  
  if(myLala) { //is not `undefined`
    responseString = myLala.name + ' is ' + (myLala.isLala ? 'a lala.' : 'not a lala.');
  }
  else {
    responseString = 'Company not found.'
  }
  
  //send the response
  res.send({responseString: responseString});
  
});

app.listen(port); //start listening for incoming requests.
console.log('Running on ' + port);