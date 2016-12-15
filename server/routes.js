var db = require('./database')();

var routes = function(app){
    app.route('/api/rooms')
        .get(function(req, res){
            db.query('SELECT * FROM channels', function(err, rows, fields){
                if(err){
                    res.send(err);
                    return;
                }
                res.send(rows);
            })
        })    
};

module.exports = routes;