## Execution sequence

The execution sequence begins with the function _processLotties()_, which is triggered at window.onLoad. This function
iterates through all the elements with the tag name 'lottie-player'. In every iteration, the relevant attributes from
the respective 'lottie-player' element is extracted and _getJson()_ is fired for each element with all the attribute
data. _getJson()_ fires an _XMLHttpRequest()_ to load
