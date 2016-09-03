(function() {

	// var -------------------------------------------------------------------------------------------- //
	var _body = $('body');



	// start! ----------------------------------------------------------------------------------------- //
	window.addEventListener && window.addEventListener('DOMContentLoaded', function(){
		document.body.className += ' dom-loaded';

		$('.blog .items-wrapper').masonry({
			columnWidth: '.item'
		});

		var wow = new WOW(
		{
			boxClass:     'wow',
			animateClass: 'animated',
			offset:       -400,
			mobile:       true,
			live:         true,
			scrollContainer: null
		});
		wow.init();

		// my functions
		routes();
		openMenu();
		sliderReviews();
		sliderHome();
		sliderPortfolio();
		openDetails();
		changeContent();

		// if(_body.hasClass('home-page')) {
		// 	scrollControll_home();
		// 	scrollControll_projects();
		// 	scrollControll_contacts();
		// 	checkPosition();
		// }

		// $.fn.disableScroll = function() {
		// 	window.oldScrollPos = $(window).scrollTop();
		// 	$(window).on('scroll.scrolldisabler',function ( event ) {
		// 		$(window).scrollTop( window.oldScrollPos );
		// 		event.preventDefault();
		// 	});
		// };
		// $.fn.enableScroll = function() {
		// 	$(window).off('scroll.scrolldisabler');
		// };
	});

	// show site -------------------------------------------------------------------------------------- //
	window.addEventListener && window.addEventListener('load', function(){
		document.body.className += ' loaded';
		$('.step-3 .video-wrapper').addClass('show-video');

		// my functions
		magellan();
		//activeMagellan();
		
		// home page
		var videoHome1 = document.getElementById('video-home-1');
		var videoHome2 = document.getElementById('video-home-2');
		var videoHome3 = document.getElementById('video-home-3');
		videoHome1.play();
		videoHome2.play();
		videoHome3.play();

	});




	// routes
	function routes() {

		var scroll = null,
			page = $('.slider-wrapper'),
			name = $('.slider-wrapper'),
			duration = 1000;

		scroll = Hamster(window).wheel(handler, false);
		function handler(event, delta, deltaX, deltaY) {

			// check if 1
			if(name.attr('name') == 'page-1') {
				// go
				if (deltaY === -1) {
					name.attr('direction', 'next');
					page.attr('page', 'page-2');
					setTimeout(function() {
						name.attr('name', 'page-2');
					}, duration);
					clrarPosition();
				}
			}

			// check if 2
			if(name.attr('name') == 'page-2') {
				// go
				if (deltaY === -1) {
					name.attr('direction', 'next');
					page.attr('page', 'page-3');
					setTimeout(function() {
						name.attr('name', 'page-3');
					}, duration);
					clrarPosition();
				}
				// back
				if (deltaY === 1) {
					name.attr('direction', 'preview');
					page.attr('page', 'page-1');
					setTimeout(function() {
						name.attr('name', 'page-1');
					}, duration);
					clrarPosition();
				}
			}

			// check if 3
			if(name.attr('name') == 'page-3') {
				// go
				if (deltaY === -1) {
					name.attr('direction', 'next');
					page.attr('page', 'page-4');
					setTimeout(function() {
						name.attr('name', 'page-4');
					}, duration);
					clrarPosition();
				}
				// back
				if (deltaY === 1) {
					name.attr('direction', 'preview');
					page.attr('page', 'page-2');
					setTimeout(function() {
						name.attr('name', 'page-2');
					}, duration);
					clrarPosition();
				}
			}

			// check if 4
			if(name.attr('name') == 'page-4') {
				// go
				if (deltaY === -1) {
					name.attr('direction', 'next');
					page.attr('page', 'page-5');
					setTimeout(function() {
						name.attr('name', 'page-5');
					}, duration);
					clrarPosition();
				}
				// back
				if (deltaY === 1) {
					name.attr('direction', 'preview');
					page.attr('page', 'page-3');
					setTimeout(function() {
						name.attr('name', 'page-3');
					}, duration);
					clrarPosition();
				}
			}

			// check if 5
			if(name.attr('name') == 'page-5') {
				// go
				if (deltaY === -1) {
					name.attr('direction', 'next');
					page.attr('page', 'page-6');
					setTimeout(function() {
						name.attr('name', 'page-6');
					}, duration);
					clrarPosition();
				}
				// back
				if (deltaY === 1) {
					name.attr('direction', 'preview');
					page.attr('page', 'page-4');
					setTimeout(function() {
						name.attr('name', 'page-4');
					}, duration);
					clrarPosition();
				}
			}

			// check if 6
			if(name.attr('name') == 'page-6') {
				// back
				if (deltaY === 1) {
					name.attr('direction', 'next');
					page.attr('page', 'page-5');
					setTimeout(function() {
						name.attr('name', 'page-5');
					}, duration);
					clrarPosition();
				}
			}
			

			// add function
			function clrarPosition() {
				//if(page.attr('page') == 'page-1' || page.attr('page') == 'page-4')
				page.attr('name', '');
			}
		}
	}



	// open menu
	function openMenu() {
		$('.menu-button').on('click', function() {
			_body.toggleClass('open-menu');
		})
	}



	// open details (step 2)
	function openDetails() {
		$('.step-2 .visualization .more').on('click', function() {
			$('.step-2 .container').addClass('open-details');
		})
	}
	function changeContent() {
		var button = $('.step-2 .buttons-wrapper .home-button .load');
		button.on('click', function() {

			// active button
			button.removeClass('active');
			$(this).addClass('active');

			// load new content
			var link = $(this).attr('load-page'),
				content = $('.step-2 .wrapper-details .content');
			$.ajax({
				url: link,
				cache: false,
				type: "POST",
				success: function(response){
					content.html(response);
				}
			});
			return false;
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




	// PORTFOLIO PAGE ---------------------------------------------------- //

	// slider portfolio
	function sliderPortfolio() {
		var controll = $('.portfolio .project-wrapper .controls .controll'),
			lengthElem = $('.portfolio .project-wrapper .projects .project').length,
			reviewsWrapper = $('.portfolio .project-wrapper .projects');

		controll.on('click', function() {

			if(!reviewsWrapper.hasClass('waiting')) {
				var activeElement = $('.portfolio .project-wrapper .projects .project.active'),
					indexElem = $('.portfolio .project-wrapper .projects .project.active').index();

				// waiting
				reviewsWrapper.addClass('waiting');
				setTimeout(function() {
					reviewsWrapper.removeClass('waiting');
				}, 600*2)

				// prev
				if($(this).hasClass('prev')) {
					$('.portfolio .project-wrapper .projects .project').removeClass('active');
					setTimeout(function() {
						// check position
						if(indexElem >= 1) { // якщо не перший елемент
							activeElement.prev('.project').addClass('active');
						} else { // якщо перший
							$('.portfolio .project-wrapper .projects .project:last-child').addClass('active');
						}
						activeMagellan()
					}, 600)
				}
				// next
				else {
					$('.portfolio .project-wrapper .projects .project').removeClass('active');
					setTimeout(function() {
						// ckeck position
						if(indexElem < lengthElem-1) { // якщо не останній елемент
							activeElement.next('.project').addClass('active');
						} else { // якщо останній елемент
							$('.portfolio .project-wrapper .projects .project:first-child').addClass('active');
						}
						activeMagellan()
					}, 600)
				}
			}
		})
	}

	// create magelan portfolio
	function magellan() {

		// create magellan
		var projects = $('.portfolio .project-wrapper .projects .project'),
			magellan = $('.portfolio .magellan .wrapper'),
			reviewsWrapper = $('.portfolio .project-wrapper .projects');

		projects.each(function() {
			var name = $(this).find('.title-step h2').text(),
				dataProject = $(this).attr('data-project');
			magellan.append('<span data-project="' + dataProject + '">' + name + '</span>')
		});

		// after click
		var button = $('.magellan .wrapper span');
		button.on('click', function() {
			var dataAttr = $(this).attr('data-project');

			if(!reviewsWrapper.hasClass('waiting')) {
				// waiting
				reviewsWrapper.addClass('waiting');
				setTimeout(function() {
					reviewsWrapper.removeClass('waiting');
				}, 600*2)

				// add class
				projects.removeClass('active');
				setTimeout(function() {
					$('.portfolio .project-wrapper .projects .project[data-project="' + dataAttr + '"]').addClass('active');
					activeMagellan()
				}, 600)
			}
		})
	}













































































	// active magellan
	// function activeMagellan() {
	// 	var projectPosition = $('.portfolio .project-wrapper .projects .project.active').attr('data-project');
	// 	$('.portfolio .magellan .wrapper span').removeClass('active');
	// 	$('.portfolio .magellan .wrapper span[data-project="' + projectPosition + '"]').addClass('active');
	// }



	// 
	// var popo = null;
	// function scrollControll_home() {
	// 	var position = $('.step-1');
	// 	var controller = new ScrollMagic.Controller();

	// 	var scene = new ScrollMagic.Scene({
	// 		triggerElement: '.step-1'
	// 	})
	// 	.addIndicators({
	// 		name: 'home'
	// 	})
	// 	.addTo(controller)
	// 	scene.on('enter', function (event) {
	// 		$(window).disableScroll();
	// 		function handler(event, delta, deltaX, deltaY) {
	// 			if (deltaY === -1) {
	// 				position.attr('position', 'position-2');
	// 				// 
	// 				setTimeout(function() {
	// 					popo.unwheel();
	// 					$(window).enableScroll();
	// 				}, 1000)
	// 			}
	// 		}
	// 		popo = Hamster(window).wheel(handler, false);
	// 	})
	// }



	// scroll controll (projects)
	// var position = $('.step-3'),
	// 	stopPosition = $('.step-3').offset().top,
	// 	lastScrollTop = 0,
	// 	duration = 600 + 100;
	// var wheel = null;
	// function checkPosition() {
	// 	if($(window).scrollTop() <= stopPosition-10) {
	// 		position.attr('position', 'position-1');
	// 	} else {
	// 		position.attr('position', 'position-3');
	// 		position.attr('step', 'content-3');
	// 	}
	// }
	// function scrollControll_projects() {
	// 	var step3 = $('.step-3');

	// 	var controller = new ScrollMagic.Controller({
	// 		globalSceneOptions: {
	// 			triggerHook: 'onLeave'
	// 		}
	// 	});

	// 	var scene = new ScrollMagic.Scene({
	// 		triggerElement: '.step-3',
	// 		duration: 200
	// 	})
	// 	.setPin('.step-3')
	// 	// .addIndicators({
	// 	// 	name: 'first'
	// 	// })
	// 	.addTo(controller)

	// 	scene.on('enter', function (event) {
	// 		$(window).disableScroll();
	// 		function handler(event, delta, deltaX, deltaY) {
	// 			if (deltaY === -1) {
	// 				if (position.attr('position') == 'position-1') {
	// 					// change position
	// 					position.attr('position', '');
	// 					setTimeout(function() {
	// 						position.attr('position', 'position-2');
	// 					}, duration);
	// 					// change content
	// 					position.attr('step', 'content-2');
	// 				}
	// 				if (position.attr('position') == 'position-2') {
	// 					// change position
	// 					position.attr('position', '');
	// 					setTimeout(function() {
	// 						position.attr('position', 'position-3');
	// 					}, duration);
	// 					// change content
	// 					position.attr('step', 'content-3');
	// 				}
	// 				if (position.attr('position') == 'position-3') {
	// 					wheel.unwheel();
	// 					$(window).enableScroll();
	// 				}
	// 			}
	// 			if(deltaY === 1) {
	// 				if (position.attr('position') == 'position-3') {
	// 					// change position
	// 					position.attr('position', '');
	// 					setTimeout(function() {
	// 						position.attr('position', 'position-2');
	// 					}, duration);
	// 					// change content
	// 					position.attr('step', 'content-2');
	// 				}
	// 				if (position.attr('position') == 'position-2') {
	// 					// change position
	// 					position.attr('position', '');
	// 					setTimeout(function() {
	// 						position.attr('position', 'position-1');
	// 					}, duration);
	// 					// change content
	// 					position.attr('step', '');
	// 				}
	// 				if (position.attr('position') == 'position-1') {
	// 					wheel.unwheel();
	// 					$(window).enableScroll();
	// 				}
	// 			}
	// 			event.preventDefault();
	// 		}
	// 		wheel = Hamster(window).wheel(handler, false);
	// 	});
	// 	scene.on('leave', function(event) {
	// 		//console.log("Scene leaved.");
	// 		$(window).enableScroll();
	// 		wheel.unwheel();
	// 	});
	// }



	// function scrollControll_contacts() {
	// 	var controller = new ScrollMagic.Controller();

	// 	var scene = new ScrollMagic.Scene({
	// 		triggerElement: '.step-4'
	// 	})
	// 	// .addIndicators({
	// 	// 	name: 'contacts'
	// 	// })
	// 	.addTo(controller)
	// 	scene.on('start', function (event) {
	// 		$('.step-4').addClass('active');
	// 	});
	// }










})();


