var state = (function(){
    var endpoints = {search: 'http://www.waronterror.org/temp_wot/php/search.php',
                     info: 'http://www.waronterror.org/temp_wot/php/loadVetInformation.php'};

    var submitSearch = function(){

        var searchStr = $('#js-searchStr').val();

        $.ajax({type:'post', url: endpoints.search, data:{target: $('#js-searchStr').val()}})
        .then(function(result) {
            $('#js-searchResults').html(result);
        });
    };

    var viewInfo = function(){};

    return{
        submitSearch: submitSearch,
        viewInfo: viewInfo
    }
}());