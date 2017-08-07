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
    function veteranStoriesText(ev){
        let vetName = ev.currentTarget.dataset.id;
        // htmlTemplates.loader();

        $.ajax({url:`veterans/${vetName}`})
            .then((res)=>{
                htmlTemplates.storyMainUI();
                htmlTemplates.textStoryUI(res);
                // htmlTemplates.loader();
            })
            .fail();
    }

    // Exposed
    return {
        submitSearch: submitSearch,
        veteranInfo: veteranInfo,
        veteranStoriesText: veteranStoriesText
    }
}());