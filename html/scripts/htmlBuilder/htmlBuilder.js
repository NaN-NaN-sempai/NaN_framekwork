const componentRequisition = {};

const buildHtml = (componentDir) => {
    const customElementName = "NCF_";

    function uuid() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    const scopedEval = (script, scope = {}) => Function(`"use strict"; ${script}`).bind(scope)();

    const componentValues = (htmlStr, tag) => {
        window. reg =new RegExp("(?<=<"+tag+")((.|\n)*?)(?=<\/"+tag+")", "gm");
        
        var mathcList = htmlStr.replace(/^\s+|\s+$/gm,' ').match(reg);

        return mathcList?.map(m => {
            var replaceToSplit = "replacedHere_"+uuid();
            var n = m.replace(">", replaceToSplit);
            return {
                attributes: getAttributes(n.split(replaceToSplit)[0]), 
                innerHTML: n.split(replaceToSplit)[1],
                from: htmlStr
            }
        })

    }

    const getAttributes = (str) => {
        var attributeList = str.match(/([^\r\n\t\f\v= '"]+)(?:=(["'])?((?:.(?!\2?\s+(?:\S+)=|\2))+.)\2?)?/gm);
        var retObj = {};
        attributeList?.forEach(a => {
            var replaceToSplit = "replacedHere_"+uuid();
            var n = a.replace("=", replaceToSplit);

            var attrName = n.split(replaceToSplit)[0];
            var attrValue = n.split(replaceToSplit)[1];

            retObj[attrName] = attrValue.slice(1, attrValue.length-1);
        });

        return retObj;
    }

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

    var executeComponent = () => {
        document.querySelectorAll("*").forEach(async el => {
            if(!el.tagName.startsWith(customElementName)) return;
            if(el.dataset.componentFullyloaded) return;
            el.dataset.componentFullyloaded = true;
            
            el.reload = () => {
                el.innerHTML="";
                el.dataset.componentFullyloaded = "";
                executeComponent();
            }

    
            var component = el.tagName.slice(customElementName.length).toLowerCase();
            
            var text;
            if(!componentRequisition[component]){
                var req = await fetch(componentDir + component);
                text = await req.text();
                componentRequisition[component] = text;

            } else {
                text = componentRequisition[component];
            }
            var componentText = text
    
            var componentContainerId = "component_"+uuid();

            var componentContainerStyle = document.createElement("style");

            var getBody = componentValues(componentText, "body");

            if(!getBody) return el.innerHTML = "- Empty or malformed '" + componentDir + "' Component -"
            
            var componentContainer = document.createElement("div");
                componentContainer.id = componentContainerId;
                componentContainer.innerHTML = getBody[0]?.innerHTML;
    


            /* ADIICONAR STYLE GLOBAL PARA ESTILIZAR FORA DOS ESCOPOS DOS COMPONENTES */
            
            componentValues(componentText, "style")?.forEach(s => {
                var styleElements = getCss(s.innerHTML);

                var cssStr = styleElements.map(cs => {
                    var minCs = cs.selector.replace(/^\s+|\s+$/gm,' ');
                    var selector = minCs.replace(/^\s+|\s+$/gm,'') == "body"? "#"+componentContainerId: "#"+componentContainerId + " " + minCs;
                    var innerStyle = cs.style; 

                    return selector + " { " + innerStyle + " } "

                }).join(""); 

                componentContainerStyle.innerHTML = cssStr;
            })
    
            componentValues(componentText, "script")?.forEach(s => {
                if(s.attributes?.selector){
                    var {selector} = s.attributes;
    
                    var selectionList = componentContainer.querySelectorAll(selector);
                    if(selector.includes("body")){
                        componentContainer.componentData = JSON.parse(el.dataset.insert||"{}");
                        componentContainer.componentElement = el;
                        scopedEval(s.innerHTML, componentContainer);
                    }
    
                    selectionList.forEach(runS => {
                        runS.componentData = JSON.parse(el.dataset.insert||"{}");
                        runS.componentElement = el;
                        scopedEval(s.innerHTML, runS);
                    });
                    
                }
            });

            el.append(componentContainerStyle.innerHTML? componentContainerStyle: "", componentContainer);
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