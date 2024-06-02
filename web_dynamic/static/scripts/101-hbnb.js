$(document).ready(function() {
    $('#toggleReviews').click(function() {
        const toggleText = $(this).text();
	if (toggleText === 'show') {
	    $.ajax({
	        type: 'GET',
		url: '/api/v1/reviews',
		success: function(response) {
		    $('.reviews').html(response);
		    $('#toggleReviews').text('hide');
		}
	    });
	} else {
	    $('.reviews').empty();
	    $('#toggleReviews').text('show');
	}
    });
});
