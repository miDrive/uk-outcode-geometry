var areas = ['AB','AL','B','BA','BB','BD','BH','BL','BN','BR','BS','BT','CA','CB','CF','CH','CM','CO','CR','CT','CV','CW','DA','DD','DE','DG','DH','DL','DN','DT','DY','E','EC','EH','EN','EX','FK','FY','G','GL','GU','HA','HD','HG','HP','HR','HS','HU','HX','IG','IP','IV','KA','KT','KW','KY','L','LA','LD','LE','LL','LN','LS','LU','M','ME','MK','ML','N','NE','NG','NN','NP','NR','NW','OL','OX','PA','PE','PH','PL','PO','PR','RG','RH','RM','S','SA','SE','SG','SK','SL','SM','SN','SO','SP','SR','SS','ST','SW','SY','TA','TD','TF','TN','TQ','TR','TS','TW','UB','W','WA','WC','WD','WF','WN','WR','WS','WV','YO','ZE'];

var wikipediaUrl = 'https://en.wikipedia.org/w/index.php?title=Template%3AAttached_KML%2F<>_postcode_area&action=raw'

var request = require('superagent');
var fs = require('fs');

var tj = require('togeojson');
var jsdom = require('jsdom').jsdom;

areas.forEach(function(areaName, index){
	var fetchUrl = wikipediaUrl.replace('<>', areaName)
	request.get(fetchUrl)
		.end(function(err, data){
			//if(err) throw err;
			var fileNameKML = 'out/kml/'+areaName+'.kml';
			var fileNameJSON = 'out/json/'+areaName+'.json';
			fs.writeFile(fileNameKML, data.text, (err) => {
				if(err) throw err;
				var kml = jsdom(data.text);
				var convertedWithStyles = tj.kml(kml, { styles: true });
				fs.writeFile(fileNameJSON, JSON.stringify(convertedWithStyles), (err) => {
					if(err) throw err;
					console.log(areaName, 'Saved');
				})
			})
		})
})
