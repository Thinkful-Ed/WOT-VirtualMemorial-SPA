var htmlTemplates = (function(){
    let checkLoader = false;

    //Intro
    function intro(){
        const htmlTemplate = `
            <div id="intro" style='position: relative; text-align: center;'>
                <p style="padding: 1rem 2.5rem 1rem 2.5rem; ">
                <em>On May 21, 1975, less than a month after the fall of Saigon ended the Vietnam War, Col 
                Paul R Shaffer Jr. and LTC Jack H. Turner were assassinated in Tehran, Iran. Those are the 
                first two names on the War on Terror Memorial in America's Cemetery, Hermitage PA, which list 
                the names of more than 7,000 American servicemen and women who have sacrificed their lives since 
                then in the battle against terrorism. New names continue to be added as more members of the 
                American armed forces lose their lives in this ongoing war.</em>
                <br>
                <img src="../imgs/intro.png" alt="Intro Banner" style="text-align: left; width: 65%; max-width: 65%;">
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
        const htmpTemplate = `<div>
                                <div id="webgl-controls" class="bg-red" style="text-align: center">
                                    <div id="webgl-controls-backwards" class="menu-btn menu-top inline" style="text-align: center;">
                                        <a href="#">
                                            <img src="imgs/ico-controls-back.svg" alt="Rewind">
                                        </a>
                                    </div>
                                    <div id="webgl-controls-play" class="menu-btn menu-top inline" style="text-align: center;">
                                        <a href="#">
                                            <img src="imgs/ico-controls-play-pause.svg" alt="Play">
                                        </a>
                                    </div> 
                                    <div id="webgl-controls-forward" class="menu-btn menu-top inline" style="text-align: center;">
                                        <a href="#">
                                            <img src="imgs/ico-controls-next.svg" alt="Fast Forward">
                                        </a>
                                    </div>
                                    <div id="webgl-toggle-camera" class="menu-btn menu-top inline" style="text-align: center;">
                                        <a href="#">
                                            <img src="imgs/ico-controls-togglecam.svg" alt="Fast Forward">
                                        </a>
                                    </div> 
                                </div>
                                <div id="webgl-container"></div>
                            </div>`;

        console.log(state.webglSceneInit);
        $('#dynamic-container').html(htmpTemplate);
        wotScene.initDomWindow(wotScene.renderer);
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
                <div class="search-col inline opacity" style="text-align: center">
                    <button class="vet-info" data-id="${item.Name}">Info</button>
                    <button class="vet-memorial" data-uuid="${item.uuid}" data-name="${item.Name}" data-panel="${item.Panel}" data-position="${item.Position}">Memorial</button>
                    <button class="vet-story" data-uuid="${item.uuid}">Stories</button>
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
            $('#menu-information').removeClass('no-click');
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

    // Story Main & Users
    function storyMainUI(){
        let htmlTemplate = `<div id="story-container" style="height: inherit">
                                <div id="stories-content-container" class="dynamic-container-results" style="height: inherit">
                                    <div id="story-btn-container" style="text-align: center; padding: 1rem 0 1rem 0; background-color: rgba(255, 255, 255, 0.3);">
                                        <button id="create-new-text-story">Add New Story</button>
                                        <button id="user-login">Login</button>
                                    </div>
                                    <div id="text-stories-container"></div>
                                </div>
                            </div>`;

        $('#dynamic-container').html(htmlTemplate);
    }
    function loginHeader(){
        let htlmTemplate = `<form>
                                <label>User</label>
                                <input placeholder="Username">
                                <label>Password</label>
                                <input placeholder="Password">
                            </form>`;

        $('#stories-content-container').html(htlmTemplate);
    }
    function user(){
        let htmlTemplate = `<div style="text-align: center; margin-top: 5%">
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

    // Text
    function textStoryUI(jsonObj){
        console.log('Entering textStoryUI');

        if(!(jsonObj)){
            $('#text-stories-container').html(state.storiesHtml);
        }
        else{
            state.storiesHtml = buildTextStories(jsonObj);
            $('#menu-stories').removeClass('no-click');
            $('#text-stories-container').html(state.storiesHtml);
            dummyBlock('text-stories-container', 15);
        }
    }
    function buildTextStories(jsonObj){
        console.log('Building Stories');
        let htmlStory = '';

        if(jsonObj.length === 0){
            htmlStory += `<h2 style="text-decoration: underline;text-align: center;font-size: 5rem;margin: 10% 0 2.5% 0;">Sorry, no stories were found.</h2>
                                     <h3 style="text-align: center;">Select "Add New Story" from above to share your story with the community.</h3>`;
        }
        else{
            jsonObj.forEach(item => {
                htmlStory += `<article id="${item._id}">
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
        }
        return htmlStory;
    }
    function createReviseText(mode, title, author, text){
        let htmlTemplate = `<div id="new-text-story-container">
                                <form>
                                    <div class="text-story-info-field">
                                        <h2 class="inline" style="font-size: 2.5rem;">Title: </h2>
                                        <input id="text-title" type="text" class="inline" style="font-size: 2.5rem; height: 3.5rem;">
                                    </div>
                                    <div class="text-story-info-field">
                                          <h2 class="inline" style="font-size: 2.5rem;">Author: </h2>
                                        <input id="text-author" type="text" class="inline" style="font-size: 2.5rem; height: 3.5rem;">
                                    </div>
                                    <div style="text-align: center">
                                        <textarea id="text-text" cols="90%" rows="10%"></textarea>
                                    </div >
                                    <div style="text-align: center">
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

    // Misc
    function support(){
        let htmlTemplate = `
            <div style="text-align: center">
                <div class="scrollable">
                    <h3>War on Terror Foundation: Virtual Memorial</h3>
                    <br>
                    <h3>Overview</h3>
                    <div style="text-align: left">
                        <p>Information covered below explains how to use each section of the web application, 
                        along with information about system requirments for the virtual tour, and how to report 
                        a problem os suggestion.</p>
                    </div>
                    <h3>Search</h3>
                    <div style="text-align: left">
                        <p>Lorem ipsum dolor sit amet, ornare metus nec sociosqu, egestas sed augue viverra in 
                        nam auctor, nibh sit consectetuer, elementum amet neque, tempus ante volutpat montes 
                        eget leo et. In porta ipsum justo, ultricies ullamcorper proin pharetra, nunc quisque 
                        sed condimentum purus amet scelerisque, ac vitae neque risus, suspendisse diam. Vivamus 
                        sodales massa sit nisl, dapibus ac ac, justo sit nec fusce suspendisse leo, velit 
                        porttitor neque vestibulum. Congue augue nec vel, sed pede tristique et amet, lectus 
                        donec sodales nunc lacus sed, suspendisse volutpat vestibulum enim. Nunc bibendum euismod.</p>
                    </div>
                    <h3>Information</h3>
                    <div style="text-align: left">
                        <p>Lorem ipsum dolor sit amet, ornare metus nec sociosqu, egestas sed augue viverra in 
                        nam auctor, nibh sit consectetuer, elementum amet neque, tempus ante volutpat montes 
                        eget leo et. In porta ipsum justo, ultricies ullamcorper proin pharetra, nunc quisque 
                        sed condimentum purus amet scelerisque, ac vitae neque risus, suspendisse diam. Vivamus 
                        sodales massa sit nisl, dapibus ac ac, justo sit nec fusce suspendisse leo, velit 
                        porttitor neque vestibulum. Congue augue nec vel, sed pede tristique et amet, lectus 
                        donec sodales nunc lacus sed, suspendisse volutpat vestibulum enim. Nunc bibendum euismod.</p>
                    </div>
                    <h3>Stories</h3>
                    <div style="text-align: left">
                        <p>Lorem ipsum dolor sit amet, ornare metus nec sociosqu, egestas sed augue viverra in 
                        nam auctor, nibh sit consectetuer, elementum amet neque, tempus ante volutpat montes 
                        eget leo et. In porta ipsum justo, ultricies ullamcorper proin pharetra, nunc quisque 
                        sed condimentum purus amet scelerisque, ac vitae neque risus, suspendisse diam. Vivamus 
                        sodales massa sit nisl, dapibus ac ac, justo sit nec fusce suspendisse leo, velit 
                        porttitor neque vestibulum. Congue augue nec vel, sed pede tristique et amet, lectus 
                        donec sodales nunc lacus sed, suspendisse volutpat vestibulum enim. Nunc bibendum euismod.</p>
                    </div>
                    <h3>Tour</h3>
                    <div style="text-align: left">
                        <p>Lorem ipsum dolor sit amet, ornare metus nec sociosqu, egestas sed augue viverra in 
                        nam auctor, nibh sit consectetuer, elementum amet neque, tempus ante volutpat montes 
                        eget leo et. In porta ipsum justo, ultricies ullamcorper proin pharetra, nunc quisque 
                        sed condimentum purus amet scelerisque, ac vitae neque risus, suspendisse diam. Vivamus 
                        sodales massa sit nisl, dapibus ac ac, justo sit nec fusce suspendisse leo, velit 
                        porttitor neque vestibulum. Congue augue nec vel, sed pede tristique et amet, lectus 
                        donec sodales nunc lacus sed, suspendisse volutpat vestibulum enim. Nunc bibendum euismod.</p>
                    </div>
                    <h3>System Requirments</h3>
                    <div style="text-align: left">
                        <p>Lorem ipsum dolor sit amet, ornare metus nec sociosqu, egestas sed augue viverra in 
                        nam auctor, nibh sit consectetuer, elementum amet neque, tempus ante volutpat montes 
                        eget leo et. In porta ipsum justo, ultricies ullamcorper proin pharetra, nunc quisque 
                        sed condimentum purus amet scelerisque, ac vitae neque risus, suspendisse diam. Vivamus 
                        sodales massa sit nisl, dapibus ac ac, justo sit nec fusce suspendisse leo, velit 
                        porttitor neque vestibulum. Congue augue nec vel, sed pede tristique et amet, lectus 
                        donec sodales nunc lacus sed, suspendisse volutpat vestibulum enim. Nunc bibendum euismod.</p>
                    </div>
                    <h3>Support</h3>
                    <div style="text-align: left">
                        <p>Lorem ipsum dolor sit amet, ornare metus nec sociosqu, egestas sed augue viverra in 
                        nam auctor, nibh sit consectetuer, elementum amet neque, tempus ante volutpat montes 
                        eget leo et. In porta ipsum justo, ultricies ullamcorper proin pharetra, nunc quisque 
                        sed condimentum purus amet scelerisque, ac vitae neque risus, suspendisse diam. Vivamus 
                        sodales massa sit nisl, dapibus ac ac, justo sit nec fusce suspendisse leo, velit 
                        porttitor neque vestibulum. Congue augue nec vel, sed pede tristique et amet, lectus 
                        donec sodales nunc lacus sed, suspendisse volutpat vestibulum enim. Nunc bibendum euismod.</p>
                    </div>
                </div>
            </div>
        `;
        $('#dynamic-container').html(htmlTemplate);
    }
    function loader(typeString, templateID){
        let domW = document.getElementById('dynamic-container').offsetWidth;
        let domH = document.getElementById('dynamic-container').offsetHeight;
        let htmlTemplate;
        let id = templateID || 1;
        let template1 = `<div id="loader">
                                <img src="imgs/loader.gif" alt="Loader">
                                <h1>${typeString}</h1>
                         </div>`;
        let template2 = `<div id="loader" style="background-color: white; width: ${domW}; height: ${domH}">
                                <img src="imgs/loader.gif" alt="Loader">
                                <h1>${typeString}</h1>
                         </div>`;

        // Verify which loading template to use
        if(id===2){
            htmlTemplate = template2;
        }
        else{
            htmlTemplate = template1;
        }

        //
        if(checkLoader === false){
            $('#app-container').append(htmlTemplate);
            checkLoader = true;
        }
        else{
            $('#loader').remove();
            checkLoader = false;
        }
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
    function dummyBlock(domTarget, height){
        let htmlTemplate =  `<div id="dummyBlock" style="height: ${height}rem;"></div>>`;
        console.log('Attempting Append');
        $(`#${domTarget}`).append(htmlTemplate);
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
         loginHeader: loginHeader,
         loader: loader,
         submitNotification: submitNotification,
         clearNewStoryFields: clearNewStoryFields,
         errorNotification: errorNotification,
         support: support
     };
}());
