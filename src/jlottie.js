'use strict';

const xmlns = 'http://www.w3.org/2000/svg';

let animation = [];
let frame = [];
let animationCount = -1;
const animationLength = 0;
let animationLoading = 0;
const frozen = false;
let playStarted = false;

/// ////////// BEZIER


function bezierCurve(p1, c1, c2, p2, fromT, toT, isLayer, animationId, refKey, addTransformation, objectId, depth) {
  const newNodes = [];

  if (c1.hasOwnProperty('x')) {
  } else if (c1.length >= 1) {
    c1.x = c1[0];
    if (refKey == 'p' || refKey == 's') {
      c1.y = c1[1];
    }
  }
  if (c2.hasOwnProperty('x')) {
  } else if (c2.length >= 1) {
    c2.x = c1[0];
    if (refKey == 'p' || refKey == 's') {
      c2.y = c1[1];
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
  const frames = toT - fromT;
  let timeTick;
  let oneMinusT;
  let currentFrame = fromT;
  for (let i = 1; i < frames; i++) {
    timeTick = i / frames;
    oneMinusT = 1 - timeTick;
    newNodes.push({ _comp: 1, t: 0 });
    currentFrame++;
    newNodes[newNodes.length - 1]._frame = parseInt(currentFrame);
    newNodes[newNodes.length - 1].t = parseInt(currentFrame);
    newNodes[newNodes.length - 1].s = [];
    if (refKey != 'ks') {
      newNodes[newNodes.length - 1].s.push(
        Math.pow(oneMinusT, 3) * p1[0]
          + 3 * Math.pow(oneMinusT, 2) * timeTick * (c1.x + p1[0])
          + 3 * oneMinusT * Math.pow(timeTick, 2) * (c2.x + p2[0])
          + Math.pow(timeTick, 3) * p2[0],
      );
      if (refKey != 'x' && refKey != 'y') {
        if (refKey == 'p' || refKey == 's') {
          newNodes[newNodes.length - 1].s.push(
            Math.pow(oneMinusT, 3) * p1[1]
              + 3 * Math.pow(oneMinusT, 2) * timeTick * (c1.y + p1[1])
              + 3 * oneMinusT * Math.pow(timeTick, 2) * (c2.y + p2[1])
              + Math.pow(timeTick, 3) * p2[1],
          );
        }
      }
    } else {
      newNodes[newNodes.length - 1].s.push({ i: [], o: [], v: [] });
      const j = 0;
      for (let k = 0; k < p1[j].i.length; k++) {
        newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].i.push([
          Math.pow(oneMinusT, 3) * p1[j].i[k][0]
            + 3 * Math.pow(oneMinusT, 2) * timeTick * (c1.x + p1[j].i[k][0])
            + 3 * oneMinusT * Math.pow(timeTick, 2) * (c2.x + p2[j].i[k][0])
            + Math.pow(timeTick, 3) * p2[j].i[k][0],
          Math.pow(oneMinusT, 3) * p1[j].i[k][1]
            + 3 * Math.pow(oneMinusT, 2) * timeTick * (c1.y + p1[j].i[k][1])
            + 3 * oneMinusT * Math.pow(timeTick, 2) * (c2.y + p2[j].i[k][1])
            + Math.pow(timeTick, 3) * p2[j].i[k][1],
        ]);

        newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].o.push([
          Math.pow(oneMinusT, 3) * p1[j].o[k][0]
            + 3 * Math.pow(oneMinusT, 2) * timeTick * (c1.x + p1[j].o[k][0])
            + 3 * oneMinusT * Math.pow(timeTick, 2) * (c2.x + p2[j].o[k][0])
            + Math.pow(timeTick, 3) * p2[j].o[k][0],
          Math.pow(oneMinusT, 3) * p1[j].o[k][1]
            + 3 * Math.pow(oneMinusT, 2) * timeTick * (c1.y + p1[j].o[k][1])
            + 3 * oneMinusT * Math.pow(timeTick, 2) * (c2.y + p2[j].o[k][1])
            + Math.pow(timeTick, 3) * p2[j].o[k][1],
        ]);

        newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].v.push([
          Math.pow(oneMinusT, 3) * p1[j].v[k][0]
            + 3 * Math.pow(oneMinusT, 2) * timeTick * (c1.x + p1[j].v[k][0])
            + 3 * oneMinusT * Math.pow(timeTick, 2) * (c2.x + p2[j].v[k][0])
            + Math.pow(timeTick, 3) * p2[j].v[k][0],
          Math.pow(oneMinusT, 3) * p1[j].v[k][1]
            + 3 * Math.pow(oneMinusT, 2) * timeTick * (c1.y + p1[j].v[k][1])
            + 3 * oneMinusT * Math.pow(timeTick, 2) * (c2.y + p2[j].v[k][1])
            + Math.pow(timeTick, 3) * p2[j].v[k][1],
        ]);
      }
    }
    if (addTransformation && refKey != 'ks') {
      addGroupPositionTransform(
        currentFrame,
        newNodes[newNodes.length - 1].s,
        isLayer,
        animationId,
        refKey,
        addTransformation,
        objectId,
        depth,
      );
    }
  }

  return newNodes;
}

/// ////////// ANIMATOR

function loadFrame(i, _currentFrame) {
  for (let ref = 0; ref < animation[i]._refObj.length; ref++) {
    const refObj = animation[i]._refObj[ref];
    let nextObj = false;
    for (let m = _currentFrame - 1; m >= 0; m--) {
      for (let n = 0; n < animation[i]._scene[m]._transform.length; n++) {
        if (animation[i]._scene[m]._transform[n].refObj == refObj) {
          currentObj = document.getElementById(animation[i]._scene[m]._transform[n].refObj);
          currentObjOther = document.getElementById(animation[i]._scene[m]._transform[n].refObjOther);
          if (
            animation[i]._scene[m]._transform[n].isTween
            || animation[i]._scene[m]._transform[n].combined.length > 0
          ) {
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
  const currentDate = Date.now();
  let currentObj;
  let currentObjOther;
  for (let i = 0; i <= animationCount; i++) {
    if (animation[i]._loaded && currentDate - animation[i]._lastTime >= animation[i]._frameTime) {
      if (animation[i]._removed || animation[i]._paused) {
        continue;
      }
      if (animation[i]._debugAnimation) { // DEBUG
        animation[i]._timeElapsed = animation[i]._timeElapsed + (currentDate - animation[i]._lastTime);
      }
      animation[i]._lastTime = currentDate;
      animation[i]._currentFrame++;
      if (animation[i]._currentFrame >= animation[i]._totalFrames) {
        animation[i]._currentFrame = 0;
        if (!animation[i]._loop) {
          animation[i]._paused = true;
          jlottie.goToAndStop(animation[i]._totalFrames - 1, '', animation[i]._elementId);
          continue;
        }
      }

      setTimeout(function () {
        for (let j = 0; j < animation[i]._scene[animation[i]._currentFrame]._transform.length; j++) {
          if (animation[i]._scene[animation[i]._currentFrame]._transform[j].refObj.length > 0) {
            currentObj = document.getElementById(animation[i]._scene[animation[i]._currentFrame]._transform[j].refObj);
            currentObjOther = document.getElementById(
              animation[i]._scene[animation[i]._currentFrame]._transform[j].refObjOther,
            );
            if (animation[i]._scene[animation[i]._currentFrame]._transform[j].isTween) {
              currentObj.setAttribute('d', animation[i]._scene[animation[i]._currentFrame]._transform[j].dataString);
            }
            currentObj.setAttribute('transform', animation[i]._scene[animation[i]._currentFrame]._transform[j].combined);
            currentObjOther.setAttribute(
              'opacity',
              animation[i]._scene[animation[i]._currentFrame]._transform[j].opacity,
            );
          }
          if (animation[i]._scene[animation[i]._currentFrame]._transform[j].hide) {
            document.getElementById(
              animation[i]._scene[animation[i]._currentFrame]._transform[j].stageObj,
            ).style.display = 'none';
          }
          if (animation[i]._scene[animation[i]._currentFrame]._transform[j].show) {
            document.getElementById(
              animation[i]._scene[animation[i]._currentFrame]._transform[j].stageObj,
            ).style.display = 'block';
          }
        }
      }, 0);
    }
    if (animation[i]._debugAnimation) { // DEBUG
      var debugDate = Date.now();
      animation[i]._timeElapsed = animation[i]._timeElapsed + (debugDate - currentDate);
      //animation[i]._debugObj.innerHTML = `required fps: ${animation[i].fr}, current fps: ${animation[i]._timeElapsed}`;
      if (animation[i]._timeElapsed >= 2000) {
        animation[i]._curFPS = ((animation[i]._timeElapsed / 2) * animation[i].fr);
        animation[i]._debugObj.innerHTML = `required fps: ${animation[i].fr}, current fps: ${animation[i]._curFPS / 1000}`;
        animation[i]._timeElapsed = 0;
      }
    }
  }
  window.requestAnimationFrame(lottiemate);
}

/// ////////// BUILD SCENE GRAPH
let lastRefObj;

function getEmptyTransform() {
  const transforms = {};
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
  transforms.tweenShape = '';
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
  const transforms = {};
  transforms.stageObj = '';
  transforms.refObj = '';
  transforms.hide = false;
  transforms.show = false;
  return transforms;
}

function findExistingTransform(transforms, animationId, frame) {
  let found = 0;
  if (animation[animationId]._scene[parseInt(frame)] === undefined) {
    console.log(frame);
    return transforms;
  }
  for (let i = 0; i < animation[animationId]._scene[parseInt(frame)]._transform.length; i++) {
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
  let transforms = getEmptyStageTransform();
  let found = 0;
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
    transforms.hide = true;
    animation[animationId]._scene[parseInt(frame)]._transform.push(transforms);
  }

  let lastState = 0;
  if (frame > 1) {
    for (let j = 0; j <= animation[animationId]._totalFrames; j++) {
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
  let transforms = getEmptyTransform();

  let posX = 0;

  if (isLayer) {
    if (objectId.hasOwnProperty('_currentLayerGroup')) {
    //if (objectId._currentLayerGroup._layer > 0) {
        //console.log('inpoint');
        if (objectId._currentLayerGroup._inPoint >= 0) {
        //console.log('inpoint');
        transforms.inPoint = parseInt(objectId._currentLayerGroup._inPoint);
      }
      if (objectId._currentLayerGroup._outPoint > 0) {
        transforms.outPoint = parseInt(objectId._currentLayerGroup._outPoint);
      }
    } else {
      if (objectId.hasOwnProperty('_currentLayer')) {
        if (objectId._currentLayer._inPoint >= 0) {
          //console.log('inpoint');
          transforms.inPoint = parseInt(objectId._currentLayer._inPoint);
        }
        if (objectId._currentLayer._outPoint > 0) {
          transforms.outPoint = parseInt(objectId._currentLayer._outPoint);
        }
      }
    }
  } else {
  }

  /*
  if (isLayer) {
    if (animation[animationId].hasOwnProperty('_currentLayerGroup')) {
    //if (animation[animationId]._currentLayerGroup._layer > 0) {
        //console.log('inpoint');
        if (animation[animationId]._currentLayerGroup._inPoint >= 0) {
        //console.log('inpoint');
        transforms.inPoint = parseInt(animation[animationId]._currentLayerGroup._inPoint);
      }
      if (animation[animationId]._currentLayerGroup._outPoint > 0) {
        transforms.outPoint = parseInt(animation[animationId]._currentLayerGroup._outPoint);
      }
    } else {
      if (animation[animationId]._currentLayer._inPoint >= 0) {
        //console.log('inpoint');
        transforms.inPoint = parseInt(animation[animationId]._currentLayer._inPoint);
      }
      if (animation[animationId]._currentLayer._outPoint > 0) {
        transforms.outPoint = parseInt(animation[animationId]._currentLayer._outPoint);
      }
    }
  } else {
  }
  */

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
          posX = position[0];
          if (Number.isNaN(posX)) {
            return;
          }
        }
      }
    }
  }

  if (isLayer) {
    transforms.isLayer = true;
    if (objectId.td > 0) {
      transforms.refObj = `${animationId}_${depth}_layerGroup${objectId._layer}`;
    } else {
      transforms.refObj = `${animationId}_${depth}_layerTranslate${objectId._layer}`;
    }
    transforms.refObjOther = `${animationId}_${depth}_layerGroup${objectId._layer}`;
  } else {
    transforms.isLayer = false;
    transforms.refObj = `${animationId}_group${animation[animationId]._currentShapeGroup}`;
    transforms.refObjOther = `${animationId}_group${animation[animationId]._currentShapeGroup}`;
  }

  transforms.anchorX = objectId._anchorX;
  transforms.anchorY = objectId._anchorY;

  transforms = findExistingTransform(transforms, animationId, frame);

  if (animation[animationId]._instated.hasOwnProperty(transforms.refObj)) {
  } else {
    animation[animationId]._refObj.push(transforms.refObj);
    animation[animationId]._objSize[transforms.refObj] = [];
    animation[animationId]._objSize[transforms.refObj][0] = document
      .getElementById(transforms.refObj)
      .getBoundingClientRect().width;
    animation[animationId]._objSize[transforms.refObj][1] = document
      .getElementById(transforms.refObj)
      .getBoundingClientRect().height;
  }
  if (objectId._layer == 3) {
    console.log(
      `ORIGINAL: ${
        animation[animationId]._objSize[transforms.refObj][0]
      }, ${
        animation[animationId]._objSize[transforms.refObj][1]
      } // ${
        transforms.anchorX
      }, ${
        transforms.anchorY}`,
    );
  }

  let posY = 0;

  if (refKey == 'r') {
    transforms.rotateAngle += posX;
    if (objectId.hasOwnProperty('_anchorX') && objectId.hasOwnProperty('_anchorY')) {
      transforms.rotate = `rotate(${transforms.rotateAngle},${objectId._anchorX},${objectId._anchorY}) `;
    } else {
      transforms.rotate = `rotate(${
        transforms.rotateAngle
      },${
        document.getElementById(transforms.refObj).getBoundingClientRect().width / 2
      },${
        document.getElementById(transforms.refObj).getBoundingClientRect().height / 2
      }) `;
    }
  }
  var tempBoundingW;
  var tempBoundingH;
  if (refKey == 's') {
    transforms.scaleFactorX += posX;
    tempBoundingW = animation[animationId]._objSize[transforms.refObj][0];
    tempBoundingH = animation[animationId]._objSize[transforms.refObj][1];
    let currentScaleX;
    let currentScaleY;
    if (position.length > 1) {
      transforms.scaleFactorY += position[1];
      currentScaleX = 1 - transforms.scaleFactorX / 100;
      currentScaleY = 1 - transforms.scaleFactorY / 100;
    } else {
      currentScaleX = 1 - transforms.scaleFactorX / 100;
      currentScaleY = 1 - transforms.scaleFactorX / 100;
    }
    transforms.scale = `scale(${transforms.scaleFactorX / 100},${transforms.scaleFactorY / 100}) `;
    transforms.paddingX = (transforms.anchorX - tempBoundingW) * currentScaleX + tempBoundingW * currentScaleX;
    transforms.paddingY = (transforms.anchorY - tempBoundingH) * currentScaleY + tempBoundingH * currentScaleY;
    transforms.paddingAnchorX = transforms.anchorX * currentScaleX;
    transforms.paddingAnchorY = transforms.anchorY * currentScaleY;
  }
  if (refKey == 'p') {
    posY = position[1];
    if (objectId.hasOwnProperty('_anchorX')) {
      transforms.translateX += posX;
    }
    if (objectId.hasOwnProperty('_anchorY')) {
      transforms.translateY += posY;
    }
    transforms.translate = `translate(${
      transforms.translateX - transforms.anchorX
    },${
      transforms.translateY - transforms.anchorY
    }) `;
    transforms.isTranslate = true;
  }

  if (!transforms.isTranslate) {
    transforms.translate = `translate(${transforms.paddingX},${transforms.paddingY}) `;
  }

  if (refKey == 'o') {
    transforms.opacityFactor += posX;
    transforms.opacity = transforms.opacityFactor / 100;
  }

  transforms.combined = transforms.translate + transforms.scale + transforms.rotate;
  transforms.isSet = true;
  animation[animationId]._scene[parseInt(frame)]._transform.push(transforms);

  lastRefObj = transforms.refObj;

  if (animation[animationId]._instated.hasOwnProperty(transforms.refObj)) {
  } else {
    animation[animationId]._instated[transforms.refObj] = 1;
    animation[animationId]._scene[0]._transform.push(transforms);
  }
}

/// ////////// PREP JSON

function extrapolateValueKeyframe(valueKeyframeObj) {
  return valueKeyframeObj;
}

function extrapolateOffsetKeyframe(
  offsetKeyframeObj,
  refKey,
  isLayer,
  animationId,
  addTransformation,
  objectId,
  depth,
) {
  let i = 0;
  let objLength = offsetKeyframeObj[refKey].k.length;
  let oldLength = objLength;
  const emptyPos = { x: 0, y: 0 };
  let p2;
  let gotI;
  let gotO;

  while (i < objLength - 1) {
    gotI = true;
    gotO = true;

    if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('_comp')) {
    } else {
      if (addTransformation > -1) {
        addGroupPositionTransform(
          offsetKeyframeObj[refKey].k[i].t,
          offsetKeyframeObj[refKey].k[i].s,
          isLayer,
          animationId,
          refKey,
          addTransformation,
          objectId,
          depth,
        );
      }
      if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('e')) {
        p2 = offsetKeyframeObj[refKey].k[i].e;
      } else if (offsetKeyframeObj[refKey].k[i + 1].hasOwnProperty('s')) {
        p2 = offsetKeyframeObj[refKey].k[i + 1].s;
      }

      if (offsetKeyframeObj[refKey].k[i + 1].hasOwnProperty('i') && refKey != 'ks') {
        if (offsetKeyframeObj[refKey].k[i + 1].i.x < 1) offsetKeyframeObj[refKey].k[i + 1].i.x = 0.0;
        if (offsetKeyframeObj[refKey].k[i + 1].i.y < 1) offsetKeyframeObj[refKey].k[i + 1].i.y = 0.0;
      }
      if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('o') && refKey != 'ks') {
        if (offsetKeyframeObj[refKey].k[i].o.x < 1) offsetKeyframeObj[refKey].k[i].o.x = 0.0;
        if (offsetKeyframeObj[refKey].k[i].o.y < 1) offsetKeyframeObj[refKey].k[i].o.y = 0.0;
      }

      var returnedKeyframeObj;
      if (
        offsetKeyframeObj[refKey].k[i + 1].hasOwnProperty('i')
        && offsetKeyframeObj[refKey].k[i].hasOwnProperty('o')
        && gotI
      ) {
        returnedKeyframeObj = bezierCurve(
          offsetKeyframeObj[refKey].k[i].s,
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
          depth,
        );
      } else if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('o') && gotO) {
        returnedKeyframeObj = bezierCurve(
          offsetKeyframeObj[refKey].k[i].s,
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
          depth,
        );
      } else {
        returnedKeyframeObj = bezierCurve(
          offsetKeyframeObj[refKey].k[i].s,
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
          depth,
        );
      }
      for (let s = returnedKeyframeObj.length - 1; s >= 0; s--) {
        offsetKeyframeObj[refKey].k.splice(i + 1, 0, returnedKeyframeObj[s]);
      }

      objLength = offsetKeyframeObj[refKey].k.length;
      i += (objLength - oldLength);
      oldLength = objLength;
    }
    i += 1;
  }
  return offsetKeyframeObj;
}

function extrapolatePathPosition(
  currentObj,
  parentObj,
  refKey,
  isLayer,
  animationId,
  addTransformation,
  objectId,
  depth,
) {
  currentObj[refKey].k = [];
  if (currentObj[refKey].x.k.length > 1) {
    currentObj[refKey] = extrapolateOffsetKeyframe(
      currentObj[refKey],
      'x',
      isLayer,
      animationId,
      false,
      objectId,
      depth,
    );
  } else {
  }
  if (currentObj[refKey].y.k.length > 1) {
    currentObj[refKey] = extrapolateOffsetKeyframe(
      currentObj[refKey],
      'y',
      isLayer,
      animationId,
      false,
      objectId,
      depth,
    );
  } else {
  }

  if (!Array.isArray(currentObj[refKey].x.k)) {
    for (var i = 0; i < currentObj[refKey].y.k.length; i++) {
      if (currentObj[refKey].y.k[i].hasOwnProperty('s')) {
        currentObj[refKey].k.push({
          i: [0, 0, 0],
          o: [0, 0, 0],
          s: [currentObj[refKey].x.k, currentObj[refKey].y.k[i].s[0], 0],
          t: currentObj[refKey].y.k[i].t,
        });
      }
    }

    for (var i = 0; i < currentObj[refKey].k.length; i++) {
      addGroupPositionTransform(
        currentObj[refKey].k[i].t,
        currentObj[refKey].k[i].s,
        isLayer,
        animationId,
        refKey,
        addTransformation,
        objectId,
        depth,
      );
    }

    return currentObj;
  }

  if (!currentObj[refKey].y.k.isArray) {
    for (var i = 0; i < currentObj[refKey].x.k.length; i++) {
      if (currentObj[refKey].x.k[i].hasOwnProperty('s')) {
        currentObj[refKey].k.push({
          i: [0, 0, 0],
          o: [0, 0, 0],
          s: [currentObj[refKey].x.k[i].s[0], currentObj[refKey].y.k, 0],
          t: currentObj[refKey].x.k[i].t,
        });
      }
    }

    for (var i = 0; i < currentObj[refKey].k.length; i++) {
      addGroupPositionTransform(
        currentObj[refKey].k[i].t,
        currentObj[refKey].k[i].s,
        isLayer,
        animationId,
        refKey,
        addTransformation,
        objectId,
        depth,
      );
    }

    return currentObj;
  }

  if (currentObj[refKey].x.k.length > currentObj[refKey].y.k.length) {
    for (var i = 0; i < currentObj[refKey].x.k.length; i++) {
      currentObj[refKey].k.push({
        i: [0, 0, 0],
        o: [0, 0, 0],
        s: [currentObj[refKey].x.k[i].s[0], 0, 0],
        t: currentObj[refKey].x.k[i].t,
      });
    }
    for (var i = 0; i < currentObj[refKey].y.k.length; i++) {
      if (currentObj[refKey].k[0].t > currentObj[refKey].y.k[i].t) {
        currentObj[refKey].k.splice(i, 0, {
          i: [0, 0, 0],
          o: [0, 0, 0],
          s: [0, currentObj[refKey].y.k[i].s[0], 0],
          t: currentObj[refKey].y.k[i].t,
        });
      } else if (currentObj[refKey].k[0].t < currentObj[refKey].y.k[i].t) {
        currentObj[refKey].k.push({
          i: [0, 0, 0],
          o: [0, 0, 0],
          s: [0, currentObj[refKey].y.k[i].s[0], 0],
          t: currentObj[refKey].y.k[i].t,
        });
      } else if (currentObj[refKey].k[0].t == currentObj[refKey].y.k[i].t) {
        currentObj[refKey].k.s[1] = currentObj[refKey].y.k[i].s[0];
      }
    }

    for (var i = 0; i < currentObj[refKey].k.length; i++) {
      addGroupPositionTransform(
        currentObj[refKey].k[i].t,
        currentObj[refKey].k[i].s,
        isLayer,
        animationId,
        refKey,
        addTransformation,
        objectId,
      );
    }

    return currentObj;
  }

  if (currentObj[refKey].x.k.length < currentObj[refKey].y.k.length) {
    for (var i = 0; i < currentObj[refKey].y.k.length; i++) {
      currentObj[refKey].k.push({
        i: [0, 0, 0],
        o: [0, 0, 0],
        s: [0, currentObj[refKey].y.k[i].s[0], 0],
        t: currentObj[refKey].y.k[i].t,
      });
    }
    for (var i = 0; i < currentObj[refKey].x.k.length; i++) {
      if (currentObj[refKey].k[0].t > currentObj[refKey].x.k[i].t) {
        currentObj[refKey].k.splice(i, 0, {
          i: [0, 0, 0],
          o: [0, 0, 0],
          s: [currentObj[refKey].x.k[i].s[0], 0, 0],
          t: currentObj[refKey].x.k[i].t,
        });
      } else if (currentObj[refKey].k[0].t < currentObj[refKey].x.k[i].t) {
        currentObj[refKey].k.push({
          i: [0, 0, 0],
          o: [0, 0, 0],
          s: [currentObj[refKey].x.k[i].s[0], 0, 0],
          t: currentObj[refKey].x.k[i].t,
        });
      } else if (currentObj[refKey].k[0].t == currentObj[refKey].x.k[i].t) {
        currentObj[refKey].k.s[0] = currentObj[refKey].x.k[i].s[0];
      }
    }

    for (var i = 0; i < currentObj[refKey].k.length; i++) {
      addGroupPositionTransform(
        currentObj[refKey].k[i].t,
        currentObj[refKey].k[i].s,
        isLayer,
        animationId,
        refKey,
        addTransformation,
        objectId,
        depth,
      );
    }

    return currentObj;
  }

  return currentObj;
}

function getPosition(currentObj, parentObj, refKey, isLayer, animationId, addTransformation, objectId, depth) {
  if (currentObj.hasOwnProperty(refKey)) {
    if (currentObj[refKey].hasOwnProperty('x') && currentObj[refKey].hasOwnProperty('y')) {
      currentObj = extrapolatePathPosition(
        currentObj,
        parentObj,
        refKey,
        isLayer,
        animationId,
        addTransformation,
        objectId,
        depth,
      );
    }
    if (currentObj[refKey].hasOwnProperty('k')) {
      if (currentObj[refKey].k.length > 1) {
        if (currentObj[refKey].k[0].hasOwnProperty('s')) {
          currentObj = extrapolateOffsetKeyframe(
            currentObj,
            refKey,
            isLayer,
            animationId,
            addTransformation,
            objectId,
            depth,
          );
        }
      }
    }
  }
  return currentObj;
}

function prepShapeEl(shapeObj, referrer, animationId, addTransformation, depth) {
  const newShape = document.createElementNS(xmlns, 'ellipse');
  newShape.setAttribute('d', dataString);
  newShape.setAttribute('fill', 'transparent');
  newShape.setAttribute('id', `${animationId}_shape${shapeObj._shape}`);
  newShape.classList.add('ellipse');
  referrer.prepend(newShape);
  shapeObj._isShape = true;
  return shapeObj;
}

function prepShapeElKeyframe(shapeObj, referrer, animationId, addTransformation, depth) {
  return shapeObj;
}

function prepShapeSr(shapeObj, referrer, animationId, addTransformation, depth) {
  const newShape = document.createElementNS(xmlns, 'path');
  newShape.setAttribute('d', dataString);
  newShape.setAttribute('fill', 'transparent');
  newShape.setAttribute('id', `${animationId}_shape${shapeObj._shape}`);
  newShape.classList.add('star');
  referrer.prepend(newShape);
  shapeObj._isShape = true;
  return shapeObj;
}

function prepShapeSrKeyframe(shapeObj, referrer, animationId, addTransformation, depth) {
  return shapeObj;
}

function prepShapeRc(shapeObj, referrer, animationId, addTransformation, depth) {
  const newShape = document.createElementNS(xmlns, 'rect');
  newShape.setAttribute('fill', 'transparent');

  newShape.setAttribute('width', shapeObj.s.k[0]);
  newShape.setAttribute('height', shapeObj.s.k[1]);
  if (shapeObj.p.k.length > 0) {
    newShape.setAttribute('x', shapeObj.p.k[0] + shapeObj.s.k[0] / 2);
    newShape.setAttribute('y', shapeObj.p.k[1] + shapeObj.s.k[1] / 2);
  }
  newShape.setAttribute('id', `${animationId}_shape${shapeObj._shape}`);
  newShape.classList.add('rectangle');
  referrer.prepend(newShape);
  shapeObj._isShape = true;
  return shapeObj;
}

function prepShapeRcKeyframe(shapeObj, referrer, animationId, addTransformation, depth) {
  return shapeObj;
}

function prepShapeSh(shapeObj, referrer, animationId, addTransformation, depth) {
  if (shapeObj.ks.k.hasOwnProperty('v')) {
  } else {
    if (shapeObj.ks.k[0].hasOwnProperty('s')) {
      shapeObj = extrapolateOffsetKeyframe(shapeObj, 'ks', false, animationId, -1, shapeObj, depth);
      var dataString = '';
      let totalK;
      if (shapeObj.ks.k[shapeObj.ks.k.length - 1].hasOwnProperty('s')) {
        totalK = shapeObj.ks.k.length;
      } else {
        totalK = shapeObj.ks.k.length - 1;
      }
      for (let kCount = 0; kCount < totalK; kCount++) {
        let transforms = getEmptyTransform();
        transforms.isLayer = false;
        transforms.isTween = true;
        transforms.refObj = `${animationId}_shape${shapeObj._shape}`;
        transforms.refObjOther = `${animationId}_shape${shapeObj._shape}`;
        transforms = findExistingTransform(transforms, animationId, shapeObj.ks.k[kCount].t);
        var dataString = `M${shapeObj.ks.k[kCount].s[0].v[0][0]},${shapeObj.ks.k[kCount].s[0].v[0][1]}`;
        for (var i = 1; i < shapeObj.ks.k[kCount].s[0].v.length; i++) {
          dataString = `${dataString
          } C${
            shapeObj.ks.k[kCount].s[0].v[i - 1][0] + shapeObj.ks.k[kCount].s[0].o[i - 1][0]
          },${
            shapeObj.ks.k[kCount].s[0].v[i - 1][1] + shapeObj.ks.k[kCount].s[0].o[i - 1][1]
          } ${
            shapeObj.ks.k[kCount].s[0].v[i][0] + shapeObj.ks.k[kCount].s[0].i[i][0]
          },${
            shapeObj.ks.k[kCount].s[0].v[i][1] + shapeObj.ks.k[kCount].s[0].i[i][1]
          } ${
            shapeObj.ks.k[kCount].s[0].v[i][0]
          },${
            shapeObj.ks.k[kCount].s[0].v[i][1]}`;
        }
        if (shapeObj.ks.k[0].s[0].c) {
          dataString = `${dataString
          } C${
            shapeObj.ks.k[kCount].s[0].v[shapeObj.ks.k[kCount].s[0].v.length - 1][0]
              + shapeObj.ks.k[kCount].s[0].o[shapeObj.ks.k[kCount].s[0].v.length - 1][0]
          },${
            shapeObj.ks.k[kCount].s[0].v[shapeObj.ks.k[kCount].s[0].v.length - 1][1]
              + shapeObj.ks.k[kCount].s[0].o[shapeObj.ks.k[kCount].s[0].v.length - 1][1]
          } ${
            shapeObj.ks.k[kCount].s[0].v[0][0] + shapeObj.ks.k[kCount].s[0].i[0][0]
          },${
            shapeObj.ks.k[kCount].s[0].v[0][1] + shapeObj.ks.k[kCount].s[0].i[0][1]
          } ${
            shapeObj.ks.k[kCount].s[0].v[0][0]
          },${
            shapeObj.ks.k[kCount].s[0].v[0][1]}`;
          dataString += ' Z';
        }

        transforms.dataString = dataString;
        if (kCount == 0) {
          var newShape = document.createElementNS(xmlns, 'path');
          newShape.setAttribute('fill', 'transparent');
          newShape.setAttribute('id', `${animationId}_shape${shapeObj._shape}`);
          newShape.setAttribute('d', dataString);
          newShape.classList.add('shape');
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
  var dataString = `M${shapeObj.ks.k.v[0][0]},${shapeObj.ks.k.v[0][1]}`;
  for (var i = 1; i < shapeObj.ks.k.v.length; i++) {
    dataString = `${dataString
    } C${
      shapeObj.ks.k.v[i - 1][0] + shapeObj.ks.k.o[i - 1][0]
    },${
      shapeObj.ks.k.v[i - 1][1] + shapeObj.ks.k.o[i - 1][1]
    } ${
      shapeObj.ks.k.v[i][0] + shapeObj.ks.k.i[i][0]
    },${
      shapeObj.ks.k.v[i][1] + shapeObj.ks.k.i[i][1]
    } ${
      shapeObj.ks.k.v[i][0]
    },${
      shapeObj.ks.k.v[i][1]}`;
  }
  if (shapeObj.ks.k.c) {
    dataString = `${dataString
    } C${
      shapeObj.ks.k.v[shapeObj.ks.k.v.length - 1][0] + shapeObj.ks.k.o[shapeObj.ks.k.v.length - 1][0]
    },${
      shapeObj.ks.k.v[shapeObj.ks.k.v.length - 1][1] + shapeObj.ks.k.o[shapeObj.ks.k.v.length - 1][1]
    } ${
      shapeObj.ks.k.v[0][0] + shapeObj.ks.k.i[0][0]
    },${
      shapeObj.ks.k.v[0][1] + shapeObj.ks.k.i[0][1]
    } ${
      shapeObj.ks.k.v[0][0]
    },${
      shapeObj.ks.k.v[0][1]}`;
    dataString += ' Z';
  }
  shapeObj._data = dataString;
  var newShape = document.createElementNS(xmlns, 'path');
  newShape.setAttribute('fill', 'transparent');
  newShape.setAttribute('id', `${animationId}_shape${shapeObj._shape}`);
  newShape.setAttribute('d', dataString);
  newShape.classList.add('shape');
  referrer.prepend(newShape);
  shapeObj._isShape = true;
  return shapeObj;
}

function prepShapeShKeyframe(shapeObj, referrer, animationId, depth) {
  return shapeObj;
}

function prepShape(shapeObj, referrer, animationId, isMasked, depth) {
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

  if (shapeObj.ty == 'sh') {
    if (shapeObj.hasOwnProperty('ks') && shapeObj.ks.k.length > 1) {
      shapeObj = prepShapeShKeyframe(shapeObj, referrer, animationId, depth);
    }
    shapeObj = prepShapeSh(shapeObj, referrer, animationId, depth);
  }

  if (shapeObj.ty == 'rc') {
    if (shapeObj.hasOwnProperty('ks') && shapeObj.ks.k.length > 1) {
      shapeObj = prepShapeRcKeyframe(shapeObj, referrer, animationId, depth);
    }
    shapeObj = prepShapeRc(shapeObj, referrer, animationId, depth);
  }

  return shapeObj;
}

function createGradientDef(start, end, opacity, gradient, animationId) {
  animation[animationId].gradientCount++;
  const newDefId = `${animationId}_gradient${animation[animationId].gradientCount}`;
  const newDef = document.createElementNS(xmlns, 'linearGradient');
  newDef.setAttribute('id', newDefId);
  newDef.setAttribute('spreadMethod', 'pad');
  newDef.setAttribute('gradientUnits', 'userSpaceOnUse');
  newDef.setAttribute('x1', start.k[0]);
  newDef.setAttribute('x2', end.k[0]);
  newDef.setAttribute('y1', start.k[1]);
  newDef.setAttribute('y2', end.k[1]);
  animation[animationId].defs.prepend(newDef);

  const offsets = [];
  const styles = [];
  const opacities = [];
  for (var i = 0; i < gradient.p; i++) {
    offsets.push(`${gradient.k.k[i * 4 + 0] * 100}%`);
    styles.push(
      `stop-color:rgb(${
        parseInt(gradient.k.k[i * 4 + 1] * 255)
      },${
        parseInt(gradient.k.k[i * 4 + 2] * 255)
      },${
        parseInt(gradient.k.k[i * 4 + 3] * 255)
      });`,
    );
    opacities.push('stop-opacity:1;');
  }
  if (gradient.k.k.length > gradient.p * 4) {
    for (var i = 0; i < gradient.p; i++) {
      opacities[i] = `stop-opacity:${gradient.k.k[i * 2 + gradient.p * 4 + 1]};`;
    }
  }
  for (var i = 0; i < gradient.p; i++) {
    const newStop = document.createElementNS(xmlns, 'stop');
    newStop.setAttribute('offset', offsets[i]);
    newStop.setAttribute('style', styles[i] + opacities[i]);
    newDef.append(newStop);
  }

  return `url(#${newDefId})`;
}

const lcEnum = {
  1: 'butt',
  2: 'round',
  3: 'square',
};

const ljEnum = {
  1: 'miter',
  2: 'round',
  3: 'bevel',
};

function getStrokeString(color, opacity, width, lineCap, lineJoin, miterLimit) {
  const strokeString = {
    color: '', opacity: 1, width: 1, lineCap: 'round', lineJoin: 'round', miterLimit: 0,
  };
  strokeString.color = `rgb(${color.k[0] * 255},${color.k[1] * 255},${color.k[2] * 255})`;
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
  const color = `rgb(${redVal * 255},${greenVal * 255},${blueVal * 255})`;
  return color;
}

function setShapeStrokes(shapesGroup, strokeToSet, animationId, isGradient) {
  for (let i = 0; i < shapesGroup.length; i++) {
    if (shapesGroup[i]._isShape) {
      document.getElementById(`${animationId}_shape${shapesGroup[i]._shape}`).setAttribute('stroke', strokeToSet.color);
      document
        .getElementById(`${animationId}_shape${shapesGroup[i]._shape}`)
        .setAttribute('stroke-width', strokeToSet.width);
      document
        .getElementById(`${animationId}_shape${shapesGroup[i]._shape}`)
        .setAttribute('stroke-linecap', strokeToSet.lineCap);
      document
        .getElementById(`${animationId}_shape${shapesGroup[i]._shape}`)
        .setAttribute('stroke-linejoin', strokeToSet.lineJoin);
      if (strokeToSet.lineJoin == 1) {
        document
          .getElementById(`${animationId}_shape${shapesGroup[i]._shape}`)
          .setAttribute('stroke-miterlimit', strokeToSet.miterLimit);
      }
    }
  }
}

function setShapeColors(shapesGroup, colorToSet, animationId, isGradient, isMasked) {
  for (let i = 0; i < shapesGroup.length; i++) {
    if (shapesGroup[i]._isShape && typeof colorToSet !== 'undefined') {
      document.getElementById(`${animationId}_shape${shapesGroup[i]._shape}`).setAttribute('fill', colorToSet);
      document.getElementById(`${animationId}_shape${shapesGroup[i]._shape}`).setAttribute('fill-opacity', 1);
    }
  }
}

function getShapesGr(elementId, animationId, layerObj, referrer, refGroup, isMasked, depth) {
  let currentColor;
  let currentStroke;
  let stroked = false;
  for (let i = 0; i < layerObj.it.length; i++) {
    layerObj._isGradient = false;
    animation[animationId].shapeCount++;
    if (layerObj.tt > 0) {
      isMasked = layerObj.td;
    }
    if (layerObj.it[i].ty == 'gr') {
      layerObj.it[i]._group = animation[animationId].shapeCount;
      const newGroup = document.createElementNS(xmlns, 'g');
      newGroup.setAttribute('id', `${animationId}_group${animation[animationId].shapeCount}`);
      animation[animationId]._currentShapeGroup = animation[animationId].shapeCount;
      referrer.prepend(newGroup);
      layerObj.it[i] = getShapesGr(
        elementId,
        animationId,
        layerObj.it[i],
        newGroup,
        `${animationId}_group${animation[animationId].shapeCount}`,
        isMasked,
        depth,
      );
    } else {
      layerObj.it[i]._shape = animation[animationId].shapeCount;
      layerObj.it[i] = prepShape(layerObj.it[i], referrer, animationId, isMasked);
      if (layerObj.it[i].ty == 'tr') {
        layerObj.it[i]._trIndex = i;
        if (layerObj.it[i].p.hasOwnProperty('k')) {
          if (layerObj.it[i].p.k.length > 1) {
            if (layerObj.it[i].hasOwnProperty('a')) {
              document
                .getElementById(refGroup)
                .setAttribute(
                  'transform',
                  `matrix(1,0,0,1,${
                    layerObj.it[i].p.k[0] - layerObj.it[i].a.k[0]
                  },${
                    layerObj.it[i].p.k[1] - layerObj.it[i].a.k[1]
                  })`,
                );
            } else {
              document
                .getElementById(refGroup)
                .setAttribute(
                  'transform',
                  `matrix(1,0,0,1,${layerObj.it[i].p.k[0]},${layerObj.it[i].p.k[1]})`,
                );
            }
          }
        }
      }
      if (layerObj.it[i].ty == 'fl') {
        if (layerObj.it[i].c.k.length > 1) {
          currentColor = getColorString(layerObj.it[i].c.k[0], layerObj.it[i].c.k[1], layerObj.it[i].c.k[2]);
        }
      }
      if (layerObj.it[i].ty == 'st') {
        if (layerObj.it[i].c.k.length > 1) {
          currentStroke = getStrokeString(
            layerObj.it[i].c,
            layerObj.it[i].o,
            layerObj.it[i].w,
            layerObj.it[i].lc,
            layerObj.it[i].lj,
            layerObj.it[i].ml,
          );
          stroked = true;
        }
      }
      if (layerObj.it[i].ty == 'gf') {
        layerObj._isGradient = true;
        currentColor = createGradientDef(
          layerObj.it[i].s,
          layerObj.it[i].e,
          layerObj.it[i].o,
          layerObj.it[i].g,
          animationId,
        );
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
  let currentColor;
  let currentStroke;
  let stroked = false;
  for (let i = 0; i < layerObj.shapes.length; i++) {
    layerObj._isGradient = false;
    animation[animationId].shapeCount++;
    if (layerObj.tt > 0) {
      isMasked = layerObj.td;
    }
    if (layerObj.shapes[i].ty == 'gr') {
      layerObj.shapes[i]._group = animation[animationId].shapeCount;
      const newGroup = document.createElementNS(xmlns, 'g');
      newGroup.setAttribute('id', `${animationId}_group${animation[animationId].shapeCount}`);
      newGroup.setAttribute('opacity', 1);
      animation[animationId]._currentShapeGroup = animation[animationId].shapeCount;
      referrer.prepend(newGroup);
      layerObj.shapes[i] = getShapesGr(
        elementId,
        animationId,
        layerObj.shapes[i],
        newGroup,
        `${animationId}_group${animation[animationId].shapeCount}`,
        isMasked,
        depth,
      );
    } else {
      layerObj.shapes[i]._shape = animation[animationId].shapeCount;
      layerObj.shapes[i] = prepShape(layerObj.shapes[i], referrer, animationId, isMasked);
      if (layerObj.shapes[i].ty == 'tr') {
        layerObj.shapes[i]._trIndex = i;
        if (layerObj.shapes[i].p.hasOwnProperty('k')) {
          if (layerObj.shapes[i].p.k > 1) {
            document
              .getElementById(`${animationId}_${depth}_layerGroup${layerObj._layer}`)
              .setAttribute(
                'transform',
                `matrix(1,0,0,1,${layerObj.shapes[i].p.k[0]},${layerObj.shapes[i].p.k[1]})`,
              );
          }
        }
      }
      if (layerObj.shapes[i].ty == 'fl') {
        if (layerObj.shapes[i].c.k.length > 1) {
          currentColor = getColorString(
            layerObj.shapes[i].c.k[0],
            layerObj.shapes[i].c.k[1],
            layerObj.shapes[i].c.k[2],
          );
        }
      }
      if (layerObj.shapes[i].ty == 'st') {
        if (layerObj.shapes[i].c.k.length > 1) {
          currentStroke = getStrokeString(
            layerObj.shapes[i].c,
            layerObj.shapes[i].o,
            layerObj.shapes[i].w,
            layerObj.shapes[i].lc,
            layerObj.shapes[i].lj,
            layerObj.shapes[i].ml,
          );
          stroked = true;
        }
      }
      if (layerObj.shapes[i].ty == 'gf') {
        layerObj._isGradient = true;
        currentColor = createGradientDef(
          layerObj.shapes[i].s,
          layerObj.shapes[i].e,
          layerObj.shapes[i].o,
          layerObj.shapes[i].g,
          animationId,
        );
      }
    }
    // console.log("leastY " + layerObj._leastY);
  }
  setShapeColors(layerObj.shapes, currentColor, animationId, layerObj._isGradient, isMasked);
  if (stroked) {
    setShapeStrokes(layerObj.shapes, currentStroke, animationId);
  }
  return layerObj;
}

function resolveParents(animationId, layerId, lastMaskId, passedObj, passedKey, depth) {
  let newGroup;
  let newTranslateGroup;

  for (let j = 0; j < passedObj[passedKey].length; j++) {
    if (passedObj[passedKey][j].ind == passedObj[passedKey][layerId].parent) {
      if (passedObj[passedKey][j].tt > 0) {
        for (let k = j - 1; k >= 0; k--) {
          if (passedObj[passedKey][k].td > 0) {
            passedObj[passedKey][j]._mask = `_${animationId}_${depth}_layerMask${passedObj[passedKey][k].ind}`;
            passedObj[passedKey][j]._isMasked = true;
            break;
          }
        }
      }
      if (!passedObj[passedKey][j]._addedToDom) {
        resolveParents(animationId, j, lastMaskId, passedObj, passedKey, depth);
      }
      animation[animationId].layerCount++;
      passedObj[passedKey][layerId]._parent = passedObj[passedKey][j]._layer;
      newLayer = document.createElementNS(xmlns, 'g');
      newLayer.setAttribute('id', `${animationId}_${depth}_layer${passedObj[passedKey][layerId]._layer}`);
      newLayer.setAttribute('mask', lastMaskId);
      newLayer.setAttribute('opacity', 1);

      document
        .getElementById(`${animationId}_${depth}_layerTranslate${passedObj[passedKey][layerId]._parent}`)
        .prepend(newLayer);
      newTranslateGroup = document.createElementNS(xmlns, 'g');
      newTranslateGroup.setAttribute(
        'id',
        `${animationId}_${depth}_layerTranslate${passedObj[passedKey][layerId]._layer}`,
      );
      newTranslateGroup.setAttribute('opacity', 1);
      newLayer.prepend(newTranslateGroup);
      if (passedObj[passedKey][layerId].w > 0) {
        newLayer.style.width = passedObj[passedKey][layerId].w;
      }
      if (passedObj[passedKey][layerId].h > 0) {
        newLayer.style.height = passedObj[passedKey][layerId].h;
      }
      newGroup = document.createElementNS(xmlns, 'g');
      newGroup.setAttribute('id', `${animationId}_${depth}_layerGroup${passedObj[passedKey][layerId]._layer}`);
      newGroup.setAttribute('opacity', 1);
      newTranslateGroup.prepend(newGroup);

      passedObj[passedKey][j]._child.push(`_layerGroup${passedObj[passedKey][layerId].parent}`);
      passedObj[passedKey][j]._childId.push(layerId);
      passedObj[passedKey][j]._addedToDom = true;
      return;
    }
  }
}

function getLayers(elementId, animationId, elementObj, passedObj, passedKey, depth) {
  animation[animationId].depth++;
  depth = animation[animationId].depth;
  let newLayer;
  let newGroup;
  let newMask;
  let newTranslateGroup;
  let posX;
  let posY;
  let lastMaskId = '';
  for (var i = 0; i < passedObj[passedKey].length; i++) {
    passedObj.layerCount++;
    passedObj[passedKey][i]._layer = passedObj[passedKey][i].ind;
    passedObj[passedKey][i]._child = [];
    passedObj[passedKey][i]._childId = [];
    if (passedObj[passedKey][i].parent > 0) {
    } else {
      if (passedObj[passedKey][i].td > 0) {
        passedObj[passedKey][i]._isMask = true;
        newMask = document.createElementNS(xmlns, 'mask');
        lastMaskId = `_${animationId}_${depth}_layerMask${passedObj[passedKey][i].ind}`;
        newMask.setAttribute('id', lastMaskId);
        newMask.setAttribute('mask-type', 'alpha');
        newMask.setAttribute('opacity', 1);
        animation[animationId].defs.prepend(newMask);

        newLayer = document.createElementNS(xmlns, 'g');
        newLayer.setAttribute('id', `${animationId}_${depth}_layer${passedObj[passedKey][i].ind}`);
        newLayer.setAttribute('style', 'display: block;');
        newLayer.setAttribute('opacity', 1);
        newMask.prepend(newLayer);
      } else {
        newLayer = document.createElementNS(xmlns, 'g');
        newLayer.setAttribute('id', `${animationId}_${depth}_layer${passedObj[passedKey][i].ind}`);
        newLayer.setAttribute('opacity', 1);
        elementObj.prepend(newLayer);
        if (passedObj[passedKey][i].tt > 0) {
          passedObj[passedKey][i]._mask = lastMaskId;
          passedObj[passedKey][i]._isMasked = true;
        }
      }
      passedObj[passedKey][i]._addedToDom = true;

      newTranslateGroup = document.createElementNS(xmlns, 'g');
      newTranslateGroup.setAttribute(
        'id',
        `${animationId}_${depth}_layerTranslate${passedObj[passedKey][i]._layer}`,
      );
      newTranslateGroup.setAttribute('opacity', 1);
      newLayer.prepend(newTranslateGroup);
      if (passedObj[passedKey][i].w > 0) {
        newLayer.style.width = passedObj[passedKey][i].w;
      }
      if (passedObj[passedKey][i].h > 0) {
        newLayer.style.height = passedObj[passedKey][i].h;
      }
      newGroup = document.createElementNS(xmlns, 'g');
      newGroup.setAttribute('id', `${animationId}_${depth}_layerGroup${passedObj[passedKey][i]._layer}`);
      newGroup.setAttribute('opacity', 1);
      newTranslateGroup.prepend(newGroup);
    }
  }

  for (var i = 0; i < passedObj.layers.length; i++) {
    passedObj.layerCount = passedObj[passedKey][i]._layer;
    if (passedObj[passedKey][i].parent > 0) {
      for (let j = 0; j < passedObj.layers.length; j++) {
        if (passedObj[passedKey][j].ind == passedObj[passedKey][i].parent) {
          if (passedObj[passedKey][i].tt > 0) {
            for (let k = i - 1; k >= 0; k--) {
              if (passedObj[passedKey][k].td > 0) {
                passedObj[passedKey][i]._mask = `_${animationId}_${depth}_layerMask${passedObj[passedKey][k].ind}`;
                break;
              }
            }
          }
          passedObj.layerCount++;
          if (!passedObj[passedKey][j]._addedToDom) {
            resolveParents(animationId, j, lastMaskId, passedObj, passedKey, depth);
          }
          passedObj[passedKey][i]._parent = passedObj[passedKey][j]._layer;
          newLayer = document.createElementNS(xmlns, 'g');
          newLayer.setAttribute('id', `${animationId}_${depth}_layer${passedObj[passedKey][i]._layer}`);
          newLayer.setAttribute('opacity', 1);

          document
            .getElementById(`${animationId}_${depth}_layerTranslate${passedObj[passedKey][i]._parent}`)
            .prepend(newLayer);
          newTranslateGroup = document.createElementNS(xmlns, 'g');
          newTranslateGroup.setAttribute(
            'id',
            `${animationId}_${depth}_layerTranslate${passedObj[passedKey][i]._layer}`,
          );
          newTranslateGroup.setAttribute('opacity', 1);
          newLayer.prepend(newTranslateGroup);
          if (passedObj[passedKey][i].w > 0) {
            newLayer.style.width = passedObj[passedKey][i].w;
          }
          if (passedObj[passedKey][i].h > 0) {
            newLayer.style.height = passedObj[passedKey][i].h;
          }
          newGroup = document.createElementNS(xmlns, 'g');
          newGroup.setAttribute('id', `${animationId}_${depth}_layerGroup${passedObj[passedKey][i]._layer}`);
          newGroup.setAttribute('opacity', 1);
          newTranslateGroup.prepend(newGroup);

          passedObj[passedKey][j]._child.push(
            `${animationId}_${depth}_layerGroup${passedObj[passedKey][i].parent}`,
          );
          passedObj[passedKey][j]._childId.push(i);
          passedObj[passedKey][j]._addedToDom = true;
        }
      }
    }
  }
  for (var i = 0; i < passedObj.layers.length; i++) {
    passedObj[passedKey][i]._inPoint = -1;
    passedObj[passedKey][i]._outPoint = -1;
    if (passedObj[passedKey][i].hasOwnProperty('ip') && passedObj[passedKey][i].ip >= 0) {
      passedObj[passedKey][i]._inPoint = passedObj[passedKey][i].ip;
    }
    if (passedObj[passedKey][i].hasOwnProperty('op') && passedObj[passedKey][i].op > 0) {
      passedObj[passedKey][i]._outPoint = passedObj[passedKey][i].op;
      if (passedObj[passedKey][i]._outPoint > passedObj._totalFrames) {
        passedObj[passedKey][i]._outPoint = passedObj._totalFrames;
      }
    } else {
      passedObj[passedKey][i]._outPoint = passedObj._totalFrames;
    }
    stageSequence(
      animationId,
      `${animationId}_${depth}_layerGroup${passedObj[passedKey][i]._layer}`,
      passedObj[passedKey][i]._inPoint,
      passedObj[passedKey][i]._outPoint,
    );

    passedObj.layerCount = passedObj[passedKey][i]._layer;
    newLayer = document.getElementById(`${animationId}_${depth}_layer${passedObj[passedKey][i]._layer}`);
    newGroup = document.getElementById(`${animationId}_${depth}_layerGroup${passedObj[passedKey][i]._layer}`);
    if (passedObj[passedKey][i].tt > 0) {
      document
        .getElementById(`${animationId}_${depth}_layer${passedObj[passedKey][i]._layer}`)
        .setAttribute('mask', `url(#${passedObj[passedKey][i]._mask})`);
      document
        .getElementById(`${animationId}_${depth}_layer${passedObj[passedKey][i]._layer}`)
        .setAttribute('style', 'display: block;');
    }
    passedObj._currentLayer = {"_layer":"", "_inPoint":"", "_outPoint":""};
    //passedObj._currentLayer = passedObj[passedKey][i]._layer;
    passedObj._currentLayer._layer = passedObj[passedKey][i]._layer;
    passedObj._currentLayer._inPoint = passedObj[passedKey][i]._inPoint;
    passedObj._currentLayer._outPoint = passedObj[passedKey][i]._outPoint;
    if (passedObj[passedKey][i].hasOwnProperty('refId') && passedObj.hasOwnProperty('assets')) {
      let tempRef = -1;
      for (let m = 0; m < passedObj.assets.length; m++) {
        if (passedObj.assets[m].id == passedObj[passedKey][i].refId) {
          tempRef = m;
          break;
        }
      }
      if (tempRef >= 0) {
        passedObj.assets[tempRef] = getLayers(
          elementId,
          animationId,
          newGroup,
          passedObj.assets[tempRef],
          'layers',
          depth,
        );
      }
    }

    if (passedObj[passedKey][i].hasOwnProperty('shapes')) {
      passedObj._currentLayerGroup = {"_layer":0, "_inPoint":"", "_outPoint":""};
      //passedObj._currentLayerGroup = passedObj[passedKey][i]._layer;
      passedObj._currentLayerGroup._layer = passedObj[passedKey][i]._layer;
      passedObj._currentLayerGroup._inPoint = passedObj[passedKey][i]._inPoint;
      passedObj._currentLayerGroup._outPoint = passedObj[passedKey][i]._outPoint;
      passedObj[passedKey][i] = getShapes(
        elementId,
        animationId,
        passedObj[passedKey][i],
        newGroup,
        `${animationId}_${depth}_layerGroup${passedObj[passedKey][i]._layer}`,
        false,
        passedObj[passedKey][i].td,
        depth,
      );
      if (passedObj[passedKey][i].hasOwnProperty('shapes')) {
        passedObj._boundingX = newGroup.getBoundingClientRect().width / 2;
        passedObj._boundingY = newGroup.getBoundingClientRect().height / 2;
      }
    } else if (passedObj[passedKey][i]._inPoint > 0) {
      // console.log("layer: " + i);
      // newLayer.style.display = 'none';
    }

    if (passedObj[passedKey][i].hasOwnProperty('ks')) {
      if (passedObj[passedKey][i].ks.hasOwnProperty('a')) {
        if (passedObj[passedKey][i].ks.a.hasOwnProperty('k')) {
          if (passedObj[passedKey][i].ks.a.k.length > 1) {
            passedObj[passedKey][i]._anchorX = passedObj[passedKey][i].ks.a.k[0];
            passedObj[passedKey][i]._anchorY = passedObj[passedKey][i].ks.a.k[1];
          }
        }
      }

      if (passedObj[passedKey][i].ks.hasOwnProperty('p')) {
        passedObj[passedKey][i].ks = getPosition(
          passedObj[passedKey][i].ks,
          null,
          'p',
          true,
          animationId,
          1,
          passedObj[passedKey][i],
          depth,
        );
        if (passedObj[passedKey][i].ks.p.hasOwnProperty('k')) {
          if (passedObj[passedKey][i].ks.p.k.length > 1) {
            if (passedObj[passedKey][i].ks.p.k[0].hasOwnProperty('s')) {
            } else {
              if (passedObj[passedKey][i]._anchorX != 0) {
                posX = passedObj[passedKey][i].ks.p.k[0] - passedObj[passedKey][i]._anchorX;
              } else {
                posX = passedObj[passedKey][i].ks.p.k[0]; // passedObj._boundingX;
              }
              if (passedObj[passedKey][i]._anchorY != 0) {
                posY = passedObj[passedKey][i].ks.p.k[1] - passedObj[passedKey][i]._anchorY;
              } else {
                posY = passedObj[passedKey][i].ks.p.k[1]; // passedObj._boundingY;
              }
              if (passedObj[passedKey][i].td > 0) {
                document
                  .getElementById(`${animationId}_${depth}_layerGroup${passedObj[passedKey][i]._layer}`)
                  .setAttribute('transform', `matrix(1,0,0,1,${posX},${posY})`);
              } else {
                document
                  .getElementById(`${animationId}_${depth}_layer${passedObj[passedKey][i]._layer}`)
                  .setAttribute('transform', `matrix(1,0,0,1,${posX},${posY})`);
              }
              passedObj[passedKey][i]._posX = posX;
              passedObj[passedKey][i]._posY = posY;
            }
          }
        }
      }

      if (passedObj[passedKey][i].ks.hasOwnProperty('r')) {
        if (passedObj[passedKey][i].ks.r.k.length > 1) {
          if (passedObj[passedKey][i].ks.r.k[0].hasOwnProperty('s')) {
            passedObj[passedKey][i].ks = getPosition(
              passedObj[passedKey][i].ks,
              null,
              'r',
              true,
              animationId,
              1,
              passedObj[passedKey][i],
              depth,
            );
          }
        }
      }
      if (passedObj[passedKey][i].ks.hasOwnProperty('s')) {
        if (passedObj[passedKey][i].ks.s.k.length > 1) {
          if (passedObj[passedKey][i].ks.s.k[0].hasOwnProperty('s')) {
            passedObj[passedKey][i].ks = getPosition(
              passedObj[passedKey][i].ks,
              null,
              's',
              true,
              animationId,
              1,
              passedObj[passedKey][i],
              depth,
            );
          }
        }
      }
      if (passedObj[passedKey][i].ks.hasOwnProperty('o')) {
        if (passedObj[passedKey][i].ks.o.k.length > 1) {
          if (passedObj[passedKey][i].ks.o.k[0].hasOwnProperty('s')) {
            passedObj[passedKey][i].ks = getPosition(
              passedObj[passedKey][i].ks,
              null,
              'o',
              true,
              animationId,
              1,
              passedObj[passedKey][i],
              depth,
            );
          }
        }
      }
    }
  }
  return passedObj;
}

function buildGraph(elementId, animationId, elementObj, autoplay, loop, customName) {
  animation[animationId]._loaded = false;
  //try {
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

    //for debugging
    animation[animationId]._debugTimeElapsed = 0;
    animation[animationId]._debugContainer = '';
    //////

    //elementObj.style.width = animation[animationId].w;
    //elementObj.style.height = animation[animationId].h;
    //elementObj.setAttribute('width', animation[animationId].w);
    //elementObj.setAttribute('height', animation[animationId].h);


    const newSVG = document.createElementNS(xmlns, 'svg');
    newSVG.setAttribute('xmlns', xmlns);
    // newSVG.setAttributeNS(null, 'width', animation[animationId].w);
    // newSVG.setAttributeNS(null, 'height', animation[animationId].h);
    newSVG.setAttributeNS(null, 'viewBox', `0 0 ${animation[animationId].w} ${animation[animationId].h}`);
    newSVG.setAttributeNS(null, 'preserveAspectRatio', 'xMidYMid meet');
    newSVG.style.width = '100%';
    newSVG.style.height = '100%';
    newSVG.setAttributeNS(null, 'id', `_svg${animationId}`);
    elementObj.prepend(newSVG);

    animation[animationId].defs = document.createElementNS(xmlns, 'defs');
    animation[animationId].defs.setAttributeNS(null, 'id', `_defs${animationId}`);
    animation[animationId].gradientCount = 0;
    animation[animationId].maskCount = 0;
    newSVG.prepend(animation[animationId].defs);

    const newLayer = document.createElementNS(xmlns, 'g');
    newLayer.setAttributeNS(null, 'id', `_lanim${animationId}`);
    newSVG.append(newLayer);

    const newCompute = document.createElementNS(xmlns, 'g');
    newCompute.setAttributeNS(null, 'id', `_compute${animationId}`);
    newCompute.style.display = 'none';
    newLayer.prepend(newCompute);

    animation[animationId]._scene = new Array(animation[animationId]._totalFrames + 1)
      .fill(null)
      .map(() => ({ _transform: [] }));
    animation[animationId]._instated = {};
    animation[animationId]._refObj = [];
    animation[animationId]._objSize = {};

    animation[animationId] = getLayers(elementId, animationId, newLayer, animation[animationId], 'layers', 0);

    const clipPath = document.createElementNS(xmlns, 'clipPath');
    clipPath.setAttributeNS(null, 'id', `_clip${animationId}`);
    animation[animationId].defs.prepend(clipPath);
    const clipPathRect = document.createElementNS(xmlns, 'rect');
    clipPathRect.setAttribute('x', 0);
    clipPathRect.setAttribute('y', 0);
    clipPathRect.setAttribute('width', animation[animationId].w);
    clipPathRect.setAttribute('height', animation[animationId].h);
    clipPath.append(clipPathRect);

    newLayer.setAttributeNS(null, 'clip-path', `url(#_clip${animationId})`);
    animation[animationId]._buildDone = true;
    animationLoading -= 1;
    animation[animationId]._loaded = true;
    if (!animation[animationId]._autoplay) {
      jlottie.goToAndStop(1, '', animation[animationId]._elementId);
    }
  /*} catch (e) {
		console.error("Failed to load animation. " + e);
		animationCount = animationCount - 1;
		elementObj.style.height = 0;
		elementObj.style.width = 0;
		elementObj.innerHTML = "";
		animation.splice(animationId, 1);
	}*/
}

function getJson(src, autoplay, controls, loop, mode, style, domElement, elementNo, elementId, _autoplay, _loop, _debugAnimation, _debugContainer) {
  const http = new XMLHttpRequest();
  http.open('GET', src, true);
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      animationCount += 1;
      const currentAnimation = animationCount;
      animation[currentAnimation] = JSON.parse(http.responseText);
      animation[currentAnimation]._elementId = elementId;

      if (_debugAnimation && typeof _debugContainer === "object") {
        animation[currentAnimation]._debugAnimation = _debugAnimation;
        animation[currentAnimation]._debugContainer = _debugContainer;
        animation[currentAnimation]._curFPS = 0;
        animation[currentAnimation]._timeElapsed = 0;
        animation[currentAnimation]._debugObj = document.createElement('div');
        animation[currentAnimation]._debugObj.setAttribute('id', `__dbg__${currentAnimation}`);
        animation[currentAnimation]._debugObj.style.display = 'block';
        _debugContainer.prepend(animation[currentAnimation]._debugObj);
      }

      buildGraph(elementId, currentAnimation, domElement, _autoplay, _loop);
    }
  };
  http.send();
}

/*
function processLottie(lottieElement, JSONsrc) {
  let autoplay = '';
  let controls = '';
  let loop = '';
  let mode = '';
  let src = '';
  let style = '';
  let elementId = '';

  if (lottieElement === undefined) {
    const lottieElements = document.getElementsByTagName('lottie-player');
    let i;
    for (i = 0; i < lottieElements.length; i++) {
      animationLoading += 1;

      const attributes = lottieElements[i].attributes;
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
      getJson(src, autoplay, controls, loop, mode, style, lottieElements[i], i, elementId, true, true);
    }
  } else {
    animationLoading += 1;
    if (!(JSONsrc === undefined) && JSONsrc.length > 0) {
      const currentAnimation = animationCount;
      animation[currentAnimation] = JSON.parse(JSONsrc);
      animation[currentAnimation]._elementId = elementId;
      buildGraph(elementId, currentAnimation, testElement, true, true);
    } else {
      var testElement = document.getElementById(lottieElement);
      src = testElement.getAttribute('src');
      elementId = testElement.getAttribute('id');
      getJson(src, autoplay, controls, loop, mode, style, testElement, 0, elementId, true, true);
    }
  }

  if (!playStarted) {
    playStarted = true;
    window.requestAnimationFrame(lottiemate);
  }
}
*/

/// ////////// CONTROL

// var animationManager = (function () {
const jlottie = {};

function destroy(name) {
  if (animationCount < 0) {
    return;
  }
  if (name === undefined) {
    const elements = [];
    for (var i = 0; i <= animationCount; i++) {
      elements.push(animation[i]._elementId);
    }
    animation = [];
    for (var i = 0; i <= elements; i++) {
      document.getElementById(elements[i]).innerHTML = '';
      animationCount -= 1;
    }
  } else {
    name.toString();
    name = name.replace(/#/g, '');
    for (var i = 0; i <= animationCount; i++) {
      if (animation[i]._elementId == name || animation[i]._customName == name) {
        animation.splice(i, 1);
        document.getElementById(name).innerHTML = '';
        animationCount -= 1;
        break;
      }
    }
  }
}

function play(name) {
  if (animationCount < 0) {
    return;
  }
  if (name === undefined) {
    for (var i = 0; i <= animationCount; i++) {
      animation[i]._paused = false;
    }
  } else {
    name.toString();
    name = name.replace(/#/g, '');
    for (var i = 0; i <= animationCount; i++) {
      if (animation[i]._elementId == name || animation[i]._customName == name) {
        animation[i]._paused = false;
        break;
      }
    }
  }
}

function stop(name) {
  if (name === undefined) {
    for (var i = 0; i <= animationCount; i++) {
      animation[i]._paused = true;
    }
  } else {
    name.toString();
    name = name.replace(/#/g, '');
    for (var i = 0; i < animationCount; i++) {
      if (animation[i]._elementId == name || animation[i]._customName == name) {
        animation[i]._paused = true;
        break;
      }
    }
  }
}

function goToAndStop(_frame, isFrame, name) {
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
    name = name.replace(/#/g, '');
    for (var i = 0; i <= animationCount; i++) {
      if (animation[i]._elementId == name || animation[i]._customName == name) {
        animation[i]._paused = true;
        console.log(`${name} == ${_frame}`);
        loadFrame(i, _frame);
        break;
      }
    }
  }
}

function loadAnimation(obj) {
  if (obj.container === undefined && obj.path === undefined && obj.animationData === undefined) {
    return;
  }
  let autoplay = true;
  let loop = true;
  let debugAnimation = false;
  let debugContainer;

  if (!(obj.autoplay === undefined)) {
    if (obj.autoplay === true || obj.autoplay === false) {
      autoplay = obj.autoplay;
    }
  }

  if (!(obj.loop === undefined)) {
    if (obj.loop === true || obj.loop === false) {
      loop = obj.loop;
    }
  }

  if (!(obj.debug === undefined)) {
    if (obj.debug === true) {
      if (typeof(obj.debugContainer) != "undefined") {
        debugAnimation = true;
        debugContainer = obj.debugContainer;
      }
    }
  }

  if (!(obj.animationData === undefined) && obj.animationData.length > 0) {
    animationCount += 1;
    const currentAnimation = animationCount;
    animation[currentAnimation] = JSON.parse(http.responseText);
    animation[currentAnimation]._elementId = elementId;
    buildGraph(elementId, currentAnimation, obj.container, true, true);
  } else if (!(obj.path === undefined) && obj.path) {
    getJson(obj.path, '', '', '', '', '', obj.container, 0, obj.container.id, autoplay, loop, debugAnimation, debugContainer);
  }
  if (!playStarted) {
    playStarted = true;
    window.requestAnimationFrame(lottiemate);
  }
}

jlottie.destroy = destroy;
jlottie.play = play;
jlottie.stop = stop;
jlottie.goToAndStop = goToAndStop;
jlottie.loadAnimation = loadAnimation;

if (typeof exports === 'object') {
  //module.exports = jlottie;
  module.exports = {jlottie, bezierCurve, loadFrame, lottiemate, getEmptyTransform, getEmptyStageTransform, findExistingTransform, stageSequence, addGroupPositionTransform, extrapolateValueKeyframe, extrapolateOffsetKeyframe, extrapolatePathPosition, getPosition, prepShapeEl, prepShapeElKeyframe, prepShapeSr, prepShapeSrKeyframe, prepShapeRc, prepShapeRcKeyframe, prepShapeSh, prepShapeShKeyframe, prepShape, createGradientDef, getStrokeString, getColorString, setShapeStrokes, setShapeColors, getShapesGr, getShapes, resolveParents, getLayers, buildGraph, getJson, destroy, play, stop, goToAndStop, loadAnimation};
  exports.default = jlottie;
}

  //  return moduleIf;
  // })();
