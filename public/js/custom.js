define([], function () {

    var runApplication = function (success) {
        if (!Backbone.history.fragment)
            Backbone.history.start({ silent: true });
        if (success) {
            var url = (App.requestedURL == null) ? Backbone.history.fragment : App.requestedURL;
            if ((url == "") || (url == "login")) url = 'main';

            Backbone.history.fragment = "";
            Backbone.history.navigate(url, { trigger: true });

        } else {
            if (App.requestedURL == null)
                App.requestedURL = Backbone.history.fragment;
            Backbone.history.fragment = "";
            Backbone.history.navigate("main", { trigger: true });
        }
    };
   var checkLogin = function (callback) {
        var url = "/authenticated";
        $.ajax({
            url: url,
            type: "GET",
            success: function () {
                return callback(true);
            },
            error: function (data) {
                return callback(false);
            }
        });
    }

   
     var getData = function(url, data, callback, context){
        $.get(url, data, function(response){
            if (context) {
                callback(response, context);
            } else callback(response);
        });
    };

    return {
        runApplication: runApplication,
        checkLogin: checkLogin,
		getData: getData
    };
});
