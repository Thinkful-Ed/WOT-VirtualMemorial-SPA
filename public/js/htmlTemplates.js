var htmlTemplates = (function(){
    let checkLoader = false;

    //Intro
    function intro(){
        const htmlTemplate = `
            <div style='position: relative; top: 5%; text-align: center;'>
                <p style="padding: 1rem 2.5rem 1rem 2.5rem; ">
                <em>On May 21, 1975, less than a month after the fall of Saigon ended the Vietnam War, Col 
                Paul R Shaffer Jr. and LTC Jack H. Turner were assassinated in Tehran, Iran. Those are the 
                first two names on the War on Terror Memorial in America's Cemetery, Hermitage PA, which list 
                the names of more than 7,000 American servicemen and women who have sacrificed their lives since 
                then in the battle against terrorism. New names continue to be added as more members of the 
                American armed forces lose their lives in this ongoing war.</em>
                <br>
                <br>
                Learn more about the servicmembers on the memorial by selecting from the options below. Tour
                provides a virtual tour of the memorial located at America's Cemetery, Hermitage PA. Search allows 
                viewers to search the names present on the memorial along with viewing their service information and
                submitted stories provided by family and friends.
                </p>
            </div>
        `;

        $('#dynamic-container').html(htmlTemplate);
    }

    // Tour
    function tour(){
        const tourType = "WEBGL"; // VIDEOPA || VIDEOHD || WEBGL
        const tourContent = {VIDEOHD: 'https://www.youtube.com/embed/51dNsNogQ3I?rel=0?autoplay=1&loop=1&playlist=51dNsNogQ3I',
                             VIDEOPA: 'https://www.youtube.com/embed/yGVTpS5CzTQ?rel=0?autoplay=1&loop=1',
                             WEBGL: `<div id="webgl-container"></div>`
        };
        const htmlTemplateVideo = `<iframe style="width: 100%; height: 100%;"  src="${tourContent[tourType]}" frameborder="0"></iframe>`;

        if(tourType==="VIDEOPA" || tourType==="VIDEOHD"){
            $('#dynamic-container').html(htmlTemplateVideo);
        }
        else if(tourType==="WEBGL"){
            $('#dynamic-container').html(tourContent[tourType]);
            wotScene.init()
                .then(setTimeout(function(){wotScene.setParents()}, 5000))
                .catch(function(e){
                    alert(`An error occurred, please check the console for more info.`);
                    console.warn(e);
                })
        }
        else{
            htmlTemplates.errorNotification('Problem loading the tour. Try refreshing the page in a moment.');
        }
    }

    // Search
    function searchUI(){
        // Html template for the search UI
        var htmlTemplate = `<div id="search-container">
                                <div class="bg-red search-box">
                                    <input id="js-searchStr" type="text" placeholder="Enter Your Search Text Here">
                                    <button id="js-submitSearch">Search</button>
                                </div>
                                <div id="js-searchResults" class="dynamic-container-results">
                                    <div style="text-align: center; margin: 21.5% 0 0 0">
                                        <h1 style="padding: 0 1rem 0 1rem;">Search for veterans by their last then first name above above!</h1>
                                    </div>
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
                <div class="search-col inline" style="text-align: center">
                    <button class="vet-info" data-id="${item.Name}">View Info</button>
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
                                    <a id="story-text" href="#" class="menu-btn menu-top inline" style="text-align: center; margin-top: 0.4rem">
                                        <img src="imgs/ico-text.svg" alt="Text">
                                        <br>
                                        <h3>Text</h3>
                                    </a>
                                    <a id="story-picture" href="#" class="menu-btn menu-top inline" style="text-align: center; margin-top: 0.4rem">
                                        <img src="imgs/ico-picture.svg" alt="Pictures">
                                        <br>
                                        <h3>Pictures</h3>
                                    </a>
                                    <a id="story-audio" href="#" class="menu-btn menu-top inline" style="text-align: center; margin-top: 0.4rem">
                                        <img src="imgs/ico-audio.svg" alt="Audio">
                                        <br>
                                        <h3>Audio</h3>
                                    </a>
                                    <a id="story-video" href="#" class="menu-btn menu-top inline" style="text-align: center; margin-top: 0.4rem">
                                        <img src="imgs/ico-video.svg" alt="Video">
                                        <br>
                                        <h3>Video</h3>
                                    </a>
                                </div>
                                <div id="stories-content-container" class="dynamic-container-results">
                                    <h1 style="margin: 1rem 3rem 0 3rem; text-align: center; font-size: 3.5rem;">Select from the above story types to learn more about the veterans on the memorial.</h1>
                                    <div style="text-align: center;">
                                        <img class="story-main-imgs" style="margin: .5rem 0 0 0; width: 95%; max-width: 70rem" src="../imgs/stories.png">
                                    </div>
                                </div>
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
        console.log('Entering textStoryUI');
        let htmlTemplate = `<div>
                                <div id="story-btn-container" style="text-align: center; padding: 1rem 0 1rem 0; background-color: rgba(255, 255, 255, 0.3);">
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
        let htmlTemplate = `<div id="new-text-story-container" style="text-align: center">
                                <form>
                                    <div class="inline">
                                        <h2 class="inline" style="font-size: 2.5rem; margin: 2rem 0 1rem 0;">Title</h2>
                                        <input id="text-title" type="text" class="inline" style="font-size: 2.5rem; height: 3.5rem;">
                                    </div>
                                    <div class="inline">
                                          <h2 class="inline" style="font-size: 2.5rem; margin: 2rem 0 1rem 0;">Author</h2>
                                    <input id="text-author" type="text" class="inline" style="font-size: 2.5rem; height: 3.5rem;">
                                    </div>
                                    <textarea id="text-text" cols="90%" rows="10%" style="font-size: 2rem; height: 55vh; resize: none"></textarea>
                                    <div>
                                        <button id="text-story-clear">Clear</button>
                                        <button id="text-story-submit">Submit</button>
                                    </div>
                                </form>
                            </div>`;

        $('#stories-content-container').html(htmlTemplate);
        if(mode==='EDIT'){
            state.newText = false;
            $('#stories-content-container').html(htmlTemplate);
            $('#text-title').val(title);
            $('#text-author').val(author);
            $('#text-text').val(text);
        }

    }
    function buildTextStories(jsonObj){
        let htmlStoriesTemplate = '';

        if(jsonObj.length === 0){
            htmlStoriesTemplate += `<h2 style="text-decoration: underline;text-align: center;font-size: 5rem;margin: 10% 0 2.5% 0;">Sorry, no stories were found.</h2>
                                     <h3 style="text-align: center;">Select "Add New Story" from above to share your story with the community.</h3>`;
        }
        else{
            jsonObj.forEach(item=>{
                htmlStoriesTemplate += `<article id="${item._id}">
                                        <h2 style="padding: 1rem 0 0 1rem; text-decoration: underline;">${item.Title}</h2>
                                        <h3 class="inline" style="padding: .5rem 0 0 1rem; text-decoration: underline;">${item.Author}</h3>
                                        <div style="display: inline-block; float: right;">
                                            <button style="width: 10rem;" class="edit" data-id="${item._id}">Edit</button>
                                            <button style="width: 10rem;" class="delete" data-id="${item._id}">Delete</button>
                                        </div>
                                        <p style="padding: 3rem 3rem 0 3rem; line-height: 5rem;">${item.Text}</p>
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
        htmlTemplate = `<div id="submission-notification" style="position: absolute; top: 50vh; left: 50vw; transform: translate(-25vw, -25vh); width: 50%; height: 25%;background-color: white;border: 5px solid #830012;border-radius: 0.25rem;z-index: 2;">
                            <h1 style="text-align: center">Your content has been submitted</h1>
                        </div>`;

        $('#app-container').append(htmlTemplate);
        clearNewStoryFields();
        setTimeout(function(){
            $('#submission-notification').remove();
        }, 3000)
    }

    // Login
    function user(){
        let htmlTemplate = `<div style="text-align: center">
                                <div id="login">
                                    <h1 style="font-size: 3rem;">Login</h1>
                                    <input id="login-username" class="login-creds-input" type="text" placeholder="User Name"><br>
                                    <input id="login-password" class="login-creds-input" type="text" placeholder="Password"><br>
                                    <button id="submit-user-login">Submit</button>
                                </div>
                                <hr>
                                <div id="new-user">
                                    <h1 style="font-size: 3rem;">New User</h1>
                                    <input id="new-first" class="login-creds-input" type="text" placeholder="First Name"><br>
                                    <input id="new-last" class="login-creds-input" type="text" placeholder="Last Name"><br>
                                    <input id="new-username" class="login-creds-input" type="text" placeholder="User Name"><br>
                                    <input id="new-password" class="login-creds-input" type="text" placeholder="Password"><br>
                                    <button id="submit-new-user">Submit</button>
                                </div>
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
                                <div style="text-align: center; margin: 5rem 0 0 0;">
                                    <h1 style="margin: 0; font-size: 5.5rem;">Coming Soon</h1>
                                    <h2 style="color: #830012; margin: 3.5% 4rem 0 4rem; font-size: 3rem;">Learn more about those who served with stories submitted by family and friends. Content will include pictures, audio, and video.</h2>
                                </div>
                            </div>`;

        $('#stories-content-container').html(htmlTemplate);
    }
    function errorNotification(err){
        htmlTemplate = `<div id="error-notification" style="text-align: center; position: relative;top: -50%;left: 50%;width: 50%;height: 50%;transform: translate(-50%, -50%);background-color: white;border: 5px solid #830012;border-radius: 0.25rem;z-index: 2;">
                            <h1>Sorry, an error occured!</h1>
                            <h2 style="color: #830012">Try again in a moment.</h2>
                        </div>`;

        $('#stories-content-container').append(htmlTemplate);
        setTimeout(function(){
            $('#error-notification').remove();
        }, 4000)
    }

    // Exposed
     return{
         intro: intro,
         user: user,
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
         clearNewStoryFields: clearNewStoryFields,
         errorNotification: errorNotification
     };
}());
