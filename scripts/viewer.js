/*----------------------------------------------------------------
  Name:        viewer.js
  Date:        November 2019
  Description: Base code for the - Web Programming - exercise
               (data viewer page)
  Version:     2.1
----------------------------------------------------------------*/

var map;


/*-- Initialization function --*/
function init() {
    var map = L.map('map_container').setView([52.22, 6.89], 13);
7
    map.zoomControl.setPosition("topright");


    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    var watercolormap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
    
	
	// Create & add WMS-layer.

    // Create map

	var gov = L.tileLayer.wms("https://gisedu.itc.utwente.nl/cgi-bin/mapserv.exe?map=d:/iishome/student/s6047165/thailand/EnschedeWMS.map&", {
    layers: 'Gov',
    format: 'image/png',
    transparent: true,
    attribution: "DTM © 2022 ITC Students"
});	
	
	var map1 = L.tileLayer.wms("https://gisedu.itc.utwente.nl/cgi-bin/mapserv.exe?map=d:/iishome/student/s6047165/thailand/EnschedeWMS.map&", {
    layers: 'Random',
    format: 'image/png',
    transparent: true,
    attribution: "Random Forest © 2022 ITC Students"
});

	var map2 = L.tileLayer.wms("https://gisedu.itc.utwente.nl/cgi-bin/mapserv.exe?map=d:/iishome/student/s6047165/thailand/EnschedeWMS.map&", {
    layers: 'SVC',
    format: 'image/png',
    transparent: true,
    attribution: "Support Vector Machine © 2022 ITC Students"
});

	var dtm = L.tileLayer.wms("https://gisedu.itc.utwente.nl/cgi-bin/mapserv.exe?map=d:/iishome/student/s6047165/thailand/EnschedeWMS.map&", {
    layers: 'DTM',
    format: 'image/png',
    transparent: true,
    attribution: "DTM © 2022 ITC Students"
});

	var govorto = L.tileLayer.wms("https://gisedu.itc.utwente.nl/cgi-bin/mapserv.exe?map=d:/iishome/student/s6047165/thailand/EnschedeWMS.map&", {
    layers: 'govorto',
    format: 'image/png',
    transparent: true,
    attribution: "Aerial Photo © 2022 ITC Students"
});

	var uncern = L.tileLayer.wms("https://gisedu.itc.utwente.nl/cgi-bin/mapserv.exe?map=d:/iishome/student/s6047165/thailand/EnschedeWMS.map&", {
    layers: 'uncern',
    format: 'image/png',
    transparent: true,
    attribution: "Uncertainty Map © 2022 ITC Students"
});


    // add marker in the center of map
    var singleMarker1 = L.marker([52.1326, 5.2913])
        .bindPopup('Onur<br> is living here')
        
   // add a scale at at your map.
    L.control.scale({metric: true, imperial: false}).addTo(map);

    // add coordinates
    L.control.mousePosition().addTo(map)
    
            

  // leaflet layer control
  var baseMaps = {
    "OSM":osm,
    "Water Color Map": watercolormap,
    "Terrain Map": terrainmap

  }

  var overlayerMaps = {
	  "AHN3 DTM":gov,
	  "DTM":dtm,
	  "Uncertainty in DTM":uncern,
	  "Aerial Photo":govorto,
	  "Random Forest":map1,
	  "SVM":map2
  }
  

	L.control.layers(baseMaps,overlayerMaps, {collapsed: false, position: "topleft"}).addTo(map);
	
		
	L.control.Legend({
		title:'Classification Legend',
		collapsed:true,
        position: "bottomright",
		column:1,
        legends: [{
            label: "Water",
            type: "image",
            url: 'img/blue.jpg',
        }, {
                label: "Green Areas",
                type: "image",
                url: 'img/lightgreen.jpg'
            }, {
                label: "Built-up Areas",
                type: "image",
                url: 'img/red.jpg'
            }, {
                label: "Roads",
                type: "image",
                url: 'img/gray.jpg'
            }
			
		]
    }).addTo(map);
	
		L.control.Legend({
		title:'Uncertainty in DTM',
		collapsed:true,
        position: "bottomright",
		column:1,
        legends: [{
            label: "<= (-1)",
            type: "image",
            url: 'img/red.jpg',
        }, {
                label: "(-1) - (-0.25)",
                type: "image",
                url: 'img/yellow.jpg'
            }, {
                label: "(-0.25) - 0.25",
                type: "image",
                url: 'img/green.jpg'
            }, {
                label: "=> 0.25",
                type: "image",
                url: 'img/blue.jpg'
            }
			
		]
    }).addTo(map);
	
	
	
	L.control.Legend({
		title:'DTM Legend',
		collapsed:true,
        position: "bottomright",
		column:1,
        legends: [{
            label: "<= 36m",
            type: "image",
            url: 'img/blue.jpg',
        }, {
                label: "37 - 38m",
                type: "image",
                url: 'img/green.jpg'
            }
			, {
                label: "39 - 40m",
                type: "image",
                url: 'img/yellow.jpg'
            }
			, {
                label: "41 - 43m",
                type: "image",
                url: 'img/orange.jpg'
            }
			, {
                label: "44 - 48m",
                type: "image",
                url: 'img/brown.jpg'
            }, {
                label: ">= 49m",
                type: "image",
                url: 'img/red.jpg'
            }
			
		]
    }).addTo(map);


//OpacityControl
L.control
    .opacity(overlayerMaps, {
        label: 'Layers Opacity',
		position:'topleft'
    })
    .addTo(map);


    map.on('overlayadd', function (eventLayer) {

        switch (eventLayer.name) {
        case "Regions":
            legend1.addTo(map);
            map.removeControl(legend2);
                break;
        case "Counties":
            legend2.addTo(map);
            map.removeControl(legend1);
                break;
        default:
            map.removeControl(legend1);
            map.removeControl(legend2);
        }
      });
}
