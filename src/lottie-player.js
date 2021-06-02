const xmlns = "http://www.w3.org/2000/svg";

var animation = [];
var frame = [];
var animationCount = -1;
var animationLength = 0;
var animationLoading = 0;
var frozen = false;

///////////// BEZIER

function bezierCurve(p1, c1, c2, p2, fromT, toT, isLayer, animationId, refKey, addTransformation, objectId, depth) {
	/*if (animation[animationId]._currentLayer == 134) {
		console.log("bezierCurve " + animation[animationId]._currentLayer)
	}*/
	var newNodes = [];

	if (c1.hasOwnProperty('x')) {
	} else {
		if (c1.length >= 1) {
			c1.x = c1[0];
			if (refKey == 'p' || refKey == 's') {
				c1.y = c1[1];
			}
		}
	}
	if (c2.hasOwnProperty('x')) {
	} else {
		if (c2.length >= 1) {
			c2.x = c1[0];
			if (refKey == 'p' || refKey == 's') {
				c2.y = c1[1];
			}
		}
	}
	if (refKey == 's') {
		if (c1.x.length > 1) {
			c1.x = c1.x[0];
			c1.y = c1.y[0];
		}
		if (c2.x.length > 1) {
			c2.x = c2.x[0];
			c2.y = c2.y[0];
		}
	}
	var frames = toT - fromT;
	var timeTick;
	var oneMinusT;
	var currentFrame = fromT;
	/*if (animation[animationId]._currentLayer == 134) {
		console.log("coord--------------- " +  p1[0] + "," + p1[1] + " t:" + fromT);
	}*/
	for (var i = 1; i < frames; i++) {
		timeTick = i / frames;
		oneMinusT = (1 - timeTick);
		newNodes.push({'_comp': 1, "t":0});
		currentFrame++;
		newNodes[newNodes.length - 1]._frame = parseInt(currentFrame);
		newNodes[newNodes.length - 1].t = parseInt(currentFrame);
		newNodes[newNodes.length - 1].s = [];
		if (refKey != "ks") {
			newNodes[newNodes.length - 1].s.push((Math.pow(oneMinusT, 3) * p1[0]) + 
								(3 * Math.pow(oneMinusT, 2) * timeTick * (c1.x + p1[0])) +
								(3 * oneMinusT * Math.pow(timeTick, 2) * (c2.x + p2[0])) +
								(Math.pow(timeTick, 3) * p2[0]));
			if (refKey != 'x' && refKey != 'y') {
				if (refKey == 'p' || refKey == 's') {
					newNodes[newNodes.length - 1].s.push((Math.pow(oneMinusT, 3) * p1[1]) + 
										(3 * Math.pow(oneMinusT, 2) * timeTick * (c1.y + p1[1])) +
										(3 * oneMinusT * Math.pow(timeTick, 2) * (c2.y + p2[1])) +
										(Math.pow(timeTick, 3) * p2[1]));
				}
			}
		} else {
			//for (var j = 0; j < p1.length; j++) {
				newNodes[newNodes.length - 1].s.push({"i":[], "o":[], "v":[]});
				var j = 0;
				for (var k = 0; k < p1[j].i.length; k++) {
					/*if (animation[animationId]._currentLayer == 134) {
						console.log("coord2 orig " + p1[j].i[k][0] + ", " + p2[j].i[k][0] + currentFrame);
					}*/

					newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].i.push([
						(Math.pow(oneMinusT, 3) * p1[j].i[k][0]) + 
						(3 * Math.pow(oneMinusT, 2) * timeTick * (c1.x + p1[j].i[k][0])) +
						(3 * oneMinusT * Math.pow(timeTick, 2) * (c2.x + p2[j].i[k][0])) +
						(Math.pow(timeTick, 3) * p2[j].i[k][0]),
					//newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].i.push(
						(Math.pow(oneMinusT, 3) * p1[j].i[k][1]) + 
						(3 * Math.pow(oneMinusT, 2) * timeTick * (c1.y + p1[j].i[k][1])) +
						(3 * oneMinusT * Math.pow(timeTick, 2) * (c2.y + p2[j].i[k][1])) +
						(Math.pow(timeTick, 3) * p2[j].i[k][1])]);

					newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].o.push([
						(Math.pow(oneMinusT, 3) * p1[j].o[k][0]) + 
						(3 * Math.pow(oneMinusT, 2) * timeTick * (c1.x + p1[j].o[k][0])) +
						(3 * oneMinusT * Math.pow(timeTick, 2) * (c2.x + p2[j].o[k][0])) +
						(Math.pow(timeTick, 3) * p2[j].o[k][0]),
					//newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].o.push(
						(Math.pow(oneMinusT, 3) * p1[j].o[k][1]) + 
						(3 * Math.pow(oneMinusT, 2) * timeTick * (c1.y + p1[j].o[k][1])) +
						(3 * oneMinusT * Math.pow(timeTick, 2) * (c2.y + p2[j].o[k][1])) +
						(Math.pow(timeTick, 3) * p2[j].o[k][1])]);

					newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].v.push([
						(Math.pow(oneMinusT, 3) * p1[j].v[k][0]) + 
						(3 * Math.pow(oneMinusT, 2) * timeTick * (c1.x + p1[j].v[k][0])) +
						(3 * oneMinusT * Math.pow(timeTick, 2) * (c2.x + p2[j].v[k][0])) +
						(Math.pow(timeTick, 3) * p2[j].v[k][0]),
					//newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].v.push(
						(Math.pow(oneMinusT, 3) * p1[j].v[k][1]) + 
						(3 * Math.pow(oneMinusT, 2) * timeTick * (c1.y + p1[j].v[k][1])) +
						(3 * oneMinusT * Math.pow(timeTick, 2) * (c2.y + p2[j].v[k][1])) +
						(Math.pow(timeTick, 3) * p2[j].v[k][1])]);
					
					/*if (animation[animationId]._currentLayer == 133) {
						console.log("coord2 " + newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].i[k][0] + "," + newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].v[k][0] + " " + c1.x + "," + c1.y + " " + c2.x + "," + c2.y + " t:" + newNodes[newNodes.length - 1].t);
					}*/
				}
					//console.log(newNodes[newNodes.length - 1].t);
			//}
		}
			//console.log(p1[0] + " " + newNodes[newNodes.length - 1].s[0]);
		if (addTransformation && refKey != "ks") {
			addGroupPositionTransform(currentFrame, newNodes[newNodes.length - 1].s, isLayer, animationId, refKey, addTransformation, objectId, depth);
		}
	}

	return newNodes;
}

///////////// CONTROL

var jlottie = {};

jlottie.destroy = function(name) {
	if (animationCount < 0) {
		return;
	}	
	if (name === undefined) {
		var elements = [];
		for (var i = 0; i <= animationCount; i++) {
			elements.push(animation[i]._elementId);
		}
		animation = [];
		for (var i = 0; i <= elements; i++) {
			document.getElementById(elements[i]).innerHTML = "";
			animationCount = animationCount - 1;
		}
	} else {
		name.toString();
		name = name.replace(/#/g, "");
		for (var i = 0; i <= animationCount; i++) {
			if (animation[i]._elementId == name || animation[i]._customName == name) {
				animation.splice(i, 1);
				document.getElementById(name).innerHTML = "";
				animationCount = animationCount - 1;
				break;
			}
		}	
	}
}

jlottie.play = function(name) {
	if (animationCount < 0) {
		return;
	}	
	if (name === undefined) {
		for (var i = 0; i <= animationCount; i++) {
			animation[i]._paused = false;
		}
	} else {
		name.toString();
		name = name.replace(/#/g, "");
		for (var i = 0; i <= animationCount; i++) {
			if (animation[i]._elementId == name || animation[i]._customName == name) {
				animation[i]._paused = false;
				break;
			}
		}	
	}
}

jlottie.stop = function(name) {
	if (name === undefined) {
		for (var i = 0; i <= animationCount; i++) {
			animation[i]._paused = true;
		}
	} else {
		name.toString();
		name = name.replace(/#/g, "");
		for (var i = 0; i < animationCount; i++) {
			if (animation[i]._elementId == name || animation[i]._customName == name) {
				animation[i]._paused = true;
				break;
			}
		}	
	}
}

jlottie.goToAndStop = function(_frame, isFrame, name) {
	if (animationCount < 0) {
		return;
	}	
	if (name === undefined) {
		console.log(animationCount);
		for (var i = 0; i <= animationCount; i++) {
			animation[i]._paused = true;
			loadFrame(i, _frame);
		}	
	} else {
		name.toString();
		name = name.replace(/#/g, "");
		for (var i = 0; i <= animationCount; i++) {
			if (animation[i]._elementId == name || animation[i]._customName == name) {
				animation[i]._paused = true;
				console.log(name + " == " + _frame);
				loadFrame(i, _frame);
				break;
			}
		}	
	}
}

jlottie.loadAnimation = function(obj) {
	if (obj.container === undefined || (obj.path === undefined || obj.animationData === undefined)) {
		return;
	}
	
	var autoplay = true;
	var loop = true;

	if (! (obj.autoplay === undefined)) {
		if (obj.autoplay === true || obj.autoplay === false) {
			autoplay = obj.autoplay;
		}
	}

	if (! (obj.loop === undefined)) {
		if (obj.loop === true || obj.loop === false) {
			loop = obj.loop;
		}
	}

	if (! (obj.animationData === undefined) && obj.animationData) {
		animationCount = animationCount + 1;
		var currentAnimation = animationCount;
		animation[currentAnimation] = JSON.parse(http.responseText);
		animation[currentAnimation]._elementId = elementId;
		buildGraph(elementId, currentAnimation, obj.container, true, true);
	} else {
		if (! (obj.path === undefined) && obj.path) {
			getJson(src, "", "", "", "", "", obj.container, 0, obj.container.id, obj.container, autoplay, loop);
		}
	}
}

///////////// ANIMATOR

function loadFrame(i, _currentFrame) {
	console.log("=-=" + _currentFrame);
	for (var ref = 0; ref < animation[i]._refObj.length; ref++) {
		var refObj = animation[i]._refObj[ref];
		var nextObj = false;
		//console.log(refObj);
		for (var m = _currentFrame - 1; m >= 0; m--) {
			for (var n = 0; n < animation[i]._scene[m]._transform.length; n++) {
				if (animation[i]._scene[m]._transform[n].refObj == refObj) {
					currentObj = document.getElementById(animation[i]._scene[m]._transform[n].refObj);
					currentObjOther = document.getElementById(animation[i]._scene[m]._transform[n].refObjOther);
					if (animation[i]._scene[m]._transform[n].isTween || animation[i]._scene[m]._transform[n].combined.length > 0) {
						if (animation[i]._scene[m]._transform[n].isTween) {
							currentObj.setAttribute('d', animation[i]._scene[m]._transform[n].dataString);
						}
						currentObj.setAttribute('transform', animation[i]._scene[m]._transform[n].combined);
						currentObjOther.setAttribute('opacity', animation[i]._scene[m]._transform[n].opacity);
						nextObj = true;
						break;
					}
				}
				if (nextObj) break;
			}
			if (nextObj) continue;
		}
	}
}

function lottiemate() {
	var currentDate = Date.now();
	var currentObj;
	for (var i = 0; i <= animationCount; i++) {
		if (currentDate - animation[i]._lastTime >= animation[i]._frameTime) {
			if (animation[i]._removed || animation[i]._paused) {
				continue;
			}
			animation[i]._lastTime = currentDate;
			animation[i]._currentFrame++;
			if (animation[i]._currentFrame >= animation[i]._totalFrames) {
				animation[i]._currentFrame = 0;
				if (! animation[i]._loop) {
					animation[i]._paused = true;
					lottie.goToAndStop((animation[i]._totalFrames - 1), "", animation[i]._elementId);
					continue;
				}
			}
			//window.setTimeout(loadFrame, 1, i, animation[i]._currentFrame);
			for (var j = 0; j < animation[i]._scene[animation[i]._currentFrame]._transform.length; j++) {
				if (animation[i]._scene[animation[i]._currentFrame]._transform[j].refObj.length > 0) {
					currentObj = document.getElementById(animation[i]._scene[animation[i]._currentFrame]._transform[j].refObj);
					currentObjOther = document.getElementById(animation[i]._scene[animation[i]._currentFrame]._transform[j].refObjOther);
					if (animation[i]._scene[animation[i]._currentFrame]._transform[j].isTween) {
						currentObj.setAttribute('d', animation[i]._scene[animation[i]._currentFrame]._transform[j].dataString);
					}
					currentObj.setAttribute('transform', animation[i]._scene[animation[i]._currentFrame]._transform[j].combined);
					currentObjOther.setAttribute('opacity', animation[i]._scene[animation[i]._currentFrame]._transform[j].opacity);
				}
				if (animation[i]._scene[animation[i]._currentFrame]._transform[j].hide) {
					document.getElementById(animation[i]._scene[animation[i]._currentFrame]._transform[j].stageObj).style.display = 'none';
				}
				if (animation[i]._scene[animation[i]._currentFrame]._transform[j].show) {
					document.getElementById(animation[i]._scene[animation[i]._currentFrame]._transform[j].stageObj).style.display = 'block';
				}
				
			}	
		}
	}
	window.requestAnimationFrame(lottiemate);
}

///////////// BUILD SCENE GRAPH
var lastRefObj;

function getEmptyTransform() {
	var transforms = {};
	transforms.translateX = 0;
	transforms.translateY = 0;
	transforms.scaleFactorX = 0;
	transforms.scaleFactorY = 0;
	transforms.rotateAngle = 0;
	transforms.opacityFactor = 0;
	transforms.anchorX = 0;
	transforms.anchorY = 0;
	transforms.paddingX = 0;
	transforms.paddingY = 0;
	transforms.paddingAnchorX = 0;
	transforms.paddingAnchorY = 0;
	transforms.isTranslate = false;

	transforms.dataString = '';
	transforms.isTween = false;
	transforms.tweenShape = "";
	transforms.refObj = '';
	transforms.combined = '';

	transforms.translate = ''; 
	transforms.rotate = '';
	transforms.scale = '';
	transforms.opacity = 1;
	transforms.hide = false;
	transforms.show = false;
	transforms.inPoint = -1;
	transforms.outPoint = -1;
	transforms.isLayer = true;
	transforms.stageObj = '';
	transforms.isSet = false;
	return transforms;
}

function getEmptyStageTransform() {
	var transforms = {};
	transforms.stageObj = '';
	transforms.refObj = '';
	transforms.hide = false;
	transforms.show = false;
	//transforms.stageSequence = true;
	return transforms;
}

function findExistingTransform(transforms, animationId, frame) {
	if (animation[animationId]._scene[parseInt(frame)] === undefined) {
		console.log(frame);
		return transforms;
	}
	for (var i = 0; i < animation[animationId]._scene[parseInt(frame)]._transform.length; i++) {
		if (animation[animationId]._scene[parseInt(frame)]._transform[i].refObj == transforms.refObj) {
			transforms = animation[animationId]._scene[parseInt(frame)]._transform[i];
			found = 1;
			break;
		}
	}
	return transforms;
}


function stageSequence(animationId, stageObj, inPoint, outPoint) {
	if (outPoint > animation[animationId]._totalFrames) {
		outPoint = animation[animationId]._totalFrames;
	}
	var transforms = getEmptyStageTransform();
	var found = 0;
	if (inPoint > -1) {
		frame = inPoint;
		for (var i = 0; i < animation[animationId]._scene[parseInt(frame)]._transform.length; i++) {
			if (animation[animationId]._scene[parseInt(frame)]._transform[i].stageObj == stageObj) {
				transforms = animation[animationId]._scene[parseInt(frame)]._transform[i];
				found = 1;
				break;
			}
		}
		transforms.stageObj = stageObj;
		//transforms.refObjOther = refObjOther;
		transforms.show = true;
		animation[animationId]._scene[parseInt(frame)]._transform.push(transforms);
	}

	transforms = getEmptyStageTransform();
	found = 0;
	if (outPoint > -1) {
		frame = outPoint;
		for (var i = 0; i < animation[animationId]._scene[parseInt(frame)]._transform.length; i++) {
			if (animation[animationId]._scene[parseInt(frame)]._transform[i].stageObj == stageObj) {
				transforms = animation[animationId]._scene[parseInt(frame)]._transform[i];
				found = 1;
				break;
			}
		}
		transforms.stageObj = stageObj;
		//transforms.refObjOther = refObjOther;
		transforms.hide = true;
		animation[animationId]._scene[parseInt(frame)]._transform.push(transforms);
	} else {
		frame = 0;
	}

	transforms = getEmptyStageTransform();
	found = 0;
	if (outPoint > -1 && inPoint > 0) {
		frame = 0;
		for (var i = 0; i < animation[animationId]._scene[parseInt(frame)]._transform.length; i++) {
			if (animation[animationId]._scene[parseInt(frame)]._transform[i].stageObj == stageObj) {
				transforms = animation[animationId]._scene[parseInt(frame)]._transform[i];
				found = 1;
				break;
			}
		}
		transforms.stageObj = stageObj;
		//transforms.refObjOther = refObjOther;
		transforms.hide = true;
		animation[animationId]._scene[parseInt(frame)]._transform.push(transforms);
	}

	var lastState = 0;
	if (frame > 1) {
		for (var j = 0; j <= animation[animationId]._totalFrames; j++) {
			for (var i = 0; i < animation[animationId]._scene[j]._transform.length; i++) {
				if (animation[animationId]._scene[j]._transform[i].stageObj == stageObj) {
					if (animation[animationId]._scene[j]._transform[i].show) {
						lastState = 1;
					}
					if (animation[animationId]._scene[j]._transform[i].hide) {
						lastState = 0;
					}
					if (lastState == 1) {
						animation[animationId]._scene[j]._transform[i].show = true;
					}
				}
			}
		}
	}
}

function addGroupPositionTransform(frame, position, isLayer, animationId, refKey, addTransformation, objectId, depth) {
	if (frame < 0 || addTransformation < 1) {
		return;
	}
	if (frame > animation[animationId]._totalFrames) {
		return;
	}
	//console.log("addgroup " + animationId + " - " + frame);
	//console.log(typeof(animation[animationId]._scene[frame]._transform));
	var transforms = getEmptyTransform();

	var posX = 0;
	
	if (isLayer) {
		if (animation[animationId].hasOwnProperty("_currentLayerGroup")) {
			if (animation[animationId]._currentLayerGroup._inPoint >= 0) {
				console.log("inpoint");
				transforms.inPoint = parseInt(animation[animationId]._currentLayerGroup._inPoint);
			}
			if (animation[animationId]._currentLayerGroup._outPoint > 0) {
				transforms.outPoint = parseInt(animation[animationId]._currentLayerGroup._outPoint);
			}
		} else {
			if (animation[animationId]._currentLayer._inPoint >= 0) {
				console.log("inpoint");
				transforms.inPoint = parseInt(animation[animationId]._currentLayer._inPoint);
			}
			if (animation[animationId]._currentLayer._outPoint > 0) {
				transforms.outPoint = parseInt(animation[animationId]._currentLayer._outPoint);
			}
		}
	} else {
	}

	if (transforms.inPoint < 0 && transforms.outPoint < 0) {
		if (frame != transforms.inPoint && frame != transforms.outPoint) {
			if (Array.isArray(position)) {
				posX = position[0];
				if (Number.isNaN(posX)) {
					return;
				}
			} else {
				posX = position;
				if (Number.isNaN(posX)) {
					return;
				}
			}
		}
	}

	/*
	if (frame == transforms.inPoint && transforms.inPoint > 1) {
		stageClear(transforms, animationId);
		console.log("show");
		transforms.show = true;
	}
	if (frame == transforms.outPoint && transforms.outPoint < animation[animationId].op) {
		console.log("hide");
		transforms.hide = true;
	}
	*/

	if (isLayer) {
		transforms.isLayer = true;
		//if (animation[animationId].hasOwnProperty("_currentLayerGroup")) {
			/*
			if (objectId.td > 0) {
				transforms.refObj = animationId + "_" + depth + "_layerGroup" + animation[animationId]._currentLayerGroup;
			} else {
				transforms.refObj = animationId + "_" + depth + "_layerTranslate" + animation[animationId]._currentLayerGroup;
			}
			transforms.refObjOther = animationId + "_" + depth + "_layerGroup" + animation[animationId]._currentLayerGroup;
			*/
			if (objectId.td > 0) {
				transforms.refObj = animationId + "_" + depth + "_layerGroup" + objectId._layer;
			} else {
				transforms.refObj = animationId + "_" + depth + "_layerTranslate" + objectId._layer;
			}
			transforms.refObjOther = animationId + "_" + depth + "_layerGroup" + objectId._layer;
		//} else {
		//	transforms.refObj = animationId + "_" + depth + "_layer" + animation[animationId]._currentLayer;
		//}
	} else {
		transforms.isLayer = false;
		transforms.refObj = animationId + "_group" + animation[animationId]._currentShapeGroup;
		transforms.refObjOther = animationId + "_group" + animation[animationId]._currentShapeGroup;
	}

	transforms.anchorX = objectId._anchorX;
	transforms.anchorY = objectId._anchorY;
	//transforms.paddingAnchorX = transforms.anchorX;
	//transforms.paddingAnchorY = transforms.anchorY;

	transforms = findExistingTransform(transforms, animationId, frame);


	if (animation[animationId]._instated.hasOwnProperty(transforms.refObj)) {
	} else {
		animation[animationId]._refObj.push(transforms.refObj);
		animation[animationId]._objSize[transforms.refObj] = [];
		//animation[animationId]._objSize[transforms.refObj][0] = document.getElementById(transforms.refObj).getBoundingClientRect().width - objectId._anchorX;
		//animation[animationId]._objSize[transforms.refObj][1] = document.getElementById(transforms.refObj).getBoundingClientRect().height - objectId._anchorY;
		animation[animationId]._objSize[transforms.refObj][0] = document.getElementById(transforms.refObj).getBoundingClientRect().width;
		animation[animationId]._objSize[transforms.refObj][1] = document.getElementById(transforms.refObj).getBoundingClientRect().height;
		//animation[animationId]._objSize[transforms.refObj][2] = object 
		//animation[animationId]._objSize[transforms.refObj][3] =
		//animation[animationId]._objSize[transforms.refObj][0] = document.getElementById(transforms.refObj).width;
		//animation[animationId]._objSize[transforms.refObj][1] = document.getElementById(transforms.refObj).height;
	}
	if (objectId._layer == 3) {
		console.log("ORIGINAL: " + animation[animationId]._objSize[transforms.refObj][0] + ", " + animation[animationId]._objSize[transforms.refObj][1] + " // " + transforms.anchorX + ", " + transforms.anchorY);
	}

	//var found = 0;
	var posY = 0;

	if (refKey == 'r') {
		transforms.rotateAngle = transforms.rotateAngle + posX;
		if (objectId.hasOwnProperty('_anchorX') && objectId.hasOwnProperty('_anchorY')) {
			//transforms.rotate = 'rotate(' + transforms.rotateAngle + ',' + (document.getElementById(transforms.refObj).getBoundingClientRect().width / 2) + ',' + (document.getElementById(transforms.refObj).getBoundingClientRect().height / 2) + ') ';
			transforms.rotate = 'rotate(' + transforms.rotateAngle + ',' + objectId._anchorX + ',' + objectId._anchorY + ') ';
			//transforms.rotate = 'rotate(' + transforms.rotateAngle + ') ';
		} else {
			transforms.rotate = 'rotate(' + transforms.rotateAngle + ',' + (document.getElementById(transforms.refObj).getBoundingClientRect().width / 2) + ',' + (document.getElementById(transforms.refObj).getBoundingClientRect().height / 2) + ') ';
			//transforms.rotate = 'rotate(' + transforms.rotateAngle + ') ';
		}
	}
	if (refKey == 's') {
		transforms.scaleFactorX = transforms.scaleFactorX + posX;
		//tempBoundingW = document.getElementById(transforms.refObj).getBoundingClientRect().width;
		//tempBoundingH = document.getElementById(transforms.refObj).getBoundingClientRect().height;
		tempBoundingW = animation[animationId]._objSize[transforms.refObj][0];
		tempBoundingH = animation[animationId]._objSize[transforms.refObj][1];
		var currentScaleX;
		var currentScaleY;
		if (position.length > 1) {
			transforms.scaleFactorY = transforms.scaleFactorY + position[1];
			currentScaleX = 1 - (transforms.scaleFactorX / 100);
			currentScaleY = 1 - (transforms.scaleFactorY / 100);
		} else {
			currentScaleX = 1 - (transforms.scaleFactorX / 100);
			currentScaleY = 1 - (transforms.scaleFactorX / 100);
		}
		transforms.scale = 'scale(' + (transforms.scaleFactorX / 100) + ',' + (transforms.scaleFactorY / 100) + ') ';
		//transforms.paddingX = (transforms.anchorX - tempBoundingW) + (tempBoundingW - (tempBoundingW * (transforms.scaleFactorX / 100)));
		//transforms.paddingY = (transforms.anchorY - tempBoundingH) + (tempBoundingH - (tempBoundingH * (transforms.scaleFactorY / 100)));
		//transforms.paddingX = (transforms.anchorX - tempBoundingW) + (tempBoundingW * currentScaleX);
		//transforms.paddingY = (transforms.anchorY - tempBoundingH) + (tempBoundingH * currentScaleY);
		transforms.paddingX = ((transforms.anchorX - tempBoundingW) * currentScaleX) + (tempBoundingW * currentScaleX);
		transforms.paddingY = ((transforms.anchorY - tempBoundingH) * currentScaleY) + (tempBoundingH * currentScaleY);
		transforms.paddingAnchorX = transforms.anchorX * currentScaleX;
		transforms.paddingAnchorY = transforms.anchorY * currentScaleY;
		//transforms.translateX = transforms.translateX + (paddingX / 2);
		//transforms.translateY = transforms.translateY + (paddingY / 2);


		/*
		transforms.translateX = transforms.translateX + paddingX;
		transforms.translateY = transforms.translateY + paddingY;
		transforms.translate = 'translate(' + (transforms.translateX) + ',' + (transforms.translateY) + ') ';
		*/
		//transforms.translate = 'translate(' + (transforms.translateX - transforms.anchorX) + ',' + (transforms.translateY - transforms.anchorY) + ') ';
		
	//transforms.translate = 'translate(' + (transforms.translateX - objectId._anchorX) + ',' + (transforms.translateY - objectId._anchorY) + ') ';
		
		//document.getElementById(transforms.refObj).style.paddingLeft = paddingX / 2;
		//document.getElementById(transforms.refObj).style.paddingRight = paddingX / 2;
		//document.getElementById(transforms.refObj).style.paddingTop = paddingY / 2;
		//document.getElementById(transforms.refObj).style.paddingBottom = paddingY / 2;
		
	}
	if (refKey == 'p') {
		posY = position[1];
		if (objectId.hasOwnProperty('_anchorX')) {
			//posX = posX - objectId._anchorX;
			//transforms.translateX = transforms.translateX + objectId._anchorX;
			transforms.translateX = transforms.translateX + posX;
		}
		if (objectId.hasOwnProperty('_anchorY')) {
			//posY = posY - objectId._anchorY;
			//transforms.translateY = transforms.translateY + objectId._anchorY;
			transforms.translateY = transforms.translateY + posY;
		}
		//transforms.translate = 'translate(' + ((transforms.translateX - (transforms.anchorX - transforms.paddingAnchorX)) + transforms.paddingX) + ',' + ((transforms.translateY - (transforms.anchorY - transforms.paddingAnchorX)) + transforms.paddingY) + ') ';
		//transforms.translate = 'translate(' + ((transforms.translateX - (transforms.anchorX - transforms.paddingAnchorX)) + transforms.paddingX) + ',' + ((transforms.translateY - (transforms.anchorY - transforms.paddingAnchorX)) + transforms.paddingY) + ') ';
		transforms.translate = 'translate(' + (transforms.translateX - transforms.anchorX) + ',' + (transforms.translateY - transforms.anchorY) + ') ';
		transforms.isTranslate = true;
	}

	if (! transforms.isTranslate) {
		//transforms.translate = 'translate(' + (transforms.paddingX - transforms.paddingAnchorX) + ',' + (transforms.paddingY - transforms.paddingAnchorY) + ') ';
		//transforms.translate = 'translate(' + (transforms.paddingAnchorX - transforms.paddingX) + ',' + (transforms.paddingAnchorY - transforms.paddingY) + ') ';
		transforms.translate = 'translate(' + (transforms.paddingX) + ',' + (transforms.paddingY) + ') ';
	}

	if (refKey == 'o') {
		transforms.opacityFactor = transforms.opacityFactor + posX;
		transforms.opacity = transforms.opacityFactor / 100;
	}

	transforms.combined = transforms.translate + transforms.scale + transforms.rotate;
	transforms.isSet = true;
	animation[animationId]._scene[parseInt(frame)]._transform.push(transforms);

	lastRefObj = transforms.refObj;


	if (objectId._layer == 1) {
		console.log("padding: " + transforms.paddingX + ", " + transforms.paddingY + " -- " + transforms.paddingAnchorX + ", " + transforms.paddingAnchorY);
	}

	
	/*
	if (frame > 0) {
		//console.log("RESET");
		transforms.isSet = false;
		transforms = findExistingTransform(transforms, animationId, 0);
		if (! transforms.isSet) {
			var tempRefObj = transforms.refObj;
			var tempRefObjOther = transforms.refObjOther;
			transforms = getEmptyTransform();
			transforms.refObj = tempRefObj;
			transforms.refObjOther = tempRefObjOther;
			animation[animationId]._scene[0]._transform.push(transforms);
		}
	}
	*/

	if (animation[animationId]._instated.hasOwnProperty(transforms.refObj)) {
	} else {
		animation[animationId]._instated[transforms.refObj] = 1;
		animation[animationId]._scene[0]._transform.push(transforms);
	}

} 

///////////// PREP JSON

function extrapolateValueKeyframe(valueKeyframeObj) {

	return valueKeyframeObj;
}

function extrapolateOffsetKeyframe(offsetKeyframeObj, refKey, isLayer, animationId, addTransformation, objectId, depth) {
	//console.log("offset " + animationId);
	var i = 0;
	var objLength = offsetKeyframeObj[refKey].k.length;
	var oldLength = objLength;
	//console.log("going in");
	var emptyPos = { "x":0, "y":0 };
	//emptyPos.x = 0;
	//emptyPos.y = 0;
	var p2;
	var gotI;
	var gotO;

	while (i < (objLength - 1)) {
		gotI = true;
		gotO = true;

		if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('_comp')) {

		} else {
			if (addTransformation > -1) {
				addGroupPositionTransform(offsetKeyframeObj[refKey].k[i].t, offsetKeyframeObj[refKey].k[i].s, isLayer, animationId, refKey, addTransformation, objectId, depth);
			}
			if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('e')) {
				p2 = offsetKeyframeObj[refKey].k[i].e;
			} else {
				if (offsetKeyframeObj[refKey].k[i + 1].hasOwnProperty('s')) {
					p2 = offsetKeyframeObj[refKey].k[i + 1].s;
				}
			}

			if (offsetKeyframeObj[refKey].k[i + 1].hasOwnProperty('i') && refKey != "ks") {
				if (offsetKeyframeObj[refKey].k[i + 1].i.x < 1) offsetKeyframeObj[refKey].k[i + 1].i.x = 0.0;
				if (offsetKeyframeObj[refKey].k[i + 1].i.y < 1) offsetKeyframeObj[refKey].k[i + 1].i.y = 0.0;
			}
			if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('o') && refKey != "ks") {
				//if (offsetKeyframeObj[refKey].k[i].s == )
				if (offsetKeyframeObj[refKey].k[i].o.x < 1) offsetKeyframeObj[refKey].k[i].o.x = 0.0;
				if (offsetKeyframeObj[refKey].k[i].o.y < 1) offsetKeyframeObj[refKey].k[i].o.y = 0.0;
			}
			/*if (offsetKeyframeObj[refKey].k[i + 1].hasOwnProperty('i') && offsetKeyframeObj[refKey].k[i].hasOwnProperty('o') && gotI) {
				offsetKeyframeObj[refKey].k.splice((i + 1), 0, 
												bezierCurve(offsetKeyframeObj[refKey].k[i].s,
															offsetKeyframeObj[refKey].k[i].o,
															offsetKeyframeObj[refKey].k[i + 1].i,
															p2,
															offsetKeyframeObj[refKey].k[i].t,
															offsetKeyframeObj[refKey].k[i + 1].t,
															isLayer,
															animationId,
															refKey,
															addTransformation,
															objectId
															)
											);
			} else {
				if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('o') && gotO) {
					offsetKeyframeObj[refKey].k.splice((i + 1), 0, 
													bezierCurve(offsetKeyframeObj[refKey].k[i].s,
																offsetKeyframeObj[refKey].k[i].o,
																emptyPos,
																p2,
																offsetKeyframeObj[refKey].k[i].t,
																offsetKeyframeObj[refKey].k[i + 1].t,
																isLayer,
																animationId,
																refKey,
																addTransformation,
																objectId 
																)
												);
				} else {
					offsetKeyframeObj[refKey].k.splice((i + 1), 0, 
													bezierCurve(offsetKeyframeObj[refKey].k[i].s,
																emptyPos,
																emptyPos,
																p2,
																offsetKeyframeObj[refKey].k[i].t,
																offsetKeyframeObj[refKey].k[i + 1].t,
																isLayer,
																animationId,
																refKey,
																addTransformation,
																objectId
																)
												);
				}
			}*/
			var returnedKeyframeObj;
			if (offsetKeyframeObj[refKey].k[i + 1].hasOwnProperty('i') && offsetKeyframeObj[refKey].k[i].hasOwnProperty('o') && gotI) {
				returnedKeyframeObj =
												bezierCurve(offsetKeyframeObj[refKey].k[i].s,
															offsetKeyframeObj[refKey].k[i].o,
															offsetKeyframeObj[refKey].k[i + 1].i,
															p2,
															offsetKeyframeObj[refKey].k[i].t,
															offsetKeyframeObj[refKey].k[i + 1].t,
															isLayer,
															animationId,
															refKey,
															addTransformation,
															objectId,
															depth
															);
			} else {
				if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('o') && gotO) {
					returnedKeyframeObj =
													bezierCurve(offsetKeyframeObj[refKey].k[i].s,
																offsetKeyframeObj[refKey].k[i].o,
																emptyPos,
																p2,
																offsetKeyframeObj[refKey].k[i].t,
																offsetKeyframeObj[refKey].k[i + 1].t,
																isLayer,
																animationId,
																refKey,
																addTransformation,
																objectId,
																depth
																);
				} else {
					returnedKeyframeObj =
													bezierCurve(offsetKeyframeObj[refKey].k[i].s,
																emptyPos,
																emptyPos,
																p2,
																offsetKeyframeObj[refKey].k[i].t,
																offsetKeyframeObj[refKey].k[i + 1].t,
																isLayer,
																animationId,
																refKey,
																addTransformation,
																objectId,
																depth
																);
				}
			}
			//console.log("========= " + returnedKeyframeObj[0].t);
			for (var s = returnedKeyframeObj.length - 1; s >= 0; s--) {
				offsetKeyframeObj[refKey].k.splice((i + 1), 0, returnedKeyframeObj[s]);

			}
			if (animation[animationId]._currentLayer == 133) {
				console.log("returning: " + returnedKeyframeObj.length + "," + offsetKeyframeObj[refKey].k.length);
			}
		
			if (animation[animationId]._currentLayer == 133) {
				//console.log(" _____ " + offsetKeyframeObj[refKey].k[i + 1].t);	
			}
			objLength = offsetKeyframeObj[refKey].k.length;
			i = (i + (objLength - oldLength));
			oldLength = objLength;
		}
		i = i + 1;
	}
	//console.log("DONE offset");
	//addGroupPositionTransform(offsetKeyframeObj[refKey].k[objLength].t, offsetKeyframeObj[refKey].k[objLength].s, isLayer, animationId, refKey, addTransformation);
	return offsetKeyframeObj;
}

function extrapolatePathPosition(currentObj, parentObj, refKey, isLayer, animationId, addTransformation, objectId, depth) {
	currentObj[refKey].k = [];
	if (currentObj[refKey].x.k.length > 1) {
		currentObj[refKey] = extrapolateOffsetKeyframe(currentObj[refKey], "x", isLayer, animationId, false, objectId, depth);
	} else {

	}
	if (currentObj[refKey].y.k.length > 1) {
		currentObj[refKey] = extrapolateOffsetKeyframe(currentObj[refKey], "y", isLayer, animationId, false, objectId, depth);
	} else {

	}

	if (! Array.isArray(currentObj[refKey].x.k)) {
		//console.log("found");
		for (var i = 0; i < currentObj[refKey].y.k.length; i++) {
			//currentObj[refKey].k.push({"i":[0, currentObj[refKey].y.k[i]['i'].y[0], 0], "o":[0, currentObj[refKey].y.k[i].o.y[0], 0], "s":[currentObj[refKey].x.k, currentObj[refKey].y.k[i].s[0], 0], "t":currentObj[refKey].y.k[i].t});
			//console.log(i);
			if (currentObj[refKey].y.k[i].hasOwnProperty("s")) {
				currentObj[refKey].k.push({"i":[0, 0, 0], "o":[0, 0, 0], "s":[currentObj[refKey].x.k, currentObj[refKey].y.k[i].s[0], 0], "t":currentObj[refKey].y.k[i].t});
			}
		}
		
		for (var i = 0; i < currentObj[refKey].k.length; i++) {
			addGroupPositionTransform(currentObj[refKey].k[i].t, currentObj[refKey].k[i].s, isLayer, animationId, refKey, addTransformation, objectId, depth);
		}

		return currentObj;
	}

	if (! currentObj[refKey].y.k.isArray) {
		for (var i = 0; i < currentObj[refKey].x.k.length; i++) {
			if (currentObj[refKey].x.k[i].hasOwnProperty("s")) {
				currentObj[refKey].k.push({"i":[0, 0, 0], "o":[0, 0, 0], "s":[currentObj[refKey].x.k[i].s[0], currentObj[refKey].y.k, 0], "t":currentObj[refKey].x.k[i].t});
			}
		}

		for (var i = 0; i < currentObj[refKey].k.length; i++) {
			addGroupPositionTransform(currentObj[refKey].k[i].t, currentObj[refKey].k[i].s, isLayer, animationId, refKey, addTransformation, objectId, depth);
		}

		return currentObj;
	}

	if (currentObj[refKey].x.k.length > currentObj[refKey].y.k.length) {
		for (var i = 0; i < currentObj[refKey].x.k.length; i++) {
			currentObj[refKey].k.push({"i":[0, 0, 0], "o":[0, 0, 0], "s":[currentObj[refKey].x.k[i].s[0], 0, 0], "t":currentObj[refKey].x.k[i].t});
		}
		for (var i = 0; i < currentObj[refKey].y.k.length; i++) {
			if (currentObj[refKey].k[0].t > currentObj[refKey].y.k[i].t) {
				currentObj[refKey].k.splice(i, 0, {"i":[0, 0, 0], "o":[0, 0, 0], "s":[0, currentObj[refKey].y.k[i].s[0], 0], "t":currentObj[refKey].y.k[i].t});
			} else if (currentObj[refKey].k[0].t < currentObj[refKey].y.k[i].t) {
				currentObj[refKey].k.push({"i":[0, 0, 0], "o":[0, 0, 0], "s":[0, currentObj[refKey].y.k[i].s[0], 0], "t":currentObj[refKey].y.k[i].t});
			} else if (currentObj[refKey].k[0].t == currentObj[refKey].y.k[i].t) {
				currentObj[refKey].k.s[1] = currentObj[refKey].y.k[i].s[0];
			}
		}

		for (var i = 0; i < currentObj[refKey].k.length; i++) {
			addGroupPositionTransform(currentObj[refKey].k[i].t, currentObj[refKey].k[i].s, isLayer, animationId, refKey, addTransformation, objectId);
		}

		return currentObj;
	}

	if (currentObj[refKey].x.k.length < currentObj[refKey].y.k.length) {
		for (var i = 0; i < currentObj[refKey].y.k.length; i++) {
			currentObj[refKey].k.push({"i":[0, 0, 0], "o":[0, 0, 0], "s":[0, currentObj[refKey].y.k[i].s[0], 0], "t":currentObj[refKey].y.k[i].t});
		}
		for (var i = 0; i < currentObj[refKey].x.k.length; i++) {
			if (currentObj[refKey].k[0].t > currentObj[refKey].x.k[i].t) {
				currentObj[refKey].k.splice(i, 0, {"i":[0, 0, 0], "o":[0, 0, 0], "s":[currentObj[refKey].x.k[i].s[0], 0, 0], "t":currentObj[refKey].x.k[i].t});
			} else if (currentObj[refKey].k[0].t < currentObj[refKey].x.k[i].t) {
				currentObj[refKey].k.push({"i":[0, 0, 0], "o":[0, 0, 0], "s":[currentObj[refKey].x.k[i].s[0], 0, 0], "t":currentObj[refKey].x.k[i].t});
			} else if (currentObj[refKey].k[0].t == currentObj[refKey].x.k[i].t) {
				currentObj[refKey].k.s[0] = currentObj[refKey].x.k[i].s[0];
			}
		}

		for (var i = 0; i < currentObj[refKey].k.length; i++) {
			addGroupPositionTransform(currentObj[refKey].k[i].t, currentObj[refKey].k[i].s, isLayer, animationId, refKey, addTransformation, objectId, depth);
		}

		return currentObj;
	}

	return currentObj;
}

function getPosition(currentObj, parentObj, refKey, isLayer, animationId, addTransformation, objectId, depth) {
	if (currentObj.hasOwnProperty(refKey)) {
		if (currentObj[refKey].hasOwnProperty('x') && currentObj[refKey].hasOwnProperty('y')) {
			currentObj = extrapolatePathPosition(currentObj, parentObj, refKey, isLayer, animationId, addTransformation, objectId, depth);
		}
		if (currentObj[refKey].hasOwnProperty('k')) {
			if (currentObj[refKey].k.length > 1) {
				if (currentObj[refKey].k[0].hasOwnProperty('s')) {
					currentObj = extrapolateOffsetKeyframe(currentObj, refKey, isLayer, animationId, addTransformation, objectId, depth);
				}
			}
		}
	}
	return currentObj;
}

function prepShapeEl(shapeObj, referrer, animationId, addTransformation, depth) {

	var newShape = document.createElementNS(xmlns, 'ellipse');
	newShape.setAttribute("d", dataString);
	//newShape.setAttribute("stroke", "black");
	newShape.setAttribute("fill", "transparent");
	newShape.setAttribute("id", animationId + "_shape" + shapeObj._shape);
	newShape.classList.add("ellipse");
	referrer.prepend(newShape);
	shapeObj._isShape = true;
	return shapeObj;
}

function prepShapeElKeyframe(shapeObj, referrer, animationId, addTransformation, depth) {

	return shapeObj;
}

function prepShapeSr(shapeObj, referrer, animationId, addTransformation, depth) {

	var newShape = document.createElementNS(xmlns, 'path');
	newShape.setAttribute("d", dataString);
	//newShape.setAttribute("stroke", "black");
	newShape.setAttribute("fill", "transparent");
	newShape.setAttribute("id", animationId + "_shape" + shapeObj._shape);
	newShape.classList.add("star");
	referrer.prepend(newShape);
	shapeObj._isShape = true;
	return shapeObj;
}

function prepShapeSrKeyframe(shapeObj, referrer, animationId, addTransformation, depth) {

	return shapeObj;
}

function prepShapeRc(shapeObj, referrer, animationId, addTransformation, depth) {

	var newShape = document.createElementNS(xmlns, 'rect');
	//newShape.setAttribute("d", dataString);
	//newShape.setAttribute("stroke", "black");
	newShape.setAttribute("fill", "transparent");

	newShape.setAttribute('width', shapeObj.s.k[0]);
	newShape.setAttribute('height', shapeObj.s.k[1]);
	if (shapeObj.p.k.length > 0) {
		newShape.setAttribute('x', (shapeObj.p.k[0] + (shapeObj.s.k[0] / 2)));
		newShape.setAttribute('y', (shapeObj.p.k[1] + (shapeObj.s.k[1] / 2)));
	}
	newShape.setAttribute("id", animationId + "_shape" + shapeObj._shape);
	newShape.classList.add("rectangle");
	referrer.prepend(newShape);
	shapeObj._isShape = true;
	return shapeObj;
}

function prepShapeRcKeyframe(shapeObj, referrer, animationId, addTransformation, depth) {

	return shapeObj;
}

function prepShapeSh(shapeObj, referrer, animationId, addTransformation, depth) {
	//console.log("prep shape");
	//var newShape = document.createElement('path');
	if (shapeObj.ks.k.hasOwnProperty('v')) {
	} else {
		if (shapeObj.ks.k[0].hasOwnProperty('s')) {
			console.log("BEFORE " + shapeObj.ks.k.length);
			shapeObj = extrapolateOffsetKeyframe(shapeObj, "ks", false, animationId, -1, shapeObj, depth);
			console.log("AFTER " + shapeObj.ks.k.length);
			var dataString = "";
			var totalK;
			if (shapeObj.ks.k[shapeObj.ks.k.length - 1].hasOwnProperty("s")) {
				totalK = shapeObj.ks.k.length;
			} else {
				totalK = shapeObj.ks.k.length - 1;
			}
			for (var kCount = 0; kCount < totalK; kCount++) {
				var transforms = getEmptyTransform();
				transforms.isLayer = false;
				transforms.isTween = true;
				//console.log("frame: " + shapeObj.ks.k[kCount].t + " count: " + kCount);
				transforms.refObj = animationId + "_shape" + shapeObj._shape;
				transforms.refObjOther = animationId + "_shape" + shapeObj._shape;
				//transforms.refObjOther = animationId + "_" + depth + "_layerGroup" + animation[animationId]._currentLayerGroup;
				transforms = findExistingTransform(transforms, animationId, shapeObj.ks.k[kCount].t);
				var dataString = "M" + shapeObj.ks.k[kCount].s[0].v[0][0] + "," + shapeObj.ks.k[kCount].s[0].v[0][1];
				for (var i = 1; i < shapeObj.ks.k[kCount].s[0].v.length; i++) {
					dataString = dataString + " C" + (shapeObj.ks.k[kCount].s[0].v[i - 1][0] + shapeObj.ks.k[kCount].s[0].o[i - 1][0]) + "," + (shapeObj.ks.k[kCount].s[0].v[i - 1][1] + shapeObj.ks.k[kCount].s[0].o[i - 1][1]) + " " + (shapeObj.ks.k[kCount].s[0].v[i][0] + shapeObj.ks.k[kCount].s[0].i[i][0]) + "," + (shapeObj.ks.k[kCount].s[0].v[i][1] + shapeObj.ks.k[kCount].s[0].i[i][1]) + " " + shapeObj.ks.k[kCount].s[0].v[i][0] + "," + shapeObj.ks.k[kCount].s[0].v[i][1];
				}
				if (shapeObj.ks.k[0].s[0].c) {
					dataString = dataString + " C" + (shapeObj.ks.k[kCount].s[0].v[shapeObj.ks.k[kCount].s[0].v.length - 1][0] + shapeObj.ks.k[kCount].s[0].o[shapeObj.ks.k[kCount].s[0].v.length - 1][0]) + "," + (shapeObj.ks.k[kCount].s[0].v[shapeObj.ks.k[kCount].s[0].v.length - 1][1] + shapeObj.ks.k[kCount].s[0].o[shapeObj.ks.k[kCount].s[0].v.length - 1][1]) + " " + (shapeObj.ks.k[kCount].s[0].v[0][0] + shapeObj.ks.k[kCount].s[0].i[0][0]) + "," + (shapeObj.ks.k[kCount].s[0].v[0][1] + shapeObj.ks.k[kCount].s[0].i[0][1]) + " " + shapeObj.ks.k[kCount].s[0].v[0][0] + "," + shapeObj.ks.k[kCount].s[0].v[0][1];
					dataString = dataString + " Z";
					//newShape.setAttribute("closepath", "1");
				}

				transforms.dataString = dataString;
				if (kCount == 0) {
					var newShape = document.createElementNS(xmlns, 'path');
					//newShape.setAttribute("stroke", "black");
					newShape.setAttribute("fill", "transparent");
					newShape.setAttribute("id", animationId + "_shape" + shapeObj._shape);
					newShape.setAttribute("d", dataString);
					newShape.classList.add("shape");
					referrer.prepend(newShape);
					shapeObj._isShape = true;
				}
				
				if (shapeObj.ks.k[kCount].t > animation[animationId]._totalFrames) {
					break;
				}
				animation[animationId]._scene[parseInt(shapeObj.ks.k[kCount].t)]._transform.push(transforms);
			}

		}
		return shapeObj;
	}
	var dataString = "M" + shapeObj.ks.k.v[0][0] + "," + shapeObj.ks.k.v[0][1];
	for (var i = 1; i < shapeObj.ks.k.v.length; i++) {
		dataString = dataString + " C" + (shapeObj.ks.k.v[i - 1][0] + shapeObj.ks.k.o[i - 1][0]) + "," + (shapeObj.ks.k.v[i - 1][1] + shapeObj.ks.k.o[i - 1][1]) + " " + (shapeObj.ks.k.v[i][0] + shapeObj.ks.k.i[i][0]) + "," + (shapeObj.ks.k.v[i][1] + shapeObj.ks.k.i[i][1]) + " " + shapeObj.ks.k.v[i][0] + "," + shapeObj.ks.k.v[i][1];
	}
	if (shapeObj.ks.k.c) {
		dataString = dataString + " C" + (shapeObj.ks.k.v[shapeObj.ks.k.v.length - 1][0] + shapeObj.ks.k.o[shapeObj.ks.k.v.length - 1][0]) + "," + (shapeObj.ks.k.v[shapeObj.ks.k.v.length - 1][1] + shapeObj.ks.k.o[shapeObj.ks.k.v.length - 1][1]) + " " + (shapeObj.ks.k.v[0][0] + shapeObj.ks.k.i[0][0]) + "," + (shapeObj.ks.k.v[0][1] + shapeObj.ks.k.i[0][1]) + " " + shapeObj.ks.k.v[0][0] + "," + shapeObj.ks.k.v[0][1];
		dataString = dataString + " Z";
		//newShape.setAttribute("closepath", "1");
	}
	shapeObj._data = dataString;
	var newShape = document.createElementNS(xmlns, 'path');
	//newShape.setAttribute("stroke", "black");
	newShape.setAttribute("fill", "transparent");
	newShape.setAttribute("id", animationId + "_shape" + shapeObj._shape);
	newShape.setAttribute("d", dataString);
	newShape.classList.add("shape");
	referrer.prepend(newShape);
	shapeObj._isShape = true;
	return shapeObj;
}

function prepShapeShKeyframe(shapeObj, referrer, animationId, depth) {

	return shapeObj;
}

function prepShape(shapeObj, referrer, animationId, isMasked, depth) {
	// first prep the shapes' helpers and transformations
	/*if (shapeObj.hasOwnProperty('ty')) {
	} else {
		return shapeObj;
	}*/

	if (shapeObj.ty == 'fl') {
		if (shapeObj.c.k.hasOwnProperty('s')) {
			shapeObj = getPosition(shapeObj, null, 'c', false, animationId, 3, shapeObj, depth);
		}
	}
	if (shapeObj.ty == 'tr') {
		if (shapeObj.hasOwnProperty('a')) {
			if (shapeObj.a.k.hasOwnProperty('s')) {
				shapeObj = getPosition(shapeObj, null, 'a', false, animationId, 2, shapeObj, depth);
				if (shapeObj.a.k[0].t > 0) {
					shapeObj._startI = true;
				}
			}
			if (shapeObj.a.k.length > 1) {
				shapeObj._anchorX = shapeObj.a.k[0];
				shapeObj._anchorY = shapeObj.a.k[1];
			}
		}
		if (shapeObj.hasOwnProperty('p')) {
			if (shapeObj.p.k.hasOwnProperty('s')) {
				shapeObj = getPosition(shapeObj, null, 'p', false, animationId, 2, shapeObj, depth);
				if (shapeObj.p.k[0].t > 0) {
					shapeObj._startI = true;
				}
			}
		}
	}

	/*
	if (isMask > 0 && shapeObj.ty == 'sh') {
		shapeObj = prepMask(shapeObj, referrer, animationId);
		return shapeObj;
	}
	*/

	// next prep the shapes' properties
	if (shapeObj.ty == 'sh') {
		//console.log("prep shape");
		if (shapeObj.hasOwnProperty("ks") && shapeObj.ks.k.length > 1) {
			shapeObj = prepShapeShKeyframe(shapeObj, referrer, animationId, depth);
		}
		shapeObj = prepShapeSh(shapeObj, referrer, animationId, depth);
	}

	if (shapeObj.ty == 'rc') {
		//console.log("prep shape");
		if (shapeObj.hasOwnProperty("ks") && shapeObj.ks.k.length > 1) {
			shapeObj = prepShapeRcKeyframe(shapeObj, referrer, animationId, depth);
		}
		shapeObj = prepShapeRc(shapeObj, referrer, animationId, depth);
	}

	/*
	if (shapeObj.ty == 'el') {
		//console.log("prep shape");
		if (shapeObj.ks.k.length > 1) {
			shapeObj = prepShapeElKeyframe(shapeObj, referrer, animationId);
		}
		shapeObj = prepShapeEl(shapeObj, referrer, animationId);
	}

	if (shapeObj.ty == 'sr') {
		//console.log("prep shape");
		if (shapeObj.ks.k.length > 1) {
			shapeObj = prepShapeSrKeyframe(shapeObj, referrer, animationId);
		}
		shapeObj = prepShapeSr(shapeObj, referrer, animationId);
	}
	*/

	return shapeObj;
}

function createGradientDef(start, end, opacity, gradient, animationId) {
	animation[animationId].gradientCount++;
	var newDefId = animationId + "_gradient" + animation[animationId].gradientCount;
	var newDef = document.createElementNS(xmlns, 'linearGradient');
	newDef.setAttribute("id", newDefId);
	newDef.setAttribute("spreadMethod", "pad");
	newDef.setAttribute("gradientUnits", "userSpaceOnUse");
	newDef.setAttribute("x1", start.k[0]);
	newDef.setAttribute("x2", end.k[0]);
	newDef.setAttribute("y1", start.k[1]);
	newDef.setAttribute("y2", end.k[1]);
	animation[animationId].defs.prepend(newDef);

	var offsets = [];
	var styles = [];
	var opacities = [];
	for (var i = 0; i < gradient.p; i++) {
		//var newStop = document.createElementNS(xmlns, 'stop');
		offsets.push((gradient.k.k[(i * 4) + 0] * 100) + "%");
		styles.push("stop-color:rgb(" + parseInt(gradient.k.k[(i * 4) + 1] * 255) + "," + parseInt(gradient.k.k[(i * 4) + 2] * 255) + "," + parseInt(gradient.k.k[(i * 4) + 3] * 255) + ");");
		opacities.push("stop-opacity:1;");
		//newDef.append(newStop);
	}
	if (gradient.k.k.length > (gradient.p * 4)) {
		for (var i = 0; i < gradient.p; i++) {
			opacities[i] = "stop-opacity:" + gradient.k.k[(i * 2) + (gradient.p * 4) + 1] + ";";
			/*var newStop = document.createElementNS(xmlns, 'stop');
			newStop.setAttribute("offset", (gradient.k.k[(i * 4) + 0] * 100) + "%");
			newStop.setAttribute("style", "stop-color:rgb(" + parseInt(gradient.k.k[(i * 4) + 1] * 255) + "," + parseInt(gradient.k.k[(i * 4) + 2] * 255) + "," + parseInt(gradient.k.k[(i * 4) + 3] * 255) + ");stop-opacity:1");
			newDef.append(newStop);*/
		}
	}
	for (var i = 0; i < gradient.p; i++) {
		var newStop = document.createElementNS(xmlns, 'stop');
		newStop.setAttribute("offset", offsets[i]);
		newStop.setAttribute("style", styles[i] + opacities[i]);
		newDef.append(newStop);
	}

	return "url(#" + newDefId + ")";
}

var lcEnum = {
	1: 'butt',
	2: 'round',
	3: 'square',
}

var ljEnum = {
	1: 'miter',
	2: 'round',
	3: 'bevel',
}

function getStrokeString(color, opacity, width, lineCap, lineJoin, miterLimit) {
	var strokeString = {"color":"", "opacity":1, "width":1, "lineCap":"round", "lineJoin":"round", "miterLimit":0};
	strokeString.color = "rgb(" + (color.k[0] * 255) + "," + (color.k[1] * 255) + "," + (color.k[2] * 255) + ")";
	strokeString.opacity = opacity.k / 100;
	strokeString.width = width.k;
	strokeString.lineCap = lcEnum[lineCap];
	strokeString.lineJoin = lcEnum[lineJoin];
	if (lineJoin == 1) {
		strokeString.miterLimit = lineJoin;
	}
	return strokeString;
}

function getColorString(redVal, greenVal, blueVal) {
	var color = "rgb(" + (redVal * 255) + "," + (greenVal * 255) + "," + (blueVal * 255) + ")";
	return color;
}

function setShapeStrokes(shapesGroup, strokeToSet, animationId, isGradient) {
	for (var i = 0; i < shapesGroup.length; i++) {
		if (shapesGroup[i]._isShape) {
			//document.getElementById(animationId + "_shape" + shapesGroup[i]._shape).setAttribute("fill", colorToSet);
			//document.getElementById(animationId + "_shape" + shapesGroup[i]._shape).setAttribute("fill", "yellow");
			//document.getElementById(animationId + "_shape" + shapesGroup[i]._shape).setAttribute("stroke", "black");
			document.getElementById(animationId + "_shape" + shapesGroup[i]._shape).setAttribute("stroke", strokeToSet.color);
			document.getElementById(animationId + "_shape" + shapesGroup[i]._shape).setAttribute("stroke-width", strokeToSet.width);
			document.getElementById(animationId + "_shape" + shapesGroup[i]._shape).setAttribute("stroke-linecap", strokeToSet.lineCap);
			document.getElementById(animationId + "_shape" + shapesGroup[i]._shape).setAttribute("stroke-linejoin", strokeToSet.lineJoin);
			if (strokeToSet.lineJoin == 1) {
				document.getElementById(animationId + "_shape" + shapesGroup[i]._shape).setAttribute("stroke-miterlimit", strokeToSet.miterLimit);
			}
		}
	}
}

function setShapeColors(shapesGroup, colorToSet, animationId, isGradient, isMasked) {
	for (var i = 0; i < shapesGroup.length; i++) {
		if (shapesGroup[i]._isShape && typeof colorToSet !== 'undefined') {
			document.getElementById(animationId + "_shape" + shapesGroup[i]._shape).setAttribute("fill", colorToSet);
			//if (isMasked > 0) {
				document.getElementById(animationId + "_shape" + shapesGroup[i]._shape).setAttribute("fill-opacity", 1);
			//}
		}
	}
}

function getShapesGr(elementId, animationId, layerObj, referrer, refGroup, isMasked, depth) {
	var currentColor;
	var currentStroke;
	var stroked = false;
	for (var i = 0; i < layerObj.it.length; i++) {
		layerObj._isGradient = false;
		//console.log("shapes ix: " + layerObj.it[i].ix);
		animation[animationId].shapeCount++;
		if (layerObj.tt > 0) {
			isMasked = layerObj.td;
		}
		if (layerObj.it[i].ty == "gr") {
			//console.log("------------------");
			layerObj.it[i]._group = animation[animationId].shapeCount;
			var newGroup = document.createElementNS(xmlns, 'g');
			newGroup.setAttribute("id", animationId + "_group" + animation[animationId].shapeCount);
			animation[animationId]._currentShapeGroup = animation[animationId].shapeCount;
			referrer.prepend(newGroup);
			layerObj.it[i] = getShapesGr(elementId, animationId, layerObj.it[i], newGroup, animationId + "_group" + animation[animationId].shapeCount, isMasked, depth);
		} else {
			layerObj.it[i]._shape = animation[animationId].shapeCount;
			layerObj.it[i] = prepShape(layerObj.it[i], referrer, animationId, isMasked);
			if (layerObj.it[i].ty == 'tr') {
				layerObj.it[i]._trIndex = i;
				if (layerObj.it[i].p.hasOwnProperty('k')) {
					if (layerObj.it[i].p.k.length > 1) {
						if (layerObj.it[i].hasOwnProperty('a')) {
							document.getElementById(refGroup).setAttribute("transform", "matrix(1,0,0,1," + (layerObj.it[i].p.k[0] - layerObj.it[i].a.k[0]) + "," + (layerObj.it[i].p.k[1] - layerObj.it[i].a.k[1]) + ")");
						} else {
							document.getElementById(refGroup).setAttribute("transform", "matrix(1,0,0,1," + layerObj.it[i].p.k[0] + "," + layerObj.it[i].p.k[1] + ")");					
						}
					}
				}
				/*if (layerObj.it[i]._startI) {
					document.getElementById(refGroup).style.display = "none";
				}*/
			}
			if (layerObj.it[i].ty == 'fl') {
				if (layerObj.it[i].c.k.length > 1) {
					currentColor = getColorString(layerObj.it[i].c.k[0], layerObj.it[i].c.k[1], layerObj.it[i].c.k[2]);
				}
			}
			if (layerObj.it[i].ty == 'st') {
				if (layerObj.it[i].c.k.length > 1) {
					currentStroke = getStrokeString(layerObj.it[i].c, layerObj.it[i].o, layerObj.it[i].w, layerObj.it[i].lc, layerObj.it[i].lj, layerObj.it[i].ml);
					stroked = true;
				}
			}
			if (layerObj.it[i].ty == 'gf') {
				layerObj._isGradient = true;
				//if (layerObj.shapes[i].c.k.length > 1) {
					currentColor = createGradientDef(layerObj.it[i].s, layerObj.it[i].e, layerObj.it[i].o, layerObj.it[i].g, animationId);
				//}
			}
		}
	}
	setShapeColors(layerObj.it, currentColor, animationId, layerObj._isGradient, isMasked);
	if (stroked) {
		setShapeStrokes(layerObj.it, currentStroke, animationId);
	}
	return layerObj;
}

function getShapes(elementId, animationId, layerObj, referrer, refGroup, isMasked, depth) {
	var currentColor;
	var currentStroke;
	var stroked = false;
	for (var i = 0; i < layerObj.shapes.length; i++) {
		layerObj._isGradient = false;
		//console.log("shapes ix: " + layerObj.shapes[i].ix);
		animation[animationId].shapeCount++;
		if (layerObj.tt > 0) {
			isMasked = layerObj.td;
		}
		if (layerObj.shapes[i].ty == "gr") {
			//console.log("------------------");
			layerObj.shapes[i]._group = animation[animationId].shapeCount;
			var newGroup = document.createElementNS(xmlns, 'g');
			newGroup.setAttribute("id", animationId + "_group" + animation[animationId].shapeCount);
			newGroup.setAttribute("opacity", 1);
			animation[animationId]._currentShapeGroup = animation[animationId].shapeCount;
			referrer.prepend(newGroup);
			layerObj.shapes[i] = getShapesGr(elementId, animationId, layerObj.shapes[i], newGroup, animationId + "_group" + animation[animationId].shapeCount, isMasked, depth);
		} else {
			layerObj.shapes[i]._shape = animation[animationId].shapeCount;
			layerObj.shapes[i] = prepShape(layerObj.shapes[i], referrer, animationId, isMasked);
			if (layerObj.shapes[i].ty == 'tr') {
				layerObj.shapes[i]._trIndex = i;
				if (layerObj.shapes[i].p.hasOwnProperty('k')) {
					if (layerObj.shapes[i].p.k > 1) {
						document.getElementById(animationId + "_" + depth + "_layerGroup" + layerObj._layer).setAttribute("transform", "matrix(1,0,0,1," + layerObj.shapes[i].p.k[0] + "," + layerObj.shapes[i].p.k[1] + ")");
					}
				}
				/*if (layerObj.shapes[i]._startI) {
					document.getElementById(animationId + "_" + depth + "_layerGroup" + layerObj._layer).style.display = "none";
				}*/
			}
			if (layerObj.shapes[i].ty == 'fl') {
				if (layerObj.shapes[i].c.k.length > 1) {
					currentColor = getColorString(layerObj.shapes[i].c.k[0], layerObj.shapes[i].c.k[1], layerObj.shapes[i].c.k[2]);
				}
			}
			if (layerObj.shapes[i].ty == 'st') {
				if (layerObj.shapes[i].c.k.length > 1) {
					currentStroke = getStrokeString(layerObj.shapes[i].c, layerObj.shapes[i].o, layerObj.shapes[i].w, layerObj.shapes[i].lc, layerObj.shapes[i].lj, layerObj.shapes[i].ml);
					stroked = true;
				}
			}
			if (layerObj.shapes[i].ty == 'gf') {
				layerObj._isGradient = true;
				//if (layerObj.shapes[i].c.k.length > 1) {
					currentColor = createGradientDef(layerObj.shapes[i].s, layerObj.shapes[i].e, layerObj.shapes[i].o, layerObj.shapes[i].g, animationId);
				//}
			}
		}
		//console.log("leastY " + layerObj._leastY);
	}
	setShapeColors(layerObj.shapes, currentColor, animationId, layerObj._isGradient, isMasked);
	if (stroked) {
		setShapeStrokes(layerObj.shapes, currentStroke, animationId);
	}
	return layerObj;
}

function resolveParents(animationId, layerId, lastMaskId, passedObj, passedKey, depth) {
	var newGroup;
	var newTranslateGroup;

	//for (var j = 0; j < animation[animationId].layers.length; j++) {
	for (var j = 0; j < passedObj[passedKey].length; j++) {
		if (passedObj[passedKey][j].ind == passedObj[passedKey][layerId].parent) {
			if (passedObj[passedKey][j].tt > 0) {
				for (var k = (j - 1); k >= 0; k--) {
					if (passedObj[passedKey][k].td > 0) {
						passedObj[passedKey][j]._mask = "_" + animationId + "_" + depth + "_layerMask" + passedObj[passedKey][k].ind;
						passedObj[passedKey][j]._isMasked = true;
						break;
					}
				}
			}
			if (! passedObj[passedKey][j]._addedToDom) {
				resolveParents(animationId, j, lastMaskId, passedObj, passedKey, depth);
			}
			animation[animationId].layerCount++;
			passedObj[passedKey][layerId]._parent = passedObj[passedKey][j]._layer;
			newLayer = document.createElementNS(xmlns, 'g');
			newLayer.setAttribute("id", animationId + "_" + depth + "_layer" + passedObj[passedKey][layerId]._layer);
			newLayer.setAttribute("mask", lastMaskId);
			newLayer.setAttribute("opacity", 1);
			/*if (passedObj[passedKey][j].td > 0) {
				document.getElementById(animationId + "_" + depth + "_layerGroup" + passedObj[passedKey][layerId]._parent).prepend(newLayer);
				newGroup = document.createElementNS(xmlns, 'g');
				newGroup.setAttribute("id", animationId + "_" + depth + "_layerGroup" + passedObj[passedKey][layerId]._layer);
				newGroup.setAttribute("opacity", 1);
				newLayer.prepend(newGroup);
			} else {*/
				document.getElementById(animationId + "_" + depth + "_layerTranslate" + passedObj[passedKey][layerId]._parent).prepend(newLayer);
				newTranslateGroup = document.createElementNS(xmlns, 'g');
				newTranslateGroup.setAttribute("id", animationId + "_" + depth + "_layerTranslate" + passedObj[passedKey][layerId]._layer);
				newTranslateGroup.setAttribute("opacity", 1);
				newLayer.prepend(newTranslateGroup);
				if (passedObj[passedKey][layerId].w > 0) {
					newLayer.style.width = passedObj[passedKey][layerId].w;
				}
				if (passedObj[passedKey][layerId].h > 0) {
					newLayer.style.height = passedObj[passedKey][layerId].h;
				}
				newGroup = document.createElementNS(xmlns, 'g');
				newGroup.setAttribute("id", animationId + "_" + depth + "_layerGroup" + passedObj[passedKey][layerId]._layer);
				newGroup.setAttribute("opacity", 1);
				newTranslateGroup.prepend(newGroup);
			//}

			passedObj[passedKey][j]._child.push("_layerGroup" + passedObj[passedKey][layerId].parent);
			passedObj[passedKey][j]._childId.push(layerId);
			passedObj[passedKey][j]._addedToDom = true;
			return;
		}
	}
}

function getLayers(elementId, animationId, elementObj, passedObj, passedKey, depth) {
	animation[animationId].depth++;
	depth = animation[animationId].depth;
	var newLayer;
	var newGroup;
	var newMask;
	var newTranslateGroup;
	var posX;
	var posY;
	var lastMaskId = "";
	for (var i = 0; i < passedObj[passedKey].length; i++) {
	//for (var i = 0; i < passedObj.layers.length; i++) {
		passedObj.layerCount++;
		passedObj[passedKey][i]._layer = passedObj[passedKey][i].ind;
		passedObj[passedKey][i]._child = [];
		passedObj[passedKey][i]._childId = [];
		if (passedObj[passedKey][i].parent > 0) {
		} else {
			if (passedObj[passedKey][i].td > 0) {
				passedObj[passedKey][i]._isMask = true;
				newMask = document.createElementNS(xmlns, 'mask');
				lastMaskId = "_" + animationId + "_" + depth + "_layerMask" + passedObj[passedKey][i].ind;
				newMask.setAttribute("id", lastMaskId);
				newMask.setAttribute("mask-type", "alpha");
				//newMask.setAttribute("maskUnits", "userSpaceOnUse");
				//newMask.setAttribute("maskContentUnits", "objectBoundingBox");
				newMask.setAttribute("opacity", 1);
				passedObj.defs.prepend(newMask);
				
				newLayer = document.createElementNS(xmlns, 'g');
				newLayer.setAttribute("id", animationId + "_" + depth + "_layer" + passedObj[passedKey][i].ind);
				newLayer.setAttribute("style", "display: block;");
				newLayer.setAttribute("opacity", 1);
				newMask.prepend(newLayer);
				
			} else {
				newLayer = document.createElementNS(xmlns, 'g');
				newLayer.setAttribute("id", animationId + "_" + depth + "_layer" + passedObj[passedKey][i].ind);
				newLayer.setAttribute("opacity", 1);
				elementObj.prepend(newLayer);
				if (passedObj[passedKey][i].tt > 0) {
					passedObj[passedKey][i]._mask = lastMaskId;
					passedObj[passedKey][i]._isMasked = true;
				}
			}
			passedObj[passedKey][i]._addedToDom = true;

			//if (passedObj[passedKey][i].td < 1) {
				/*if (passedObj[passedKey][i].td > 0) {
					newGroup = document.createElementNS(xmlns, 'g');
					newGroup.setAttribute("id", animationId + "_" + depth + "_layerGroup" + passedObj[passedKey][i]._layer);
					newGroup.setAttribute("opacity", 1);
					newMask.prepend(newGroup);
				} else {*/
					newTranslateGroup = document.createElementNS(xmlns, 'g');
					newTranslateGroup.setAttribute("id", animationId + "_" + depth + "_layerTranslate" + passedObj[passedKey][i]._layer);
					newTranslateGroup.setAttribute("opacity", 1);
					newLayer.prepend(newTranslateGroup);
					if (passedObj[passedKey][i].w > 0) {
						newLayer.style.width = passedObj[passedKey][i].w;
					}
					if (passedObj[passedKey][i].h > 0) {
						newLayer.style.height = passedObj[passedKey][i].h;
					}
					newGroup = document.createElementNS(xmlns, 'g');
					newGroup.setAttribute("id", animationId + "_" + depth + "_layerGroup" + passedObj[passedKey][i]._layer);
					newGroup.setAttribute("opacity", 1);
					newTranslateGroup.prepend(newGroup);
				//}
			//}
		}
	}
	//for (var i = 0; i < passedObj.layers.length; i++) {
	for (var i = 0; i < passedObj.layers.length; i++) {
		passedObj.layerCount = passedObj[passedKey][i]._layer;
		if (passedObj[passedKey][i].parent > 0) {
			for (var j = 0; j < passedObj.layers.length; j++) {
				if (passedObj[passedKey][j].ind == passedObj[passedKey][i].parent) {
					if (passedObj[passedKey][i].tt > 0) {
						for (var k = (i - 1); k >= 0; k--) {
							if (passedObj[passedKey][k].td > 0) {
								passedObj[passedKey][i]._mask = "_" + animationId + "_" + depth + "_layerMask" + passedObj[passedKey][k].ind;
								break;
							}
						}
					}
					passedObj.layerCount++;
					if (! passedObj[passedKey][j]._addedToDom) {
						resolveParents(animationId, j, lastMaskId, passedObj, passedKey, depth);
					}
					passedObj[passedKey][i]._parent = passedObj[passedKey][j]._layer;
					newLayer = document.createElementNS(xmlns, 'g');
					newLayer.setAttribute("id", animationId + "_" + depth + "_layer" + passedObj[passedKey][i]._layer);
					newLayer.setAttribute("opacity", 1);
					/*if (passedObj[passedKey][i].tt > 0) {
						newLayer.setAttribute("mask", "url(#" + passedObj[passedKey][i]._mask + ")");
					}*/
					/*if (passedObj[passedKey][i].td > 0) {
						document.getElementById(animationId + "_" + depth + "_layerGroup" + passedObj[passedKey][i]._parent).prepend(newLayer);
						newGroup = document.createElementNS(xmlns, 'g');
						newGroup.setAttribute("id", animationId + "_" + depth + "_layerGroup" + passedObj[passedKey][i]._layer);
						newGroup.setAttribute("opacity", 1);
						newLayer.prepend(newGroup);
					} else {*/
						document.getElementById(animationId + "_" + depth + "_layerTranslate" + passedObj[passedKey][i]._parent).prepend(newLayer);
						newTranslateGroup = document.createElementNS(xmlns, 'g');
						newTranslateGroup.setAttribute("id", animationId + "_" + depth + "_layerTranslate" + passedObj[passedKey][i]._layer);
						newTranslateGroup.setAttribute("opacity", 1);
						newLayer.prepend(newTranslateGroup);
						if (passedObj[passedKey][i].w > 0) {
							newLayer.style.width = passedObj[passedKey][i].w;
						}
						if (passedObj[passedKey][i].h > 0) {
							newLayer.style.height = passedObj[passedKey][i].h;
						}
						newGroup = document.createElementNS(xmlns, 'g');
						newGroup.setAttribute("id", animationId + "_" + depth + "_layerGroup" + passedObj[passedKey][i]._layer);
						newGroup.setAttribute("opacity", 1);
						newTranslateGroup.prepend(newGroup);
					//}
		
					passedObj[passedKey][j]._child.push(animationId + "_" + depth + "_layerGroup" + passedObj[passedKey][i].parent);
					passedObj[passedKey][j]._childId.push(i);
					passedObj[passedKey][j]._addedToDom = true;
				}
			}
		}
	}
	for (var i = 0; i < passedObj.layers.length; i++) {
		//console.log("layer ind: " + passedObj[passedKey][i].ind);
		passedObj[passedKey][i]._inPoint = -1;
		passedObj[passedKey][i]._outPoint = -1;
		if (passedObj[passedKey][i].hasOwnProperty("ip") && passedObj[passedKey][i].ip >= 0) {
			passedObj[passedKey][i]._inPoint = passedObj[passedKey][i].ip;
			if (passedObj[passedKey][i]._inPoint >= 0) {
				if (passedObj[passedKey][i]._layer == 60) {
					console.log("inPoint: " + passedObj[passedKey][i]._inPoint);
				}
				//stageShow(animationId, animationId + "_" + depth + "_layerTranslate" + passedObj[passedKey][i]._layer, animationId + "_" + depth + "_layerGroup" + passedObj[passedKey][i]._layer, parseInt(passedObj[passedKey][i]._inPoint));
			}
		}
		if (passedObj[passedKey][i].hasOwnProperty("op") && passedObj[passedKey][i].op > 0) {
			passedObj[passedKey][i]._outPoint = passedObj[passedKey][i].op;
			if (passedObj[passedKey][i]._outPoint > passedObj._totalFrames) {
				passedObj[passedKey][i]._outPoint = passedObj._totalFrames;
			}
			if (passedObj[passedKey][i]._outPoint < passedObj._totalFrames) {
				if (passedObj[passedKey][i]._layer == 60) {
					console.log("outPoint: " + passedObj[passedKey][i]._outPoint);
				}
				//stageHide(animationId, animationId + "_" + depth + "_layerTranslate" + passedObj[passedKey][i]._layer, animationId + "_" + depth + "_layerGroup" + passedObj[passedKey][i]._layer, parseInt(passedObj[passedKey][i]._outPoint));
			}
		} else {
			passedObj[passedKey][i]._outPoint = passedObj._totalFrames;
		}
		stageSequence(animationId, animationId + "_" + depth + "_layerGroup" + passedObj[passedKey][i]._layer, passedObj[passedKey][i]._inPoint, passedObj[passedKey][i]._outPoint);

		passedObj.layerCount = passedObj[passedKey][i]._layer;
		newLayer = document.getElementById(animationId + "_" + depth + "_layer" + passedObj[passedKey][i]._layer);
		newGroup = document.getElementById(animationId + "_" + depth + "_layerGroup" + passedObj[passedKey][i]._layer);
		if (passedObj[passedKey][i].tt > 0) {
			document.getElementById(animationId + "_" + depth + "_layer" + passedObj[passedKey][i]._layer).setAttribute("mask", "url(#" + passedObj[passedKey][i]._mask + ")");
			document.getElementById(animationId + "_" + depth + "_layer" + passedObj[passedKey][i]._layer).setAttribute("style", "display: block;");
		}
		passedObj._currentLayer = passedObj[passedKey][i]._layer;
		passedObj._currentLayer._inPoint = passedObj[passedKey][i]._inPoint;
		passedObj._currentLayer._outPoint = passedObj[passedKey][i]._outPoint;
		if (passedObj[passedKey][i].hasOwnProperty('refId')) {
			var tempRef = -1;
			for (var m = 0; m < passedObj.assets.length; m++) {
				if (passedObj.assets[m].id == passedObj[passedKey][i].refId) {
					tempRef = m;
					break;
				}
			}
			if (tempRef >= 0) {
				console.log("comp: " + passedObj[passedKey][i].refId);
				passedObj.assets[tempRef] = getLayers(elementId, animationId, newGroup, passedObj.assets[tempRef], "layers", depth);
			}
		}
		if (passedObj[passedKey][i].hasOwnProperty('shapes')) {
			//newGroup = document.createElementNS(xmlns, 'g');
			//newGroup.setAttribute("id", animationId + "_" + depth + "_layerGroup" + passedObj[passedKey][i]._layer);
			//if (passedObj[passedKey][i]._inPoint > 0) {
			//	console.log("layergroup: " + i + " " + passedObj[passedKey][i]._inPoint);
			//}
			passedObj._currentLayerGroup = passedObj[passedKey][i]._layer;
			passedObj._currentLayerGroup._inPoint = passedObj[passedKey][i]._inPoint;
			passedObj._currentLayerGroup._outPoint = passedObj[passedKey][i]._outPoint;
			//newLayer.prepend(newGroup);
			passedObj[passedKey][i] = getShapes(elementId, animationId, passedObj[passedKey][i], newGroup, animationId + "_" + depth + "_layerGroup" + passedObj[passedKey][i]._layer, false, passedObj[passedKey][i].td, depth);
			if (passedObj[passedKey][i].hasOwnProperty('shapes')) {
				passedObj._boundingX = (newGroup.getBoundingClientRect().width / 2);
				passedObj._boundingY = (newGroup.getBoundingClientRect().height / 2);
			}
		} else {
			if (passedObj[passedKey][i]._inPoint > 0) {
				console.log("layer: " + i);
				//newLayer.style.display = 'none';
			}
		}
		if (passedObj[passedKey][i].hasOwnProperty('ks')) {
			//console.log("layerObj " + passedObj[passedKey][i].ind);
			if (passedObj[passedKey][i].ks.hasOwnProperty('a')) {
				if (passedObj[passedKey][i].ks.a.hasOwnProperty('k')) {
					if (passedObj[passedKey][i].ks.a.k.length > 1) {
						passedObj[passedKey][i]._anchorX = passedObj[passedKey][i].ks.a.k[0];
						passedObj[passedKey][i]._anchorY = passedObj[passedKey][i].ks.a.k[1];
					}
				}
			}
			
			if (passedObj[passedKey][i].ks.hasOwnProperty('p')) {
				passedObj[passedKey][i].ks = getPosition(passedObj[passedKey][i].ks, null, 'p', true, animationId, 1, passedObj[passedKey][i], depth);
				if (passedObj[passedKey][i].ks.p.hasOwnProperty('k')) {
					if (passedObj[passedKey][i].ks.p.k.length > 1) {
						if (passedObj[passedKey][i].ks.p.k[0].hasOwnProperty("s")) {
						} else {
							if (passedObj[passedKey][i]._anchorX != 0) {
								posX = passedObj[passedKey][i].ks.p.k[0] - passedObj[passedKey][i]._anchorX;
							} else {
								posX = passedObj[passedKey][i].ks.p.k[0]; //passedObj._boundingX;
							}
							if (passedObj[passedKey][i]._anchorY != 0) {
								posY = passedObj[passedKey][i].ks.p.k[1] - passedObj[passedKey][i]._anchorY;
							} else {
								posY = passedObj[passedKey][i].ks.p.k[1]; //passedObj._boundingY;
							}
							if (passedObj[passedKey][i].td > 0) {
								document.getElementById(animationId + "_" + depth + "_layerGroup" + passedObj[passedKey][i]._layer).setAttribute("transform", "matrix(1,0,0,1," + posX + "," + posY + ")");
							} else {
								document.getElementById(animationId + "_" + depth + "_layer" + passedObj[passedKey][i]._layer).setAttribute("transform", "matrix(1,0,0,1," + posX + "," + posY + ")");
							}
							passedObj[passedKey][i]._posX = posX;
							passedObj[passedKey][i]._posY = posY;
						}
					}
				}
			}

			if (passedObj[passedKey][i].ks.hasOwnProperty('r')) {
				if (passedObj[passedKey][i].ks.r.k.length > 1) {
					if (passedObj[passedKey][i].ks.r.k[0].hasOwnProperty("s")) {
						passedObj[passedKey][i].ks = getPosition(passedObj[passedKey][i].ks, null, 'r', true, animationId, 1, passedObj[passedKey][i], depth);
					}
				}
			}
			if (passedObj[passedKey][i].ks.hasOwnProperty('s')) {
				if (passedObj[passedKey][i].ks.s.k.length > 1) {
					if (passedObj[passedKey][i].ks.s.k[0].hasOwnProperty("s")) {
						passedObj[passedKey][i].ks = getPosition(passedObj[passedKey][i].ks, null, 's', true, animationId, 1, passedObj[passedKey][i], depth);
					}
				}
			}
			if (passedObj[passedKey][i].ks.hasOwnProperty('o')) {
				if (passedObj[passedKey][i].ks.o.k.length > 1) {
					if (passedObj[passedKey][i].ks.o.k[0].hasOwnProperty("s")) {
						passedObj[passedKey][i].ks = getPosition(passedObj[passedKey][i].ks, null, 'o', true, animationId, 1, passedObj[passedKey][i], depth);
					}
				}
			}

		}
	}
	console.log("DONE");
	return passedObj;
}

function buildGraph(elementId, animationId, elementObj, autoplay, loop, customName) {
	animation[animationId].depth = 0;
	animation[animationId].shapeCount = 0;
	animation[animationId].layerCount = 0;
	animation[animationId]._removed = false;
	animation[animationId]._totalFrames = parseInt(animation[animationId].op - animation[animationId].ip);
	animation[animationId]._frameTime = (1 / animation[animationId].fr) * 1000;
	animation[animationId]._currentFrame = -1;
	animation[animationId]._lastTime = Date.now();
	animation[animationId]._autoplay = autoplay;
	animation[animationId]._loop = loop;
	animation[animationId]._customName = customName;
	animation[animationId]._paused = false;
	elementObj.style.width = animation[animationId].w;
	elementObj.style.height = animation[animationId].h;
	elementObj.setAttribute("width", animation[animationId].w);
	elementObj.setAttribute("height", animation[animationId].h);
	//var outerDiv = document.createElement('div');
	var newSVG = document.createElementNS(xmlns, 'svg');
	newSVG.setAttribute("xmlns", xmlns);
	newSVG.setAttributeNS(null, "width", animation[animationId].w);
	newSVG.setAttributeNS(null, "height", animation[animationId].h);
	newSVG.setAttributeNS(null, "viewBox", "0 0 " + animation[animationId].w + " " + animation[animationId].h);
	newSVG.setAttributeNS(null, "preserveAspectRatio", "xMidYMid meet");
	newSVG.style.width = "100%";
	newSVG.style.height = "100%";
	newSVG.setAttributeNS(null, "id", "_svg" + animationId);
	elementObj.prepend(newSVG);
	animation[animationId].defs = document.createElementNS(xmlns, 'defs');
	animation[animationId].defs.setAttributeNS(null, "id", "_defs" + animationId);
	animation[animationId].gradientCount = 0;
	animation[animationId].maskCount = 0;
	newSVG.prepend(animation[animationId].defs);
	var newLayer = document.createElementNS(xmlns, 'g');
	//newLayer.setAttribute("xmlns", "http://www.w3.org/2000/xvg");
	newLayer.setAttributeNS(null, "id", "_lanim" + animationId);
	/*
	newLayer.setAttributeNS(null, "width", "100%");
	newLayer.setAttributeNS(null, "height", "100%");
	newLayer.setAttributeNS(null, "viewBox", "0 0 " + animation[animationId].w + " " + animation[animationId].h);
	newLayer.setAttributeNS(null, "preserveAspectRatio", "xMidYMid meet");
	newLayer.style.width = animation[animationId].w;
	newLayer.style.height = animation[animationId].h;
	*/
	newSVG.append(newLayer);
	var newCompute = document.createElementNS(xmlns, 'g');
	//newLayer.setAttribute("xmlns", "http://www.w3.org/2000/xvg");
	newCompute.setAttributeNS(null, "id", "_compute" + animationId);
	newCompute.style.display = 'none';
	newLayer.prepend(newCompute);
	animation[animationId]._scene = new Array(animation[animationId]._totalFrames + 1).fill(null).map(()=>({'_transform':[]}));
	animation[animationId]._instated = {};
	animation[animationId]._refObj = [];
	animation[animationId]._objSize = {};
	animation[animationId] = getLayers(elementId, animationId, newLayer, animation[animationId], "layers", 0);

	var clipPath = document.createElementNS(xmlns, 'clipPath');
	clipPath.setAttributeNS(null, "id", "_clip" + animationId);
	animation[animationId].defs.prepend(clipPath);
	var clipPathRect = document.createElementNS(xmlns, 'rect');
	clipPathRect.setAttribute("x", 0);
	clipPathRect.setAttribute("y", 0);
	clipPathRect.setAttribute("width", animation[animationId].w);
	clipPathRect.setAttribute("height", animation[animationId].h);
	clipPath.append(clipPathRect);
	newLayer.setAttributeNS(null, "clip-path", "url(#_clip" + animationId + ")");
	//fillScene(elementId, animationId);
	animation[animationId]._buildDone = true;
	//console.log("width: " + animationSource[animationId].w + ", height: " + animationSource[animationId].h);
	animationLoading = animationLoading - 1;
	if (! animation[animationId]._autoplay) {
		lottie.goToAndStop(1, "", animation[animationId]._elementId);
	}
}

function getJson(src, autoplay, controls, loop, mode, style, domElement, elementNo, elementId, elementObj, autoplay, loop) {
	var http = new XMLHttpRequest();
	http.open("GET", src, true);
	http.onreadystatechange = function() {
		if (http.readyState == 4 && http.status == 200) {
			animationCount = animationCount + 1;
			var currentAnimation = animationCount;
			animation[currentAnimation] = JSON.parse(http.responseText);
			animation[currentAnimation]._elementId = elementId;
			buildGraph(elementId, currentAnimation, elementObj, autoplay, loop);
		}
	}
	http.send();
}

function processLottie(lottieElement, JSONsrc) {
	var autoplay = '';
	var controls = '';
	var loop = '';
	var mode = '';
	var src = '';
	var style = '';
	var elementId = '';

	if (lottieElement === undefined) {
		var lottieElements = document.getElementsByTagName("lottie-player");
		var i;
		for (i = 0; i < lottieElements.length; i++) {
			animationLoading = animationLoading + 1;
		
			var attributes = lottieElements[i].attributes;
			var j;

			autoplay = '';
			controls = '';
			loop = '';
			mode = '';
			src = '';
			style = '';
			elementId = '';
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
			getJson(src, autoplay, controls, loop, mode, style, lottieElements[i], i, elementId, lottieElements[i], true, true);
		}
	} else {
		animationLoading = animationLoading + 1;
		if (!(JSONsrc === undefined) && JSONsrc.length > 0) {
			var currentAnimation = animationCount;
			animation[currentAnimation] = JSON.parse(JSONsrc);
			animation[currentAnimation]._elementId = elementId;
			buildGraph(elementId, currentAnimation, testElement, true, true);	
		} else {
			var testElement = document.getElementById(lottieElement);
			src = testElement.getAttribute("src");
			elementId = testElement.getAttribute("id");
			getJson(src, autoplay, controls, loop, mode, style, testElement, i, elementId, testElement, true, true);
		}

	}

	window.requestAnimationFrame(lottiemate);
}
