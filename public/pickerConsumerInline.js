/*
 * Copyright 2016  IBM Corp.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an 
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the 
 * specific language governing permissions and limitations under the License.
 */
"use strict";

// Base URL for APIs - replace {Host} and {Tenant ID} using the values available 
// from the "i" information icon at the top left of the WCH screen 
const baseTenantUrl = "https://{Host}/api/{Tenant ID}";

// We must authenticate on the 'www' host for the Palette to work
const wchLoginPath = "/login/v1/basicauth";

// Content Hub blueid username and password - replace these or add code to get these from inputs
const username = "user1@ibm.com";
const password = "PASSWORD";

var pickerUrl = "https://content-us.goacoustic.com/content-picker/picker.html" +
  "?fq=classification:asset" +         // limit picker to showing only assets
  "&authoringApiUrl=" + baseTenantUrl; // add apiAuthoringUrl to enable authoring use of picker

//trigger the login on page load
$(document).ready(function() {
    wchLogin();
});

//login to WCH
function wchLogin() {
    var requestOptions = {
        xhrFields: { withCredentials: true },
        url: baseTenantUrl + wchLoginPath,
        headers: { "Authorization": "Basic " + btoa(username + ":" + password) }
    };

    $.ajax(requestOptions).done(function(data, textStatus, request) {
        // These cookies received on successful login : 'x-ibm-dx-user-auth', x-ibm-dx-tenant-id'  

        // Now that you are logged in and have the cookies, open the picker
        launchInlinePicker();
        
    }).fail(function(request, textStatus, err) {
        alert("Acoustic Content Login returned an error: " + err + ". Please check your credentials.");
    });

    
}


// 1. 'addEventListener' is for standards-compliant web browsers and 'attachEvent' is for IE Browsers
var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
var eventer = window[eventMethod];
// 2. if 'attachEvent', then we need to select 'onmessage' as the event
// else if 'addEventListener', then we need to select 'message' as the event
var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';


function launchInlinePicker() {
    //open the picker in the iframe
    $('#pickerIframe').attr('src', pickerUrl);
   
    // Listen to message from child iFrame window
    eventer(messageEvent, resultHandler, false);

}


//handle how the chosen image is displayed on the page
function resultHandler(e) {
    var result = JSON.parse(e.data);
     //construct the resource url
    var authUrl = baseTenantUrl + '/authoring/v1/resources/' + result.resource;
    var deliveryUrl = baseTenantUrl + '/delivery/v1/resources/' + result.resource;
    var akamaiUrl = baseTenantUrl.replace('/api','') + result.path;

    var resultUrl = '<div>'+akamaiUrl+'</div><div>'+authUrl+'</div><div>'+deliveryUrl+'</div>';

    //pretty print the json
    var json = JSON.stringify(result, '', 4);
    var resultResource;
    if (result.assetType == 'image'){
        resultResource = '<div>'+resultUrl+'</div><img width="150"  src="'+ deliveryUrl +'"><div><pre>' + json + '</div>'
    } else if (result.assetType == 'video'){
        resultResource = '<div>'+resultUrl+'</div><video width="200"  type="'+ result.mediaType +'" controls  src="'+ deliveryUrl +'"></video><div><pre>' + json + '</div>'
    } else if (result.assetType == 'file'){
        resultResource = '<div>'+resultUrl+'</div><a href="'+ deliveryUrl +'">'+ result.name +'</a><div><pre>' + json + '</div>'
    } else {
        resultResource = '<div>'+resultUrl+'</div><div><pre>' + json + '</div>'
    }
    $('#result').html(resultResource);
}

