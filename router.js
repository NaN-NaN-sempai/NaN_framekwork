var routesDone = {};

module.exports = (app, routes, reloadModule) => {

    const loadModule = (dir) => (reloadModule? reloadModule: require)(dir);

    if(typeof routes == "string"){
        app.use((req, res, next) => {
            var sendNotFound = () => res.send(`<head><title>Error</title><style>pre{display: block;font-family: monospace;white-space: pre;margin: 1em 0px;}</style></head><body><pre>Cannot GET ${req.url}</pre></body>`);
    
            var routeList = loadModule(routes);
            Object.keys(routeList).filter(r=>!Object.keys(routesDone).includes(r)).forEach(route => {
                routesDone[route] = Object.assign({}, routeList[route]);
            });
    
            Object.keys(routesDone).filter(r=>!Object.keys(routeList).includes(r)).forEach(route => {
                routesDone[route].callback = sendNotFound;
            });
    
            Object.keys(routesDone).forEach(route => {
                if(routeList[route]){
                    routesDone[route] = Object.assign({}, routeList[route]);
                }
                var method = routesDone[route].method || "get";
    
                app[method](route, (req, res) => {
                    var routeList = loadModule(routes);
                    var thisRoute = Object.keys(routesDone).find(r=>r==route);
    
                    var callback;
                    
                    if(routeList[thisRoute]){
                        callback = routeList[thisRoute].callback;
                    } else {
                        callback = routesDone[thisRoute].callback;
                    }
                    callback(req, res);
                });
            });
    
            next();
        });

    } else {
        var routeList = routes;
        Object.keys(routeList).forEach(route => {
            var method = routeList[route].method || "get";
            var callback = routeList[route].callback;

            app[method](route, callback);
        });
    }
}