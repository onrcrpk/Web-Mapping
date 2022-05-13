function init() {
    var navMap = L.map('map').setView([52.1326, 5.2913], 2);
    navMap.zoomControl.setPosition("topright");


    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(navMap);

    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var watercolormap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
    });

    var terrainmap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'

    });

    // add marker in the center of map
    var singleMarker1 = L.marker([52.1326, 5.2913])
        .bindPopup('Onur<br> is living here')
        
   // add a scale at at your map.
    L.control.scale({metric: true, imperial: false}).addTo(navMap);

    // add coordinates
    L.control.mousePosition().addTo(navMap)
    
    //gejson
    var marker = L.markerClusterGroup();
    var dutch = L.geoJSON(data, {
        onEachFeature: function(feature, layer) { 
            layer.bindPopup(feature.properties.name)
        }
    });
    dutch.addTo(marker)
    marker.addTo(navMap)

  // leaflet layer control
  var baseMaps = {
    "OSM":osm,
    "Water Color Map": watercolormap,
    "Terrain Map": terrainmap

  }

  var overlayerMaps = {
      "GeoJson Markers":marker,
      "Single Marker":singleMarker1
  }

  L.control.layers(baseMaps,overlayerMaps, {collapsed: false, position: "topleft"}).addTo(navMap);


		// map coordinate display from indian
		map.on('mousemove', function (e) {
        console.log(e)
        $(`.coordinate`).html(`Lat: ${e.latlng.lat} Long: ${e.latlng.lng}`)

        })