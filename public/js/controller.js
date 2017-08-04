var crtl = (function(){
    function submitSearch(){
        var searchStr = $('#js-searchStr').val();
        $.ajax({url:`veterans/${searchStr}`})
            .then(function(res){
                $('#dynamic-container').html(res);
            })
        .fail()
    }

    return {
        submitSearch: submitSearch
    }
}());