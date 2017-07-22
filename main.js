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

	slider.prototype.initAutoPlay = function() {
		var self = this;
		this.intervalId = setInterval(function(){
			self.showNewSlide(self.selectedSlide + 1);
		}, 5000);
	}

	slider.prototype.showNewSlide = function(index) {
		clearInterval(this.intervalId);
		if( index < 0 ) index = this.slidesNumber - 1;
		if( index > this.slidesNumber - 1 ) index = 0;
		this.prevSelectedSlide = this.selectedSlide;
		this.selectedSlide = index;

		for( var i = 0; i < this.slidesNumber; i++) {
			if( i < this.selectedSlide ) {
				this.slides[i].classList.add('move-left');
				this.slides[i].classList.remove('selected', 'visible');
				this.dots[i].classList.remove('selected');
			} else if( i == this.selectedSlide ) {
				this.slides[i].classList.add('selected');
				this.slides[i].classList.remove('move-left');
				this.dots[i].classList.add('selected');
			} else {
				this.slides[i].classList.remove('selected', 'move-left', 'visible');
				this.dots[i].classList.remove('selected');
			}
		}

		this.slides[this.prevSelectedSlide].classList.add('visible');
		
		if( !this.hover ) this.initAutoPlay();
	}

	function elementIndex(element) {
		var siblings = element.parentElement.children;
		for ( var i = 0; i < siblings.length; i++ ) {
			if( siblings[i] == element ) return i;
		}
		return -1;
	}

	var sliders = document.getElementsByClassName('full-width-slider');
	for( var i = 0; i < sliders.length; i++) {
		(function(i){
			new slider(sliders[i]);
		}(i));
	}
})();
