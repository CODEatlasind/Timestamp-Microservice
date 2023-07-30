// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/:date?", function(req, res) {
  //If Empty i.e. '' or undefined
  if (req.params.date === '' || req.params.date === undefined) {
    const current = new Date();
    return res.json({
      unix: current.getTime(),
      utc: current.toUTCString(),
    }); 
  }
    
  var date_string=req.params.date;
  
  var unix = new Date(date_string);
  
  if(unix.toUTCString()==="Invalid Date"){
    unix=new Date(date_string*1);
  }
  if(unix.toUTCString()==="Invalid Date"){
    res.json({error:"Invalid Date"});
    return;
  }
  
  res.json({ 
    unix: unix.getTime(), 
    utc: unix.toUTCString()  
  });
});

  


