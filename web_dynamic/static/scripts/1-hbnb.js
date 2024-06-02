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
