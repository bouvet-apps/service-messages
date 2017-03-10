# Service messages for Enonic XP

Easy to set up and use service messages for Enonic XP.

> **Note:** Requires Enonic v6.9.0 for scheduled publishing, direct publishing only in older versions

## How to use

The application is available through [Enonic Market](https://market.enonic.com/vendors/bouvet/no.bouvet.exp.app.servicemessages).
TODO: Make sure link is ok.

### Install application
Open the Applications section of your Enonic XP installation. Click 'Install', 
and locate the 'Service Messages' app in the 'Enonic Market' tab. Now click the 'Install'
button.

### Apply the application to your site

Edit your site settings by clicking 'edit' on the site node in Content Manager. Select 'Service Messages'
in the 'Applications' search box, and click to select it. It's now added to your site.

### Add service message container to your page

This is the only real configuration and code you need to do in order to get service messages
up and running on your site.

Service messages needs to know where to insert the service messages you create.
 
First, add an empty container yo your HTML and give it a unique ID.

```html
<div id="your_preferred_container_id"/>
```

After you've added the container, edit your site's Service Messages app's settings and enter
the id into the 'Service message container ID' field. Click 'Apply', and you're all set.

### Styling your service messages

You will probably want to make sure the service messages fit into the design of your site.

This is the actual HTML injected into the container you specified:

```html
<div id="your_preferred_container_id">
    <div class="alert alert-danger" role="alert">
        <a href="/site/some-article">This is a service message</a>
    </div>
</div>
```

Just target this structure with your CSS to adjust the visual appearance.

If you are using Bootstrap, you will get some basic styling out of the box, but we recommend you adjust the
styling to your own needs.

### Add some service messages

We suggest sticking all your service messaging in a dedicated folder, but it's not required to
do so. The app will find the service messages regardless of where they are located in your site
structure.

To create a service message, find a suitable spot in your site and click 'New'. Select 'Service 
Message' (no.bouvet.servicemessages:servicemessage).

Service messages consist of text, link and type - in addition to Enonic XP's required display name.

Field | Description | Required 
--- | --- | ---
Text | your actual message to the end user (keep it short and sweet) | * 
Link | an optional link to a page containing more information about whatever is the cause of the service message. | -
Type | Info/Warning/Danger/Success. | * 

## Performance

To minimize the performance impact on your site, the Service Messages app will fetch your 
service messages asynchronously through a separate XmlHttpRequest. The service messages are cached
internally for 60 seconds, so you don't suffer the overhead of a full query on each page load.
