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
