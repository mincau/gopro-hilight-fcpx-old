//Idea & DEV: Roman Tauler
//DEV: David Luna, David Fonellosa, Laura Gutierrez

var GoProTagger = require('./gopro-tagging.js');
var fs = require('fs');
var util = require('util')
var exec = require('child_process').exec;
var namePath = '';
var namePathCon = '';

var child;
var filePath = './GOPR8172.MP4'; //replace your video path here
var fileName = filePath.match(/GOPR+\d{4}/g);
var separator = ':';


function milToMin (mil){
    return (mil/1000/60) << 0;
}

function milToSec (mil){
    return (mil/1000) % 60;
}

function getFormattedTime(mil){
    return milToMin(mil)+separator+milToSec(mil); 
}

GoProTagger.getTag(filePath, function(hilights, err){
    if (err != undefined)
    {
        console.log('GoPro-Tagging: Error - ', err);
    } 
    else
    {

        console.log('This video has ' + hilights.length + ' HiLight tag(s)');
        for(var i = 0;i < hilights.length;i++) {
            // console.log('HiLight ' + i + ' @ ' + hilights[i] + ' millisecond');
            console.log(getFormattedTime(hilights[i]));
            namePath = getFormattedTime(hilights[i]);
            namePathCon += namePath + ","; //ADDCONCATENATE;
            finalExecute = "tag -a" + namePathCon + " " + filePath;

            child = exec(finalExecute, function (error) {
            
            if (error !== null) {
                console.log('exec error: ' + error);
                }
             });

            // fs.appendFile("./"+ fileName, getFormattedTime(hilights[i]) + '\n', function(err) {
            //     if(err) {
            //         return console.log(err);
            //     }

            // console.log("The file was saved!");
        // });
        }
       console.log("Tags on " + fileName + " have been applied"); 
    }
});