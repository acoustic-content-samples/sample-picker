# IBM Watson Content Hub Asset Picker
This sample web application illustrates how to open the IBM Watson Content Hub Asset Picker from client JavaScript. The application uses jQuery to open a picker showing a list of assets available to the user.

This sample is built in JavaScript and HTML, and it illustrates:

* Authenticating to the Watson Content Hub
* Launching the Watson Content Hub Picker to view available assets.
* Returning the JSON definition of an asset from Watson Content Hub


There are two examples included: **index-inline.html** and **index.html**. The first example shows how to login, open the Picker and choose an asset. The second example extends this to also show how to customize which assets are displayed.



### About the Watson Content Hub authoring APIs

The initial set of APIs provided by Watson Content Hub are for authoring services, which require authentication and are not optimized for retrieval by applications in production. Follow-on releases will provide "delivery" services which can be accessed anonymously and are optimized for caching and performance. However, the two APIs will be very similar, so to switch from authoring to delivery services you will just need to change the "authoring" portion of the service URL to "delivery." 

### About authentication

To call authenticated APIs, you need to first call the login service with the desired user name and password. This will return an authentication token cookie for use on subsequent calls. The browser will include the authentication token cookie in subsequent requests.

### About URLs to assets

Accessing the unpublished assets through the resource ID identifies a specific asset binary. This access point is provided by the authoring asset service API. **Note**: You must be authenticated to use the Authoring asset service APIs. 

`https://{tenant-host}/api/{tenant-id}/authoring/v1/resources/{resource-id}`

`https://my.digitalexperience.ibm.com/api/1234c-4567e-890a-000b/authoring/v1/resources/3b09333ceffee0001`

The published versions of your assets can be accessed from your delivery system through the following two entry points:

* Asset path
* Resource ID

Accessing the published asset through the asset path addresses your published resource as public static resource. The published asset is directly retrieved from the replicated storage infrastructure that is provided by Akamai. The published assets gets cached for 1 day on Akamai. This entry point provides the best performance for accessing your published assets.

`https://{tenant-host}/{tenant-id}/{asset-path}`

`https://my.digitalexperience.ibm.com/1234c-4567e-890a-000b/delivery/v1/resources/3b09333ceffee0001`

Accessing the published assets through the resource ID identifies a specific asset binary. This access point is provided by the delivery resource service API. You can find the corresponding API documentation in the [Watson Content Hub API documentation](https://developer.ibm.com/api/).

`https://{tenant-host}/api/{tenant-id}/delivery/v1/resources/{resource-id}`

`https://my.digitalexperience.ibm.com/api/1234c-4567e-890a-000b/delivery/v1/resources/3b09333ceffee0001`



###Running the sample

#### 1. Download the files

Clone or download the repository folder into any folder on your workstation. (Use [Clone or Download](https://help.github.com/articles/cloning-a-repository/) button on the Github repository home page).

#### 2. Update the user credentials and baseTenantUrl

This sample uses hard-coded user name, password, and baseTenantUrl values set in the pickerConsumer.js and pickerConsumerInline.js files in the public directory. Update the name and password values in those files. To avoid putting credentials in the source you could change the application to provide browser inputs for username and password. 

The baseTenantUrl variables in pickerConsumer.js and pickerConsumerInline.js must also be set for your tenant. In the IBM Watson Content Hub user interface, click the "i" information icon at the top left of the screen next to where it says IBM Watson Content Hub. The pop-up window shows your host and tenant ID. Use this information to update the value of baseTenantUrl. For example it might look something like this:

const baseTenantUrl = "https://my12.digitalexperience.ibm.com/api/12345678-9abc-def0-1234-56789abcdef0";

#### 3.  Load sample html in a browser

You can do this right from the file system in Firefox, Chrome, or Safari browsers. Alternatively you can make the files available on any web server and open the html files in a browser using your web server URL.


The first sample (index.html) allows you to choose what type of assets to show (All / Images / Videos / Files) and then opens the Picker in 
a dialog.

The second sample (index-inline.html) opens the picker in the same window and shows the expanded layout.

In both cases choose an image by clicking on the 'Click to add content' button as shown in screenshot and the JSON for that asset is returned to
the parent page.


### Screenshots of the samples

####1. Open **index-inline.html** in a browser.

If you have updated the user credentials as described in the installation instructions then your assets are displayed.



![Alt text](docs/picker-inline.png?raw=true "Asset Picker")



Hover over an asset and an action bar appears allowing you to add your asset to the page:



![Alt text](docs/inline-actionbar.png?raw=true "Asset Picker")



When you choose an asset, the information about the asset is returned in JSON format. The delivery URL to that asset is also displayed. This URL is constructed using the x-base-tenant-url for the user and the path to the asset defined in the JSON.



![Alt text](docs/inline-added.png?raw=true "Asset Picker")



<br/><br/>

####2. Open **index.html** in a browser. 

<img src="./docs/dropdown-closed.png" alt="picker" width="300" />

A dropdown is shown which contains some options for customizing which items are displayed in the Picker.



<img src="./docs/dropdown-open.png" alt="picker" width="300" />


<p>All Assets: https://www.digitalexperience.ibm.com/content-picker/picker.html?*fq=classification:asset*</p>
<p>Images:     https://www.digitalexperience.ibm.com/content-picker/picker.html?fq=classification:asset&*fq=assetType:image*</p>
<p>Videos:   https://www.digitalexperience.ibm.com/content-picker/picker.html?fq=classification:asset&*fq=assetType:video*</p>
<p>Files:  https://www.digitalexperience.ibm.com/content-picker/picker.html?fq=classification:asset&*fq=assetType:file*</p>
<p>Images tagged with 'nature':    https://www.digitalexperience.ibm.com/content-picker/picker.html?fq=classification:asset&*fq=assetType:image&fq=tags:(nature)*</p>
<p>Images with media-type:     https://www.digitalexperience.ibm.com/content-picker/picker.html?fq=classification:asset&*fq=assetType:image&fq=mediaType:(image/jpeg)*</p>


<br/><br/>

<p>Choose an option and click Launch Picker button. The Picker will open in a popup dialog. If you have updated the user credentials as described in the installation instructions then your assets are displayed.</p>


<br/>

![Alt text](docs/showall.png?raw=true "Asset Picker")

<br/>

![Alt text](docs/showimages.png?raw=true "Asset Picker")

<br/>

![Alt text](docs/showvideo.png?raw=true "Asset Picker")

<br/>

![Alt text](docs/showFile.png?raw=true "Asset Picker")

<br/>

![Alt text](docs/shownature.png?raw=true "Asset Picker")

<br/>





When you choose an asset, the information about the asset is returned in JSON format. The delivery URL to that asset is also displayed. This URL is constructed using the x-base-tenant-url for the user and the path to the asset defined in the JSON.

![Alt text](docs/popup-added.png?raw=true "Asset Picker")
<br/>


###Resources

API Explorer reference documentation: https://developer.ibm.com/api/view/id-618

Watson Content Hub developer center: https://developer.ibm.com/wch/

Watson Content Hub forum: https://developer.ibm.com/answers/smartspace/wch/
