var crtl = (function(){
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
    function veteranInfo(ev){
        let vetName = ev.currentTarget.dataset.id;
        htmlTemplates.loader();

        $.ajax({url:`veterans/${vetName}`})
            .then((res)=>{
                console.log(res);
                htmlTemplates.info(res);
                htmlTemplates.loader();
            })
        .fail();
    }
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
    function submitTextStory(){
        let title = $('#text-title').val();
        let author = $('#text-author').val();
        let text = $('#text-text').val();
        console.log(`${title}, ${author}, ${text}`);
    }

    // Exposed
    return {
        submitSearch: submitSearch,
        veteranInfo: veteranInfo,
        getTextStories: getTextStories,
        submitTextStory: submitTextStory
    }
}());