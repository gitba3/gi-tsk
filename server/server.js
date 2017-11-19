// Retrieve
var MongoClient = require("mongodb").MongoClient;
var data = require("../src/api/sample");

// Connect to the db
MongoClient.connect("mongodb://ba3:ba3@ds259865.mlab.com:59865/ba3", function(
  err,
  db
) {
  if (!err) {
    var collection = db.collection("test");
    console.log("We are connected");
    // var doc1 = { hello: "doc1" };
    for (var i = 0; i < 1000; i++) {
      collection.insert({ hello: data }, { w: 1 }, function(err, result) {
        console.log(result);
      });
    }
  }
});
