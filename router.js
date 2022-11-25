const fs = require("fs");

var routeList = [
    {
        route: "/", exec: (req, res, dirname) => {
            res.sendFile(dirname + "/html/index.html");
        }
    },
    
    {
        route: "/NCF_component/*", exec: (req, res, dirname) => {
            var component = req.url.replace("/NCF_component/","");
            var fullUrl = dirname + "/components/" + component + ".html";

            if (fs.existsSync(fullUrl)) {
                res.sendFile(fullUrl);

            } else {
                res.sendFile(dirname + "/components/def_notFound.html");
            }
        }
    }
]



module.exports = (req, res, dirname) => {
    console.log("Loaded");
    console.clear()

    var findRoute = routeList.find(({route}) => {
        // if route exists
        var condition1 = route == req.url;
        // if route accepts any
        var condition2 = route.includes("*") && req.url.startsWith(route.replace("*", ""));

        return condition1 || condition2
    });


    if(findRoute){
        findRoute.exec(req, res, dirname);
        
    } else {
        var fullUrl = dirname + "/html" + req.url;

        if (fs.existsSync(fullUrl)) {
            res.sendFile(fullUrl);

        } else {
            res.send(`// Requisition not found: ${req.url}`);
        }
    }
}