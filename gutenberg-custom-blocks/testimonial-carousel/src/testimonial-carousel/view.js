document.addEventListener('DOMContentLoaded', function() {
	const carousels = document.querySelectorAll('.testimonial-carousel');
	
	carousels.forEach(carousel => {
		let currentSlide = 0;
		const slides = carousel.querySelectorAll('.testimonial-slide');
		const dots = carousel.querySelectorAll('.dot');
		const prevBtn = carousel.querySelector('.carousel-prev');
		const nextBtn = carousel.querySelector('.carousel-next');
		
		function showSlide(index) {
			slides.forEach((slide, i) => {
				slide.style.display = i === index ? 'block' : 'none';
				slide.classList.toggle('active', i === index);
			});
			
			dots.forEach((dot, i) => {
				dot.style.backgroundColor = i === index ? '#0073aa' : '#ccc';
				dot.classList.toggle('active', i === index);
			});
			
			currentSlide = index;
		}
		
		function nextSlide() {
			const next = (currentSlide + 1) % slides.length;
			showSlide(next);
		}
		
		function prevSlide() {
			const prev = (currentSlide - 1 + slides.length) % slides.length;
			showSlide(prev);
		}
		
		if (nextBtn) {
			nextBtn.addEventListener('click', nextSlide);
		}
		
		if (prevBtn) {
			prevBtn.addEventListener('click', prevSlide);
		}
		
		dots.forEach((dot, index) => {
			dot.addEventListener('click', () => showSlide(index));
		});
		
		// Auto-advance every 5 seconds
		if (slides.length > 1) {
			setInterval(nextSlide, 5000);
		}
	});
});
