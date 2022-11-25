/* var SPACE = '    ';
function toProperty(name){
 
 	if(name.charAt(0) == "-") name = name.slice(0);

	return name.replace(/[^a-z0-9]([a-z0-9])?/gi, function(v, l){
	       if(l) return l.toUpperCase();
	       return "";
	}) ;

}

function toSelectors(name){
	var names = name.split(",");

	return names.map(function(name){
    name = name.trim();
		var newName = "";

		if(name.charAt(0) == "."){
			newName += "_class";
			name = name.slice(1);
		}else if(name.charAt(0) == "#"){
			newName += "_id";
			name = name.slice(1);
		}else{
			newName += "_element";
		}

		return name.replace(/([^a-z0-9])([a-z0-9])?/gi, function(v, c, l){
		       if(l) return (c == "," || c == " ") ?  l.toLowerCase() : l.toUpperCase();
		       return "";
		}) + newName;

	});

}

function tokenizer(code){

	var tokens = [];
	var token = '';
	var whitespc = ['\r\n', '\n\r', '\n', '\r'];
	var lastChar = '\0';
	var nextChar = '\0';
	var char = '\0';
	var specialChars = ["{","}",":",";"];
	var specialCharsPB = ["{","}",";"];
	var sc = null;
	var inBrackets = false;

	for(var i = 0; i < code.length; i++){

		if(i) lastChar = code.charAt(i-1);
		char = code.charAt(i);
		if(i+1 < code.length) nextChar = code.charAt(i+1);

		if(~whitespc.indexOf(char) && ~whitespc.indexOf(lastChar)){
			continue;
		}
 
		sc = inBrackets ? specialChars : specialCharsPB;

		

		if(~sc.indexOf(char)){
			if(char == "{") inBrackets = true;
			if(char == "}") inBrackets = false;
			tokens.push(token);
			tokens.push(char);
			token = '';			
			continue;
		}

		token += char;

	}

	if(token) tokens.push(token);


	return tokens
			.map(function(token){ return token.trim(); })
			.filter(function(token){ return token; });

}

function repeat(char, times){
	if(times) return repeat(char, times-1) + char;
	return "";
}

function convertoToJS(tokens){

	var items = [];
	var actualItem = null;
	var actualProp = null;
	function readSelector(token){

		 
		var selectors = toSelectors(token);

		actualItem = {
			originalValue: token,
			selectors: selectors,
			values: {}
		};

 		actualProp = null;
 		items.push(actualItem);

		return readBracketO;
	}

	function readBracketO(token){

		if(token != "{") console.log("cssToJs Error: Era esperado um '{' ");

		return readProperty;
	}

	function readBracketC(token){
		if(token != "}") console.log("cssToJs Error: Era esperado um '}' ");
		return readSelector;
	}

	function readDefinition(token){
		if(token != ":") console.log("cssToJs Error: Era esperado um ':' ");

		return readValue;
	}

	function readProperty(token){

		if(token == "}") return readBracketC(token);

		var property = toProperty(token);
 		actualProp = property;

		if(!actualItem.values[property]){
			actualItem.values[property] = [];
		}

		return readDefinition;
	}

	function readValue(token){

		actualItem.values[actualProp].push(token);

		return readFinal;
	}

	function readFinal(token){
		if(token == "}") return readBracketC(token);
		if(token != ";")  console.log("cssToJs Error: Era esperado um ';' ");
		return readProperty;
	}

 
	var nextAction = readSelector;
	var i = 0;
	tokens.forEach(function(token){
		i++;
		nextAction = nextAction(token);		

	});

	return renderJS(items);

}

function renderJS(items){

	var objects = ["return {"];
	objects = objects.concat(items.map(renderItem).join(","));
	objects.push("}");
	return objects.join("\n");
}

function renderItem(item){

	var code = ["\n//" + item.originalValue];

	var properties = [];

	for(var prop in item.values){

		var propitem = {
			name: prop,
			value: item.values[prop][item.values[prop].length - 1]
		};
		var markup = '"';
		if(~propitem.value.indexOf('"')) {
      markup = "'";
      propitem.value = propitem.value.replace(/'/gi, "\\'");
    }
		properties.push(SPACE + SPACE +  propitem.name + ": " + markup + propitem.value + markup);

	}

	properties = properties.map(function(x){ return SPACE +  x; });	

	item.selectors.forEach(function(i){

		code.push(SPACE + i + ": {");
		code.push(properties.join(",\n"));
		code.push(SPACE + "}" + (item.selectors.length? ",": ""));

	});

	return code.join("\n");

}

var txt = document.querySelector("textarea");
var code = document.querySelector("code");


const getCss = (str) => {
    return convertoToJS(tokenizer(str)).replaceAll(",,", ",");
} */


function parseCSSText(cssText) {
    var cssTxt = cssText.replace(/\/\*(.|\s)*?\*\//g, " ").replace(/\s+/g, " ");
    var style = {}, [,ruleName,rule] = cssTxt.match(/ ?(.*?) ?{([^}]*)}/)||[,,cssTxt];
    var cssToJs = s => s.replace(/\W+\w/g, match => match.slice(-1).toUpperCase());
    var properties = rule.split(";").map(o => o.split(":").map(x => x && x.trim()));
    for (var [property, value] of properties) if(property) style[cssToJs(property)] = value;
	
    return {/* cssText, */ selector: ruleName, style};
}

const cssToJs = (str) => {
	return str.split("}").filter(s=>s!="  ").map(s => parseCSSText(s+"}")).filter(s=>s.selector);
}

//#####

