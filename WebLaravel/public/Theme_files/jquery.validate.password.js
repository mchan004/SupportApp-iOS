/*
 * jQuery validate.password plug-in 1.0
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validate.password/
 *
 * Copyright (c) 2009 Jörn Zaefferer
 *
 * $Id$
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
;(function($) {

	var	LOWER       = /[a-z]/,
		UPPER       = /[A-Z]/,
		DIGIT       = /[0-9]/,
		DIGITS      = /[0-9].*[0-9]/,
		SPECIAL     = /[^a-zA-Z0-9]/,
		SAME        = /^(.)\1+$/,
		TOO_OBVIOUS = [
			"112233",
			"121212",
			"123123",
			"123456",
			"1234567",
			"12345678",
			"131313",
			"232323",
			"654321",
			"696969",
			"8675309",
			"987654",
			"abc123",
			"abc123",
			"abcdef",
			"abgrtyu",
			"access",
			"access14",
			"action",
			"albert",
			"alexis",
			"amanda",
			"amateur",
			"andrea",
			"andrew",
			"angela",
			"angels",
			"animal",
			"anthony",
			"apollo",
			"apples",
			"arsenal",
			"arthur",
			"asdfgh",
			"asdfgh",
			"ashley",
			"august",
			"austin",
			"badboy",
			"bailey",
			"banana",
			"barney",
			"baseball",
			"batman",
			"beaver",
			"beavis",
			"bigdaddy",
			"bigdog",
			"birdie",
			"bitches",
			"biteme",
			"blazer",
			"blonde",
			"blondes",
			"bond007",
			"bonnie",
			"booboo",
			"booger",
			"boomer",
			"boston",
			"brandon",
			"brandy",
			"braves",
			"brazil",
			"bronco",
			"broncos",
			"bulldog",
			"buster",
			"butter",
			"butthead",
			"calvin",
			"camaro",
			"cameron",
			"canada",
			"captain",
			"carlos",
			"carter",
			"casper",
			"charles",
			"charlie",
			"cheese",
			"chelsea",
			"chester",
			"chicago",
			"chicken",
			"cocacola",
			"coffee",
			"college",
			"compaq",
			"computer",
			"cookie",
			"cooper",
			"corvette",
			"cowboy",
			"cowboys",
			"crystal",
			"dakota",
			"dallas",
			"daniel",
			"danielle",
			"debbie",
			"dennis",
			"diablo",
			"diamond",
			"doctor",
			"doggie",
			"dolphin",
			"dolphins",
			"donald",
			"dragon",
			"dreams",
			"driver",
			"eagle1",
			"eagles",
			"edward",
			"einstein",
			"erotic",
			"extreme",
			"falcon",
			"fender",
			"ferrari",
			"firebird",
			"fishing",
			"florida",
			"flower",
			"flyers",
			"football",
			"forever",
			"freddy",
			"freedom",
			"gandalf",
			"gateway",
			"gators",
			"gemini",
			"george",
			"giants",
			"ginger",
			"golden",
			"golfer",
			"gordon",
			"gregory",
			"guitar",
			"gunner",
			"hammer",
			"hannah",
			"hardcore",
			"harley",
			"heather",
			"helpme",
			"hockey",
			"hooters",
			"horney",
			"hotdog",
			"hunter",
			"hunting",
			"iceman",
			"iloveyou",
			"internet",
			"iwantu",
			"jackie",
			"jackson",
			"jaguar",
			"jasmine",
			"jasper",
			"jennifer",
			"jeremy",
			"jessica",
			"johnny",
			"johnson",
			"jordan",
			"joseph",
			"joshua",
			"junior",
			"justin",
			"killer",
			"knight",
			"ladies",
			"lakers",
			"lauren",
			"leather",
			"legend",
			"letmein",
			"little",
			"london",
			"lovers",
			"maddog",
			"madison",
			"maggie",
			"magnum",
			"marine",
			"marlboro",
			"martin",
			"marvin",
			"master",
			"matrix",
			"matthew",
			"maverick",
			"maxwell",
			"melissa",
			"member",
			"mercedes",
			"merlin",
			"michael",
			"michelle",
			"mickey",
			"midnight",
			"miller",
			"mistress",
			"monica",
			"monkey",
			"monkey",
			"monster",
			"morgan",
			"mother",
			"mountain",
			"muffin",
			"murphy",
			"mustang",
			"naked",
			"nascar",
			"nathan",
			"naughty",
			"ncc1701",
			"newyork",
			"nicholas",
			"nicole",
			"nipple",
			"nipples",
			"oliver",
			"orange",
			"packers",
			"panther",
			"panties",
			"parker",
			"pass",
			"pass123",
			"password",
			"password",
			"password1",
			"password12",
			"password123",
			"patrick",
			"peaches",
			"peanut",
			"pepper",
			"phantom",
			"phoenix",
			"player",
			"please",
			"pookie",
			"porsche",
			"prince",
			"princess",
			"private",
			"purple",
			"pussies",
			"qazwsx",
			"qwerty",
			"qwertyui",
			"rabbit",
			"rachel",
			"racing",
			"raiders",
			"rainbow",
			"ranger",
			"rangers",
			"rebecca",
			"redskins",
			"redsox",
			"redwings",
			"richard",
			"robert",
			"rocket",
			"rosebud",
			"runner",
			"rush2112",
			"russia",
			"samantha",
			"sammy",
			"samson",
			"sandra",
			"saturn",
			"scooby",
			"scooter",
			"scorpio",
			"scorpion",
			"secret",
			"sexsex",
			"shadow",
			"shannon",
			"shaved",
			"sierra",
			"silver",
			"skippy",
			"slayer",
			"smokey",
			"snoopy",
			"soccer",
			"sophie",
			"spanky",
			"sparky",
			"spider",
			"squirt",
			"srinivas",
			"startrek",
			"starwars",
			"steelers",
			"steven",
			"sticky",
			"stupid",
			"success",
			"summer",
			"sunshine",
			"superman",
			"surfer",
			"swimming",
			"sydney",
			"tawkto",
			"taylor",
			"tennis",
			"teresa",
			"tester",
			"testing",
			"theman",
			"thomas",
			"thunder",
			"thx1138",
			"tiffany",
			"tigers",
			"tigger",
			"tomcat",
			"topgun",
			"toyota",
			"travis",
			"trouble",
			"trustno1",
			"tucker",
			"turtle",
			"twitter",
			"united",
			"vagina",
			"victor",
			"victoria",
			"viking",
			"voodoo",
			"voyager",
			"walter",
			"warrior",
			"welcome",
			"whatever",
			"william",
			"willie",
			"wilson",
			"winner",
			"winston",
			"winter",
			"wizard",
			"xavier",
			"yamaha",
			"yankee",
			"yankees",
			"yellow",
			"zxcvbn",
			"zxcvbnm"
		];

	function rating(rate, message) {
		return {
			rate: rate,
			messageKey: message
		};
	}

	function uncapitalize(str) {
		return str.substring(0, 1).toLowerCase() + str.substring(1);
	}

	$.validator.passwordRating = function(password, tawkId, userName, emailAddress) {
		if (!password || password.length < 6){
			return rating(0, "too-short");
		}

		if (tawkId && password.toLowerCase().match(tawkId.toLowerCase())){
			return rating(0, "similar-to-tawkId");
		}

		if (userName && password.toLowerCase().match(userName.toLowerCase())){
			return rating(0, "similar-to-name");
		}


		if (emailAddress){
			if(password.toLowerCase().match(emailAddress.toLowerCase())){
				return rating(0, "similar-to-email");
			}

			emailAddress = emailAddress.split('@');

			if(emailAddress.length >= 2){
				emailAddress.pop();
			}

			emailAddress = emailAddress.join('@');

			if(password.toLowerCase().match(emailAddress.toLowerCase())){
				return rating(0, "similar-to-email");
			}
		}

		if (SAME.test(password)){
			return rating(1, "very-weak");
		}

		for(var i = 0; i < TOO_OBVIOUS.length; i++){
			if (TOO_OBVIOUS[i] === password.toLowerCase()){
				return rating(1, "obvious");
			}
		}

		var	lower   = LOWER.test(password),
			upper   = UPPER.test(uncapitalize(password)),
			digit   = DIGIT.test(password),
			digits  = DIGITS.test(password),
			special = SPECIAL.test(password);

		if (lower && upper && digit || special){
			return rating(4, "strong");
		}

		if ((lower && upper || lower && digits || upper && digits) && password.length >= 10) {
			return rating(3, "good");
		}

		return rating(2, "weak");
	};

	$.validator.passwordRating.messages = {
		"obvious"             : "Too obvious",
		"similar-to-tawkId"   : "Too similar to tawkId",
		"similar-to-name"     : "Too similar to name",
		"similar-to-email"    : "Too similar to email",
		"too-short"           : "Too short",
		"very-weak"           : "Too weak",
		"weak"                : "Weak",
		"good"                : "Good",
		"strong"              : "Strong"
	};

	$.validator.addMethod("passwordStrength", function(value, element) {
		// use untrimmed value
		var password     = element.value,
			tawkId       = $('#twk-id', element.form),
			name         = $('#twk-name', element.form),
			emailAddress = $('#twk-email', element.form);

		var rating = $.validator.passwordRating(password, tawkId.val(), name.val(), emailAddress.val());
		// update message for this field

		var meter = $(".twk-password-meter", element.form);

		meter.find(".twk-password-meter-bar").removeClass().addClass("twk-password-meter-bar").addClass("twk-password-meter-" + rating.messageKey);

		if(rating.rate > 1){
			$(".twk-password-meter-message", element.form)
			.removeClass()
			.addClass("twk-password-meter-message")
			.addClass("twk-password-meter-message-" + rating.messageKey)
			.text($.validator.passwordRating.messages[rating.messageKey]);
		}else{
			$(".twk-password-meter-message", element.form).text('');
		}

		// display process bar instead of error message
		$.validator.messages.passwordStrength = $.validator.passwordRating.messages[rating.messageKey];
		return rating.rate > 1;
	});
	// manually add class rule, to make username param optional
	$.validator.classRuleSettings.passwordStrength = { passwordStrength: true };

})(jQuery);