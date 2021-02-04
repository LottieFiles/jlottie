const xmlns = "http://www.w3.org/2000/svg";

///////////// BEZIER

function bezierCurve(p1, c1, c2, p2, fromT, toT) {
	var newNodes = new Array();

	if (c1.hasOwnProperty('x')) {
	} else {
		if (c1.length >= 1) {
			c1.x = c1[0];
			c1.y = c1[1];
		}
	}
	if (c2.hasOwnProperty('x')) {
	} else {
		if (c2.length >= 1) {
			c2.x = c1[0];
			c2.y = c1[1];
		}
	}
	var frames = toT - fromT;
	var timeTick;
	var oneMinusT;
	var currentFrame = fromT;
	for (var i = 1; i < frames; i++) {
		timeTick = i / frames;
		oneMinusT = (1 - timeTick);
		newNodes.push({'_comp': 1});
		currentFrame++;
		newNodes[newNodes.length - 1]._frame = currentFrame;
		newNodes[newNodes.length - 1].s = new Array();
		newNodes[newNodes.length - 1].s.push((Math.pow(oneMinusT, 3) * p1[0]) + 
							(3 * Math.pow(oneMinusT, 2) * timeTick * c1.x) +
							(3 * oneMinusT * Math.pow(timeTick, 2) * c2.x) +
							(Math.pow(timeTick, 3) * p2[0]));
		newNodes[newNodes.length - 1].s.push((Math.pow(oneMinusT, 3) * p1[1]) + 
							(3 * Math.pow(oneMinusT, 2) * timeTick * c1.y) +
							(3 * oneMinusT * Math.pow(timeTick, 2) * c2.y) +
							(Math.pow(timeTick, 3) * p2[1]));
		//console.log(p1[0] + " " + newNodes[newNodes.length - 1].s[0]);
	}
	//console.log("done !");

	return newNodes;
}

///////////// BUILD SCENE GRAPH


function extrapolateValueKeyframe(valueKeyframeObj) {

	return valueKeyframeObj;
}

function extrapolateOffsetKeyframe(offsetKeyframeObj, refKey) {
	var i = 0;
	var objLength = offsetKeyframeObj[refKey].k.length;
	var oldLength = objLength;
	//console.log("going in");
	while (i < (objLength - 1)) {
		if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('_comp')) {
		} else {
			if (offsetKeyframeObj[refKey].k[i + 1].hasOwnProperty('i') && offsetKeyframeObj[refKey].k[i].hasOwnProperty('o')) {
				//console.log("computing 1");
				offsetKeyframeObj[refKey].k.splice((i + 1), 0, 
												bezierCurve(offsetKeyframeObj[refKey].k[i].s,
												offsetKeyframeObj[refKey].k[i].o,
												offsetKeyframeObj[refKey].k[i + 1].i,
												offsetKeyframeObj[refKey].k[i + 1].s,
												offsetKeyframeObj[refKey].k[i].t,
												offsetKeyframeObj[refKey].k[i + 1].t)
											);
			} else {
				if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('o')) {
					//console.log("computing 2");
					offsetKeyframeObj[refKey].k.splice((i + 1), 0, 
													bezierCurve(offsetKeyframeObj[refKey].k[i].s,
													offsetKeyframeObj[refKey].k[i].o,
													{x:0, y:0},
													offsetKeyframeObj[refKey].k[i + 1].s,
													offsetKeyframeObj[refKey].k[i].t,
													offsetKeyframeObj[refKey].k[i + 1].t)
												);
				} else {
					//console.log("computing 3");
					offsetKeyframeObj[refKey].k.splice((i + 1), 0, 
													bezierCurve(offsetKeyframeObj[refKey].k[i].s,
													{x:0, y:0},
													{x:0, y:0},
													offsetKeyframeObj[refKey].k[i + 1].s,
													offsetKeyframeObj[refKey].k[i].t,
													offsetKeyframeObj[refKey].k[i + 1].t)
												);
				}
			}
			//console.log("computed");
			
			objLength = offsetKeyframeObj[refKey].k.length;
			i = (i + (objLength - oldLength));
			oldLength = objLength;
		}
		i = i + 1;
	}
	return offsetKeyframeObj;
}

function getPosition(currentObj, parentObj, refKey) {
	if (currentObj.hasOwnProperty(refKey)) {
		if (currentObj[refKey].hasOwnProperty('k')) {
			if (currentObj[refKey].k[0].hasOwnProperty('s')) {
				currentObj = extrapolateOffsetKeyframe(currentObj, refKey);
			}
		}
	}
	return currentObj;
}

function prepShapeSh(shapeObj, referrer) {
	//console.log("prep shape");
	var newShape = document.createElement('path');
	if (shapeObj.ks.k.hasOwnProperty('v')) {
	} else {
		return;
	}
	var dataString = "M" + shapeObj.ks.k.v[0][0] + "," + shapeObj.ks.k.v[0][1];
	for (var i = 1; i < shapeObj.ks.k.v.length; i++) {
		dataString = dataString + " C" + (shapeObj.ks.k.v[i - 1][0] + shapeObj.ks.k.o[i - 1][0]) + "," + (shapeObj.ks.k.v[i - 1][1] + shapeObj.ks.k.o[i - 1][1]) + " " + (shapeObj.ks.k.v[i][0] + shapeObj.ks.k.i[i][0]) + "," + (shapeObj.ks.k.v[i][1] + shapeObj.ks.k.i[i][1]) + " " + shapeObj.ks.k.v[i][0] + "," + shapeObj.ks.k.v[i][1];
	}
	shapeObj._data = dataString;
	var newShape = document.createElementNS(xmlns, 'path');
	newShape.setAttribute("d", dataString);
	newShape.setAttribute("stroke", "black");
	newShape.setAttribute("fill", "transparent");
	newShape.setAttribute("id", "_shape" + shapeObj._shape);
	if (shapeObj.ks.k.c) {
		newShape.setAttribute("closepath", null);
	}
	referrer.prepend(newShape);
	return shapeObj;
}

function prepShapeShKeyframe(shapeObj, referrer) {

	return shapeObj;
}

function prepShape(shapeObj, referrer) {
	// first prep the shapes' helpers and transformations
	if (shapeObj.ty == 'fl') {
		if (shapeObj.c.k.hasOwnProperty('s')) {
			shapeObj = getPosition(shapeObj, null, 'c');
		}
	}
	if (shapeObj.ty == 'tr') {
		if (shapeObj.p.k.hasOwnProperty('s')) {
			console.log("shapeObj");
			shapeObj = getPosition(shapeObj, null, 'p');
		}
	}
	// next prep the shapes' properties
	if (shapeObj.ty == 'sh') {
		//console.log("prep shape");
		if (shapeObj.ks.k.length > 1) {
			shapeObj = prepShapeShKeyframe(shapeObj, referrer);
		} else {
			shapeObj._isShape = true;
			shapeObj = prepShapeSh(shapeObj, referrer);
		}
	}

	return shapeObj;
}

function getColorString(redVal, greenVal, blueVal) {
	var color = "rgb(" + (redVal * 255) + "," + (greenVal * 255) + "," + (blueVal * 255) + ")";
	return color;
}

function setShapeColors(shapesGroup, colorToSet) {
	for (var i = 0; i < shapesGroup.length; i++) {
		if (shapesGroup[i]._isShape) {
			document.getElementById("_shape" + shapesGroup[i]._shape).setAttribute("fill", colorToSet);
		}
	}
}

function getShapesGr(elementId, animationId, layerObj, referrer, refGroup) {
	var currentColor;
	for (var i = 0; i < layerObj.it.length; i++) {
		//console.log("shapes ix: " + layerObj.it[i].ix);
		shapeCount++;
		if (layerObj.it[i].ty == "gr") {
			//console.log("------------------");
			layerObj.it[i]._group = shapeCount;
			var newGroup = document.createElementNS(xmlns, 'g');
			newGroup.setAttribute("id", "_group" + shapeCount);
			referrer.prepend(newGroup);
			layerObj.it[i] = getShapesGr(elementId, animationId, layerObj.it[i], newGroup, "_group" + shapeCount);
		} else {
			layerObj.it[i]._shape = shapeCount;
			layerObj.it[i] = prepShape(layerObj.it[i], referrer);
			if (layerObj.it[i].ty == 'tr') {
				layerObj.it[i]._trIndex = i;
				if (layerObj.it[i].p.hasOwnProperty('k')) {
					document.getElementById(refGroup).setAttribute("transform", "matrix(1,0,0,1," + layerObj.it[i].p.k[0] + "," + layerObj.it[i].p.k[1] + ")");
				}
			}
			if (layerObj.it[i].ty == 'fl') {
				if (layerObj.it[i].c.k.length > 1) {
					currentColor = getColorString(layerObj.it[i].c.k[0], layerObj.it[i].c.k[1], layerObj.it[i].c.k[2]);
				}
			}
		}
	}
	setShapeColors(layerObj.it, currentColor);
	return layerObj;
}

function getShapes(elementId, animationId, layerObj, referrer, refGroup) {
	var currentColor;
	for (var i = 0; i < layerObj.shapes.length; i++) {
		//console.log("shapes ix: " + layerObj.shapes[i].ix);
		shapeCount++;
		if (layerObj.shapes[i].ty == "gr") {
			//console.log("------------------");
			layerObj.shapes[i]._group = shapeCount;
			var newGroup = document.createElementNS(xmlns, 'g');
			newGroup.setAttribute("id", "_group" + shapeCount);
			referrer.prepend(newGroup);
			layerObj.shapes[i] = getShapesGr(elementId, animationId, layerObj.shapes[i], newGroup, "_group" + shapeCount);
		} else {
			layerObj.shapes[i]._shape = shapeCount;
			layerObj.shapes[i] = prepShape(layerObj.shapes[i], referrer);
			if (layerObj.shapes[i].ty == 'tr') {
				layerObj.shapes[i]._trIndex = i;
				if (layerObj.shapes[i].p.hasOwnProperty('k')) {
					document.getElementById("_layerGroup" + layerCount).setAttribute("transform", "matrix(1,0,0,1," + layerObj.shapes[i].p.k[0] + "," + layerObj.shapes[i].p.k[1] + ")");
				}
			}
			if (layerObj.shapes[i].ty == 'fl') {
				if (layerObj.shapes[i].c.k.length > 1) {
					currentColor = getColorString(layerObj.shapes[i].c.k[0], layerObj.shapes[i].c.k[1], layerObj.shapes[i].c.k[2]);
				}
			}
		}
	}
	setShapeColors(layerObj.shapes, currentColor);
	return layerObj;
}

function getLayers(elementId, animationId, elementObj) {
	for (var i = 0; i < animation[animationId].layers.length; i++) {
		//console.log("layer ind: " + animation[animationId].layers[i].ind);
		layerCount++;
		animation[animationId].layers[i]._layer = layerCount;
		var newLayer = document.createElementNS(xmlns, 'g');
		newLayer.setAttribute("id", "_layer" + layerCount);
		elementObj.prepend(newLayer);
		if (animation[animationId].layers[i].hasOwnProperty('ks')) {
			//console.log("layerObj " + animation[animationId].layers[i].ind);
			animation[animationId].layers[i].ks = getPosition(animation[animationId].layers[i].ks, null, 'p');
			if (animation[animationId].layers[i].ks.hasOwnProperty('p')) {
				if (animation[animationId].layers[i].ks.p.hasOwnProperty('k')) {
					if (animation[animationId].layers[i].ks.p.k.length > 1) {
						if (animation[animationId].layers[i].ks.p.k[0].hasOwnProperty("s")) {
						} else {
							document.getElementById("_layer" + layerCount).setAttribute("transform", "matrix(1,0,0,1," + animation[animationId].layers[i].ks.p.k[0] + "," + animation[animationId].layers[i].ks.p.k[1] + ")");
						}
					}
				}
			}
		}
		if (animation[animationId].layers[i].hasOwnProperty('shapes')) {
			var newGroup = document.createElementNS(xmlns, 'g');
			newGroup.setAttribute("id", "_layerGroup" + layerCount);
			newLayer.prepend(newGroup);
			animation[animationId].layers[i] = getShapes(elementId, animationId, animation[animationId].layers[i], newGroup, "_layerGroup" + layerCount);
		}
	}
	console.log("DONE");
}

function buildGraph(elementId, animationId, elementObj) {
	animationLength = animation[animationId].op - animation[animationId].ip;
	elementObj.style.width = animation[animationId].w;
	elementObj.style.height = animation[animationId].h;
	elementObj.setAttribute("width", animation[animationId].w);
	elementObj.setAttribute("height", animation[animationId].h);
	//var outerDiv = document.createElement('div');
	var newLayer = document.createElementNS(xmlns, 'svg');
	//newLayer.setAttribute("xmlns", "http://www.w3.org/2000/xvg");
	newLayer.setAttributeNS(null, "id", "_lanim" + animationId);
	newLayer.setAttributeNS(null, "width", "100%");
	newLayer.setAttributeNS(null, "height", "100%");
	newLayer.setAttributeNS(null, "viewBox", "0 0 " + animation[animationId].w + " " + animation[animationId].h);
	newLayer.setAttributeNS(null, "preserveAspectRatio", "xMidYMid meet");
	newLayer.style.width = animation[animationId].w;
	newLayer.style.height = animation[animationId].h;
	elementObj.prepend(newLayer);
	scene = new Array(animationLength + 1).fill(0);
	getLayers(elementId, animationId, newLayer);
	//console.log("width: " + animationSource[animationId].w + ", height: " + animationSource[animationId].h);
}

var animation = new Array();
var scene;
var frame = new Array();
var animationCount = -1;
var shapeCount = -1;
var groupCount = -1;
var layerCount = -1;
var animationLength = 0;

function getJson(src, autoplay, controls, loop, mode, style, domElement, elementNo, elementId, elementObj) {
	var http = new XMLHttpRequest();
	http.open("GET", src, true);
	http.onreadystatechange = function() {
		if (http.readyState == 4 && http.status == 200) {
			var currentAnimation = ++animationCount;
			animation[currentAnimation] = JSON.parse(http.responseText);
			animation[currentAnimation]._elementId = elementId;
			buildGraph(elementId, currentAnimation, elementObj);
		}
	}
	http.send();
}

function processLotties() {
	var lottieElements = document.getElementsByTagName("lottie-player");
	var i;
	for (i = 0; i < lottieElements.length; i++) {
	
		var attributes = lottieElements[i].attributes;
		var j;

		var autoplay = '';
		var controls = '';
		var loop = '';
		var mode = '';
		var src = '';
		var style = '';
		var elementId = '';
		for (j = 0; j < attributes.length; j++) {
			switch (attributes[j].nodeName) {
				case 'autoplay':
					break;
				case 'controls':
					break;
				case 'loop':
					break;
				case 'mode':
					break;
				case 'src':
					src = attributes[j].nodeValue;
					break;
				case 'style':
					break;
				case 'id':
					elementId = attributes[j].nodeValue;
					break;
			}
		}
		getJson(src, autoplay, controls, loop, mode, style, lottieElements[i], i, elementId, lottieElements[i]);
	}
}

window.onload = function() {
	console.log("START");
	processLotties();
	console.log("DONE");
}
