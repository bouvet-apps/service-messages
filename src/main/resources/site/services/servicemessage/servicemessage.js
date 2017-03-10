var portalLib = require('/lib/xp/portal');
var contentLib = require('/lib/xp/content');
var cacheLib = require('/lib/xp/cache');

// Cache for service messages. We will hold them for 60 seconds before
// refreshing to minimize the load overhead.
var dataCache = cacheLib.newCache({
    size: 1,
    expire: 60
});


// Get all published content of type servicemessage in the current site.
var getServiceMessages = function() {
    return dataCache.get("serviceMessages", function () {
        var result = contentLib.query({
                sort:   "publish.from DESC",
                query: " _parentPath LIKE '/content" + portalLib.getSite()._path + "*'",
                branch: "master",
                contentTypes:  [
                    app.name + ":servicemessage"
                ]
            }
        ).hits.map(function(hit) {
            var msg = {};
            if (hit.displayName) { msg.title = hit.displayName; }
            if (hit.data.text) { msg.text = hit.data.text; }
            if (hit.data.link) {
                msg.link = portalLib.pageUrl( {id: hit.data.link} );
            }
            msg.type = hit.data.type;
            return msg;
        });

        return result;
    });
};

// Handle GET requests
exports.get = function(req) {

    var siteConfig = portalLib.getSiteConfig();
    var id = siteConfig.id;

    var result = {
        blockid: id,
        servicemessages: getServiceMessages()
    };

    return {
        body: result,
        contentType: 'application/json'
    }
};