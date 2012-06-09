var map = null;

function init(){

    // map options
    var options = {
              projection: new OpenLayers.Projection("EPSG:900913"),
              displayProjection: new OpenLayers.Projection("EPSG:4326"),
              units: "m",
              numZoomLevels: 20,
              maxResolution: 156543.0339,
              maxExtent: new OpenLayers.Bounds(-20037508, -20037508,
                                  20037508, 20037508.34)
    };
    map = new OpenLayers.Map( 'map', options );

    //  layers
    var gmap = new OpenLayers.Layer.Google(
          "Google Streets", // the default
          {'sphericalMercator': true, numZoomLevels: 20}
    );
    var osm = new OpenLayers.Layer.OSM( 
          "Open Street Maps"
    );
    
    var water_meters = new OpenLayers.Layer.WMS( 
            "Water Meters", 
             "http://whidbey-wifi.z-pulley.com/wms/wifi?",
            { 
                layers: "WATER_METER_POINTS", 
                transparent: 'true',
                format: 'image/png', 
            },
            {
                //tileSize: new OpenLayers.Size(256,256),
                //ratio: 1, 
                gutter: 10,
                wrapDateLine: true
            }
    );

     var parcels = new OpenLayers.Layer.WMS(
             "Parcels",
              "http://whidbey-wifi.z-pulley.com/wms/wifi?",
             {
                 layers: "PARCEL_BOUNDARIES",
                 transparent: 'true',
                 format: 'image/png',
             },
             {
                 //tileSize: new OpenLayers.Size(256,256),
                 //ratio: 1,
                 gutter: 10,
                 wrapDateLine: true
             }
     );

    map.addLayers( [ osm, gmap, parcels, water_meters] );

    map.addControl(new OpenLayers.Control.LayerSwitcher());

    // Coordinate display at bottom of map
    map.addControl(new OpenLayers.Control.MousePosition());
    var point = new OpenLayers.LonLat(-122.40 , 48.03); 
    // Need to convert zoom point to mercator too
    point.transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
    map.setCenter(point, 14); 

}
