var crtl = (function(){
    function submitSearch(){
        var searchStr = $('#js-searchStr').val();
    }

    return {
        submitSearch: submitSearch
    }
}());