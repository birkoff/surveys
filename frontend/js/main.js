/*jslint browser: true*/
/*global $, jQuery, alert*/

"use strict";

(function (root, $) {
// Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

   $(document).on("click", "#enviarEncuesta", function () {
		var data = $('form').serialize();
		var comentarios = $('#comentarios textarea').val();
		console.log(data);
		console.log(comentarios);
		var postData = {
			'resultados': data,
			'comentarios': comentarios
		}
		$.ajax({
			type: 'POST',
			url: 'https://h6qc6da0qa.execute-api.eu-central-1.amazonaws.com/dev/encuesta',
			headers: {'Accept': 'application/json', 'x-api-key': 'xxxxxxxxxxxx'},
			dataType: 'json',
			data: JSON.stringify(postData)
		}).done(function (data) {
			console.log("Post Encuesta: " + data);
			location.href="success.html"
		}).fail(function (error) {
			console.log(error.responseText);
		});
		return false;
	});
}(window, jQuery));