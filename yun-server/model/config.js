var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yun-note',{ useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('we are connected!')
});

module.exports = db