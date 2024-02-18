import React from 'react';
import {View, StyleSheet} from 'react-native';
// import MapView, {Marker} from 'react-native-maps';
import { WebView } from 'react-native-webview';


const MapScreen = () => {
    return (
        <WebView
          style={{ flex: 1 }}
          originWhitelist={['*']}
          source={{ html: `
            <html>
            <head>
              <title>OpenStreetMap</title>
              <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width" />
            </head>
            <body>
              <div id="map" style="width: 100%; height: 100%"></div>
              <script>
                var map = L.map('map').setView([51.505, -0.09], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
              </script>
            </body>
            </html>
          `}}
        />
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
});

export default MapScreen;
