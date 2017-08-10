var crtl = (function(){
    // Submit request for veteran(s) then generate HTML results
    function submitSearch(){
        let searchStr = $('#js-searchStr').val();
        htmlTemplates.loader('Searching');

        $.ajax({url:`veterans/${searchStr}`, type: 'GET'})
            .then(function(res){
                $('#js-searchResults').html(htmlTemplates.searchResults(res));
                htmlTemplates.loader();
            })
        .fail(()=>{
            console.warn('Something broke!');
        })
    }
    // Get service information on specific veteran
    function veteranInfo(ev){
        let vetName = ev.currentTarget.dataset.id;
        htmlTemplates.loader('Loading');

        $.ajax({url:`veterans/${vetName}`, type: 'GET'})
            .then((res)=>{
                htmlTemplates.info(res);
                htmlTemplates.loader();
            })
        .fail();
    }
    // Get stories for specific veteran
    function getTextStories(ev){
        let vetID = ev.currentTarget.dataset.id;
        state.currentStoryVet = vetID;
        console.log(`MongoDB ID:  ${vetID}`);

        // htmlTemplates.loader('Loading');
        $.ajax({url:`veterans/text/${vetID}`, type: 'GET'})
            .then((res)=>{
                htmlTemplates.storyMainUI();
                htmlTemplates.textStoryUI(res);
                // htmlTemplates.loader();
            })
            .fail();
    }
    // Submit story on specific veteran
    function submitTextStory(){
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
    }
    function editTextStory(ev){
        let textID = ev.currentTarget.dataset.id;
        let title = $(`#${textID}`).children('h2').text();
        let author = $(`#${textID}`).children('h3').text();
        let text = $(`#${textID}`).children('p').text();

        htmlTemplates.createReviseText('EDIT', title, author, text)

        // $.ajax({url: `veterans/${textID}`, type: 'PUT'});


    }
    function deleteTextStory(ev){
        let textID = ev.currentTarget.dataset.id;
        console.log(`Current Text ID is: ${textID}`);

        $.ajax({url: `veterans/${textID}`, type: 'DELETE'});

        console.log(`Removing text story with ID: ${textID}`);
        $(`#${textID}`).remove();
    }

    // Exposed
    return {
        submitSearch: submitSearch,
        veteranInfo: veteranInfo,
        getTextStories: getTextStories,
        submitTextStory: submitTextStory,
        editTextStory: editTextStory,
        deleteTextStory: deleteTextStory
    }
}());