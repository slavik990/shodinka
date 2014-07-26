var App = App ||{};
require.config({
    paths: {
        jQuery: './libs/jquery-2.1.0.min.map',
        jQueryUI: './libs/jquery-ui.min',
        Underscore: './libs/underscore_1.6.0.min',
        Backbone: './libs/backbone-min.map.1.1.2',
        templates: '../templates',
        text: './libs/text',
		less: './libs/less-1.7.3.min',
        ajaxForm: './libs/jquery.form',
		booklet: './libs/jquery.booklet.1.1.0.min',
		easing: './libs/jquery.easing.1.3',
		ChunkFive: './libs/ChunkFive_400.font',
		noteThis: './libs/Note_this_400.font',
		Cufon: './libs/cufon-yui'
    },
    shim: {
        'jQueryUI': ['jQuery'],
        'ajaxForm': ['jQuery'],
        'easing': ['jQuery'],
        'booklet': ['easing'],
        'ChunkFive': ['Cufon'],
        'noteThis': ['Cufon'],
        'Backbone': ['Underscore', 'jQuery', 'less', 'jQueryUI'],
        'app': ['Backbone', 'ajaxForm', 'booklet', 'noteThis', 'ChunkFive']
    }
});

require(['app'], function (app) {
    app.initialize();
});
