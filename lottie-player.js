const xmlns = "http://www.w3.org/2000/svg";

///////////// BEZIER

function bezierCurve(p1, c1, c2, p2, fromT, toT, isLayer, animationId, refKey, addTransformation, objectId) {
	if (animation[animationId]._currentLayer == 134) {
		console.log("bezierCurve " + animation[animationId]._currentLayer)
	}
	var newNodes = new Array();

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
	if (animation[animationId]._currentLayer == 134) {
		console.log("coord--------------- " +  p1[0] + "," + p1[1] + " t:" + fromT);
	}
	for (var i = 1; i < frames; i++) {
		timeTick = i / frames;
		oneMinusT = (1 - timeTick);
		newNodes.push({'_comp': 1});
		currentFrame++;
		newNodes[newNodes.length - 1]._frame = currentFrame;
		newNodes[newNodes.length - 1].s = new Array();
		if (refKey != "ks") {
			newNodes[newNodes.length - 1].s.push((Math.pow(oneMinusT, 3) * p1[0]) + 
								(3 * Math.pow(oneMinusT, 2) * timeTick * (c1.x + p1[0])) +
								(3 * oneMinusT * Math.pow(timeTick, 2) * (c2.x + p2[0])) +
								(Math.pow(timeTick, 3) * p2[0]));
			if (refKey == 'p' || refKey == 's') {
				newNodes[newNodes.length - 1].s.push((Math.pow(oneMinusT, 3) * p1[1]) + 
									(3 * Math.pow(oneMinusT, 2) * timeTick * (c1.y + p1[1])) +
									(3 * oneMinusT * Math.pow(timeTick, 2) * (c2.y + p2[1])) +
									(Math.pow(timeTick, 3) * p2[1]));
			}
		} else {
			for (var j = 0; j < p1.length; j++) {
				newNodes[newNodes.length - 1].s.push({"i":[], "o":[], "v":[]});
				for (var k = 0; k < p1[j].i.length; k++) {

					newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].i.push([
						(Math.pow(oneMinusT, 3) * p1[j].i[k][0]) + 
						(3 * Math.pow(oneMinusT, 2) * timeTick * (c1.x + p1[j].i[k][0])) +
						(3 * oneMinusT * Math.pow(timeTick, 2) * (c2.x + p2[0])) +
						(Math.pow(timeTick, 3) * p2[0]),
					//newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].i.push(
						(Math.pow(oneMinusT, 3) * p1[j].i[k][1]) + 
						(3 * Math.pow(oneMinusT, 2) * timeTick * (c1.y + p1[j].i[k][1])) +
						(3 * oneMinusT * Math.pow(timeTick, 2) * (c2.y + p2[1])) +
						(Math.pow(timeTick, 3) * p2[1])]);

					newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].o.push([
						(Math.pow(oneMinusT, 3) * p1[j].o[k][0]) + 
						(3 * Math.pow(oneMinusT, 2) * timeTick * (c1.x + p1[j].o[k][0])) +
						(3 * oneMinusT * Math.pow(timeTick, 2) * (c2.x + p2[0])) +
						(Math.pow(timeTick, 3) * p2[0]),
					//newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].o.push(
						(Math.pow(oneMinusT, 3) * p1[j].o[k][1]) + 
						(3 * Math.pow(oneMinusT, 2) * timeTick * (c1.y + p1[j].o[k][1])) +
						(3 * oneMinusT * Math.pow(timeTick, 2) * (c2.y + p2[1])) +
						(Math.pow(timeTick, 3) * p2[1])]);

					newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].v.push([
						(Math.pow(oneMinusT, 3) * p1[j].v[k][0]) + 
						(3 * Math.pow(oneMinusT, 2) * timeTick * (c1.x + p1[j].v[k][0])) +
						(3 * oneMinusT * Math.pow(timeTick, 2) * (c2.x + p2[0])) +
						(Math.pow(timeTick, 3) * p2[0]),
					//newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].v.push(
						(Math.pow(oneMinusT, 3) * p1[j].v[k][1]) + 
						(3 * Math.pow(oneMinusT, 2) * timeTick * (c1.y + p1[j].v[k][1])) +
						(3 * oneMinusT * Math.pow(timeTick, 2) * (c2.y + p2[1])) +
						(Math.pow(timeTick, 3) * p2[1])]);
				}
			}
			if (animation[animationId]._currentLayer == 134) {
				console.log("coord2 " + newNodes[newNodes.length - 1].s[0] + "," + newNodes[newNodes.length - 1].s[1] + " " + c1.x + "," + c1.y + " " + c2.x + "," + c2.y + " t:" + currentFrame);
			}
		}
			//console.log(p1[0] + " " + newNodes[newNodes.length - 1].s[0]);
		if (addTransformation) {
			addGroupPositionTransform(currentFrame, newNodes[newNodes.length - 1].s, isLayer, animationId, refKey, addTransformation, objectId);
		}
	}
	//console.log("done !");
	if (animation[animationId]._currentLayer == 134) {
		console.log("coord--------------- " +  p1[0] + "," + p1[1] + " t:" + toT);
	}

	return newNodes;
}

///////////// ANIMATOR

function loadFrame(i, _currentFrame) {
	for (var j = 0; j < animation[i]._scene[_currentFrame]._transform.length; j++) {
		currentObj = document.getElementById(animation[i]._scene[_currentFrame]._transform[j].refObj);
		currentObj.setAttribute('transform',
				animation[i]._scene[_currentFrame]._transform[j].translate + 
				animation[i]._scene[_currentFrame]._transform[j].rotate + 
				animation[i]._scene[_currentFrame]._transform[j].scale
			);
			
		//currentObj.setAttribute('transform', animation[i]._scene[_currentFrame]._transform[j].combined);
		currentObj.setAttribute('opacity', animation[i]._scene[_currentFrame]._transform[j].opacity);
	}
}

function lottiemate() {
	var currentDate = Date.now();
	var currentObj;
	for (var i = 0; i <= animationCount; i++) {
		if (currentDate - animation[i]._lastTime > animation[i]._frameTime) {
			animation[i]._lastTime = currentDate;
			animation[i]._currentFrame++;
			if (animation[i]._currentFrame > animation[i]._totalFrames) {
				animation[i]._currentFrame = 0;
			}
			//window.setTimeout(loadFrame, 1, i, animation[i]._currentFrame);
			for (var j = 0; j < animation[i]._scene[animation[i]._currentFrame]._transform.length; j++) {
				currentObj = document.getElementById(animation[i]._scene[animation[i]._currentFrame]._transform[j].refObj);
				currentObjOther = document.getElementById(animation[i]._scene[animation[i]._currentFrame]._transform[j].refObjOther);
				currentObj.setAttribute('transform', animation[i]._scene[animation[i]._currentFrame]._transform[j].combined);
				currentObjOther.setAttribute('opacity', animation[i]._scene[animation[i]._currentFrame]._transform[j].opacity);
				/*if (animation[i]._scene[animation[i]._currentFrame]._transform[j].show) {
					currentObj.style.display = 'block';
				}
				if (animation[i]._scene[animation[i]._currentFrame]._transform[j].hide) {
					currentObj.style.display = 'none';
				}*/
			}	
		}
	}
	window.requestAnimationFrame(lottiemate);
}

///////////// BUILD SCENE GRAPH
var lastRefObj;

function addGroupPositionTransform(frame, position, isLayer, animationId, refKey, addTransformation, objectId) {
	if (frame < 0 || addTransformation < 1) {
		return;
	}
	//console.log("addgroup " + animationId + " - " + frame);
	//console.log(typeof(animation[animationId]._scene[frame]._transform));
	var transforms = {};
	transforms.translateX = 0;
	transforms.translateY = 0;
	transforms.scaleFactorX = 0;
	transforms.scaleFactorY = 0;
	transforms.rotateAngle = 0;
	transforms.opacityFactor = 0;

	transforms.translate = '';
	transforms.rotate = '';
	transforms.scale = '';
	transforms.opacity = 0;
	transforms.hide = false;
	transforms.show = false;
	transforms.inPoint = -1;
	transforms.outPoint = -1;
	transforms.isLayer = true;

	var posX = 0;
	
	if (isLayer) {
		if (animation[animationId].hasOwnProperty("_currentLayerGroup")) {
			if (animation[animationId]._currentLayerGroup._inPoint >= 0) {
				transforms.inPoint = animation[animationId]._currentLayerGroup._inPoint;
			}
			if (animation[animationId]._currentLayerGroup._outPoint > 0) {
				transforms.outPoint = animation[animationId]._currentLayerGroup._outPoint;
			}
		} else {
			if (animation[animationId]._currentLayer._inPoint >= 0) {
				transforms.inPoint = animation[animationId]._currentLayer._inPoint;
			}
			if (animation[animationId]._currentLayer._outPoint > 0) {
				transforms.outPoint = animation[animationId]._currentLayer._outPoint;
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

	if (frame >= transforms.inPoint && frame <= transforms.outPoint) {
		transforms.show = true;
		transforms.hide = false;
	} else {
		transforms.show = false;
		transforms.hide = true;
	}

	if (isLayer) {
		transforms.isLayer = true;
		//if (animation[animationId].hasOwnProperty("_currentLayerGroup")) {
			transforms.refObj = animationId + "_layerTranslate" + animation[animationId]._currentLayerGroup;
			transforms.refObjOther = animationId + "_layerGroup" + animation[animationId]._currentLayerGroup;
		//} else {
		//	transforms.refObj = animationId + "_layer" + animation[animationId]._currentLayer;
		//}
	} else {
		transforms.isLayer = false;
		transforms.refObj = animationId + "_group" + animation[animationId]._currentShapeGroup;
		transforms.refObjOther = "";
	}

	for (var i = 0; i < animation[animationId]._scene[parseInt(frame)]._transform.length; i++) {
		if (animation[animationId]._scene[parseInt(frame)]._transform[i].refObj == transforms.refObj) {
			transforms = animation[animationId]._scene[parseInt(frame)]._transform[i];
			found = 1;
			break;
		}
	}

	var found = 0;
	var posY = 0;

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
		transforms.translate = 'translate(' + (transforms.translateX - objectId._anchorX) + ',' + (transforms.translateY - objectId._anchorY) + ') ';
	}
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
		if (position.length > 1) {
			transforms.scaleFactorY = transforms.scaleFactorY + position[1];
			transforms.scale = 'scale(' + (transforms.scaleFactorX / 100) + ',' + (transforms.scaleFactorY / 100) + ') ';
		} else {
			transforms.scale = 'scale(' + (transforms.scaleFactorX / 100) + ') ';
		}
	}
	if (refKey == 'o') {
		transforms.opacityFactor = transforms.opacityFactor + posX;
		transforms.opacity = transforms.opacityFactor / 100;
	}

	transforms.combined = transforms.translate + transforms.scale + transforms.rotate;
	animation[animationId]._scene[parseInt(frame)]._transform.push(transforms);

	lastRefObj = transforms.refObj;
}

///////////// PREP JSON

function extrapolateValueKeyframe(valueKeyframeObj) {

	return valueKeyframeObj;
}

function extrapolateOffsetKeyframe(offsetKeyframeObj, refKey, isLayer, animationId, addTransformation, objectId) {
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
				addGroupPositionTransform(offsetKeyframeObj[refKey].k[i].t, offsetKeyframeObj[refKey].k[i].s, isLayer, animationId, refKey, addTransformation, objectId);
			}
			if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('e')) {
				p2 = offsetKeyframeObj[refKey].k[i].e;
			} else {
				if (offsetKeyframeObj[refKey].k[i + 1].hasOwnProperty('s')) {
					p2 = offsetKeyframeObj[refKey].k[i + 1].s;
				}
			}

			if (offsetKeyframeObj[refKey].k[i + 1].hasOwnProperty('i')) {
				if (offsetKeyframeObj[refKey].k[i + 1].i.x < 1) offsetKeyframeObj[refKey].k[i + 1].i.x = 0.0;
				if (offsetKeyframeObj[refKey].k[i + 1].i.y < 1) offsetKeyframeObj[refKey].k[i + 1].i.y = 0.0;
			}
			if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('o')) {
				//if (offsetKeyframeObj[refKey].k[i].s == )
				if (offsetKeyframeObj[refKey].k[i].o.x < 1) offsetKeyframeObj[refKey].k[i].o.x = 0.0;
				if (offsetKeyframeObj[refKey].k[i].o.y < 1) offsetKeyframeObj[refKey].k[i].o.y = 0.0;
			}
			if (offsetKeyframeObj[refKey].k[i + 1].hasOwnProperty('i') && offsetKeyframeObj[refKey].k[i].hasOwnProperty('o') && gotI) {
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
			}
			//console.log("computed");	
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

function getPosition(currentObj, parentObj, refKey, isLayer, animationId, addTransformation, objectId) {
	if (currentObj.hasOwnProperty(refKey)) {
		if (currentObj[refKey].hasOwnProperty('k')) {
			if (currentObj[refKey].k.length > 1) {
				if (currentObj[refKey].k[0].hasOwnProperty('s')) {
					currentObj = extrapolateOffsetKeyframe(currentObj, refKey, isLayer, animationId, addTransformation, objectId);
				}
			}
		}
	}
	return currentObj;
}

function prepShapeEl(shapeObj, referrer, animationId, addTransformation) {

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

function prepShapeElKeyframe(shapeObj, referrer, animationId, addTransformation) {

	return shapeObj;
}

function prepShapeSr(shapeObj, referrer, animationId, addTransformation) {

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

function prepShapeSrKeyframe(shapeObj, referrer, animationId, addTransformation) {

	return shapeObj;
}

function prepShapeRc(shapeObj, referrer, animationId, addTransformation) {
	var newShape = document.createElementNS(xmlns, 'rect');
	newShape.setAttribute("d", dataString);
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

function prepShapeRcKeyframe(shapeObj, referrer, animationId, addTransformation) {

	return shapeObj;
}

function prepShapeSh(shapeObj, referrer, animationId, addTransformation) {
	//console.log("prep shape");
	//var newShape = document.createElement('path');
	if (shapeObj.ks.k.hasOwnProperty('v')) {
	} else {
		if (shapeObj.ks.k[0].hasOwnProperty('s')) {
			shapeObj = extrapolateOffsetKeyframe(shapeObj, "ks", false, animationId, -1, shapeObj);
		}
		return shapeObj;
	}
	var dataString = "M" + shapeObj.ks.k.v[0][0] + "," + shapeObj.ks.k.v[0][1];
	for (var i = 1; i < shapeObj.ks.k.v.length; i++) {
		dataString = dataString + " C" + (shapeObj.ks.k.v[i - 1][0] + shapeObj.ks.k.o[i - 1][0]) + "," + (shapeObj.ks.k.v[i - 1][1] + shapeObj.ks.k.o[i - 1][1]) + " " + (shapeObj.ks.k.v[i][0] + shapeObj.ks.k.i[i][0]) + "," + (shapeObj.ks.k.v[i][1] + shapeObj.ks.k.i[i][1]) + " " + shapeObj.ks.k.v[i][0] + "," + shapeObj.ks.k.v[i][1];
	}
	dataString = dataString + " C" + (shapeObj.ks.k.v[shapeObj.ks.k.v.length - 1][0] + shapeObj.ks.k.o[shapeObj.ks.k.v.length - 1][0]) + "," + (shapeObj.ks.k.v[shapeObj.ks.k.v.length - 1][1] + shapeObj.ks.k.o[shapeObj.ks.k.v.length - 1][1]) + " " + (shapeObj.ks.k.v[0][0] + shapeObj.ks.k.i[0][0]) + "," + (shapeObj.ks.k.v[0][1] + shapeObj.ks.k.i[0][1]) + " " + shapeObj.ks.k.v[0][0] + "," + shapeObj.ks.k.v[0][1];
	shapeObj._data = dataString;
	var newShape = document.createElementNS(xmlns, 'path');
	newShape.setAttribute("d", dataString);
	//newShape.setAttribute("stroke", "black");
	newShape.setAttribute("fill", "transparent");
	newShape.setAttribute("id", animationId + "_shape" + shapeObj._shape);
	if (shapeObj.ks.k.c) {
		newShape.setAttribute("closepath", null);
	}
	newShape.classList.add("shape");
	referrer.prepend(newShape);
	shapeObj._isShape = true;
	return shapeObj;
}

function prepShapeShKeyframe(shapeObj, referrer, animationId) {

	return shapeObj;
}

function prepShape(shapeObj, referrer, animationId, objectId) {
	// first prep the shapes' helpers and transformations
	/*if (shapeObj.hasOwnProperty('ty')) {
	} else {
		return shapeObj;
	}*/
	if (shapeObj.ty == 'fl') {
		if (shapeObj.c.k.hasOwnProperty('s')) {
			shapeObj = getPosition(shapeObj, null, 'c', false, animationId, 3, shapeObj);
		}
	}
	if (shapeObj.ty == 'tr') {
		if (shapeObj.hasOwnProperty('a')) {
			if (shapeObj.a.k.hasOwnProperty('s')) {
				shapeObj = getPosition(shapeObj, null, 'a', false, animationId, 2, shapeObj);
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
				shapeObj = getPosition(shapeObj, null, 'p', false, animationId, 2, shapeObj);
				if (shapeObj.p.k[0].t > 0) {
					shapeObj._startI = true;
				}
			}
		}
	}
	// next prep the shapes' properties
	if (shapeObj.ty == 'sh') {
		//console.log("prep shape");
		if (shapeObj.ks.k.length > 1) {
			shapeObj = prepShapeShKeyframe(shapeObj, referrer, animationId);
		}
		shapeObj = prepShapeSh(shapeObj, referrer, animationId);
	} 

	if (shapeObj.ty == 'rc') {
		//console.log("prep shape");
		if (shapeObj.ks.k.length > 1) {
			shapeObj = prepShapeRcKeyframe(shapeObj, referrer, animationId);
		}
		shapeObj = prepShapeRc(shapeObj, referrer, animationId);
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
	var newDefId = "def" + animation[animationId].defCount;
	animation[animationId].defCount++;
	var newDef = document.createElementNS(xmlns, 'linearGradient');
	newDef.setAttribute("id", newDefId);
	newDef.setAttribute("x1", start.k[0]);
	newDef.setAttribute("x2", end.k[0]);
	newDef.setAttribute("y1", start.k[1]);
	newDef.setAttribute("y2", end.k[1]);
	animation[animationId].defs.prepend(newDef);

	for (var i = 0; i < gradient.p; i++) {
		var newStop = document.createElementNS(xmlns, 'stop');
		newStop.setAttribute("offset", (gradient.k.k[(i * 4) + 0] * 100) + "%");
		newStop.setAttribute("style", "stop-color:rgb(" + parseInt(gradient.k.k[(i * 4) + 1] * 255) + "," + parseInt(gradient.k.k[(i * 4) + 2] * 255) + "," + parseInt(gradient.k.k[(i * 4) + 3] * 255) + ");stop-opacity:1");
		newDef.append(newStop);
	}
	
	return "url(#" + newDefId + ")";
}

function getColorString(redVal, greenVal, blueVal) {
	var color = "rgb(" + (redVal * 255) + "," + (greenVal * 255) + "," + (blueVal * 255) + ")";
	return color;
}

function setShapeColors(shapesGroup, colorToSet, animationId, isGradient) {
	for (var i = 0; i < shapesGroup.length; i++) {
		if (shapesGroup[i]._isShape) {
			document.getElementById(animationId + "_shape" + shapesGroup[i]._shape).setAttribute("fill", colorToSet);
		}
	}
}

function getShapesGr(elementId, animationId, layerObj, referrer, refGroup) {
	var currentColor;
	for (var i = 0; i < layerObj.it.length; i++) {
		layerObj._isGradient = false;
		//console.log("shapes ix: " + layerObj.it[i].ix);
		animation[animationId].shapeCount++;
		if (layerObj.it[i].ty == "gr") {
			//console.log("------------------");
			layerObj.it[i]._group = animation[animationId].shapeCount;
			var newGroup = document.createElementNS(xmlns, 'g');
			newGroup.setAttribute("id", animationId + "_group" + animation[animationId].shapeCount);
			animation[animationId]._currentShapeGroup = animation[animationId].shapeCount;
			referrer.prepend(newGroup);
			layerObj.it[i] = getShapesGr(elementId, animationId, layerObj.it[i], newGroup, animationId + "_group" + animation[animationId].shapeCount);
		} else {
			layerObj.it[i]._shape = animation[animationId].shapeCount;
			layerObj.it[i] = prepShape(layerObj.it[i], referrer, animationId);
			if (layerObj.it[i].ty == 'tr') {
				layerObj.it[i]._trIndex = i;
				if (layerObj.it[i].p.hasOwnProperty('k')) {
					if (layerObj.it[i].p.k.length > 1) {
						document.getElementById(refGroup).setAttribute("transform", "matrix(1,0,0,1," + layerObj.it[i].p.k[0] + "," + layerObj.it[i].p.k[1] + ")");
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
			if (layerObj.it[i].ty == 'gf') {
				layerObj._isGradient = true;
				//if (layerObj.shapes[i].c.k.length > 1) {
					currentColor = createGradientDef(layerObj.it[i].s, layerObj.it[i].e, layerObj.it[i].o, layerObj.it[i].g, animationId);
				//}
			}
		}
	}
	setShapeColors(layerObj.it, currentColor, animationId, layerObj._isGradient);
	return layerObj;
}

function getShapes(elementId, animationId, layerObj, referrer, refGroup) {
	var currentColor;
	for (var i = 0; i < layerObj.shapes.length; i++) {
		layerObj._isGradient = false;
		//console.log("shapes ix: " + layerObj.shapes[i].ix);
		animation[animationId].shapeCount++;
		if (layerObj.shapes[i].ty == "gr") {
			//console.log("------------------");
			layerObj.shapes[i]._group = animation[animationId].shapeCount;
			var newGroup = document.createElementNS(xmlns, 'g');
			newGroup.setAttribute("id", animationId + "_group" + animation[animationId].shapeCount);
			animation[animationId]._currentShapeGroup = animation[animationId].shapeCount;
			referrer.prepend(newGroup);
			layerObj.shapes[i] = getShapesGr(elementId, animationId, layerObj.shapes[i], newGroup, animationId + "_group" + animation[animationId].shapeCount);
		} else {
			layerObj.shapes[i]._shape = animation[animationId].shapeCount;
			layerObj.shapes[i] = prepShape(layerObj.shapes[i], referrer, animationId);
			if (layerObj.shapes[i].ty == 'tr') {
				layerObj.shapes[i]._trIndex = i;
				if (layerObj.shapes[i].p.hasOwnProperty('k')) {
					if (layerObj.shapes[i].p.k > 1) {
						document.getElementById(animationId + "_layerGroup" + layerObj._layer).setAttribute("transform", "matrix(1,0,0,1," + layerObj.shapes[i].p.k[0] + "," + layerObj.shapes[i].p.k[1] + ")");
					}
				}
				/*if (layerObj.shapes[i]._startI) {
					document.getElementById(animationId + "_layerGroup" + layerObj._layer).style.display = "none";
				}*/
			}
			if (layerObj.shapes[i].ty == 'fl') {
				if (layerObj.shapes[i].c.k.length > 1) {
					currentColor = getColorString(layerObj.shapes[i].c.k[0], layerObj.shapes[i].c.k[1], layerObj.shapes[i].c.k[2]);
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
	setShapeColors(layerObj.shapes, currentColor, animationId, layerObj._isGradient);
	return layerObj;
}

function resolveParents(animationId, layerId) {
	var newGroup;
	var newTranslateGroup;

	for (var j = 0; j < animation[animationId].layers.length; j++) {
		if (animation[animationId].layers[j].ind == animation[animationId].layers[layerId].parent) {
			if (! animation[animationId].layers[j]._addedToDom) {
				resolveParents(animationId, j);
			}
			animation[animationId].layerCount++;
			animation[animationId].layers[layerId]._parent = animation[animationId].layers[j]._layer;
			newLayer = document.createElementNS(xmlns, 'g');
			newLayer.setAttribute("id", animationId + "_layer" + animation[animationId].layers[layerId]._layer);
			document.getElementById(animationId + "_layerTranslate" + animation[animationId].layers[layerId]._parent).prepend(newLayer);
			newTranslateGroup = document.createElementNS(xmlns, 'g');
			newTranslateGroup.setAttribute("id", animationId + "_layerTranslate" + animation[animationId].layers[layerId]._layer);
			newLayer.prepend(newTranslateGroup);
			newGroup = document.createElementNS(xmlns, 'g');
			newGroup.setAttribute("id", animationId + "_layerGroup" + animation[animationId].layers[layerId]._layer);
			newTranslateGroup.prepend(newGroup);

			animation[animationId].layers[j]._child.push("_layerGroup" + animation[animationId].layers[layerId].parent);
			animation[animationId].layers[j]._childId.push(layerId);
			animation[animationId].layers[i]._addedToDom = true;
			return;
		}
	}
}

function getLayers(elementId, animationId, elementObj) {
	var newLayer;
	var newGroup;
	var newTranslateGroup;
	var posX;
	var posY;
	for (var i = 0; i < animation[animationId].layers.length; i++) {
		animation[animationId].layerCount++;
		animation[animationId].layers[i]._layer = animation[animationId].layers[i].ind;
		animation[animationId].layers[i]._child = new Array();
		animation[animationId].layers[i]._childId = new Array();
		if (animation[animationId].layers[i].parent > 0) {
		} else {
			newLayer = document.createElementNS(xmlns, 'g');
			newLayer.setAttribute("id", animationId + "_layer" + animation[animationId].layers[i].ind);
			elementObj.prepend(newLayer);
			animation[animationId].layers[i]._addedToDom = true;
			newTranslateGroup = document.createElementNS(xmlns, 'g');
			newTranslateGroup.setAttribute("id", animationId + "_layerTranslate" + animation[animationId].layers[i]._layer);
			newLayer.prepend(newTranslateGroup);
			newGroup = document.createElementNS(xmlns, 'g');
			newGroup.setAttribute("id", animationId + "_layerGroup" + animation[animationId].layers[i]._layer);
			newTranslateGroup.prepend(newGroup);
			
		}
	}
	for (var i = 0; i < animation[animationId].layers.length; i++) {
		animation[animationId].layerCount = animation[animationId].layers[i]._layer;
		if (animation[animationId].layers[i].parent > 0) {
			for (var j = 0; j < animation[animationId].layers.length; j++) {
				if (animation[animationId].layers[j].ind == animation[animationId].layers[i].parent) {
					animation[animationId].layerCount++;
					if (! animation[animationId].layers[j]._addedToDom) {
						resolveParents(animationId, j);
					}
					animation[animationId].layers[i]._parent = animation[animationId].layers[j]._layer;
					newLayer = document.createElementNS(xmlns, 'g');
					newLayer.setAttribute("id", animationId + "_layer" + animation[animationId].layers[i]._layer);
					document.getElementById(animationId + "_layerTranslate" + animation[animationId].layers[i]._parent).prepend(newLayer);
					newTranslateGroup = document.createElementNS(xmlns, 'g');
					newTranslateGroup.setAttribute("id", animationId + "_layerTranslate" + animation[animationId].layers[i]._layer);
					newLayer.prepend(newTranslateGroup);
					newGroup = document.createElementNS(xmlns, 'g');
					newGroup.setAttribute("id", animationId + "_layerGroup" + animation[animationId].layers[i]._layer);
					newTranslateGroup.prepend(newGroup);
		
					animation[animationId].layers[j]._child.push("_layerGroup" + animation[animationId].layers[i].parent);
					animation[animationId].layers[j]._childId.push(i);
					animation[animationId].layers[i]._addedToDom = true;
				}
			}
		}
	}
	for (var i = 0; i < animation[animationId].layers.length; i++) {
		//console.log("layer ind: " + animation[animationId].layers[i].ind);
		if (animation[animationId].layers[i].ip >= 0) {
			animation[animationId].layers[i]._inPoint = animation[animationId].layers[i].ip;
		}
		if (animation[animationId].layers[i].op > 0) {
			animation[animationId].layers[i]._outPoint = animation[animationId].layers[i].op;
		} else {
			animation[animationId].layers[i]._outPoint = animation[animationId]._totalFrames;
		}

		animation[animationId].layerCount = animation[animationId].layers[i]._layer;
		newLayer = document.getElementById(animationId + "_layer" + animation[animationId].layers[i]._layer);
		newGroup = document.getElementById(animationId + "_layerGroup" + animation[animationId].layers[i]._layer);
		animation[animationId]._currentLayer = animation[animationId].layers[i]._layer;
		animation[animationId]._currentLayer._inPoint = animation[animationId].layers[i]._inPoint;
		animation[animationId]._currentLayer._outPoint = animation[animationId].layers[i]._outPoint;
		if (animation[animationId].layers[i].hasOwnProperty('shapes')) {
			//newGroup = document.createElementNS(xmlns, 'g');
			//newGroup.setAttribute("id", animationId + "_layerGroup" + animation[animationId].layers[i]._layer);
			//if (animation[animationId].layers[i]._inPoint > 0) {
			//	console.log("layergroup: " + i + " " + animation[animationId].layers[i]._inPoint);
			//}
			animation[animationId]._currentLayerGroup = animation[animationId].layers[i]._layer;
			animation[animationId]._currentLayerGroup._inPoint = animation[animationId].layers[i]._inPoint;
			animation[animationId]._currentLayerGroup._outPoint = animation[animationId].layers[i]._outPoint;
			//newLayer.prepend(newGroup);
			animation[animationId].layers[i] = getShapes(elementId, animationId, animation[animationId].layers[i], newGroup, animationId + "_layerGroup" + animation[animationId].layers[i]._layer);
			if (animation[animationId].layers[i].hasOwnProperty('shapes')) {
				animation[animationId]._boundingX = (newGroup.getBoundingClientRect().width / 2);
				animation[animationId]._boundingY = (newGroup.getBoundingClientRect().height / 2);
			}
		} else {
			if (animation[animationId].layers[i]._inPoint > 0) {
				console.log("layer: " + i);
				//newLayer.style.display = 'none';
			}	
		}
		if (animation[animationId].layers[i].hasOwnProperty('ks')) {
			//console.log("layerObj " + animation[animationId].layers[i].ind);
			if (animation[animationId].layers[i].ks.hasOwnProperty('a')) {
				if (animation[animationId].layers[i].ks.a.hasOwnProperty('k')) {
					if (animation[animationId].layers[i].ks.a.k.length > 1) {
						animation[animationId].layers[i]._anchorX = animation[animationId].layers[i].ks.a.k[0];
						animation[animationId].layers[i]._anchorY = animation[animationId].layers[i].ks.a.k[1];
					}
				}
			}
			
			if (animation[animationId].layers[i].ks.hasOwnProperty('p')) {
				animation[animationId].layers[i].ks = getPosition(animation[animationId].layers[i].ks, null, 'p', true, animationId, 1, animation[animationId].layers[i]);
				if (animation[animationId].layers[i].ks.p.hasOwnProperty('k')) {
					if (animation[animationId].layers[i].ks.p.k.length > 1) {
						if (animation[animationId].layers[i].ks.p.k[0].hasOwnProperty("s")) {
						} else {
							posX = animation[animationId].layers[i].ks.p.k[0] - animation[animationId]._boundingX;
							posY = animation[animationId].layers[i].ks.p.k[1] - animation[animationId]._boundingY;
							document.getElementById(animationId + "_layer" + animation[animationId].layers[i]._layer).setAttribute("transform", "matrix(1,0,0,1," + posX + "," + posY + ")");
						}
					}
				}
			}

			if (animation[animationId].layers[i].ks.hasOwnProperty('r')) {
				if (animation[animationId].layers[i].ks.r.k.length > 1) {
					if (animation[animationId].layers[i].ks.r.k[0].hasOwnProperty("s")) {
						animation[animationId].layers[i].ks = getPosition(animation[animationId].layers[i].ks, null, 'r', true, animationId, 1, animation[animationId].layers[i]);
					}
				}
			}
			if (animation[animationId].layers[i].ks.hasOwnProperty('s')) {
				if (animation[animationId].layers[i].ks.s.k.length > 1) {
					if (animation[animationId].layers[i].ks.s.k[0].hasOwnProperty("s")) {
						animation[animationId].layers[i].ks = getPosition(animation[animationId].layers[i].ks, null, 's', true, animationId, 1, animation[animationId].layers[i]);
					}
				}
			}
			if (animation[animationId].layers[i].ks.hasOwnProperty('o')) {
				if (animation[animationId].layers[i].ks.o.k.length > 1) {
					if (animation[animationId].layers[i].ks.o.k[0].hasOwnProperty("s")) {
						animation[animationId].layers[i].ks = getPosition(animation[animationId].layers[i].ks, null, 'o', true, animationId, 1, animation[animationId].layers[i]);
					}
				}
			}

		}
	}
	console.log("DONE");
}

function buildGraph(elementId, animationId, elementObj) {
	animation[animationId].shapeCount = 0;
	animation[animationId].layerCount = 0;
	animation[animationId]._totalFrames = parseInt(animation[animationId].op - animation[animationId].ip);
	animation[animationId]._frameTime = (1 / animation[animationId].fr) * 1000;
	animation[animationId]._currentFrame = 0;
	animation[animationId]._lastTime = Date.now();
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
	var newCompute = document.createElementNS(xmlns, 'g');
	//newLayer.setAttribute("xmlns", "http://www.w3.org/2000/xvg");
	newCompute.setAttributeNS(null, "id", "_compute" + animationId);
	newCompute.style.display = 'none';
	newLayer.prepend(newCompute);
	animation[animationId]._scene = new Array(animation[animationId]._totalFrames + 1).fill(null).map(()=>({'_transform':[]}));
	animation[animationId].defs = document.createElementNS(xmlns, 'defs');
	animation[animationId].defs.setAttributeNS(null, "id", "_defs" + animationId);
	animation[animationId].defCount = 0;
	newLayer.prepend(animation[animationId].defs);
	getLayers(elementId, animationId, newLayer);
	//fillScene(elementId, animationId);
	animation[animationId]._buildDone = true;
	//console.log("width: " + animationSource[animationId].w + ", height: " + animationSource[animationId].h);
}

var animation = new Array();
var frame = new Array();
var animationCount = -1;
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
	window.requestAnimationFrame(lottiemate);
}

window.onload = function() {
	console.log("START");
	processLotties();
	console.log("DONE");
}
