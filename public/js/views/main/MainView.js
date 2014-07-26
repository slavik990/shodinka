define([
        'text!templates/main/main.html'
    ], function(MainTemplate) {

        var MainView = Backbone.View.extend({
            el: '#wrapper',
            events: {
            },
            initialize: function(options) {
				this.render();
            },

            render: function() {
	            this.$el.html(_.template(MainTemplate));
				Cufon.replace('h1,p,.b-counter');
				Cufon.replace('.book_wrapper a', {hover:true});
				Cufon.replace('.title', {textShadow: '1px 1px #C59471', fontFamily:'ChunkFive'});
				Cufon.replace('.reference a', {textShadow: '1px 1px #C59471', fontFamily:'ChunkFive'});
				Cufon.replace('.loading', {textShadow: '1px 1px #000', fontFamily:'ChunkFive'});
				var $mybook 		= $('#mybook');
				var $bttn_next		= $('#next_page_button');
				var $bttn_prev		= $('#prev_page_button');
				var $loading		= $('#loading');
				var $mybook_images	= $mybook.find('img');
				var cnt_images		= $mybook_images.length;
				var loaded			= 0;
				$mybook_images.each(function(){
					var $img 	= $(this);
					var source	= $img.attr('src');
					$('<img/>').load(function(){
						++loaded;
						if(loaded == cnt_images){
							$loading.hide();
							$bttn_next.show();
							$bttn_prev.show();
							$mybook.show().booklet({
								name:               null, 
								width:              990,  
								height:             700,  
								speed:              600,  
								direction:          'LTR',
								startingPage:       0,    
								easing:             'easeInOutQuad',
								easeIn:             'easeInQuad',
								easeOut:            'easeOutQuad',
								closed:             true,
								closedFrontTitle:   null,
								closedFrontChapter: null,
								closedBackTitle:    null,
								closedBackChapter:  null,
								covers:             false,
								pagePadding:        10,
								pageNumbers:        true,
								hovers:             false,
								overlays:           false,
								tabs:               false,
								tabWidth:           60,
								tabHeight:          20,
								arrows:             false,
								cursor:             'pointer',
								hash:               false,
								keyboard:           true, 
								next:               $bttn_next,
								prev:               $bttn_prev,
								menu:               null,
								pageSelector:       false,
								chapterSelector:    false,
								shadows:            true,
								shadowTopFwdWidth:  166, 
								shadowTopBackWidth: 166, 
								shadowBtmWidth:     50,
								before:             function(){},
								after:              function(){} 
							});
							Cufon.refresh();
						}
					}).attr('src',source);
				});
				
                return this;
            }
        });
        return MainView;
    });
