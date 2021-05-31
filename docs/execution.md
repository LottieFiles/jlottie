## Execution sequence

* Execution sequence begins with the function *processLotties()*, which is triggered at window.onLoad.
* *processLotties()* iterates through all the elements with the tag name 'lottie-player' and in every iteration, the relevant attributes from the respective 'lottie-player' element is extracted and *getJson()* is fired for each element with all the attribute data.
* *getJson()* fires an *XMLHttpRequest()* to load the lottie source from the given URL (*src*). After it i sloaded, the JSON is parsed into *animation\[currentAnimation\]*, where *currentAnimation* is the index of the current animation being handled. Then *buildGraph(elementId, currentAnimation, elementObj)* is called.
* *buildGraph()* initiates all the necessary preliminary objects and begins the process of building the scene graph by calling *getLayers()*.
* *getLayers()* serializes the layers and resolves their parenting. Next it checks the Lottie JSON root for *'shapes'* and if it does exist, then fires off a call to *getShapes()* for each object in *'shapes'*.