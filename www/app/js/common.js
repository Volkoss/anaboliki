$(document).ready(function() {

	// console.log(' in common.js! ');
$('.main_slider_container').slick({
  dots: true,
  infinite: true,
  speed: 500,
  fade: true,
  cssEase: 'linear'
});

$('.course_slider_container, .rev_slider_container',).slick({
  dots: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  // autoplay: true,
  autoplaySpeed: 2000,
});

$('.manufactures_slider_container').slick({
  dots: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  // autoplay: true,
  autoplaySpeed: 2000,
});
	

})