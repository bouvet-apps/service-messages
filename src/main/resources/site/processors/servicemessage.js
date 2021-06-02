var portalLib = require('/lib/xp/portal');
var arrayUtil = require('/lib/array-util');

exports.responseProcessor = function(req, res) {
    log.info("running responseProcessor");
    log.info(portalLib.serviceUrl({service: 'servicemessage'}));
    var js = '<script src="'+ portalLib.assetUrl({path: 'js/json_parse.js'}) +'"></script>'
           + '<script src="'+ portalLib.assetUrl({path: 'js/scripts.js'}) +'"></script>';
    var html = '<script type="application/json" data-selector="servicemessages">{"service": "' +  portalLib.serviceUrl({service: 'servicemessage'}) + '"}</script>';
    //displayServiceMessages("'+ portalLib.serviceUrl({service: 'servicemessage'}) +'");</script>';

    // Normalize the pageContributions
    res.pageContributions.headEnd = arrayUtil.ensureArray(res.pageContributions.headEnd);
    res.pageContributions.bodyEnd = arrayUtil.ensureArray(res.pageContributions.bodyEnd);

    res.pageContributions.headEnd.push(js);
    res.pageContributions.bodyEnd.push(html);

    return res;
};
