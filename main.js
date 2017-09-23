
(function(){
	//define a slider object
	function slider(element) {
		this.element = element;
		this.slides = this.element.querySelector('.slides').getElementsByTagName('li');
		this.slidesNumber = this.slides.length;
		this.arrowsNavigation = this.element.querySelector('.slider-navigation');
		this.dotsNavigation = this.element.querySelector('.slider-dots-navigation');
		this.dots = this.dotsNavigation.getElementsByTagName('a');

		this.selectedSlide = 0;
		this.prevSelectedSlide = 0;
		this.intervalId;
		//check if mouse is over the slide element
		this.hovered = false;

		this.bindEvents();
		this.initAutoPlay();
	}

	slider.prototype.bindEvents = function() {
		var self = this;
		//detect click on arrows
		this.arrowsNavigation.addEventListener('click', function(event){
			if( event.target.tagName.toLowerCase() == 'a' ) {
				event.preventDefault();
				//determine new slide index
				var newSlideIndex = ( event.target.classList.contains('next') )
					? self.selectedSlide + 1
					: self.selectedSlide - 1;

				self.showNewSlide(newSlideIndex);
			}
		});
		//detect click on dots navigation
		this.dotsNavigation.addEventListener('click', function(event){
			if( event.target.tagName.toLowerCase() == 'a' ) {
				event.preventDefault();
				//determine new slide index
				var newSlideIndex = elementIndex(event.target.parentElement);
				self.showNewSlide(newSlideIndex);
			}
		});
		//stop autoplay while hovering over the slider
		this.element.addEventListener('mouseenter', function(){
			self.hover = true;
			clearInterval(self.intervalId);
		});
		//initialize autoplay when leaving the slider
		this.element.addEventListener('mouseleave', function(){
			self.hover = false;
			self.initAutoPlay();
		});
	}

	

	$(function() {
	$('#carousel-zw').carouFredSel({
		auto: false,
		items: {
			visible: 1,
			start: 1
		}
	});
	$('#carousel-txt').carouFredSel({
		auto: false,
		items: 1,
		scroll: {
			fx: 'fade',
			duration: 2000
		}
	});
	$('#carousel-fc').carouFredSel({
		synchronise: [ ['#carousel-zw'], ['#carousel-txt', false] ],
		items: 1,
		scroll: {
			duration: 1000,
			timeoutDuration: 3000
		},
		prev: '#prev',
		next: '#next'
	});
});
