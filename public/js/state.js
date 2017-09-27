var state = (function(){
    var searchHtml;
    var infoHtml;
    var storiesHtml;
    var currentVet;
    var currentStoryVet;
    var currentStory;
    var newText = true;
    var webglSceneInit = false;
    var requestNextFrame = true;

    return{
        searchHtml: searchHtml,
        infoHtml: infoHtml,
        storiesHtml: storiesHtml,
        currentVet: currentVet,
        currentStoryVet: currentStoryVet,
        currentStory: currentStory,
        newText: newText,
        webglSceneInit: webglSceneInit,
        requestNextFrame: requestNextFrame
    }
}());