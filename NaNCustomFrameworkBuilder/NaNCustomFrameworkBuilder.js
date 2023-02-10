const componentRequisition = [];

const NaNFrameworkBuild = (componentDir, useSave) => {
    const customElementName = "NCF_";

    /**
     * Returns a random unique identificator.
     * @returns {string} String containing a random unique identificator.
     */
    function uuid() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    /**
     * Returns String with the name of the operating system: windows | ios | mac | android | linux | unknown.
     */
    const getOs = () => {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        if (userAgent.indexOf("Win") != -1) return "windows";

        if (userAgent.indexOf("like Mac") != -1) return "ios";

        if (userAgent.indexOf("Mac") != -1) return "mac";

        if (userAgent.indexOf("Android") != -1) return "android";

        if (userAgent.indexOf("Linux") != -1) return "linux";

        return "unknown";
    }

    /**
     * Returns if device is mobile.
     * @returns {boolean} boolean
     */
    const isMobile = () => {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0,4));
    }


    
    /**
     * 
     * @param {Boolean} getVals 
     * @returns {["opera" | "firefox" | "safari" | "internet explorer" | "ie" | "msie" | "microsoft internet explorer" | "edge old" | "old edge" | "chrome" | "google chrome" | "edge" | "edge chromium" | "electron"]} opera | firefox | safari | internet explorer | ie | msie | microsoft internet explorer | edge old | old edge | chrome | google chrome | edge | edge chromium | electron
     * 
     */
    const getBrowser = (getVals) => {
        var retStr = ["unknown", "any", "*"];
        var retAllVals = "";

        function isElectron() {
            // Renderer process
            if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
                return true;
            }
        
            // Main process
            if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
                return true;
            }
        
            // Detect the user agent when the `nodeIntegration` option is set to true
            if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
                return true;
            }
        
            return false;
        }

        // Opera 8.0+
        var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        if(isOpera || getVals){
            retStr = ["opera"];
            retAllVals += retStr.map(e=>`"${e}"`).join(" | ") + " | "; 
        }

        // Firefox 1.0+
        var isFirefox = typeof InstallTrigger !== 'undefined';
        if(isFirefox || getVals){
            retStr = ["firefox"];
            retAllVals += retStr.map(e=>`"${e}"`).join(" | ") + " | "; 
        }

        // Safari 3.0+ "[object HTMLElementConstructor]" 
        var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
        if(isSafari || getVals){
            retStr = ["safari"];
            retAllVals += retStr.map(e=>`"${e}"`).join(" | ") + " | "; 
        }

        // Internet Explorer 6-11
        var isIE = /*@cc_on!@*/false || !!document.documentMode;
        if(isIE || getVals){
            retStr = ["internet explorer", "ie", "msie", "microsoft internet explorer"];   
            retAllVals += retStr.map(e=>`"${e}"`).join(" | ") + " | "; 
        }

        // Edge 20+
        var isEdge = !isIE && !!window.StyleMedia;
        if(isEdge || getVals){
            retStr = ["edge old", "old edge"];
            retAllVals += retStr.map(e=>`"${e}"`).join(" | ") + " | "; 
        }

        // Chrome 1 - 79
        var isChrome = (!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)) || navigator.userAgent.indexOf("Chrome") != -1;
        if(isChrome || getVals){
            retStr = ["chrome", "google chrome"];
            retAllVals += retStr.map(e=>`"${e}"`).join(" | ") + " | "; 
        }

        // Edge (based on chromium) detection
        var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);
        if(isEdgeChromium || getVals){
            retStr = ["edge", "edge chromium"];
            retAllVals += retStr.map(e=>`"${e}"`).join(" | ") + " | "; 
        }

        // Electron detection
        if(isElectron() || getVals){
            retStr = ["electron"];
            retAllVals += retStr.map(e=>`"${e}"`).join(" | "); 
        }

        return getVals? retAllVals: retStr;
    }



    /**
     * Return a random number based o a seed.
     * @param {String} str - Seed to generate a random number.
     * @returns {Number} Random number.
     */
    function seededRng(str) {
        let h1 = 1779033703;
        for (let i = 0, k; i < str.length; i++) {
            k = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ k, 597399067);
        }
        h1 = Math.imul((h1 >>> 18), 597399067)
        return h1;
    }
    

    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

    /**
     * Runs evaluation of a string into a custom scope.
     * @param {String} script - String to be evaluated.
     * @param {String} header - String contain minnor settings like "use strict";
     * @param {Object.<string, *>} [scope] - The scope in what it will be evaluated.
     * @return {null} null
     */
    const scopedEval = (script, options = {}, scope = {}) => (options.async? AsyncFunction: Function)(`${options.useStrict?'"use strict";':""} ${script}`).bind(scope)();

    /**
     * Return information of a HTML sythax string by a given HTML tag name.
     * @param {String} htmlStr - String containing HTML Synthax.
     * @param {String} tag - String containing the wanted HTML tag name. 
     * @returns {Array.<{attributes: any, innerHTML: string, from: string}>} Object Array containing wanted HTML information: attribrutes | innerHTML | from.
     */
    const componentValues = (htmlStr, tag) => { 
        var reg = new RegExp("(?<=<"+tag+")((.|\n)*?)(?=<\/"+tag+")", "gm");

        var auxTextArea = document.createElement("textarea");
            auxTextArea.value = htmlStr;
        
        var mathcList = auxTextArea.value.match(reg);

        return mathcList?.map(m => {
            var replaceToSplit = "replacedHere_"+uuid();
            var n = m.replace(">", replaceToSplit);

            var retObj = {
                tag, 
                innerHTML: n.split(replaceToSplit)[1],
                from: htmlStr
            }
            retObj.attributes = getAttributes(n.split(replaceToSplit)[0], retObj);

            return retObj;
        })
    }
    
    /**
     * Return a Object with all attributes given by a string. 
     * @param {String} str - String containing the attributes. Examples: text between < and > excluding the first word of: \<mytag attribute1="val" attribute2="val" attributeN="val">
     * @returns {Object.<string, string>} Object containing all givem attributes.
     */
    const getAttributes = (str, parent) => {
        var singleWords = ["async", "global", "loadonce"];
        var auxStr = str;
        singleWords.forEach(w => {
            auxStr = auxStr.replaceAll(w, w+'="true"')
        });

        var attributeList = auxStr.match(/([^\r\n\t\f\v= '"]+)(?:=(["'])?((?:.(?!\1?\s+(?:\S+)=|\1))+.)\1?)?/gm);
        //var attributeList = str.match(/([^\r\n\t\f\v= '"]+)(?:=(["'])?((?:.(?!\2?\s+(?:\S+)=|\2))+.)\2?)?/gm);

        var retObj = {};

        Object.defineProperty(retObj, "_NaNComponentAtributeParent", {
            enumerable: false,
            value: parent
        });

        attributeList?.forEach(a => {
            var replaceToSplit = "replacedHere_"+uuid();
            var n = a.replace("=", replaceToSplit);

            var attrName = n.split(replaceToSplit)[0];
            var attrValue = n.split(replaceToSplit)[1];

            var value = attrValue?.slice(1, attrValue.length-1);
            retObj[attrName] =  value=="true"? true: 
                                !isNaN(value)? parseFloat(value): value;
        });

        return retObj;
    }

    /**
     * Return list of CSS rules organized by its selector.
     * @param {String} str - String containing CSS synthax.
     * @returns {Array.<{selector: string, style: string}>}
     */ // deprecated
    const getCss = (str) => {
        var selectors = str.split("{").map(s=>{
            var splitStr = s.split("}");
            return splitStr[splitStr.length-1]
        }).map(s=>s.replace(/^\s+|\s+$/gm,' '))
            .filter(s=>s.replaceAll(" ",""));
    
        var styles = str.split("{")
            .filter(s=>s.includes("}"))
            .map(s=>s.split("}")[0]);
    
    
        return selectors.map((selector, i)=>{return {
            selector,
            style: styles[i]
        }})
    }
    
    /**
     * Set onload event on a givem DOM element. If theres a error on the onload event, the promisse is rejected.
     * @param {HTMLElement} element - Wanted DOM element to set onload.
     * @returns {Promise} Promisse of this event.
     */
    function setOnload(element){
        return new Promise((resolve, reject)=>{                        
            element.addEventListener("load", function() {
                return resolve(1);
            });
            
            element.addEventListener("error", function(){
                return reject();
            });
        })
    }


    const lsHandler = {
        getData: (from, ifNew="{}")=>{
            return JSON.parse(localStorage[from] || ifNew)
        },
        setData: (from, data={})=>{
            localStorage[from] = JSON.stringify(data);
            return data;
        }
    }


    const anyAInB = (arrA, arrB, arrBisString) => {
        if(!arrA) return false;
         
        return arrA.reduce((total, ae) => {
            return total || arrB.includes(ae);
        }, false);
    }


    
    /**
     * Search for NCF component then load it.
     */
    var divWait = document.createElement("div");
        divWait.style.zIndex = 9999999999999999999999999999999999;
        divWait.style.width = "100%";
        divWait.style.height = "100%";
        divWait.style.position = "absolute";
        divWait.style.top = "0";
        divWait.style.left = "0";
        divWait.style.background = "black";
        divWait.style.opacity = ".9";
        divWait.innerHTML = /* html */ `<style>
            .NaNComponentWaitingRollCircle {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                background: radial-gradient(transparent 40%, white 55%, transparent 60%);
                width: 200px;
                height: 200px;
                border-radius: 50%;
            }
            .NaNComponentWaitingRollLogo {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                font-family: sans-serif;  
                color: white;
                z-index: 2;
                text-decoration: none; 
                text-align: center;
            }
            .NaNComponentWaitingRoll {
                display: inline-block;
                position: absolute;
                width: 80px;
                height: 80px;     
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);           
            }
            .NaNComponentWaitingRoll.NaNComponentWaitingRollDot div {
                
                animation: NaNComponentWaitingRollDotAnim 3s cubic-bezier(0.5, 0, 0.5, 1)  infinite;
                transform-origin: 40px 40px;
            }
            .NaNComponentWaitingRoll div {
                animation: NaNComponentWaitingRoll 10s /*cubic-bezier(0.42, 0, 0.83, 1.35)*/ cubic-bezier(1,-2.96, 0.38, 4.3) infinite reverse;
                transform-origin: 40px 40px;
            }
            .NaNComponentWaitingRoll.NaNComponentWaitingRollDot div:after {
                
                background: white;
                border-radius: 50px; 
                box-shadow: none;
                clip-path: none;
                width: 7px;
                height: 7px;
                margin: -4px 0 0 -4px;
                animation: none;
            }
            .NaNComponentWaitingRoll div:after {
                content: " ";
                display: block;
                position: absolute;
                width: 100px;
                height: 100px;
                border-radius: 0;
                background: #910019;
                border-radius: 50px; 
                box-shadow: 0 0 10px 10px #910019;
                clip-path: polygon(0 0, 0 200%, 200% 200%);
                margin: -4px 0 0 -4px;
                animation: NaNComponentWaitingRollResize 10s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            }
            .NaNComponentWaitingRoll div:nth-child(1) {
                animation-delay: -0.036s;
            }
            .NaNComponentWaitingRoll div:nth-child(1):after {
                top: 63px;
                left: 63px;
            }
            .NaNComponentWaitingRoll div:nth-child(2) {
                animation-delay: -0.072s;
            }
            .NaNComponentWaitingRoll div:nth-child(2):after {
                top: 68px;
                left: 56px;
            }
            .NaNComponentWaitingRoll div:nth-child(3) {
                animation-delay: -0.108s;
            }
            .NaNComponentWaitingRoll div:nth-child(3):after {
                top: 71px;
                left: 48px;
            }
            .NaNComponentWaitingRoll div:nth-child(4) {
                animation-delay: -0.144s;
            }
            .NaNComponentWaitingRoll div:nth-child(4):after {
                top: 72px;
                left: 40px;
            }
            .NaNComponentWaitingRoll div:nth-child(5) {
                animation-delay: -0.18s;
            }
            .NaNComponentWaitingRoll div:nth-child(5):after {
                top: 71px;
                left: 32px;
            }
            .NaNComponentWaitingRoll div:nth-child(6) {
                animation-delay: -0.216s;
            }
            .NaNComponentWaitingRoll div:nth-child(6):after {
                top: 68px;
                left: 24px;
            }
            .NaNComponentWaitingRoll div:nth-child(7) {
                animation-delay: -0.252s;
            }
            .NaNComponentWaitingRoll div:nth-child(7):after {
                top: 63px;
                left: 17px;
            }
            .NaNComponentWaitingRoll div:nth-child(8) {
                animation-delay: -0.288s;
            }
            .NaNComponentWaitingRoll div:nth-child(8):after {
                top: 56px;
                left: 12px;
            }
            @keyframes NaNComponentWaitingRoll {
                0% {
                    transform: rotate(0deg); 
                }
                80%{
                    filter: blur(0px);
                }
                100% {
                    transform: rotate(calc(360deg * 2));
                    box-shadow: 0 0 10px green;
                }
            }
            @keyframes NaNComponentWaitingRollDotAnim {
                0% {
                    transform: rotate(0deg); 
                }
                100% {
                    transform: rotate(calc(360deg * 2));
                }
            }
            @keyframes NaNComponentWaitingRollResize {
                0% {
                    width: 7px;
                }
                50% {
                    width: 20px;
                }
                100% {
                    width: 7px;
                }
            }

        </style>
        <div class="NaNComponentWaitingRollCircle"></div>
        <a class="NaNComponentWaitingRollLogo" href="https://nan-nan-sempai.github.io/" target="_blank">NCF<br>loading</a>
        <div class="NaNComponentWaitingRoll"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <div class="NaNComponentWaitingRoll NaNComponentWaitingRollDot"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;

    document.body.prepend(divWait)
    var executeComponent = () => {
        document.querySelectorAll("*").forEach(async (el, elIndex, elList) => {
            if(elIndex == elList.length-1) divWait.remove();

            if(!el.tagName.startsWith(customElementName)) return;
            if(el.dataset.componentFullyLoaded) return;
            el.dataset.componentFullyLoaded = true;
            
            var component = el.tagName.slice(customElementName.length).toLowerCase();



            
            // PRE BUILD -################################################################################
            var componentContent;

            var dataLocation = "NaNComponentsLocalSave";
            var data = lsHandler.getData(dataLocation, "[]");

            var componentRequisitionFind = data.find(e=>e.component == component);
            componentRequisitionFind = useSave? componentRequisitionFind: undefined;

            if(!componentRequisitionFind || componentRequisitionFind?.header.needsreset){
                var req = await fetch(componentDir + component, {
                    headers: new Headers({
                        'setup': el.dataset.setup
                      })
                });
                var componentObj = await req.json(); 
                componentContent = componentObj.content;

                if(useSave){
                    data.push(componentObj);
                    lsHandler.setData(dataLocation, data);
                }
            } else {

                componentContent = componentRequisitionFind.content; 
            }

                



            var getBody = componentValues(componentContent, "body");

            if(!getBody){
                componentContent = /* html */ `
                    <body>
                        <p> - Empty or malformed component: '${componentDir + component}' - </p>
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
                `;

                getBody = componentValues(componentContent, "body");
            }



            
            el.componentName = component;

            el.reload = () => {
                el.innerHTML="";
                el.dataset.componentFullyLoaded = "";
                executeComponent();
            };

            el.outputData = () => el.dataset.output;
            el.outputJson = () => JSON.parse(el.dataset.output || "{}");




            var componentContainerId = component+"_"+uuid();


            
            
            var componentContainer = el; //document.createElement("div");
                componentContainer.dataset.componentId = componentContainerId; //id = componentContainerId;

                
            if(!document.querySelector("style[data-component-default-global-style-id="+component+"]")){
                var componentSetDisplayBlock = document.createElement("style");
                    componentSetDisplayBlock.innerHTML = `${el.tagName.toLocaleLowerCase()}{display: block;}`;
                    componentSetDisplayBlock.dataset.componentDefaultGlobalStyleId = component;
    
                document.head.append(componentSetDisplayBlock);
            };

            const checkDevice = (deviceStr) => {
                if(!deviceStr) return false;
                var forDevice = deviceStr.replace(/ +/g, " ").toLowerCase()
                            .replace(/ , |, | ,/gm, ",")
                            .split(",");

                var filter = ["mobile", "not mobile"];
                var filtered = forDevice.filter(d=>!filter.includes(d));
                var isEmpty = !filtered.length;

                // if device is "not mobile" and origin contains "mobile"
                var case1 = !isMobile() && forDevice.includes("mobile");

                // if device is "mobile" and origin contains "not mobile"
                var case2 = isMobile() && forDevice.includes("not mobile");

                // if device is not empty after filtering and doesnt includes actual OS 
                var case3 = !isEmpty && !filtered.includes(getOs());

                return case1 || case2 || case3;
            }

            const checkBrowser = (browserStr) => {
                if(!browserStr) return false;
                
                var fixed = browserStr.replace(/ +/gm, " ").toLowerCase()
                            .replace(/ , |, | ,/gm, ",")
                            .split(",");

                return !anyAInB(fixed, getBrowser())
            }










            // STYLE -################################################################################
            componentValues(componentContent, "style")?.forEach((s ,i )=> {

                if(checkDevice(s.attributes.device)) return;   
                if(checkBrowser(s.attributes.browser)) return;             
                
                if(s.attributes?.global){
                    var globalStyleId = component + "-" +seededRng(s.innerHTML);

                    if(document.querySelector("style[data-global-style-id="+globalStyleId+"]")) return;

                    var componentContainerStyle = document.createElement("style");

                    var cssStr = s.innerHTML;
                    componentContainerStyle.dataset.styleglobal = "";
                    componentContainerStyle.dataset.globalStyleId = globalStyleId;
                    
                    componentContainerStyle.innerHTML = cssStr;

                    if(componentContainerStyle.innerHTML) document.head.append(componentContainerStyle);
                    
                } else {

                    var componentStyleId = component;//+ "-" +seededRng(s.innerHTML);

                    if(document.querySelector("style[data-local-style-id="+componentStyleId+"]")) return;

                    var componentContainerStyle = document.createElement("style");
                    componentContainerStyle.dataset.styleselector = s.attributes.device;
                    componentContainerStyle.dataset.stylelocal = "";
                    componentContainerStyle.dataset.localStyleId = componentStyleId;

                    if(s.innerHTML){
                        document.head.append(componentContainerStyle);
                    };

                    fetch("./cssToJs", {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'}, 
                        body: JSON.stringify({cssToJs: s.innerHTML})
                    }).then(r=>r.json()).then(r => {

                        
                        const buildStr = (css, setComponentId = true) => {
                            var retStr;
                            if(css.type == "Rule"){
                                var selector = css.prelude.value;
                                if(setComponentId && selector != ":root") {
                                    //var componentIdentificator = "[data-component-id="+componentContainerId+"]";
                                    var componentIdentificator = el.tagName;
                                    selector = selector.replaceAll("body", componentIdentificator);
    
                                    selector = selector.startsWith(componentIdentificator)? selector: selector.split(",").map(s => componentIdentificator + " " + s).join(",");
                                }

                                retStr =  selector + "{" + css.block.children.map(b => b.property+":"+b.value.value + (b.important? "!important": "")).join(";")+";}";
                            }
                            if(css.type == "Atrule"){
                                var atrule = css.block.children.map(e => buildStr(e, (css.name=="keyframes"? false: true))).join(" ");
                                retStr = "@"+css.name + " " + css.prelude.value + "{" + atrule  + "}";
                            }

                            return retStr;
                        }
                        
                        componentContainerStyle.innerHTML = r.children.map(e=>buildStr(e)).join("");
                        
                    });
                    
                }
            });

















            
            // HTML -################################################################################
            getBody.every(b => {
                if(checkDevice(b.attributes.device)) return true;
                if(checkBrowser(b.attributes.browser)) return true;

                componentContainer.innerHTML += b.innerHTML;

                return false;

            });








            el.getOs = getOs;
            el.isMobile = isMobile;
            el.getBrowser = getBrowser;



            
            // SCRIPT -################################################################################

            /**
             * Loads scripts form a  list in a consecutive way, just runs next after previous has runned.
             * @param {Array.<{attributes: any, innerHTML: string, from: string}>} list - List with scripts to be executed.
             * @param {number} i - Index of the script.
             */
            const loadConsecutive = (list, i = 0) => {
                if(!list?.length) return;

                var s = list[i];

                if(!s) return;
                
                if(checkDevice(s.attributes.device)) return loadConsecutive(list, i+1);
                if(checkBrowser(s.attributes.browser)) return loadConsecutive(list, i+1);

                
                const setScope = (customScope, el) => {
                    customScope.componentGetSetupData = ()=>el.dataset.setup;
                    customScope.componentGetSetupJson = ()=>JSON.parse(el.dataset.setup || "{}");

                    customScope.componentGetData = ()=>el.dataset.data;
                    customScope.componentGetJson = ()=>JSON.parse(el.dataset.data || "{}");

                    customScope.componentSetData = (data) => el.dataset.data = data;
                    customScope.componentSetDataJson = (data)=>{
                        el.dataset.data = JSON.stringify(data);
                        return data;
                    };

                    customScope.componentSetOutput = (data) => el.dataset.output = data;
                    customScope.componentSetOutputJson = (data)=>{
                        el.dataset.output = JSON.stringify(data);
                        return data;
                    };

                    customScope.reload = el.reload;
                    customScope.getOs = el.getOs;
                    customScope.isMobile = el.isMobile;
                    customScope.getBrowser = el.getBrowser;

                    customScope.componentName = el.componentName;
                    customScope.componentElement = el;
                    customScope.global = window;
                    return customScope;
                }

                if(s.attributes?.selector){
                    var {selector} = s.attributes;
                    
                    var script = document.createElement("script");
                    script.type = "module";
                    script.innerHTML = `
                        var AsyncFunction = AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
                        var setScope = ${(setScope+"").replace(/(\r\n|\n|\r)/gm, " ")};
                        var scopedEval = ${scopedEval+""};

                        var componentId = "[data-component-id=${componentContainerId}]"; 
                        var componentContainer = document.querySelectorAll(componentId).forEach(c => {
                            var selector = "${selector}";

                            var adSpace = [",", ".", ":"];
                            var auxSelector = selector;
                            adSpace.forEach(w => auxSelector.replaceAll(w, " "+w+" "));

                            var replacedBodyReplace = "_*replaceBody*_";
                            var regex = new RegExp('\\\\b' + "body" + '\\\\b', "g");
                            var replacedBody = auxSelector.replace(regex, replacedBodyReplace);

                            replacedBody.split(",").forEach(sc => {
                                if(sc.includes(replacedBodyReplace)){
                                    scopedEval(`+"`"+s.innerHTML+"`"+`, {async: ${s.attributes?.async}}, setScope(c, document.querySelector(componentId)));
                                }
                            });
                            
                            var newReg = new RegExp('\\\\b' + "body" + '\\\\b', "g");
                            var removeBody = selector.replace(newReg, componentId);
                            if(!removeBody) return;

                            c.querySelectorAll(removeBody).forEach(cq => {
                                scopedEval(`+"`"+s.innerHTML+"`"+`, {async: ${s.attributes?.async}}, setScope(cq, document.querySelector(componentId)));
                            })
                        });
                    `
                    el.append(script);
                    loadConsecutive(list, i+1);



                    /* if(selector.split(" ")?.includes("body")){
                        var script = document.createElement("script");
                        script.type = "module";
                        script.innerHTML = ' var componentContainer = document.querySelector("[data-component-id='+componentContainerId+']"); var scopedEval = '+scopedEval+'; scopedEval(`'+s.innerHTML+'`, {async: '+s.attributes?.async+'}, setScope(componentContainer, componentContainer))';
                        
                        el.append(script);
                    }



                    if(selector.split(" ")?.includes("body")){
                        var script = document.createElement("script");
                        script.type = "module";
                        script.innerHTML = 'var AsyncFunction = AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;; var setScope = '+((setScope+"").replace(/(\r\n|\n|\r)/gm, " "))+'; var componentContainer = document.querySelector("[data-component-id='+componentContainerId+']"); var scopedEval = '+scopedEval+'; scopedEval(`'+s.innerHTML+'`, {async: '+s.attributes?.async+'}, setScope(componentContainer, componentContainer))';
                        
                        el.append(script);
                    }
                    
                    
                    var script = document.createElement("script");
                    script.type = "module";
                    script.innerHTML = 'var AsyncFunction = AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;; var setScope = '+((setScope+"").replace(/(\r\n|\n|\r)/gm, " "))+'; var componentContainer = document.querySelector("[data-component-id='+componentContainerId+']").querySelectorAll("'+selector+'");  var scopedEval = '+scopedEval+'; componentContainer?.forEach(thisEl=>{scopedEval(`'+s.innerHTML+'`, {async: '+s.attributes?.async+'}, setScope(thisEl, " ", document.querySelector("[data-component-id='+componentContainerId+']")))})';
                    
                    el.append(script); */


                    //#####################################################
                    //#####################################################
                    //#####################################################
                    //#####################################################


                    /* var {selector} = s.attributes;
    
                    var selectionList = componentContainer.querySelectorAll(selector);
                    if(selector.split(" ").includes("body")){
                        scopedEval(s.innerHTML, "", setScope(componentContainer));
                    }
    
                    selectionList.forEach(runS => {
                        scopedEval(s.innerHTML, "", setScope(runS));
                    });

                    loadConsecutive(list, i+1); */

                } else {
                    var script = document.createElement("script");
                    script.innerHTML = s.innerHTML; 
                
                    Object.keys(s.attributes).forEach(a => script.setAttribute(a, s.attributes[a]));

                    if(s.attributes?.loadonce){
                        var loadOnceScriptId = component + "-" +seededRng(s.innerHTML);

                        if(!document.querySelector("script[data-load-once-script-id="+loadOnceScriptId+"]")){
                            script.dataset.loadOnceScriptId = loadOnceScriptId;
                            document.querySelector("html").append(script);
                        } else {
                            loadConsecutive(list, i+1);
                        }

                    } else {
                        script.dataset.multiLoadScript = "";
                        el.append(script);
                    }

                    // IF HAS SRC WAIT FOR LOAD 
                    if(s.attributes?.src){
                        setOnload(script)
                            .then(() => {
                                loadConsecutive(list, i+1);
                            })
                            .catch((err) => {
                                console.warn("Failed on load Script from "+component+": " + err);
                                loadConsecutive(list, i+1);
                            });
                    } else {
                        loadConsecutive(list, i+1);
                    }
                }
                        
            }

            loadConsecutive(componentValues(componentContent, "script"));

        });
    }



    var observer = new MutationObserver(function(mutations) {
        executeComponent();
    });

    observer.observe(document, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
    });

}


const getNaNComputedHtml = () => document.querySelector("*").innerHTML.replaceAll("NaNFrameworkBuild", "").replaceAll("NaNCustomFrameworkBuilder", "");