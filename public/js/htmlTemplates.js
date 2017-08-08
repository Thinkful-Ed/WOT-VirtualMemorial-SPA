var htmlTemplates = (function(){
    let checkLoader = false;

    // Tour
    function tour(){
         var htmlTemplate = `<div id="webgl-container"></div>`;
        $('#dynamic-container').html(htmlTemplate);
        wotScene.init();
    }

    // Search
    function searchUI(){
        // Html template for the search UI
        var htmlTemplate = `<div id="search-container">
                                <div class="bg-red search-box">
                                    <input id="js-searchStr" type="text" placeholder="Search by Name, Rank, Branch of Military, & More">
                                    <button id="js-submitSearch">Search</button>
                                </div>
                                <div id="js-searchResults" class="dynamic-container-results">
                                </div>
                            </div>`;

        // Replace existing UI with search template and add any existing search results.
        $('#dynamic-container').html(htmlTemplate);
        $('#js-searchResults').html(state.searchHtml);
    }
    function searchResults(jsonObj){
        // Reset results
        state.searchHtml = '';
        $('#js-searchResults').html(state.searchHtml);

        // Call 'buildSingleSearchResult' to generate each name display for results and append to "state.searchHtml" string for return
        jsonObj.forEach(function(item){
            state.searchHtml = state.searchHtml + buildSingleSearchResult(item);
        });
        return state.searchHtml;
    }
    function buildSingleSearchResult(item){
        // Create html from each json object that represents a veteran
        return `
            <div>
                <div class="search-col inline"><p><b>${item.Name}</b></p></div>
                <div class="search-col inline">
                    <button class="vet-info" data-id="${item.Name}">View Information</button>
                    <button class="vet-story" data-id="${item.Name}">View Stories</button>
                </div>
                <hr>
            </div>
        `
    }

    // Info
    function info(jsonObj){
        if(!(jsonObj)){
            $('#dynamic-container').html(state.infoHtml);
        }
        else{
            state.currentVet = jsonObj[0];
            state.infoHtml = buildInfo(jsonObj[0]);
            console.log(state.currentVet);
            $('#dynamic-container').html(state.infoHtml);
        }
    }
    function buildInfo(jsonObj){
     return `
            <div id="info-container" class="scroll-y">
                <p><b>Name: </b>${jsonObj.Name}</p>
                <hr>
                <p><b>Age: </b>${jsonObj.Age}</p>
                <hr>
                <p><b>From: </b>${jsonObj.City}, ${jsonObj.State}, ${jsonObj.Country}</p>
                <hr>
                <p><b>Rank: </b>${jsonObj.Rank}</p>
                <hr>
                <p><b>Branch: </b>${jsonObj.Branch}</p>
                <hr>
                <p><b>Unit: </b>${jsonObj.Unit}</p>
                <hr>
                <p><b>Stationed: </b>${jsonObj.Stationed}</p>
                <hr>
                <p><b>Cause of Death: </b>${jsonObj.Cause}</p>
                <hr>
                <p><b>Place of Death: </b>${jsonObj.Province}, ${jsonObj.Date}</p>
            </div>
        `
    }

    // Stories
    function storyMainUI(){
        let htmlTemplate = `<div id="story-container">
                                <div id="story-menu" class="bg-red" style="text-align: center">
                                    <a id="story-text" href="#" class="menu-btn menu-top inline" style="text-align: center">
                                        <img src="imgs/ico-info.svg" alt="Text">
                                        <br>
                                        Text
                                    </a>
                                    <a id="story-picture" href="#" class="menu-btn menu-top inline" style="text-align: center">
                                        <img src="imgs/ico-info.svg" alt="Pictures">
                                        <br>
                                        Pictures
                                    </a>
                                    <a id="story-audio" href="#" class="menu-btn menu-top inline" style="text-align: center">
                                        <img src="imgs/ico-info.svg" alt="Audio">
                                        <br>
                                        Audio
                                    </a>
                                    <a id="story-video" href="#" class="menu-btn menu-top inline" style="text-align: center">
                                        <img src="imgs/ico-info.svg" alt="Video">
                                        <br>
                                        Video
                                    </a>
                                </div>
            
                                <div id="stories-content-container" class="dynamic-container-results"></div>
                            </div>`;

        $('#dynamic-container').html(htmlTemplate);
    }
    // Text
    function textStoryUI(jsonObj){
        let htmlTemplate = `<div>
                                <div style=" height: 6rem;">
                                    <button id="create-new-text-story">Add a New Story</button>
                                </div>
                                <div id="text-stories-container"></div>
                            </div>`;

        if(!(jsonObj)){
            $('#stories-content-container').html(htmlTemplate);
            $('#text-stories-container').html(state.storiesHtmll);
        }
        else{
            state.currentVet = jsonObj[0];
            console.log(state.currentVet);
            $('#stories-content-container').html(htmlTemplate);
            $('#text-stories-container').html(buildTextStories(jsonObj));
        }
    }
    function buildTextStories(jsonObj){
        let htmlStoriesTemplate = '';

        jsonObj[0].Text.forEach(item=>{
            htmlStoriesTemplate += `<article>
                                        <h2 style="display: inline-block">${item.Title}</h2>
                                        <div style="display: inline-block; float: right;">
                                            <button style="width: 10rem;">Edit</button>
                                            <button style="width: 10rem;">Delete</button>
                                        </div>
                                        <h3>${item.Author}</h3>
                                        <p>${item.Text}</p>
                                        <hr>
                                    </article>`;
        });

        state.storiesHtmll = htmlStoriesTemplate;
        $('#text-stories-container').html(htmlStoriesTemplate);
    }
    function createNewStory(){
        let htmlTemplate = `<div id="new-text-story-container">
                                <form>
                                    <h2 class="inline">Title</h2><input id="text-title" type="text" class="inline" style="font-size: 2rem">
                                    <h2 class="inline">Author</h2><input id="text-author" type="text" class="inline" style="font-size: 2rem">
                                    <textarea id="text-text" cols="90%" rows="10%" style="font-size: 2rem"></textarea>
                                    <button id="text-story-clear">Clear</button>
                                    <button id="text-story-submit">Submit</button>
                                </form>
                            </div>`;

        $('#stories-content-container').html(htmlTemplate);
    }

    // Misc
    function loader(typeString){
        let htmlTemplate = `<div id="loader">
                                <img src="imgs/loader.gif" alt="Loader">
                                <h1>${typeString}</h1>
                            </div>`;

        if(checkLoader === false){
            $('#app-container').append(htmlTemplate);
            checkLoader = true;
        }
        else{
            $('#loader').remove();
            checkLoader = false;
        }
    }
    function comingSoon(){
        let htmlTemplate = `<div id="coming-soon-container">
                                <h1 style="text-align: center; padding: 1rem 0 0 0;">Coming Soon</h1>
                                <h2 style="text-align: center;">Learn more about those who served with stories submitted by family and friends. Content will include...</h2>
                                <ul>
                                    <li>Picture</li>
                                    <li>Audio</li>
                                    <li>Video</li>
                                </ul>
                            </div>`;

        $('#stories-content-container').html(htmlTemplate);
    }

    // Exposed
     return{
         tour: tour,
         searchUI: searchUI,
         searchResults: searchResults,
         info: info,
         storyMainUI: storyMainUI,
         textStoryUI: textStoryUI,
         createNewStory: createNewStory,
         loader: loader,
         comingSoon: comingSoon,
     };
}());
