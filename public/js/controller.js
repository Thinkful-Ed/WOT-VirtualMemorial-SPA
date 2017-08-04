var crtl = (function(){
    function submitSearch(){
        let searchStr = $('#js-searchStr').val();
        $.ajax({url:`veterans/${searchStr}`})
            .then(function(res){
                $('#js-searchResults').html(htmlTemplates.searchResults(res));
            })
        .fail(()=>{
            console.warn('Something broke!');
        })
    }
    function veteranInfo(event){
        let vetName = event.currentTarget.dataset.id;
        $.ajax({url:`veterans/${vetName}`})
            .then((res)=>{
                htmlTemplates.info(res)
            })
        .fail();
    }
    return {
        submitSearch: submitSearch,
        veteranInfo: veteranInfo
    }
}());