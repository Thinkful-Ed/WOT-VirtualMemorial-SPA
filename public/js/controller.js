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
    function veteranInfo(event){
        let vetName = event.currentTarget.dataset.id;
        htmlTemplates.loader();

        $.ajax({url:`veterans/${vetName}`})
            .then((res)=>{
                htmlTemplates.info(res);
                htmlTemplates.loader();
            })
        .fail();
    }
    return {
        submitSearch: submitSearch,
        veteranInfo: veteranInfo
    }
}());