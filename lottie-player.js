const xmlns = "http://www.w3.org/2000/svg";

///////////// BEZIER

function bezierCurve(p1, c1, c2, p2, fromT, toT, isLayer, animationId, refKey, addTransformation, objectId) {
	/*if (animation[animationId]._currentLayer == 134) {
		console.log("bezierCurve " + animation[animationId]._currentLayer)
	}*/
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
		newNodes[newNodes.length - 1].s = new Array();
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
			addGroupPositionTransform(currentFrame, newNodes[newNodes.length - 1].s, isLayer, animationId, refKey, addTransformation, objectId);
		}
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
			if (animation[i]._removed) {
				continue;
			}
			animation[i]._lastTime = currentDate;
			animation[i]._currentFrame++;
			if (animation[i]._currentFrame > animation[i]._totalFrames) {
				animation[i]._currentFrame = 0;
			}
			//window.setTimeout(loadFrame, 1, i, animation[i]._currentFrame);
			for (var j = 0; j < animation[i]._scene[animation[i]._currentFrame]._transform.length; j++) {
				if (animation[i]._scene[animation[i]._currentFrame]._transform[j].refObj.length > 0) {
					currentObj = document.getElementById(animation[i]._scene[animation[i]._currentFrame]._transform[j].refObj);
					currentObjOther = document.getElementById(animation[i]._scene[animation[i]._currentFrame]._transform[j].refObjOther);
					if (animation[i]._scene[animation[i]._currentFrame]._transform[j].isTween) {
						currentObj.setAttribute('d', animation[i]._scene[animation[i]._currentFrame]._transform[j].dataString);
					} else {
						currentObj.setAttribute('transform', animation[i]._scene[animation[i]._currentFrame]._transform[j].combined);
						currentObjOther.setAttribute('opacity', animation[i]._scene[animation[i]._currentFrame]._transform[j].opacity);
					}
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

}

function addGroupPositionTransform(frame, position, isLayer, animationId, refKey, addTransformation, objectId) {
	if (frame < 0 || addTransformation < 1) {
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
			transforms.refObj = animationId + "_layerTranslate" + animation[animationId]._currentLayerGroup;
			transforms.refObjOther = animationId + "_layerGroup" + animation[animationId]._currentLayerGroup;
		//} else {
		//	transforms.refObj = animationId + "_layer" + animation[animationId]._currentLayer;
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
		animation[animationId]._objSize[transforms.refObj] = new Array();
		//animation[animationId]._objSize[transforms.refObj][0] = document.getElementById(transforms.refObj).getBoundingClientRect().width - objectId._anchorX;
		//animation[animationId]._objSize[transforms.refObj][1] = document.getElementById(transforms.refObj).getBoundingClientRect().height - objectId._anchorY;
		animation[animationId]._objSize[transforms.refObj][0] = document.getElementById(transforms.refObj).getBoundingClientRect().width;
		animation[animationId]._objSize[transforms.refObj][1] = document.getElementById(transforms.refObj).getBoundingClientRect().height;
		//animation[animationId]._objSize[transforms.refObj][2] = object 
		//animation[animationId]._objSize[transforms.refObj][3] =
		//animation[animationId]._objSize[transforms.refObj][0] = document.getElementById(transforms.refObj).width;
		//animation[animationId]._objSize[transforms.refObj][1] = document.getElementById(transforms.refObj).height;
		if (animation[animationId]._currentLayerGroup == 116 || animation[animationId]._currentLayerGroup == 117) {
			console.log("ORIGINAL: " + animation[animationId]._objSize[transforms.refObj][0] + ", " + animation[animationId]._objSize[transforms.refObj][1] + " // " + transforms.anchorX + ", " + transforms.anchorY);
		}
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
		transforms.paddingX = (transforms.anchorX - tempBoundingW) + (tempBoundingW * currentScaleX);
		transforms.paddingY = (transforms.anchorY - tempBoundingH) + (tempBoundingH * currentScaleY);
		transforms.paddingAnchorX = transforms.anchorX * currentScaleX;
		transforms.paddingAnchorY = transforms.anchorY * currentScaleY;
		//transforms.translateX = transforms.translateX + (paddingX / 2);
		//transforms.translateY = transforms.translateY + (paddingY / 2);


		/*
		transforms.translateX = transforms.translateX + paddingX;
		transforms.translateY = transforms.translateY + paddingY;
		transforms.translate = 'translate(' + (transforms.translateX) + ',' + (transforms.translateY) + ') ';
		*/
		if (animation[animationId]._currentLayerGroup == 116 || animation[animationId]._currentLayerGroup == 117) {
			console.log("padding: " + transforms.paddingX + ", " + transforms.paddingY + " -- " + transforms.paddingAnchorX + ", " + transforms.paddingAnchorY);
		}
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
															objectId
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
																objectId 
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
																objectId
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

function extrapolatePathPosition(currentObj, parentObj, refKey, isLayer, animationId, addTransformation, objectId) {
	currentObj[refKey].k = new Array();
	if (currentObj[refKey].x.k.length > 1) {
		currentObj[refKey] = extrapolateOffsetKeyframe(currentObj[refKey], "x", isLayer, animationId, false, objectId);
	} else {

	}
	if (currentObj[refKey].y.k.length > 1) {
		currentObj[refKey] = extrapolateOffsetKeyframe(currentObj[refKey], "y", isLayer, animationId, false, objectId);
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
			addGroupPositionTransform(currentObj[refKey].k[i].t, currentObj[refKey].k[i].s, isLayer, animationId, refKey, addTransformation, objectId);
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
			addGroupPositionTransform(currentObj[refKey].k[i].t, currentObj[refKey].k[i].s, isLayer, animationId, refKey, addTransformation, objectId);
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
			addGroupPositionTransform(currentObj[refKey].k[i].t, currentObj[refKey].k[i].s, isLayer, animationId, refKey, addTransformation, objectId);
		}

		return currentObj;
	}

	return currentObj;
}

function getPosition(currentObj, parentObj, refKey, isLayer, animationId, addTransformation, objectId) {
	if (currentObj.hasOwnProperty(refKey)) {
		if (currentObj[refKey].hasOwnProperty('x') && currentObj[refKey].hasOwnProperty('y')) {
			currentObj = extrapolatePathPosition(currentObj, parentObj, refKey, isLayer, animationId, addTransformation, objectId);
		}
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
			console.log("BEFORE " + shapeObj.ks.k.length);
			shapeObj = extrapolateOffsetKeyframe(shapeObj, "ks", false, animationId, -1, shapeObj);
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
				//transforms.refObjOther = animationId + "_layerGroup" + animation[animationId]._currentLayerGroup;
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

function prepShapeShKeyframe(shapeObj, referrer, animationId) {

	return shapeObj;
}

function prepShape(shapeObj, referrer, animationId, isMasked) {
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

	/*
	if (isMask > 0 && shapeObj.ty == 'sh') {
		shapeObj = prepMask(shapeObj, referrer, animationId);
		return shapeObj;
	}
	*/

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

	var offsets = new Array();
	var styles = new Array();
	var opacities = new Array();
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

function getShapesGr(elementId, animationId, layerObj, referrer, refGroup, isMasked) {
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
			layerObj.it[i] = getShapesGr(elementId, animationId, layerObj.it[i], newGroup, animationId + "_group" + animation[animationId].shapeCount, isMasked);
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

function getShapes(elementId, animationId, layerObj, referrer, refGroup, isMasked) {
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
			layerObj.shapes[i] = getShapesGr(elementId, animationId, layerObj.shapes[i], newGroup, animationId + "_group" + animation[animationId].shapeCount, isMasked);
		} else {
			layerObj.shapes[i]._shape = animation[animationId].shapeCount;
			layerObj.shapes[i] = prepShape(layerObj.shapes[i], referrer, animationId, isMasked);
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

function resolveParents(animationId, layerId, lastMaskId) {
	var newGroup;
	var newTranslateGroup;

	//for (var j = 0; j < animation[animationId].layers.length; j++) {
	for (var j = 0; j < animation[animationId].layers.length; j++) {
		if (animation[animationId].layers[j].ind == animation[animationId].layers[layerId].parent) {
			if (animation[animationId].layers[j].tt > 0) {
				for (var k = (j - 1); k >= 0; k--) {
					if (animation[animationId].layers[k].td > 0) {
						animation[animationId].layers[j]._mask = "_" + animationId + "_layerMask" + animation[animationId].layers[k].ind;
						animation[animationId].layers[j]._isMasked = true;
						break;
					}
				}
			}
			if (! animation[animationId].layers[j]._addedToDom) {
				resolveParents(animationId, j);
			}
			animation[animationId].layerCount++;
			animation[animationId].layers[layerId]._parent = animation[animationId].layers[j]._layer;
			newLayer = document.createElementNS(xmlns, 'g');
			newLayer.setAttribute("id", animationId + "_layer" + animation[animationId].layers[layerId]._layer);
			newLayer.setAttribute("mask", lastMaskId);
			newLayer.setAttribute("opacity", 1);
			document.getElementById(animationId + "_layerTranslate" + animation[animationId].layers[layerId]._parent).prepend(newLayer);
			newTranslateGroup = document.createElementNS(xmlns, 'g');
			newTranslateGroup.setAttribute("id", animationId + "_layerTranslate" + animation[animationId].layers[layerId]._layer);
			newTranslateGroup.setAttribute("opacity", 1);
			newLayer.prepend(newTranslateGroup);
			newGroup = document.createElementNS(xmlns, 'g');
			newGroup.setAttribute("id", animationId + "_layerGroup" + animation[animationId].layers[layerId]._layer);
			newGroup.setAttribute("opacity", 1);
			newTranslateGroup.prepend(newGroup);

			animation[animationId].layers[j]._child.push("_layerGroup" + animation[animationId].layers[layerId].parent);
			animation[animationId].layers[j]._childId.push(layerId);
			animation[animationId].layers[j]._addedToDom = true;
			return;
		}
	}
}

function getLayers(elementId, animationId, elementObj) {
	var newLayer;
	var newGroup;
	var newMask;
	var newTranslateGroup;
	var posX;
	var posY;
	var lastMaskId = "";
	for (var i = 0; i < animation[animationId].layers.length; i++) {
	//for (var i = 0; i < animation[animationId].layers.length; i++) {
		animation[animationId].layerCount++;
		animation[animationId].layers[i]._layer = animation[animationId].layers[i].ind;
		animation[animationId].layers[i]._child = new Array();
		animation[animationId].layers[i]._childId = new Array();
		if (animation[animationId].layers[i].parent > 0) {
		} else {
			if (animation[animationId].layers[i].td > 0) {
				animation[animationId].layers[i]._isMask = true;
				newMask = document.createElementNS(xmlns, 'mask');
				lastMaskId = "_" + animationId + "_layerMask" + animation[animationId].layers[i].ind;
				newMask.setAttribute("id", lastMaskId);
				newMask.setAttribute("mask-type", "alpha");
				//newMask.setAttribute("maskUnits", "userSpaceOnUse");
				//newMask.setAttribute("maskContentUnits", "objectBoundingBox");
				newMask.setAttribute("opacity", 1);
				animation[animationId].defs.prepend(newMask);
				newLayer = document.createElementNS(xmlns, 'g');
				newLayer.setAttribute("id", animationId + "_layer" + animation[animationId].layers[i].ind);
				newLayer.setAttribute("style", "display: block;");
				newLayer.setAttribute("opacity", 1);
				newMask.prepend(newLayer);
			} else {
				newLayer = document.createElementNS(xmlns, 'g');
				newLayer.setAttribute("id", animationId + "_layer" + animation[animationId].layers[i].ind);
				newLayer.setAttribute("opacity", 1);
				elementObj.prepend(newLayer);
				if (animation[animationId].layers[i].tt > 0) {
					animation[animationId].layers[i]._mask = lastMaskId;
					animation[animationId].layers[i]._isMasked = true;
				}
			}
			animation[animationId].layers[i]._addedToDom = true;

			//if (animation[animationId].layers[i].td < 1) {
				newTranslateGroup = document.createElementNS(xmlns, 'g');
				newTranslateGroup.setAttribute("id", animationId + "_layerTranslate" + animation[animationId].layers[i]._layer);
				newTranslateGroup.setAttribute("opacity", 1);
				newLayer.prepend(newTranslateGroup);
				newGroup = document.createElementNS(xmlns, 'g');
				newGroup.setAttribute("id", animationId + "_layerGroup" + animation[animationId].layers[i]._layer);
				newGroup.setAttribute("opacity", 1);
				newTranslateGroup.prepend(newGroup);
			//}
		}
	}
	//for (var i = 0; i < animation[animationId].layers.length; i++) {
	for (var i = 0; i < animation[animationId].layers.length; i++) {
		animation[animationId].layerCount = animation[animationId].layers[i]._layer;
		if (animation[animationId].layers[i].parent > 0) {
			for (var j = 0; j < animation[animationId].layers.length; j++) {
				if (animation[animationId].layers[j].ind == animation[animationId].layers[i].parent) {
					if (animation[animationId].layers[i].tt > 0) {
						for (var k = (i - 1); k >= 0; k--) {
							if (animation[animationId].layers[k].td > 0) {
								animation[animationId].layers[i]._mask = "_" + animationId + "_layerMask" + animation[animationId].layers[k].ind;
								break;
							}
						}
					}
					animation[animationId].layerCount++;
					if (! animation[animationId].layers[j]._addedToDom) {
						resolveParents(animationId, j, lastMaskId);
					}
					animation[animationId].layers[i]._parent = animation[animationId].layers[j]._layer;
					newLayer = document.createElementNS(xmlns, 'g');
					newLayer.setAttribute("id", animationId + "_layer" + animation[animationId].layers[i]._layer);
					newLayer.setAttribute("opacity", 1);
					/*if (animation[animationId].layers[i].tt > 0) {
						newLayer.setAttribute("mask", "url(#" + animation[animationId].layers[i]._mask + ")");
					}*/
					document.getElementById(animationId + "_layerTranslate" + animation[animationId].layers[i]._parent).prepend(newLayer);
					newTranslateGroup = document.createElementNS(xmlns, 'g');
					newTranslateGroup.setAttribute("id", animationId + "_layerTranslate" + animation[animationId].layers[i]._layer);
					newTranslateGroup.setAttribute("opacity", 1);
					newLayer.prepend(newTranslateGroup);
					newGroup = document.createElementNS(xmlns, 'g');
					newGroup.setAttribute("id", animationId + "_layerGroup" + animation[animationId].layers[i]._layer);
					newGroup.setAttribute("opacity", 1);
					newTranslateGroup.prepend(newGroup);
		
					animation[animationId].layers[j]._child.push(animationId + "_layerGroup" + animation[animationId].layers[i].parent);
					animation[animationId].layers[j]._childId.push(i);
					animation[animationId].layers[j]._addedToDom = true;
				}
			}
		}
	}
	for (var i = 0; i < animation[animationId].layers.length; i++) {
		//console.log("layer ind: " + animation[animationId].layers[i].ind);
		animation[animationId].layers[i]._inPoint = -1;
		animation[animationId].layers[i]._outPoint = -1;
		if (animation[animationId].layers[i].hasOwnProperty("ip") && animation[animationId].layers[i].ip >= 0) {
			animation[animationId].layers[i]._inPoint = animation[animationId].layers[i].ip;
			if (animation[animationId].layers[i]._inPoint >= 0) {
				if (animation[animationId].layers[i]._layer == 60) {
					console.log("inPoint: " + animation[animationId].layers[i]._inPoint);
				}
				//stageShow(animationId, animationId + "_layerTranslate" + animation[animationId].layers[i]._layer, animationId + "_layerGroup" + animation[animationId].layers[i]._layer, parseInt(animation[animationId].layers[i]._inPoint));
			}
		}
		if (animation[animationId].layers[i].hasOwnProperty("op") && animation[animationId].layers[i].op > 0) {
			animation[animationId].layers[i]._outPoint = animation[animationId].layers[i].op;
			if (animation[animationId].layers[i]._outPoint > animation[animationId]._totalFrames) {
				animation[animationId].layers[i]._outPoint = animation[animationId]._totalFrames;
			}
			if (animation[animationId].layers[i]._outPoint < animation[animationId]._totalFrames) {
				if (animation[animationId].layers[i]._layer == 60) {
					console.log("outPoint: " + animation[animationId].layers[i]._outPoint);
				}
				//stageHide(animationId, animationId + "_layerTranslate" + animation[animationId].layers[i]._layer, animationId + "_layerGroup" + animation[animationId].layers[i]._layer, parseInt(animation[animationId].layers[i]._outPoint));
			}
		} else {
			animation[animationId].layers[i]._outPoint = animation[animationId]._totalFrames;
		}
		stageSequence(animationId, animationId + "_layerGroup" + animation[animationId].layers[i]._layer, animation[animationId].layers[i]._inPoint, animation[animationId].layers[i]._outPoint);

		animation[animationId].layerCount = animation[animationId].layers[i]._layer;
		newLayer = document.getElementById(animationId + "_layer" + animation[animationId].layers[i]._layer);
		newGroup = document.getElementById(animationId + "_layerGroup" + animation[animationId].layers[i]._layer);
		if (animation[animationId].layers[i].tt > 0) {
			document.getElementById(animationId + "_layer" + animation[animationId].layers[i]._layer).setAttribute("mask", "url(#" + animation[animationId].layers[i]._mask + ")");
			document.getElementById(animationId + "_layer" + animation[animationId].layers[i]._layer).setAttribute("style", "display: block;");
		}
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
			animation[animationId].layers[i] = getShapes(elementId, animationId, animation[animationId].layers[i], newGroup, animationId + "_layerGroup" + animation[animationId].layers[i]._layer, animation[animationId].layers[i].td);
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
							if (animation[animationId].layers[i]._anchorX != 0) {
								posX = animation[animationId].layers[i].ks.p.k[0] - animation[animationId].layers[i]._anchorX;
							} else {
								posX = animation[animationId].layers[i].ks.p.k[0]; //animation[animationId]._boundingX;
							}
							if (animation[animationId].layers[i]._anchorY != 0) {
								posY = animation[animationId].layers[i].ks.p.k[1] - animation[animationId].layers[i]._anchorY;
							} else {
								posY = animation[animationId].layers[i].ks.p.k[1]; //animation[animationId]._boundingY;
							}
							
							document.getElementById(animationId + "_layer" + animation[animationId].layers[i]._layer).setAttribute("transform", "matrix(1,0,0,1," + posX + "," + posY + ")");
							animation[animationId].layers[i]._posX = posX;
							animation[animationId].layers[i]._posY = posY;
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
	animation[animationId]._removed = false;
	animation[animationId]._totalFrames = parseInt(animation[animationId].op - animation[animationId].ip);
	animation[animationId]._frameTime = (1 / animation[animationId].fr) * 1000;
	animation[animationId]._currentFrame = -1;
	animation[animationId]._lastTime = Date.now();
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
	animation[animationId]._objSize = {};
	getLayers(elementId, animationId, newLayer);

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

function processLottie(lottieElement) {
	var autoplay = '';
	var controls = '';
	var loop = '';
	var mode = '';
	var src = '';
	var style = '';
	var elementId = '';

	if (lottieElement.length < 1) {
		var lottieElements = document.getElementsByTagName("lottie-player");
		var i;
		for (i = 0; i < lottieElements.length; i++) {
		
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
			getJson(src, autoplay, controls, loop, mode, style, lottieElements[i], i, elementId, lottieElements[i]);
		}
	} else {
		var testElement = document.getElementById(lottieElement);
		src = testElement.getAttribute("src");
		elementId = testElement.getAttribute("id");
		getJson(src, autoplay, controls, loop, mode, style, testElement, i, elementId, testElement);

	}

	window.requestAnimationFrame(lottiemate);
}

window.onload = function() {
	console.log("START");
	processLottie("");
	console.log("DONE");
}
