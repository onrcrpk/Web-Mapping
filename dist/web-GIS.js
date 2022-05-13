// full screen map view
var mapId = document.getElementById("map")
    function fullScreenView() {
        if(document.fullscreenElement){
          document.exitFullscreen()
        }else {
          mapId.requestFullscreen();
        }
      }
        

// add print
L.control.browserPrint({position:"topleft"}).addTo(map);



    // search bar
    var geocoder = L.Control.geocoder({
        defaultMarkGeocode: false
      })
        .on('markgeocode', function(e) {
          var bbox = e.geocode.bbox;
          var poly = L.polygon([
            bbox.getSouthEast(),
            bbox.getNorthEast(),
            bbox.getNorthWest(),
            bbox.getSouthWest()
          ]).addTo(map);
          map.fitBounds(poly.getBounds());
        })
        .addTo(map);
        
//add measure calculator
L.control.measure({ 
    primaryLengthUnit: 'kilometer', 
    secondaryLengthUnit: 'meter',
    primaryAreaUnit: 'sqmeters', 
    secondaryAreaUnit: undefined
    }).addTo(map)
        
  // zoom to layer
  $('.zoom-to-layer').click(function(){
    map.setView([52.1326, 5.2913], 2)
  })

  