var crtl = (function(){
    // Submit request for veteran(s) then generate HTML results
    function submitSearch(){
        let searchStr = $('#js-searchStr').val();
        htmlTemplates.loader();

        $.ajax({url:`veterans/${searchStr}`})
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
        htmlTemplates.loader();

        $.ajax({url:`veterans/${vetName}`})
            .then((res)=>{
                htmlTemplates.info(res);
                htmlTemplates.loader();
            })
        .fail();
    }
    // Get stories for specific veteran
    function getTextStories(ev){
        let vetName = ev.currentTarget.dataset.id;
        htmlTemplates.loader();

        $.ajax({url:`veterans/${vetName}`})
            .then((res)=>{
                htmlTemplates.storyMainUI();
                htmlTemplates.textStoryUI(res);
                htmlTemplates.loader();
            })
            .fail();
    }
    // Submit story on specific veteran
    function submitTextStory(){
        let title = $('#text-title').val();
        let author = $('#text-author').val();
        let text = $('#text-text').val();
        console.log(`${title}, ${author}, ${text}`);
        console.log(state.currentVet);

        $.ajax({url: `veterans/${state.currentVet._id}`})
    }

    // Exposed
    return {
        submitSearch: submitSearch,
        veteranInfo: veteranInfo,
        getTextStories: getTextStories,
        submitTextStory: submitTextStory
    }
}());