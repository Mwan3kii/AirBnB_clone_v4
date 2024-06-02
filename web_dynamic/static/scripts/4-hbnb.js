$(document).ready(function() {
  const amenities = {};
    $('.amenities').on('change', 'input[type="checkbox"]', function() {
      const amenityId = $(this).data('id');
      const amenityName = $(this).data('name');
      if ($(this).is(':checked')) {
        amenities[amenityId] = amenityName;
      } else {
        delete amenities[amenityId];
      }
      const amenitiesList = Object.values(amenities).join(', ');
      $('div.amenities h4').text('Amenities: ' + amenitiesList);
    });
});

$(document).ready(function() {
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
        $('#api_status').addClass('available');
    } else {
        $('#api_status').removeClass('available');
    }
  });
});

$(document).ready(function() {
  $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function(response) {
          response.forEach(function(place) {
              const article = $('<article>').append(
	          $('<div>').text(place.name),
		  $('<div>').text('$' + place.price_by_night),
		  $('<div>').text(place.max_guest + ' Guest' + (place.max_guest != 1 ? 's' : '')),
		  $('<div>').text(place.number_rooms + ' Bedroom' + (place.number_rooms != 1 ? 's' : '')),
		  $('<div>').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms != 1 ? 's' : '')),
		  $('<div>').text(place.description)
	  };
          $('.places').append(article);
      });
  });
});

$(document).ready(function() {
  $('#searchButton').click(function() {
      const checked = [];
      $('input[type="checkbox"]:checked').each(function() {
          amenitiesChecked.push($(this).data('id'));
      });
      $.ajax({
          type: 'POST',
	  url: 'http://0.0.0.0:5001/api/v1/places_search/',
	  contentType: 'application/json',
	  data: JSON.stringify({ amenities: amenitiesChecked }),
	  success: function(response) {
              $('.places').empty();
	      response.forEach(function(place) {
	           const article = $('<article>').append(
		       $('<div>').text(place.name),
		       $('<div>').text('$' + place.price_by_night),
		       $('<div>').text(place.max_guest + ' Guest' + (place.max_guest != 1 ? 's' : '')),
		       $('<div>').text(place.number_rooms + ' Bedroom' + (place.number_rooms != 1 ? 's' : '')),
		       $('<div>').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms != 1 ? 's' : '')),
			   $('<div>').text(place.description)
		   );
		   $('.places').append(article);
	      });
	  }
      });
  });
});
