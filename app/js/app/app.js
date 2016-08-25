(function() {

	// var -------------------------------------------------------------------------------------------- //
	var _body = $('body');



	// start! ----------------------------------------------------------------------------------------- //
	window.addEventListener && window.addEventListener('DOMContentLoaded', function(){
		document.body.className += ' dom-loaded';

		$('.blog .items-wrapper').masonry({
			columnWidth: '.item'
		});

		// my functions
		openMenu();
		sliderReviews();
		if(_body.hasClass('home-page')) {
			scrollControll_home();
			scrollControll_projects();
			scrollControll_contacts();
			checkPosition();
		}

		$.fn.disableScroll = function() {
			window.oldScrollPos = $(window).scrollTop();
			$(window).on('scroll.scrolldisabler',function ( event ) {
				$(window).scrollTop( window.oldScrollPos );
				event.preventDefault();
			});
		};
		$.fn.enableScroll = function() {
			$(window).off('scroll.scrolldisabler');
		};
	});

	// show site -------------------------------------------------------------------------------------- //
	window.addEventListener && window.addEventListener('load', function(){
		document.body.className += ' loaded';
		$('.step-3 .video-wrapper').addClass('show-video');

		// my functions
		magellan();
		sliderHome();
		
		// home page
		var videoHome1 = document.getElementById('video-home-1');
		var videoHome2 = document.getElementById('video-home-2');
		var videoHome3 = document.getElementById('video-home-3');
		videoHome1.play();
		videoHome2.play();
		videoHome3.play();

	});



	// open menu
	function openMenu() {
		$('.menu-button').on('click', function() {
			_body.toggleClass('open-menu');
		})
	}



	// magellan
	function magellan() {
		var heightStep1 = $('.step-1').height(),
			magellanBlock = $('.magellan');
		$(window).scroll(function() {
			var scrollTop = $(window).scrollTop();
			if(scrollTop >= heightStep1) {
				magellanBlock.addClass('show');
			} else {
				magellanBlock.removeClass('show');
			}
		});
	}



	// slider (home page)
	function sliderHome() {
		var controll = $('.home-page .slider-wrapper .controls .controll'),
			lengthElem = $('.home-page .slider-wrapper .items .item').length,
			reviewsWrapper = $('.home-page .slider-wrapper .items');

		controll.on('click', function() {

			if(!reviewsWrapper.hasClass('waiting')) {
				var activeElement = $('.home-page .slider-wrapper .items .item.active'),
					indexElem = $('.home-page .slider-wrapper .items .item.active').index();

				// waiting
				reviewsWrapper.addClass('waiting');
				setTimeout(function() {
					reviewsWrapper.removeClass('waiting');
				}, 600*2)

				// prev
				if($(this).hasClass('prev')) {
					$('.home-page .slider-wrapper .items .item').removeClass('active');
					setTimeout(function() {
						// check position
						if(indexElem >= 1) { // якщо не перший елемент
							activeElement.prev('.item').addClass('active');
						} else { // якщо перший
							$('.home-page .slider-wrapper .items .item:last-child').addClass('active');
						}
					}, 600)
				}
				// next
				else {
					$('.home-page .slider-wrapper .items .item').removeClass('active');
					setTimeout(function() {
						// ckeck position
						if(indexElem < lengthElem-1) { // якщо не останній елемент
							activeElement.next('.item').addClass('active');
						} else { // якщо останній елемент
							$('.home-page .slider-wrapper .items .item:first-child').addClass('active');
						}
					}, 600)
				}
			}
		})






		// var controls = $('.step-3 .slider-wrapper .controls > div > div > div'),
		// 	num = 1,
		// 	wrapper = $('.step-3 .slider-wrapper .wrapper'),
		// 	numberProjects = $('.step-3 .slider-wrapper .wrapper > div').length;
		// controls.on('click', function() {
		// 	if($(this).hasClass('prev')) {
		// 		if(num > 1) {
		// 			num = num - 1
		// 		} else {
		// 			num = numberProjects
		// 		}
		// 	}
		// 	if($(this).hasClass('next')) {
		// 		if(num < numberProjects) {
		// 			num = num + 1
		// 		} else {
		// 			num = 1
		// 		}
		// 	}
		// 	wrapper.attr('project', 'project-' + num);
		// })
	}



	// slider reviews
	function sliderReviews() {
		var controll = $('.about .reviews-wrapper .controls .controll'),
			lengthElem = $('.about .reviews-wrapper .item').length,
			reviewsWrapper = $('.about .reviews-wrapper .items');

		controll.on('click', function() {

			if(!reviewsWrapper.hasClass('waiting')) {
				var activeElement = $('.about .reviews-wrapper .item.active'),
					indexElem = $('.about .reviews-wrapper .item.active').index();

				// waiting
				reviewsWrapper.addClass('waiting');
				setTimeout(function() {
					reviewsWrapper.removeClass('waiting');
				}, 600*2)

				// prev
				if($(this).hasClass('prev')) {
					$('.about .reviews-wrapper .item').removeClass('active');
					setTimeout(function() {
						// check position
						if(indexElem >= 1) { // якщо не перший елемент
							activeElement.prev('.item').addClass('active');
						} else { // якщо перший
							$('.about .reviews-wrapper .item:last-child').addClass('active');
						}
					}, 600)
				}
				// next
				else {
					$('.about .reviews-wrapper .item').removeClass('active');
					setTimeout(function() {
						// ckeck position
						if(indexElem < lengthElem-1) { // якщо не останній елемент
							activeElement.next('.item').addClass('active');
						} else { // якщо останній елемент
							$('.about .reviews-wrapper .item:first-child').addClass('active');
						}
					}, 600)
				}
			}
		})
	}



	function scrollControll_home() {
		var controller = new ScrollMagic.Controller();

		var scene = new ScrollMagic.Scene({
			triggerElement: '.step-1'
		})
		.addIndicators({
			name: 'home'
		})
		.addTo(controller)
		scene.on('start', function (event) {
			$('.step-1').addClass('active');
		});
	}



	// scroll controll (projects)
	var position = $('.step-3'),
		stopPosition = $('.step-3').offset().top,
		lastScrollTop = 0,
		duration = 600 + 100;
	var wheel = null;
	function checkPosition() {
		if($(window).scrollTop() <= stopPosition-10) {
			position.attr('position', 'position-1');
		} else {
			position.attr('position', 'position-3');
			position.attr('step', 'content-3');
		}
	}
	function scrollControll_projects() {
		var step3 = $('.step-3');

		var controller = new ScrollMagic.Controller({
			globalSceneOptions: {
				triggerHook: 'onLeave'
			}
		});

		var scene = new ScrollMagic.Scene({
			triggerElement: '.step-3',
			duration: 200
		})
		.setPin('.step-3')
		.addIndicators({
			name: 'first'
		})
		.addTo(controller)

		scene.on('enter', function (event) {
			$(window).disableScroll();
			function handler(event, delta, deltaX, deltaY) {
				if (deltaY === -1) {
					if (position.attr('position') == 'position-1') {
						// change position
						position.attr('position', '');
						setTimeout(function() {
							position.attr('position', 'position-2');
						}, duration);
						// change content
						position.attr('step', 'content-2');
					}
					if (position.attr('position') == 'position-2') {
						// change position
						position.attr('position', '');
						setTimeout(function() {
							position.attr('position', 'position-3');
						}, duration);
						// change content
						position.attr('step', 'content-3');
					}
					if (position.attr('position') == 'position-3') {
						wheel.unwheel();
						$(window).enableScroll();
					}
				}
				if(deltaY === 1) {
					if (position.attr('position') == 'position-3') {
						// change position
						position.attr('position', '');
						setTimeout(function() {
							position.attr('position', 'position-2');
						}, duration);
						// change content
						position.attr('step', 'content-2');
					}
					if (position.attr('position') == 'position-2') {
						// change position
						position.attr('position', '');
						setTimeout(function() {
							position.attr('position', 'position-1');
						}, duration);
						// change content
						position.attr('step', '');
					}
					if (position.attr('position') == 'position-1') {
						wheel.unwheel();
						$(window).enableScroll();
					}
				}
				event.preventDefault();
			}
			wheel = Hamster(window).wheel(handler, false);
		});
		scene.on('leave', function(event) {
			console.log("Scene leaved.");
			$(window).enableScroll();
			wheel.unwheel();
		});
	}



	function scrollControll_contacts() {
		var controller = new ScrollMagic.Controller();

		var scene = new ScrollMagic.Scene({
			triggerElement: '.step-4'
		})
		// .addIndicators({
		// 	name: 'contacts'
		// })
		.addTo(controller)
		scene.on('start', function (event) {
			$('.step-4').addClass('active');
		});
	}










})();


























































	// function scrollControll() {

	// 	var stopPosition = $('.step-3').offset().top,
	// 		step3 = $('.step-3'),
	// 		scrollTop = $(window).scrollTop(),
	// 		lastScrollTop = 0,
	// 		position = $('.step-3'),
	// 		duration = 700 + 200;

	// 	// показати відео (для анімації)
	// 	$('.step-3 .video-wrapper').addClass('show-video');

	// 	// запустити функцію при оновленні сторінки
	// 	checkPosition();

	// 	// при скролі
	// 	$(window).scroll(function(event){
	// 		var st = $(this).scrollTop();
	// 		if (st > lastScrollTop){
	// 			console.log('down');
	// 			scrollTop = $(window).scrollTop();
	// 			checkPosition();
	// 		} else {
	// 			console.log('up');
	// 		}
	// 		lastScrollTop = st;
	// 	});

	// 	// чек позиції
	// 	function checkPosition() {
	// 		if(scrollTop >= stopPosition-10) {
	// 			// 
	// 			position.attr('position', 'position-1');
	// 			// блокувати скрол
	// 			position.addClass('disable-scroll');
	// 			// 
	// 			changeContent();
	// 		}
	// 	}

	// 	// 
	// 	function changeContent() {
	// 		var disableScroll = document.querySelector('.disable-scroll'),
	// 			index = 0;

	// 		function handler(event, delta, deltaX, deltaY) {
	// 			//console.log(event);

	// 			if (step3.hasClass('disable-scroll')) {
	// 				event.preventDefault();

	// 				// go down!
	// 				if(delta == '-1') {
	// 					if (position.attr('position') == 'position-1') {
	// 						// change position
	// 						position.attr('position', '');
	// 						setTimeout(function() {
	// 							position.attr('position', 'position-2');
	// 						}, duration);
	// 						// change content
	// 						position.attr('step', 'content-2');
	// 					}
	// 					if (position.attr('position') == 'position-2') {
	// 						// change position
	// 						position.attr('position', '');
	// 						setTimeout(function() {
	// 							position.attr('position', 'position-3');
	// 						}, duration);
	// 						// change content
	// 						position.attr('step', 'content-3');
	// 					}
	// 					if (position.attr('position') == 'position-3') {
	// 						step3.removeClass('disable-scroll')
	// 					}
	// 				}

	// 				// go up!
	// 				if(delta == '1') {
	// 					if (position.attr('position') == 'position-3') {
	// 						// change position
	// 						position.attr('position', '');
	// 						setTimeout(function() {
	// 							position.attr('position', 'position-2');
	// 						}, duration);
	// 						// change content
	// 						position.attr('step', 'content-2');
	// 					}
	// 					if (position.attr('position') == 'position-2') {
	// 						// change position
	// 						position.attr('position', '');
	// 						setTimeout(function() {
	// 							position.attr('position', 'position-1');
	// 						}, duration);
	// 						// change content
	// 						position.attr('step', '');
	// 					}
	// 					if (position.attr('position') == 'position-1') {
	// 						step3.removeClass('disable-scroll')
	// 					}
	// 				}
	// 			}
	// 		}
	// 		Hamster(disableScroll).wheel(handler,false);
	// 	}
	// }