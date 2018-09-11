;$(function() {

	// toogle filter start
	$('.btn-filter').on('click', function() {
		$('.wrap-filter-items').stop().slideToggle(300);
	});
	// toogle filter end

	// раздавать class .active в фильтре START
	$("#filter").on('click','a',function(){
		$("#filter a.active").removeClass("active"); 
		$(this).addClass("active"); 
	});
	// раздавать class .active в фильтре END

	// pjax container START
	// на маленьких экранах не нужно чтоб работало, потому что фильтр остается открытым
	if ($(window).width() > 991) {
		$(document).pjax('#filter a, #item-product-pjax a', '#pjax-container', {fragment: '#pjax-container'});
	}
	// pjax container END

	// SIMPLE CART START
	// fly product animate to cart START
	function flyToElement(flyer, flyingTo) {
		var $func = $(this);
		var divider = 10;
		var flyerClone = $(flyer).clone();
		$(flyerClone).css({position: 'absolute', top: $(flyer).offset().top + "px", left: $(flyer).offset().left + "px", opacity: 1, 'z-index': 1000});
		$('body').append($(flyerClone));
		var gotoX = $(flyingTo).offset().left + ($(flyingTo).width() / 2) - ($(flyer).width()/divider)/2;
		var gotoY = $(flyingTo).offset().top + ($(flyingTo).height() / 2) - ($(flyer).height()/divider)/2;

		$(flyerClone).animate({
			opacity: 0.1,
			left: gotoX,
			top: gotoY,
			width: $(flyer).width()/divider,
			height: $(flyer).height()/divider
		}, 300,
		function () {
			$(flyingTo).fadeOut('fast', function () {
				$(flyingTo).fadeIn('fast', function () {
					$(flyerClone).fadeOut('fast', function () {
						$(flyerClone).remove();
					});
				});
			});
		});
	}

	$('.btn-available').on('click',function(){
		//Select item image and pass to the function
		var itemImg = $(this).parent().find('img').eq(0);
		flyToElement($(itemImg), $('.cart'));
	});
	// Fly product animate to cart END

	$('.cart-btn-clear').on( "click", function() {
		$.magnificPopup.close();
	});
	// SIMPLE CART END

// защита от копирования, добавлении ссылки в конце START
// document.oncopy = function () {
// 	var bodyElement = document.body; 
// 	var selection = getSelection(); 
// 	var href = document.location.href; 
// 			var textLink = 'snus-kz.com'; //слово которое хочу вставить в ссылку
// 			var copyright = '<a title="snustop-kz.com" href="'+ href +'">' + textLink + '</a>'; 
// 			var text = selection + copyright;
// 			var divElement = document.createElement('div'); 
// 			divElement.style.position = 'absolute'; 
// 			divElement.style.left = '-99999px'; 
// 			text1 = document.createTextNode(text); //создал текстовый узел
// 			divElement.appendChild(text1); //и добавил его
// 			bodyElement.appendChild(divElement); 
// 			selection.selectAllChildren(divElement); 
// 			setTimeout(function(){
// 				bodyElement.removeChild(divElement); 
// 			}, 0);
// 		};
		// защита от копирования, добавлении ссылки в конце END

		$('.popup-with-move-anim').magnificPopup({
			type: 'inline',
			fixedContentPos: false,
			fixedBgPos: true,
			overflowY: 'auto',
			closeBtnInside: true,
			preloader: false,
			midClick: true,
			removalDelay: 300,
			mainClass: 'my-mfp-slide-bottom'
		});

		// заявка с сайта START
		var formMail = $('#contact-form');

		function updateForm()  {
			simpleCart.ready(function() {
				$('.del').remove();
				simpleCart.each(function(item, x) {
					formMail.append('<input class="del" type="hidden" name="' + item.get('id') + ' Название" value="' + item.get('name') + '">');
					formMail.append('<input class="del" type="hidden" name="' + item.get('id') + ' Количество" value="' + item.get('quantity') + '">');
					formMail.append('<input class="del" type="hidden" name="' + item.get('id') + ' Цена за еденицу" value="' + item.get('price') + '">');
					formMail.append('<input class="del" type="hidden" name="' + item.get('id') + ' Общая стоимость" value="' + item.get('total') + '">');
				});
			});
		}
		updateForm();

		simpleCart.bind( 'update' , function(){
			updateForm();
		});


		formMail.submit(function(event) {
			event.preventDefault();

			var cartTotalForm = $('#form-total').text();

			$.ajax({
				url: "//formspree.io/12BDC21@gmail.com", 
				method: "POST",
				data: formMail.serialize() + "&Итого= " + cartTotalForm,
				dataType: "json"
			}).done(function(){
				$("#phone").val("");
				$("#message").val("");
				simpleCart.empty();
				$("#checkout").html('<div class="text-center"><h1>Спасибо за заказ</h1><p>Ожидайте, мы с Вами свяжемся в течении 2-х часов. Либо свяжитесь с нами <a href="tel:+77087752231" title="Позвонить">+7 708 775 2231</a></p><p><a href="/">Перейти на главную</a></p></div>');
			}).fail(function(){
				alert("Ошибка");
			});
		});
		// заявка с сайта END

	});
