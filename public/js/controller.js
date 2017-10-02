var crtl = (function(){
    // Story Endpoints
    function submitSearch(){
        // Submit request for veteran(s) then generate HTML results
        let searchStr = $('#js-searchStr').val();
        htmlTemplates.loader('Searching');

        $.ajax({url:`veterans/${searchStr}`, type: 'GET'})
            .then(function(res){
                $('#js-searchResults').html(htmlTemplates.searchResults(res));
                htmlTemplates.loader();
            })
        .fail(()=>{
            htmlTemplate.errorNotification('Sorry, there was a problem. Try again in a moment.');
        })
    }
    function veteranInfo(ev){
        // Get service information on specific veteran
        let vetName = ev.currentTarget.dataset.id;
        htmlTemplates.loader('Loading');

        $.ajax({url:`veterans/${vetName}`, type: 'GET'})
            .then((res)=>{
                htmlTemplates.info(res);
                htmlTemplates.loader();
            })
        .fail(()=>{
            htmlTemplate.errorNotification('Sorry, there was a problem. Try again in a moment.');
        });
    }
    function getTextStories(ev){
        // Get stories for specific veteran
        let vetID = ev.currentTarget.dataset.uuid;
        state.currentStoryVet = vetID;

        // htmlTemplates.loader('Loading');
        $.ajax({url:`veterans/text/${vetID}`, type: 'GET'})
            .then((res)=>{
                htmlTemplates.storyMainUI();
                htmlTemplates.textStoryUI(res);
                // htmlTemplates.loader();
            })
            .fail(()=>{
                htmlTemplate.errorNotification('Sorry, there was a problem. Try again in a moment.');
            });
    }
    function submitTextStory(){
        // Submit story on specific veteran
        //let postType;
        if(state.newText === false){
            $.ajax({url: `veterans/${state.currentStory}`,
                type: 'PUT',
                data: JSON.stringify([
                    {title: $('#text-title').val()},
                    {author: $('#text-author').val()},
                    {text: $('#text-text').val()}
                ]),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'});
            htmlTemplates.submitNotification();
            state.newText = true;
        }
        else{
            $.ajax({url: `veterans/${state.currentStoryVet}`,
                type: 'POST',
                data: JSON.stringify([
                    {title: $('#text-title').val()},
                    {author: $('#text-author').val()},
                    {text: $('#text-text').val()}
                ]),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'});
            htmlTemplates.submitNotification();
            state.newText = true;
        }
    }
    function editTextStory(ev){
        // Edit a text story
        state.currentStory = ev.currentTarget.dataset.id;
        textID = ev.currentTarget.dataset.id;
        let title = $(`#${textID}`).children('h2').text();
        let author = $(`#${textID}`).children('h3').text();
        let text = $(`#${textID}`).children('p').text();

        htmlTemplates.createReviseText('EDIT', title, author, text)
    }
    function deleteTextStory(ev){
        let textID = ev.currentTarget.dataset.id;

        $.ajax({url: `veterans/${textID}`, type: 'DELETE'});

        $(`#${textID}`).remove();
    }

    // Memorial
    function viewOnMemorial(ev){
        let panel = ev.currentTarget.dataset.panel;
        let position = ev.currentTarget.dataset.position;

        $.ajax({url: `memorial/${panel}`, type: 'GET'})
            .then((res)=>{
                wotScene.viewOnMemorial(res, panel, position);
            })
            .catch((error)=>{
                console.warn(error);
            })
    }

    // User Endpoints
    function createNewUser(){
        $.ajax(
            {
                url: `/user/new`,
                type: 'POST',
                data: JSON.stringify({
                    firstName: $('#new-first').val(),
                    lastName: $('#new-last').val(),
                    user: $('#new-username').val(),
                    password: $('#new-password').val()
                }),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            });
    }
    function loginUser(){
        $.ajax(
            {
                url: `/user/login`,
                type: 'POST',
                data: JSON.stringify({
                    username: $('#login-username').val(),
                    password: $('#login-password').val()
                }),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            });
    }

    // Exposed
    return {
        submitSearch: submitSearch,
        veteranInfo: veteranInfo,
        getTextStories: getTextStories,
        submitTextStory: submitTextStory,
        editTextStory: editTextStory,
        deleteTextStory: deleteTextStory,
        viewOnMemorial: viewOnMemorial,
        createNewUser: createNewUser,
        loginUser: loginUser
    }
}());