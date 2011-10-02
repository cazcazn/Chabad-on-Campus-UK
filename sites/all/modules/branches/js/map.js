(function($) {

  $(document).ready(function() {
    var allowHover = true;

    // Create the latitude and longitude of UK
    var latLng = new google.maps.LatLng(54.0, -2.0);

    // Give the map zoom options
    var myOptions = {
      zoom: 6,
      center: latLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Create the map, markers and info window objects
    var map =  new google.maps.Map(document.getElementById("branches-map-canvas"), myOptions);
    var markers = Drupal.settings.branches_markers;
    var infoWindow = new google.maps.InfoWindow();

    // Loop through the markers, add them to the map and add event listeners
    for(var i in markers) {
      var latlng = new google.maps.LatLng(parseFloat(markers[i].lat), parseFloat(markers[i].lng));
      var marker = new google.maps.Marker({
        position: latlng,
        map: map
      });
      markers[i].marker = marker;
      google.maps.event.addListener(marker, 'click', addListener(i, markers[i]));
    }
    
    // Add close info window event listener
    google.maps.event.addListener(infoWindow, 'closeclick', closeInfoWindow);

    function addListener(i, m) {
      return function() {
        allowHover = false;
        openInfoWindow(i, m);
      };
    }
    
    function openInfoWindow(i, m) {
      // Remove the class
      $('tr[class^="branch-"]').removeClass('branch-selected');
      
      // Deal with info window
      infoWindow.setContent(makeContent(m));
      infoWindow.open(map, m.marker);
      
      // Add class to correct branch
      $('.branch-' + i).addClass('branch-selected');
    }
    
    function closeInfoWindow() {
      allowHover = true;
      $('tr[class^="branch-"]').removeClass('branch-selected');
    }
    
    $('tr[class^="branch-"]').hover(function() {
      if(allowHover) {
        // Open the info window to this
        var i = $(this).attr('class').replace('branch-', '');
        openInfoWindow(i, markers[i]);
      }
    }, function() {
    });


    function makeContent(m) {
      var html = "<div id=\"branches-info-content\"><a href=\"" + m.link + "\"><b>" + m.title + "</b></a><br/>" + m.shluchim + "</div>";
      return html;
    }
    
    // Event handler for change in drop-down
    $('#edit-unis').change(function() {
      // Get the university associated with this
      $.get('/ajax/branches/' + $('#edit-unis option:selected').val(),
        function(data) {
          allowHover = false;
          openInfoWindow(data, markers[data]);
        }
      );
    });

  });
}(jQuery));
