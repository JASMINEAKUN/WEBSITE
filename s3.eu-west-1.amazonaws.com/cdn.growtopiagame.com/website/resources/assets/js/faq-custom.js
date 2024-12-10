jQuery(document).ready(function($){
	$('.page-wrapper').on('click', '.faq-list .js-route', function(e){
		
//		return true;
		
		var slug = $(this).attr('data-slug');
		$.ajax({
			headers: {
	            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	        },
			type: "POST",
			url: base_url+"/faq/detail",
			data: { slug: slug  },
			success: function (data){
				$('.content').remove();
				$('.search-wrapper').after(data);
				window.history.pushState("leave", "Title",  base_url+"/faq/detail/"+slug );
			},
			error : function(data) {
				
				return false;
			}
		});
		return false;
	});
	
});	

jQuery(document).ready(function($){
	
	$('.page-wrapper').on('click', '.category-link, .all-questions', function(e){
		
//		return true;

		var slug = $(this).attr('data-slug');
		$.ajax({
			headers: {
	            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	        },
			type: "POST",
			url:  base_url+"/faq/category-detail",
			data: { slug: slug  },
			success: function (data){
				$('.content').remove();
				$('.search-wrapper').after(data);
				window.history.pushState("leave", "Title",  base_url+"/faq/category-detail/"+slug );
			},
			error : function(data) {
				
				return false;
			}
		});
		return false;
	});
	
});	

jQuery(document).ready(function($){
	
	var lastCall = true;
	$('.search-input').on('input', function(event){
		
		var query = $(this).val();
		if (query.length < 3 || !lastCall ) {
			return false;
		}

		$.ajax({
			headers: {
	            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	        },
			type: "POST",
			url:  base_url+"/faq/search",
			data: { query: query  },
			beforeSend: function( xhr ) {
				lastCall = false;
			},
			success: function (data){
				$('.content').remove();
				$('.search-wrapper').after(data);
				lastCall = true;
			},
			error : function(data) {
				lastCall = true;
				return false;
			}
		});
		return false;
	});
	$('.grow-button-popup-pay').on("click", function() {
        $('#grow-button-pay').trigger("click");
    });
	$('.grow-button-popup-go-pay').on("click", function() {
		$('.product-list-popup').trigger('click');
	})
});

$(window).on('popstate', function(e) {
	 var state = e.originalEvent.state;
	  if (state === "leave" || window.location.href == base_url+'/faq') {
	    location.reload(true);
	  }
	  
});

// register jQuery extension
jQuery.extend(jQuery.expr[':'], {
    focusable: function (el, index, selector) {
        return $(el).is('a, button, :input, [tabindex]');
    }
});

$(document).on('keypress', 'input,select,textarea', function (e) {
    if (e.which == 13 && $(this).attr('type') != 'submit') {
        e.preventDefault();
        // Get all focusable elements on the page
        var $canfocus = $(':focusable');
        var index = $canfocus.index(document.activeElement) + 1;
        if (index >= $canfocus.length) index = 0;
        $canfocus.eq(index).focus();
    }
});

$('document').ready(function(){
	if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
		$('.product-list').on('click', function() {
			let selectedPack = ($( this ).find('input').attr('id'));
			$('#'+selectedPack).prop("checked", true);
		});
		$('.payment-list').on('click', function() {
			let selectedPayment = ($( this ).find('input').attr('id'));
			$('#'+selectedPayment).prop("checked", true);
		});
	}
});
$(document).ready(function(){
    $("input[name='payment_method']").click(function(){
        var radioValue = $("input[name='payment_method']:checked").attr('id');
        if(radioValue == 'payment-1')
            $('#payment_option').show();
        else
            $('#payment_option').hide();
    });
});
