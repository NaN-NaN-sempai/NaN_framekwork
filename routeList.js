const fs = require("fs");
var reloadModule = require("./myModules/reloadModule");
const cssToJs = reloadModule("./myModules/cssToJs");
const computedComponent = reloadModule("./myModules/computedComponent");

var neededRoutes = {
    "/NaNCustomFrameworkBuilder": {
        callback: (req, res) => {
            res.sendFile(__dirname + "/NaNCustomFrameworkBuilder/NaNCustomFrameworkBuilder.js");
        }
    },
    
    "/cssToJs": {
        method: "post",
        callback: (req, res) => {
            var data = req.body;
    
            res.send(cssToJs(data.cssToJs));
        }
    },

    "/scripts/*": {
        callback: (req, res)=>{
            res.sendFile(__dirname+ "/html" +req.url);
        }
    },
    
    "/NCF_component/*": {        
        callback: (req, res) => {
            var component = req.url.replace("/NCF_component/","");
            var fullUrl = __dirname + "/componentsNotComputed/" + component + ".html";

            if (fs.existsSync(fullUrl)) {
                var content = fs.readFileSync(fullUrl, 'utf8');
                
                var send = {
                    component,
                    lastSent: new Date().getTime(),
                    error: false,
                    content
                }
                
                res.send(JSON.stringify(send));
    
            } else {
                var send = {
                    component: "NCF COMPONENT NOT FOUND !",
                    lastSent: new Date().getTime(),
                    error: true,
                    content: /* html */ `
                    <body>
                        <p> NCF COMPONENT NOT FOUND ! </p>
                    </body>
                    <style>
                        p { 
                            color: white;
                            background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
                            
                            background-size: 1800% 1800%;
                            user-select: none;
                            cursor: not-allowed;
                            font-family: sans-serif;
                            text-align: center;
                            text-shadow: 0 2px 3px black;
    
                            padding: 10px;
                            border-radius: 50px;
                            
                            --notFoundComponentAnimation: notFoundComponentAnimationKeyFrame 5s infinite;
                            
                            -webkit-animation: var(--notFoundComponentAnimation);
                            -z-animation: var(--notFoundComponentAnimation);
                            -o-animation: var(--notFoundComponentAnimation);
                            animation: var(--notFoundComponentAnimation);
                        }
                    </style>
                    <style global>
                        @-webkit-keyframes notFoundComponentAnimationKeyFrame {
                            0%{background-position:0% 82%}
                            50%{background-position:100% 19%}
                            100%{background-position:0% 82%}
                        }
                        @-moz-keyframes notFoundComponentAnimationKeyFrame {
                            0%{background-position:0% 82%}
                            50%{background-position:100% 19%}
                            100%{background-position:0% 82%}
                        }
                        @-o-keyframes notFoundComponentAnimationKeyFrame {
                            0%{background-position:0% 82%}
                            50%{background-position:100% 19%}
                            100%{background-position:0% 82%}
                        }
                        @keyframes notFoundComponentAnimationKeyFrame { 
                            0%{background-position:0% 82%}
                            50%{background-position:100% 19%}
                            100%{background-position:0% 82%}
                        }
                    </style>
                `
                }
                res.send(JSON.stringify(send));
            }

    
            
        }
    },
    "/never": () => {},

    "/NCF_computedComponents/*": {        
        callback: (req, res) => {
            var component = req.url.replace("/NCF_computedComponents/","");
            var fullUrl = __dirname + "/components/" + component + ".html";

            if (fs.existsSync(fullUrl)) {
                var content = fs.readFileSync(fullUrl, 'utf8');
                
                var send = {
                    component,
                    lastSent: new Date().getTime(),
                    error: false,
                    content
                }

                computedComponent(send, {setup: req.headers.setup});
                
                res.send(JSON.stringify(send));
    
            } else {
                var send = {
                    component: "NCF COMPUTED COMPONENT NOT FOUND !",
                    lastSent: new Date().getTime(),
                    error: true,
                    content: /* html */ `
                    <body>
                        <p> NCF COMPUTED COMPONENT NOT FOUND ! </p>
                    </body>
                    <style>
                        p { 
                            color: white;
                            background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
                            
                            background-size: 1800% 1800%;
                            user-select: none;
                            cursor: not-allowed;
                            font-family: sans-serif;
                            text-align: center;
                            text-shadow: 0 2px 3px black;
    
                            padding: 10px;
                            border-radius: 50px;
                            
                            --notFoundComponentAnimation: notFoundComponentAnimationKeyFrame 5s infinite;
                            
                            -webkit-animation: var(--notFoundComponentAnimation);
                            -z-animation: var(--notFoundComponentAnimation);
                            -o-animation: var(--notFoundComponentAnimation);
                            animation: var(--notFoundComponentAnimation);
                        }
                    </style>
                    <style global>
                        @-webkit-keyframes notFoundComponentAnimationKeyFrame {
                            0%{background-position:0% 82%}
                            50%{background-position:100% 19%}
                            100%{background-position:0% 82%}
                        }
                        @-moz-keyframes notFoundComponentAnimationKeyFrame {
                            0%{background-position:0% 82%}
                            50%{background-position:100% 19%}
                            100%{background-position:0% 82%}
                        }
                        @-o-keyframes notFoundComponentAnimationKeyFrame {
                            0%{background-position:0% 82%}
                            50%{background-position:100% 19%}
                            100%{background-position:0% 82%}
                        }
                        @keyframes notFoundComponentAnimationKeyFrame { 
                            0%{background-position:0% 82%}
                            50%{background-position:100% 19%}
                            100%{background-position:0% 82%}
                        }
                    </style>
                `
                }
                res.send(JSON.stringify(send));
            }

    
            
        }
    }
}


var routeList = {
    "/": {
        callback: (req, res) => {
            res.sendFile(__dirname + "/html/index.html");
        }
    },

    "/color": {
        callback: (req, res) => {
            res.sendFile(__dirname + "/html/pages/colorInput.html");
        }
    },

    "/nodep": {
        callback: (req, res) => {
            res.sendFile(__dirname + "/html/pages/nodep.html");
        }
    },

    "/computed": {
        callback: (req, res) => {
            res.sendFile(__dirname + "/html/pages/computed.html");
        }
    },
}

Object.assign(routeList, neededRoutes)

module.exports = routeList;