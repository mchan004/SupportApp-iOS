(function($) {
	$(document).ready(function() {
		setWidgetReferralCookie();

		var errorMessages = {
				'EMAIL_ALREADY_USED'  : 'An account already exist with this email.',
				'TAWKID_ALREADY_USED' : 'Username is not available.',
				'INVALID_TAWKID'      : 'Invalid username.',
				'alphaNumericWithDot' : 'Only alpha numeric characters and dots',
				'INVALID_VALUE'       : 'Invalide value.',
				'UNABLE_TO_VALIDATE'  : 'Unable to validate.',
				'signupError'         : 'Unable to signup.',
				'signupSuccess'       : 'Successfully created profile.',
				'redirectMessage'     : 'Redirecting to Dashboard'
			};

		$.validator.addMethod("alphaNumericWithDot", function(value, element) {
			return this.optional(element) || /^[a-z0-9\.]+$/i.test(value);
		}, errorMessages.alphaNumericWithDot);

		$('#twk-email').blur(function() {
			var postObj  = {},
				elem     = $(this),
				id       = elem.attr('id'),
				loader   = $('#' + id + '-loader'),
				label    = $('#' + id + '-label');

			if(!$('#twk-signup-form').validate().element("#" + id)){
				return;
			}

			loader.show();

			postObj  = {
				action : 'tawk_check_email',
				email  : elem.val()
			};

			$.ajax({
				type     : 'POST',
				url      : tawk_ajax.ajax_url,
				data     : postObj,
				dataType : 'text',
				accept   : 'application/json',
				success  : function(data){
					loader.hide();
					data = $AjaxStripper(data);

					if (data.error && data.value === $.trim(elem.val())) {
						elem.addClass('error');
						elem.parent('.twk-input-container').addClass('error');
						label.html(errorMessages[data.error]).show();
					} else {
						elem.removeClass('error');
						elem.parent('.twk-input-container').removeClass('error');
						label.hide();
					}
				},
				error : function(){
					loader.hide();

					label.html(errorMessages.UNABLE_TO_VALIDATE);
					label.show();
				}
			});
		});

		$('#twk-signup-form').validate({
			highlight : function(element, errorClass){
				$(element).addClass(errorClass).parent('.twk-input-container').addClass(errorClass);
			},
			unhighlight : function(element, errorClass){
				$(element).removeClass(errorClass).parent('.twk-input-container').removeClass(errorClass);
			},
			submitHandler: function(){
				var widgetReferral = $.cookie('__widgetRef'),
					loader         = $('#twk-submit-loader'),
					submitBtn      = $('#twk-sumbit-btn'),
					affId          = $.cookie('affwp_ref'),
					signupData     = {
						action               : 'tawk_sign_up',
						name                 : $('#twk-name').val(),
						email                : $('#twk-email').val(),
						password             : $('#twk-password').val(),
						affid				 : affId,
						referrer             : '',
						widgetReferrer       : '',
						widgetReferrerPageId : ''
					};

				if(document.referrer){
					var referrer = parseUrl(document.referrer);
					if(referrer){
						signupData.referrer = referrer.hostname;
					}
				}

				if(typeof widgetReferral === 'string'){
					widgetReferral = widgetReferral.split(':');
					signupData.widgetReferrer = widgetReferral[0];
					signupData.widgetReferrerPageId = widgetReferral[1];
				}

				loader.css('visibility', 'visible');
				submitBtn.attr('disabled', 'disabled');

				$.ajax({
					type     : 'POST',
					url      : tawk_ajax.ajax_url,
					data     : signupData,
					dataType : 'text',
					accept   : 'application/json',
					success  : function(data){
						loader.css('visibility', 'hidden');
						data = $AjaxStripper(data);

						if (data.errors) {
							submitBtn.removeAttr('disabled');

							for(var fieldName in data.errors){
								var errorMessage = errorMessages[data.errors[fieldName]] || errorMessages.INVALID_VALUE;

								if($('#twk-' + fieldName).length){
									$('#twk-' + fieldName).addClass('error').parent('.twk-input-container').addClass('error');
									$('#twk-' + fieldName + '-label').html(errorMessage).show();
								}else{
									$('#twk-submit-message').html(errorMessage).show();
								}
							}
							return;
						}

						$('#twk-submit-message').addClass('twk-success').removeClass('twk-error').html(errorMessages.signupSuccess).show();
						submitBtn.val(errorMessages.redirectMessage);

						if (!!$.cookie('affwp_ref')) 
						{
							$.ajax({
								type: "POST",
								data: {
									action      : 'affwp_track_conversion',
									affiliate   : affId,
									amount      : '',
									status      : '',
									description : 'Sign Up',
									context     : '',
									reference   : '',
									campaign    : '',
									md5         : 'd67850bd126f070221dcfd5fa6317043'
								},
								url: affwp_scripts.ajaxurl,
								success: function (response) {
									if ( window.console && window.console.log ) {
										console.log( response );
									}
								}
							});
						}
						
						try{
							if(signupData.widgetReferrer){
								ga('send', 'event', 'Sign-up', 'Widget', signupData.widgetReferrer);
							}else{
								ga('send', 'event', 'Sign-up', 'Regular');
							}

							window.google_trackConversion({
								google_conversion_id       : 1058618238,
								google_conversion_language : "en",
								google_conversion_format   : "3",
								google_conversion_color    : "ffffff",
								google_conversion_label    : "e6YGCNTC-VoQ_vbk-AM",
								google_remarketing_only    : false
							});

							window._fbq = window._fbq || [];
							window._fbq.push(['track', '6023559006042', {'value':'0.00','currency':'USD'}]);
						}catch (e) {}

						setTimeout(function(){
							loginDashboard(signupData.email, signupData.password);
						}, 3000);

					},
					error : function(){
						loader.css('visibility', 'hidden');
						$('#twk-submit-message').html(errorMessages.signupError).show();
					}
				});
				return false;
			}
		});

	});

	function loginDashboard(email, password) {
		var form = $('<form></form>').html(
			'<input type="text" name="email" value="' + email + '"/>' +
			'<input type="text" name="password" value="' + password + '"/>' +
			'<input type="text" name="status" value="o"/>' +
			'<input type="text" name="rememberMe" value="yes"/>'
		).css('display', 'none').attr({
			method : 'POST',
			action : tawk_ajax.dashboard_login
		});

		$('body').append(form);
		form.submit();
	}

	function $AjaxStripper(data) {

		var start = data.indexOf('%%__START__%%'),
			padding = 13; // %%__START__%%.length

		if(start < 0) {
			return null;
		}

		data = data.substr(start + padding);

		if(data === '') {
			return null;
		}

		try {
			return JSON.parse(data);
		} catch (e) {
			return null;
		}
	}

	function setWidgetReferralCookie () {
		var queryString = document.location.search || '';

		if(queryString.indexOf('utm_source=visitor-widget') !== -1){
			var referrer = parseUrl(document.referrer);

			if(referrer && referrer.hostname){
				$.cookie('__widgetRef',  referrer.hostname + ':' + getWidgetReferralPageId(queryString), { expires: 365 });
			}
		}
	}

	function getWidgetReferralPageId (queryString) {
		var i, l;

		queryString = queryString.substr((queryString.length - 1) * -1).split('&');

		for(i = 0, l = queryString.length; i < l; i++){
			if(queryString[i].substr(0, 9) === 'utm_term='){
				return queryString[i].substr(9, queryString[i].length-9);
			}
		}

		return '';
	}

	function parseUrl( url ) {
		var a = document.createElement('a');
		a.href = url;
		return a;
	}

})(jQuery);
