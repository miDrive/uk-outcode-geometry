#uk-outcode-geometry

Polygon boundaries for all UK outcode boundaries in KML and GeoJSON formats

Data is licensed under CC BY-SA 3.0 (see LICENSE.md)  
KML data sourced from https://en.wikipedia.org/wiki/List_of_postcode_areas_in_the_United_Kingdom  
Converted to GeoJSON using https://github.com/mapbox/togeojson  

Data in the project root is up to date as of 13th September 2016

## Tool
Inside the tool directory is a Node.js script that will download each KML file from Wikipedia servers and convert to GeoJSON using mapbox/togeojson

### Usage
```
cd tool
npm install
node tool.js
```

