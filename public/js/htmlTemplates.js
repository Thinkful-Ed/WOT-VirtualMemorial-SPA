var htmlTemplates = (function(){
    let checkLoader = false;

    // Tour
    function tour(){
        const tourType = "VIDEO";
        const tourVideo = {standard: 'https://www.youtube.com/embed/51dNsNogQ3I?autoplay=1&loop=1',
                           panorama: 'https://www.youtube.com/embed/yGVTpS5CzTQ?autoplay=1&loop=1'};
        const htmlTemplateVideo = `<iframe style="width: 100%; height: 100%;"  src="${tourVideo.standard}" frameborder="0"></iframe>`;
        const htmlTemplateWebgl = `<div id="webgl-container"></div>`;

        if(tourType==="VIDEO"){
            console.log("Starting Video Tour");
            $('#dynamic-container').html(htmlTemplateVideo);
        }
        else if(tourType==="WEBGL"){
            console.log("Starting WebGL Scene");
            $('#dynamic-container').html(htmlTemplateWebgl);
            wotScene.init();
        }
        else{
            console.warn("Something went wrong loading tour content.");
        }
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
                    <button class="vet-story" data-id="${item._id}">View Stories</button>
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
            $('#menu-information-anchor').removeClass('no-click');
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
                                        <img src="imgs/ico-text.svg" alt="Text">
                                        <br>
                                        Text
                                    </a>
                                    <a id="story-picture" href="#" class="menu-btn menu-top inline" style="text-align: center">
                                        <img src="imgs/ico-picture.svg" alt="Pictures">
                                        <br>
                                        Pictures
                                    </a>
                                    <a id="story-audio" href="#" class="menu-btn menu-top inline" style="text-align: center">
                                        <img src="imgs/ico-audio.svg" alt="Audio">
                                        <br>
                                        Audio
                                    </a>
                                    <a id="story-video" href="#" class="menu-btn menu-top inline" style="text-align: center">
                                        <img src="imgs/ico-video.svg" alt="Video">
                                        <br>
                                        Video
                                    </a>
                                </div>
                                <div id="stories-content-container" class="dynamic-container-results"></div>
                            </div>`;

        $('#dynamic-container').html(htmlTemplate);
    }
    function storyLogin(){
        let htlmTemplate = `<form>
                                <label>User</label>
                                <input placeholder="Username">
                                <label>Password</label>
                                <input placeholder="Password">
                            </form>`;

        $('#stories-content-container').html(htlmTemplate);
    }

    // Text
    function textStoryUI(jsonObj){
        let htmlTemplate = `<div>
                                <div style=" height: 6rem; text-align: center; margin: 0.5rem 0 0 0;">
                                    <button id="create-new-text-story">Add New Story</button>
                                    <button id="user-login">Login</button>
                                </div>
                                <div id="text-stories-container"></div>
                            </div>`;

        $('#stories-content-container').html(htmlTemplate);
        if(!(jsonObj)){
            $('#text-stories-container').html(state.storiesHtml);
        }
        else{
            $('#text-stories-container').html(buildTextStories(jsonObj));
        }
    }
    function createReviseText(mode, title, author, text){
        let htmlTemplate = '';

        if(mode==='EDIT'){
            htmlTemplate = `<div id="new-text-story-container" style="text-align: center">
                                <form>
                                    <h2 class="inline" style="font-size: 2.5rem; margin: 2rem 0 1rem 0;">Title</h2>
                                    <input id="text-title" type="text" class="inline" style="font-size: 2.5rem; height: 3.5rem;">
                                    <h2 class="inline" style="font-size: 2.5rem; margin: 2rem 0 1rem 0;">Author</h2>
                                    <input id="text-author" type="text" class="inline" style="font-size: 2.5rem; height: 3.5rem;">
                                    <textarea id="text-text" cols="90%" rows="15%" style="font-size: 2rem"></textarea>
                                    <div>
                                        <button id="text-story-clear">Clear</button>
                                        <button id="text-story-submit">Submit</button>
                                    </div>
                                </form>
                            </div>`;
            $('#stories-content-container').html(htmlTemplate);
            $('#text-title').val(title);
            $('#text-author').val(author);
            $('#text-text').val(text);
        }
        else{
            htmlTemplate = `<div id="new-text-story-container" style="text-align: center">
                                <form>
                                    <h2 class="inline" style="font-size: 2.5rem; margin: 2rem 0 1rem 0;">Title</h2>
                                    <input id="text-title" type="text" class="inline" style="font-size: 2.5rem; height: 3.5rem;">
                                    <h2 class="inline" style="font-size: 2.5rem; margin: 2rem 0 1rem 0;">Author</h2>
                                    <input id="text-author" type="text" class="inline" style="font-size: 2.5rem; height: 3.5rem;">
                                    <textarea id="text-text" cols="90%" rows="15%" style="font-size: 2rem"></textarea>
                                    <div>
                                        <button id="text-story-clear">Clear</button>
                                        <button id="text-story-submit">Submit</button>
                                    </div>
                                </form>
                            </div>`;
            $('#stories-content-container').html(htmlTemplate);
        }
    }
    function buildTextStories(jsonObj){
        let htmlStoriesTemplate = '';

        if(jsonObj.length === 0){
            console.log('No existing stories!');
            htmlStoriesTemplate += `<h2 style="text-decoration: underline;text-align: center;font-size: 5rem;margin: 10% 0 2.5% 0;">Sorry, no stories were found.</h2>
                                     <h3 style="text-align: center;">Select "Add New Story" from above to share your story with the community.</h3>`;
        }
        else{
            console.log(jsonObj);
            jsonObj.forEach(item=>{
                htmlStoriesTemplate += `<article id="${item._id}">
                                        <h2 style="display: inline-block; text-decoration: underline;">${item.Title}</h2>
                                        <div style="display: inline-block; float: right;">
                                            <button style="width: 10rem;" class="edit" data-id="${item._id}">Edit</button>
                                            <button style="width: 10rem;" class="delete" data-id="${item._id}">Delete</button>
                                        </div>
                                        <h3 style="text-decoration: underline;">${item.Author}</h3>
                                        <p>${item.Text}</p>
                                        <hr style="margin: 2.5rem 0 2.5rem 0;">
                                    </article>`;
            });

            state.storiesHtml = htmlStoriesTemplate;
            $('#menu-stories-anchor').removeClass('no-click');
        }
        $('#text-stories-container').html(htmlStoriesTemplate);
    }
    function clearNewStoryFields(){
        $('#text-title').val('');
        $('#text-author').val('');
        $('#text-text').val('');
    }
    function submitNotification(){
        htmlTemplate = `<div id="submission-notification" style="position: relative;top: -50%;left: 50%;width: 50%;height: 50%;transform: translate(-50%, -50%);background-color: white;border: 5px solid #830012;border-radius: 0.25rem;z-index: 2;">
                            <h1>Your story has been shared with the community!</h1>
                        </div>`;

        $('#stories-content-container').append(htmlTemplate);
        clearNewStoryFields();
        setTimeout(function(){
            $('#submission-notification').remove();
        }, 4000)
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
         createReviseText: createReviseText,
         storyLogin: storyLogin,
         loader: loader,
         comingSoon: comingSoon,
         submitNotification: submitNotification,
         clearNewStoryFields: clearNewStoryFields
     };
}());
