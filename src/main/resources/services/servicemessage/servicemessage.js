var portalLib = require('/lib/xp/portal');
var contentLib = require('/lib/xp/content');
var contextLib = require('/lib/xp/context');
var cacheLib = require('/lib/cache');

// Cache for service messages. We will hold them for 60 seconds before
// refreshing to minimize the load overhead.
var dataCache = cacheLib.newCache({
    size: 100,
    expire: 60
});

// Get all published content of type servicemessage in the current site.
var getServiceMessages = function() {
    var sitePath = portalLib.getSite()._path;
    return dataCache.get("serviceMessages-" + sitePath, function () {
        var result = {};
        contextLib.run({
            branch: "master",
            principals: ["role:system.admin"]
        }, function () {
            result = contentLib.query({
                  sort: "publish.from DESC",
                  query: " _parentPath LIKE '/content" + sitePath + "*'",
                  contentTypes: [
                      app.name + ":servicemessage"
                  ]
              }
            ).hits.map(function (hit) {
                var msg = {};
                if (hit.displayName) {
                    msg.title = hit.displayName;
                }
                if (hit.data.text) {
                    msg.text = hit.data.text;
                }
                if (hit.data.link) {
                    msg.link = portalLib.pageUrl({id: hit.data.link});
                }
                msg.type = hit.data.type;
                return msg;
            });
        })
        return result;
    });
};

// Handle GET requests
exports.get = function() {
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