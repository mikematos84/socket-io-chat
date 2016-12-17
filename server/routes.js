/**
 * Routes
 */

var db = require('./database');

module.exports = function(app){
    /** 
     * Middleware
     */
    app.use(function(req, res, next){
        if(req.session){
            req.session.reload(function(err){
                next();
            });
        }else{
            next();
        }
    });

    
    /**
     * Rooms
     */
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

    
    /**
     * Sessions
     */
    app.route('/api/session')
        .get(function(req, res){
            if(req.session){
                req.session.reload(function(err){
                    res.send(req.session);
                    req.session.touch(); //update max time
                });
            }else{
                res.send();
            }
        })
        .post(function(req, res){
            req.session.user = req.body.user.data;
            res.send(req.session.user);
        })
        .delete(function(req, res){
            req.session.destroy(function(err){
                res.send('Session deleted');
            });           
        })
}