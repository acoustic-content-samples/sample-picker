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

// 1. 'addEventListener' is for standards-compliant web browsers and 'attachEvent' is for IE Browsers
var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
var eventer = window[eventMethod];
// 2. if 'attachEvent', then we need to select 'onmessage' as the event
// else if 'addEventListener', then we need to select 'message' as the event
var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

// Change these to match the API and base URLs for your tenant
var apiUrl = 'https://my.digitalexperience.ibm.com/api/cd1e2e32-739f-436a-85d9-a6ad64ebafcb'
var serverBaseUrl = 'https://my.digitalexperience.ibm.com'

var paletteUrl = 'https://www.digitalexperience.ibm.com/content-picker/picker.html';
var deliveryPaletteUrl = paletteUrl + '?apiUrl=' + apiUrl + '&fq=classification:content&fq=type:Article&multiselect=true';

function launchPicker() {

    $('#pickerDialog').dialog({
        autoOpen: false,
        show: 'fade',
        hide: 'fade',
        modal: false,
        height: window.innerHeight - 30,
        resizable: true,
        minHeight: 500,
        width: 240,
        position: { my: 'right center', at: 'right center', of: window },
        open: function() {
            $('#pickerIframe').attr('src', deliveryPaletteUrl);
        },
        title: 'Find',
    });

    // Listen to message from child iFrame window
    eventer(messageEvent, resultHandler, false);

    //open the dialog
    $('#pickerDialog').dialog('open');
}

//handle how the chosen image is displayed on the page
function resultHandler(event) {
    $('#pickerDialog').dialog('close');

    var result = JSON.parse(event.data);
    var indicators = []; // carousel indicators
    var innerItems = []; // the carousel items

    $(result).each(function(index, item) {
        var elements = item.document.elements;

        // for the first indicator and the first item, set the "active" class
        var activeClass = indicators.length == 0 ? ' class="active"' : '';
        var activeItemClass = indicators.length == 0 ? ' class="item active"' : ' class="item"';

        // Get several element values for display
        var imageResource = serverBaseUrl + elements.image.url;
        if (imageResource) {
            var title = (elements.title === undefined) ? "" : elements.title.value;
            var summary = (elements.summary === undefined) ? "" : elements.summary.value;
            var author = (elements.author === undefined) ? "" : elements.author.value;

            // generate the HTML for this content item
            indicators.push('<li data-target="#articleCarousel" data-slide-to="0"' + activeClass + '></li>');
            innerItems.push('' + '<div ' + activeItemClass + '>' + '<img class="carousel-image" '
                + 'src="' + imageResource + '" ' + 'width="460" height="345">' + '<div class="carousel-caption">' + '<h1>'
                + title + '</h1>' + '<p>' + summary + '</p>' + '<h4>' + author + '</h5>' + '</div>' + '</div>');
        }
    });

    // Update the HTML elements for indicators and items
    $("#articleCarouselIndicators").html(indicators);
    $("#articleCarouselInner").html(innerItems);

    // Add the 'carousel slide' class only after the images are loaded
    $("#articleCarousel").addClass("carousel slide");

    // Unhide the carousel controls
    $(".carousel-control").removeClass("hidden");
}
