// Filename: router.js
define([
	'views/main/MainView',
	'custom'
], function (mainView, custom) {

    var appRouter = Backbone.Router.extend({

        mainView: null,
        topBarView: null,
		current:null,

        routes: {
            "main": "main",

			"*any": "main"
        },

        initialize: function () {
			$(document).on("click", function (e) {
	            if ($(e.target).closest(".popUp").length == 0 && $(e.target).closest(".ui-dialog").length == 0) {
	                $(".popUp").hide();
	                $(".ui-dialog").hide();
	            }
	        });
        },

        main: function () {
            this.mainView = new mainView();
//			this.changeWrapperView(this.mainView);
        },

   
	    changeView: function (view, options) {
	        if (this.current) {
	            this.current.undelegateEvents();
				$(".ui-dialog").remove();
	        }
	        this.current = new view(options);
	    },

/*	    main: function () {
	        if (!this.mainView) {
	            this.mainView = new mainView();
	            this.topBarView = new topMenuView();
	            this.changeWrapperView(this.mainView);
	        }
	    },
*/		changeWrapperView: function (wrapperView) {
	        if (this.wrapperView) {
	            this.wrapperView.undelegateEvents();
	        }
	        this.wrapperView = wrapperView;
	    }

    });

    return appRouter;
});
