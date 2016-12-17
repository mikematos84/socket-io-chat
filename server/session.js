/**
 * Session handling
 */
var session = require('express-session');

module.exports = function(app){
    var sess = {
        secret: 'qwkalks091k2l89e0q54qw6e6',
        resave: false,
        saveUninitialized: true,
        cookie: { },
        maxAge: 3600000
    }
    app.use(session(sess));
}