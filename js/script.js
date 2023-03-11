const slider = tns({
	container: '.carousel__inner',
	items: 1,
	speed: 1000,
	slideBy: 'page',
	nav: false,
	navPosition: 'buttom',
	controls: false,
	responsive: {
		320: {
			nav: true
		},
		992: {
			nav: false
		}
	}
});

document.querySelector('.prev').addEventListener('click', function () {
	slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
	slider.goTo('next');
});

$(document).ready(function () {
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});
});

$(document).ready(function () {
	function toggleSlide(item) {
		$(item).each(function (i) {
			$(this).on('click', function (e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__li').eq(i).toggleClass('catalog-item__li_active');
			})
		});
	};

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__link_list');

	$('[data-modal=promo]').on('click', function () {
		$('.overlay, #consultation').fadeIn('slow');
	});

	$('.modal__close').on('click', function () {
		$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
	});

	$('.button__catalog').each(function (i) {
		$(this).on('click', function () {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		})
	});

	$('.button__submit').on('click', function () {
		$('.overlay, #thank').fadeIn('slow');
	});

	function valideForms(form) {
		$(form).validate({
			rules: {
				name: 'required',
				phone: 'required',
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: 'Пожалуйста введите свое имя',
				phone: 'Пожалуйста введите свой номер телефона',
				email: {
					required: 'Пожалуйста, введите адрес электронной почты',
					email: 'Пожалуйста, введите реальный адрес электронной почты'
				}
			}
		});
	};

	valideForms('#consul-form');
	valideForms('#consultation form');
	valideForms('#order form');

	$('input[name=phone]').mask("+7 (999) 999 99 99");

	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "http://localhost:8888/Pulse/mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');
			$('form').trigger('reset');
		});
		return false;
	});

	$(window).scroll(function() {
		if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	new WOW().init();
});
