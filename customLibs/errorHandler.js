var handler = function(app) {

    return function errorHandler(msg, err, res) {
        if (err) {
            if (err.stack) {
                msg = msg + '   ' + err.stack;
            } else {
                msg = msg + '   ' + err;
            }
        }
        if (res){
            res.send(500, { error: "Internal DB Error" });
        }
        if (process.env.NODE_ENV === 'development') {
            app.get('eventEmiter').emit('err', msg);
        } else {
            throw new Error(msg);
        }
    }
};
module.exports = handler;