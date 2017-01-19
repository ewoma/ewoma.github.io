jQuery(document).ready(function($) {
	document.body.addEventListener('touchstart',function(){},false);

/* ------------------------------------------------------- */
/*  STELLAR INIT (http://markdalgleish.com/projects/stellar.js/)
/* ------------------------------------------------------- */
	if(!(jQuery.browser.mobile) && $(window).width() > 768) {
		$(window).stellar({
			responsive: true,
			horizontalOffset: 0,
			horizontalScrolling:false
		});
	}


/* ------------------------------------------------------- */
/*  REPLACE SVG IMAGES WITH INLINE SVG
/* ------------------------------------------------------- */
	$('.svg-inject').svgInject();


/* ------------------------------------------------------- */
/*  NAVBAR AFFIX (http://getbootstrap.com/)
/* ------------------------------------------------------- */
	if (!$('.navbar').hasClass('show-nav')) {
		$('.navbar').affix({
			offset: {
				top: 200
			}
		});
	}


/* ------------------------------------------------------- */
/*  MENU TRIGGER
/* ------------------------------------------------------- */
	$('.menu-trigger, .main-menu li a').click(function() {
		$('.menu-trigger').toggleClass("close-menu");
		$(".menu-wrapper").toggleClass("show-menu");
		if($('.menu-trigger').hasClass("close-menu")) {
			$("html, body").addClass("noscroll");
			$(".menu-wrapper .logo").attr("class", "logo svg-inject animated zoomIn");
			$(".menu-wrapper .main-menu li").addClass("animated fadeInRight");
			$(".menu-wrapper .menu-footer li").addClass("animated zoomIn");
			$(".scroll-to-top").removeClass("is-visible");
		} else {
			$("html, body").removeClass("noscroll");
			$(".menu-wrapper .logo").attr("class", "logo svg-inject");
			$(".menu-wrapper .main-menu li").removeClass("animated fadeInRight");
			$(".menu-wrapper .menu-footer li").removeClass("animated zoomIn");
			if($(window).scrollTop() > 700) {
				$(".scroll-to-top").addClass("is-visible");
			}
		}
	});


/* ------------------------------------------------------- */
/*  SCROLL TO
/* ------------------------------------------------------- */
	$(".main-menu li a, .scrollto").bind('click', function(e) {
		var href = $(this).attr('href'),
			navHeight = $('.navbar').outerHeight() - 44,
			offset = $(href).offset().top;
		if(href != '#') {
			$('html,body').animate({scrollTop: offset - navHeight}, 1500, 'easeInOutExpo', function() {
				if(href == '#offer') {
					$("#name").focus();
				}
			});
		}
		e.preventDefault();
	});


/* ------------------------------------------------------- */
/*  SCROLL TO TOP
/* ------------------------------------------------------- */
	$(window).scroll(function() {
		if($(this).scrollTop() > 700) {
			$('.scroll-to-top').addClass('is-visible');
		} else {
			$('.scroll-to-top').removeClass('is-visible');
		}
	});

	$(".scroll-to-top").click(function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
	});


/* ------------------------------------------------------- */
/*  ISOTOPE PORTFOLIO (http://isotope.metafizzy.co/)
/* ------------------------------------------------------- */
	var $container = $("#portfolio-container");
	$container.imagesLoaded(function() {
		$container.isotope({
			itemSelector: ".item",
			layoutMode: "fitRows",
			transitionDuration: "0.8s",
		});
	});

	var $filter = $(".portfolio-filters a");
	$filter.on("click", function() {
		if ($filter.parent().hasClass("active")) {
			$filter.parent().removeClass("active");
			$(this).parent().addClass("active");
		}
		var filterValue = $(this).attr("data-filter");
		$container.isotope({ filter : filterValue });
		return false;
	});


/* ------------------------------------------------------- */
/*  PORTFOLIO POPUP (http://dimsemenov.com/plugins/magnific-popup/)
/* ------------------------------------------------------- */
	$('#portfolio-container, #recentprojects').each(function() {
		$(this).magnificPopup({
			delegate: '.image-link',
			type: 'image',
			gallery: {
				enabled: true
			}
		});
	});


/* ------------------------------------------------------- */
/*  AJAX PORTFOLIO
/* ------------------------------------------------------- */
	var loader = $("#preview-wrap");
	loader.before("<div id=\"scrolltopreview\"></div>");
	loader.html("<a href=\"#\" class=\"close\">X</a><div id=\"preview-inner\"></div>");
	$(".preview").on("click", function(e) {
		e.preventDefault();
		var toLoad = $(this).attr("href") + " #portfolio-content";
		var container = $("#preview-inner");
		loader.slideUp(function() {
			container.load(toLoad, function() {
				$("html, body").animate({scrollTop: $("#scrolltopreview").offset().top - 100}, 500, function() {
					$(".project-title h1").replaceWith(function() {
						return "<h3>" + $(this).text() + "</h3>";
					});
					loader.slideDown();
				});
			});
		});
	});

	$(".close").on("click", function(e) {
		e.preventDefault();
		loader.delay(300).slideUp(function() {
			var container = $("#preview-inner");
			container.html("");
			$("html, body").animate({scrollTop: $("#scrolltopreview").offset().top - 100}, 500);
		});
	});


/* ------------------------------------------------------- */
/*  WOW INIT (http://mynameismatthieu.com/WOW/)
/* ------------------------------------------------------- */
	wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 0,
		mobile: false,
	});
	wow.init();


/* ------------------------------------------------------- */
/*  SKILL KNOBS (Activate on waypoint) (http://anthonyterrien.com/knob/)
/* ------------------------------------------------------- */
	$('.skill').waypoint(function() {
		$('.knob').each(function() {
			var element = $(this);
			var perc = element.attr("value");

			element.knob({ 
				'value': 0, 
				'min': 0,
				'max': 100,
				'width': 200,
				'readOnly': true,
				'thickness': .06,
				'font': 'inherit',
				'fontWeight': 'inherit',
				'inputColor': 'inherit',
				'dynamicDraw': true,
				'draw': function() {
					$(this.i).val(this.cv + '%');
				}
			});

			$({value: 0}).animate({value: perc}, {
				duration: 3000,
				easing: 'swing',
				step: function() {
					element.val(Math.ceil(this.value)).trigger('change');
				}
			});
		});
		this.destroy();
	},{offset: '90%'});


/* ------------------------------------------------------- */
/*  TWITTER FEED (http://jasonmayes.com/projects/twitterApi/)
/* ------------------------------------------------------- */
	twitterFetcher.fetch({
		id: "609702335225425920", // YOUR_WIDGET_ID
		domId: "twitterFeed-container",
		maxTweets: 5,
		enableLinks: true,
		showUser: false,
		showTime: true,
		showRetweet: true,
		showInteraction: false,
		"lang": 'en',
		customCallback: function(tweets) {
			var html = '<ul class="tweets">';
			for(var n=0; n<tweets.length; n++) {
				html += '<li>' + tweets[n] + '</li>';
			}
			html += '</ul>';

			if ($('#twitterFeed-container').length) {
				document.getElementById('twitterFeed-container').innerHTML = html;
			}

			$(".tweets").owlCarousel({
				navigation: false,
				pagination: false,
				singleItem: true,
				transitionStyle: "fade",
				autoPlay: 4000
			});
		}
	});


/* ------------------------------------------------------- */
/*  INSTAGRAM FEED (http://instafeedjs.com/)
/* ------------------------------------------------------- */
	if ($( "#instagramFeed-container" ).length) {
		var userFeed = new Instafeed({
			target: 'instagramFeed-container',
			get: 'user',
			userId: 318443925, // YOUR_USER_ID
			accessToken: '318443925.467ede5.b5ba5183806a4638bd2aa2f11cfe6e64', //YOUR_ACCESS_TOKEN
			resolution: 'standard_resolution',
			limit: 4,
			template: '<li class="col-sm-3 col-xs-6"><a href="{{link}}" target="_blank" class="instagram-image"><img src="{{image}}"><span class="instagram-caption"><p>{{caption}}</p></span><span class="instagram-logo"><i class="fa fa-instagram"></i></span><span class="instagram-overlay"></span></a></li>'
		});
		userFeed.run();
	}


/* ------------------------------------------------------- */
/*  OWL CAROUSEL (http://owlgraphic.com/owlcarousel/)
/* ------------------------------------------------------- */
	// Testimonials
	$("#testimonial-carousel").owlCarousel({
		navigation: false,
		navigationText: [
			"<i class=\"fa fa-angle-left\"></i>",
			"<i class=\"fa fa-angle-right\"></i>"
		],
		pagination: false,
		singleItem: true,
		transitionStyle: "fade",
		autoPlay: 4000
	});

	// Clients
	$("#clients-carousel").owlCarousel({
		items: 5,
		itemsDesktop: [1000,2],
		itemsDesktopSmall: [900,2],
		itemsTablet: [600,1],
		itemsMobile: [0,1],
		pagination: false,
		autoPlay: 4000
	});


/* ------------------------------------------------------- */
/*  GOOGLE MAP
/* ------------------------------------------------------- */
	function initialize() {
		var lat = $("#googleMap").attr("data-latitude"),
		    lng = $("#googleMap").attr("data-longitude"),
		    pos = new google.maps.LatLng(lat, lng);

		var mapOptions = {
			center: pos,
			zoom: 13,
			zoomControl: true,
			scaleControl: false,
			scrollwheel: false,
			draggable: false,
			disableDoubleClickZoom: true,
			mapTypeControl: false,
			streetViewControl: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		if ($('#googleMap').length) {
			var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

			var image = new google.maps.MarkerImage("https://solitweb.be/themes/lithium/img/marker@2x.png", null, null, null, new google.maps.Size(80,100));

			var marker = new google.maps.Marker({
				position: pos,
				icon: image,
				map: map,
				title: ''
			});

			google.maps.event.addListener(marker, 'click', function() {
				window.open("https://www.google.be/maps/place/40.7902778,-73.9597222");
			});

			google.maps.event.addDomListener(window, 'resize', function() { map.setCenter(pos); });
		}
	}		
	google.maps.event.addDomListener(window, 'load', initialize);


/* ------------------------------------------------------- */
/*  SUBSCRIBE FROM VALIDATION (http://reactiveraven.github.io/jqBootstrapValidation/)
/* ------------------------------------------------------- */
	$("#subscribeForm input, #bookingForm input").jqBootstrapValidation({
		preventSubmit: true,
		submitSuccess: function($form, e) {
			e.preventDefault();
			var email = $("#subscribeForm input[name='email']").val();
			$.ajax({
				url: "././php/subscribe.php",
				type: "POST",
				data: {
					email: email
				},
				cache: false,
				success: function() {
					$('#subscribeForm .success').html("Success! Thank You");
					$('#subscribeForm').trigger("reset");
				},
				error: function() {
					$('#subscribeForm .success').html("<span class=\"error\">Please Try Again</span>");
					//$('#subscribeForm').trigger("reset");
				},
			});
		},
		filter: function() {
			return $(this).is(":visible");
		},
	});


/* ------------------------------------------------------- */
/*  CONTACT FROM VALIDATION (http://reactiveraven.github.io/jqBootstrapValidation/)
/* ------------------------------------------------------- */
	$("#contactForm input, #contactForm textarea").jqBootstrapValidation({
		preventSubmit: true,
		submitSuccess: function($form, e) {
			e.preventDefault();
			var name = $("#contactForm input[name='name']").val(),
			    email = $("#contactForm input[name='email']").val(),
			    message = $("#contactForm textarea[name='message']").val();
			$.ajax({
				url: "././php/contact.php",
				type: "POST",
				data: {
					name: name,
					email: email,
					message: message
				},
				cache: false,
				success: function() {
					$('#contactForm .success').html("Your message has been send!");
					$('#contactForm').trigger("reset");
				},
				error: function() {
					$('#contactForm .success').html("<span class=\"error\">Your message cannot be send. Please try again later!</span>");
					//$('#contactForm').trigger("reset");
				},
			});
		},
		filter: function() {
			return $(this).is(":visible");
		},
	});


/* ------------------------------------------------------- */
/*	COLOR SWITCHER
/* ------------------------------------------------------- */
	var active = $('.color-switcher ul li');

	$('.color-switcher .toggler').on('click', function(e){
		e.preventDefault();
		$(this).closest('.color-switcher').toggleClass('opened');
	});

	$('.color-switcher ul li a').on('click', function(e){
		e.preventDefault();
		active.removeClass('active');
		$(this).parent().addClass('active');
		$('#css-color').removeAttr('href').attr('href', 'css/colors/' + $(this).data('color') + '.css');
	});


});



// if ($("body").hasClass("noscroll")) {
// 	$(".fa").css("color","#fff");
// } else {
// 	$(".fa").css("color","#5B6770");
// }
