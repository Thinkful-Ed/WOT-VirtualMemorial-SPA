var crtl = (function(){
    function submitSearch(){
        var searchStr = $('#js-searchStr').val();
        $.ajax({url:`veterans/${searchStr}`});
    }

    return {
        submitSearch: submitSearch
    }
}());