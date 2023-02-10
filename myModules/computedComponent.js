
/**
 * Return a Object with all attributes given by a string. 
 * @param {String} str - String containing the attributes. Examples: text between < and > excluding the first word of: \<mytag attribute1="val" attribute2="val" attributeN="val">
 * @returns {Object.<string, string>} Object containing all givem attributes.
 */
 const getAttributes = (str) => {
    var singleWords = ["needsreset"];
    var auxStr = str;
    singleWords.forEach(w => {
        auxStr = auxStr.replaceAll(w, w+'="true"')
    });

    var attributeList = auxStr.match(/([^\r\n\t\f\v= '"]+)(?:=(["'])?((?:.(?!\1?\s+(?:\S+)=|\1))+.)\1?)?/gm);
    //var attributeList = str.match(/([^\r\n\t\f\v= '"]+)(?:=(["'])?((?:.(?!\2?\s+(?:\S+)=|\2))+.)\2?)?/gm);

    var retObj = {};

    attributeList?.forEach((a, i) => {
        var replaceToSplit = "replacedHere_"+i;
        var n = a.replace("=", replaceToSplit);


        var attrName = n.split(replaceToSplit)[0];
        var attrValue = n.split(replaceToSplit)[1];

        attrValue = attrValue.replace(/ +/gm, " ");
        attrValue = attrValue.startsWith(" ")? attrValue.slice(1):
                    attrValue.endsWith(" ")? attrValue.slice(0, attrValue.length-1): attrValue;

        var value = attrValue?.slice(1, attrValue.length-1);
        retObj[attrName] =  value=="true"? true: 
                            !isNaN(value)? parseFloat(value): value;
    });

    return retObj;
}


module.exports = (componentObj, insetValues) => {
    var componentStr = componentObj.content;
    
    componentObj.header = {};

    //get HTML coment
    /* var removeHtmlComments = componentStr?.match(/(?=<!--)(.|[\s\S])*?(?<=-->)/gm);
    removeHtmlComments?.forEach(n => {
        
        if(n.startsWith("<!-- ncf") || n.startsWith("<!--ncf")) return;

        componentObj.content = componentObj.content.replace(n, "");
    }); */


    
    var componentHeader = componentStr.match(/(?=<!-- ncf-header|<!--ncf-header)(.|[\s\S])*?(?<=-->)/gm);

    componentHeader?.forEach((n, i) => {
        var m = n;
        m = m.replace(/(<!-- ncf-header|<!--ncf-header|-->)/gm, "");

        Object.assign(componentObj.header, getAttributes(m));

    })

    var htmlMatches = componentStr.match(/(?=<!-- ncf|<!--ncf)(.|[\s\S])*?(?<=-->)/gm);

    htmlMatches?.forEach((n, i) => {
        var m = n;
        m = m.replace(/(<!-- ncf|<!--ncf|-->)/gm, "");

        var retStr = "";

        try {
            retStr = eval("(function(){const componentSetupValue='"+insetValues.setup+"'; "+m+"})()");
        } catch (e) {
            var errorMsg = "An error occurred while computing the Component <b><i>'"+componentObj.component+"'</i></b> at <b><i>execute_html_comment "+i+"</i></b>:<br><br>" + (e+"").replaceAll("\n", "<br>");
            retStr = "/*\nCOMPUTED_COMPONENT_ERROR{"+ errorMsg +"\n\n\ "+m+"} */"; 
            retStr = "COMPUTED_COMPONENT_ERROR{<br>"+ errorMsg +"<br><br>'<i>"+m+"</i>'<br>}"; 
        }


        componentObj.content = componentObj.content.replace(n, retStr);
    });

    var cssNjsMatches = componentStr.match(/(?=\/\* ncf|\/\*ncf)(.|[\s\S])*?(?<=\*\/)/gm);
    cssNjsMatches?.forEach((n, i) => {
        var m = n;
        m = m.replace(/(\/\* ncf|\/\*ncf|\*\/)/gm, "");

        var retStr = "";

        try {
            retStr = eval("(function(){const componentSetupValue='"+insetValues.setup+"'; "+m+"})()");
        } catch (e) {
            var errorMsg = "An error occurred while computing the Component '"+componentObj.component+"' at execute_css_or_js_comment "+i+":" + (e+"");
            retStr = "/*\nCOMPUTED_COMPONENT_ERROR{"+ errorMsg +"\n\n\ "+m+"} */"; 
        }


        componentObj.content = componentObj.content.replace(n, retStr);
    });

    var jsSimpleMatches = componentStr.match(/(?=\/\/ ncf|\/\/ncf).*/gm);
    jsSimpleMatches?.forEach((n, i) => {
        var m = n;
        m = m.replace(/(\/\/ ncf|\/\/ncf)/gm, "");

        var retStr = "";
        
        try {
            retStr = eval("(function(){const componentSetupValue='"+insetValues.setup+"'; "+m+"})()");
        } catch (e) {
            var errorMsg = "An error occurred while computing the Component '"+componentObj.component+"' at execute_simple_js_comment "+i+":" + (e+"");
            retStr = "/*\nCOMPUTED_COMPONENT_ERROR{"+ errorMsg +"\n\n\ "+m+"} */"; 
        }


        componentObj.content = componentObj.content.replace(n, retStr);
    });
} 