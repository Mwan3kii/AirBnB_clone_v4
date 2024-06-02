$(document).ready(function() {
    const checkStates = {};
    const checkCities = {};
    $('input[type="checkbox"][data-name][data-id]').change(function() {
        const id = $(this).data('id');
	const name = $(this).data('name');
	const type = $(this).data('type');
	if ($(this).is(':checked')) {
	    if (type === 'state') {
	        checkedStates[id] = name;
	    } else if (type === 'city') {
	        checkedCities[id] = name;
	    }
	} else {
	    if (type === 'state') {
		delete checkedStates[id];
	    } else if (type === 'city') {
		delete checkedCities[id];
	    }
	}
	updateLocation();
    });
    function updateLocation() {
        const locations = [];
	 Object.values(checkedStates).forEach(function(stateName) {
	     locations.push(stateName);
	 });
	 Object.values(checkedCities).forEach(function(cityName) {
	     locations.push(cityName);
	 });
	 $('.Locations h4').text(locations.join(', '));
    }
    $('#searchButton').click(function() {
        const data = {
	    amenities: [],
	    cities: Object.keys(checkedCities),
	    states: Object.keys(checkedStates)
	};
	 $.ajax({
		 type: 'POST',
		 url: 'http://0.0.0.0:5001/api/v1/places_search/',
		 contentType: 'application/json',
		 data: JSON.stringify(data),
		 success: function(response) {
		 }
	 });
    });
});
