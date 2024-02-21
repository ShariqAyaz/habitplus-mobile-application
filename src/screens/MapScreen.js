import React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
// import MapView, {Marker} from 'react-native-maps';
import { WebView } from 'react-native-webview';


const MapScreen = () => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          style={{ flex: 1 }}
          originWhitelist={['*']}
          source={{
            html: `
              <html>
              <head>
                <title>OpenStreetMap with Line</title>
                <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width" />
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                  integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                  crossorigin=""/>
                <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
                  integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
                  crossorigin=""></script>
              </head>
              <body>
                <div id="map" style="width: 100%; height: 100%"></div>
                <script>
                
                var pointA = [51.505, -0.09];
                var pointB = [51.51, -0.047];
                var pointC = [51.49, -0.017];
                var pointD = [51.505, -0.09];

                function calculateCenter(points) {
                    var sumLat = 0;
                    var sumLng = 0;
                
                    points.forEach(function(point) {
                        sumLat += point[0];
                        sumLng += point[1];
                    });
                
                    var avgLat = sumLat / points.length;
                    var avgLng = sumLng / points.length;
                
                    return [avgLat, avgLng];
                }
                
                var centerPoint = calculateCenter([pointA, pointB, pointC /*, pointD*/]); // pointD is the same as pointA and can be omitted
                
                console.log("Center Point:", centerPoint);


                  var map = L.map('map').setView(centerPoint, 12);
  
                  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  }).addTo(map);
  
                  var pointList = [pointA, pointB,pointC,pointD];
  
                  // Create a polyline from the points and add it to the map
                  var firstpolyline = new L.Polyline(pointList, {
                      color: 'blue',
                      weight: 4,
                      opacity: 0.8,
                      smoothFactor: 0
                  });
                  firstpolyline.addTo(map);
  
                </script>
              </body>
              </html>
            `,
          }}
        />
      </SafeAreaView>
    );
  };


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    flexContainer: {
        flex: 1,
    },
});

export default MapScreen;
