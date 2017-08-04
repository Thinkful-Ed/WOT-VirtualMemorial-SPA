var crtl = (function(){
    function submitSearch(){
        var searchStr = $('#js-searchStr').val();
        $.ajax({url:`veterans/${searchStr}`})
            .then(function(res){
                $('#js-searchResults').html(htmlTemplates.searchResults(res));
            })
        .fail(()=>{
            console.warn('Something broke!');
        })
    }

    return {
        submitSearch: submitSearch
    }
}());