var areas = ['AB', 'AI', 'AL', 'AS', 'B', 'BA', 'BB', 'BBN', 'BD', 'BF', 'BH', 'BI', 'BL', 'BN', 'BR', 'BS', 'BT', 'BX', 'CA', 'CB', 'CF', 'CH', 'CM', 'CO', 'CR', 'CT', 'CV', 'CW', 'DA', 'DD', 'DE', 'DG', 'DH', 'DL', 'DN', 'DT', 'DY', 'E', 'EC', 'EH', 'EN', 'EX', 'FI', 'FK', 'FY', 'G', 'GIR', 'GL', 'GU', 'GX', 'GY', 'HA', 'HD', 'HG', 'HP', 'HR', 'HS', 'HU', 'HX', 'IG', 'IM', 'IP', 'IV', 'JE', 'KA', 'KT', 'KW', 'KY', 'KY', 'L', 'LA', 'LD', 'LE', 'LL', 'LN', 'LS', 'LU', 'M', 'ME', 'MK', 'ML', 'MS', 'N', 'NE', 'NG', 'NN', 'NP', 'NR', 'NW', 'OL', 'OX', 'PA', 'PC', 'PE', 'PH', 'PL', 'PO', 'PR', 'RG', 'RH', 'RM', 'S', 'SA', 'SE', 'SG', 'SI', 'SK', 'SL', 'SM', 'SN', 'SO', 'SP', 'SR', 'SS', 'ST', 'STH', 'SW', 'SY', 'TA', 'TD', 'TDC', 'TF', 'TK', 'TN', 'TQ', 'TR', 'TS', 'TW', 'UB', 'VG', 'W', 'WA', 'WC', 'WD', 'WF', 'WN', 'WR', 'WS', 'WV', 'YO', 'ZE'];

var wikipediaUrl = 'https://en.wikipedia.org/w/index.php?title=Template%3AAttached_KML%2F<>_postcode_area&action=raw'

var request = require('superagent');
var fs = require('fs');

var tj = require('togeojson');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
var path = require('path');
var DOMParser = require('xmldom').DOMParser;

areas.forEach(function(areaName, index){
	var fetchUrl = wikipediaUrl.replace('<>', areaName)
	request.get(fetchUrl)
		.end(function(err, data){
            if(err) {
            	console.error(areaName + " FAILED");
                return;
			}
			var fileNameKML = 'out/kml/'+areaName+'.kml';
			var fileNameJSON = 'out/json/'+areaName+'.json';
			ensureDirectoryExistence(fileNameKML);
			ensureDirectoryExistence(fileNameJSON);
			fs.writeFile(fileNameKML, data.text, (err) => {
				if(err) throw err;
                var dom = (new DOMParser()).parseFromString(data.text, 'text/xml');
                var convertedWithStyles = tj.kml(dom, { styles: true });
				fs.writeFile(fileNameJSON, JSON.stringify(convertedWithStyles), (err) => {
					if(err) throw err;
					// console.log(areaName, 'Saved');
				})
			})
		})
})

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}
