// Google Sheets Tool Script Editor

// Crunchbase API importer for Google Sheets
// __ Description: Google Sheet Script to gather Company Information from the public Crunchbase API
// __ Status: Prototype
// __ Author: Remy Thellier
// __ Email: remythellier@gmail.com
// __ Licence: MIT

var USER_KEY = XXXXXXXXXXXXXXX; // needs to be changed with your API credentials
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName('crunchit'); // needs to be changed with the name of your sheet 

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Crunchbase Data')
    .addItem('Retrieve info for every organization', 'getCrunchbaseOrgs')
    .addToUi();
}

function getCrunchbaseOrgs() {
  var emptyRow = 2;
  while (sheet.getRange(emptyRow,1).getValue() != "") {
    emptyRow++;
  }
  
  sheet.getRange(2,2,emptyRow + 1,15).clearContent();
  
  for (i = 1; i < emptyRow; i++){
    getCrunchbaseOrg(i);
  } 
}

function getCrunchbaseOrg(currentItem) {
    
  var query = sheet.getRange(currentItem,1).getValue();

  var url = 'https://api.crunchbase.com/v/3/odm-organizations?query=' + encodeURI(query) + '&user_key=' + USER_KEY;

  var json = getCrunchbaseData(url,query);

  if (json[0] === "Error:") {
     
     sheet.getRange(currentItem,2).setValue(json[0]);
     sheet.getRange(currentItem,3).setValue(json[1]);
    
  } else {
    
    if (json[1].data.paging.total_items != 0 ) {

      var data = json[1].data.items[0].properties;

      var dataObject = [
        ["Name", data.name],
        ["Homepage", data.homepage_url],
        ["Type", data.primary_role],
        ["Short description", data.short_description],
        ["Country", data.country_code],
        ["Region", data.region_name],
        ["City name", data.city_name],
        ["Facebook", data.facebook_url],
        ["Linkedin", data.linkedin_url],
        ["Twitter", data.twitter_url],
        ["Crunchbase URL", "https://www.crunchbase.com/" + data.web_path]
      ];
      
      var column = 2;
      
      if (currentItem == 2){
        dataObject.forEach(function(element) {
           sheet.getRange(1,column++).setValue(element[0]);
        });
        column = 2;
      }
      
      dataObject.forEach(function(element) {
        sheet.getRange(currentItem,column++).setValue(element[1]);
      });
      
    }
  }
}
 
function getCrunchbaseData(url,query) {    
  try {
    var response = UrlFetchApp.fetch(url);
    var responseData = response.getContentText();
    var responseCode = response.getResponseCode();
    var json = JSON.parse(responseData);
    return [responseCode,json];
  }
  catch (e) {
    Logger.log(e);
    return ["Error:", e];
  }  
}
