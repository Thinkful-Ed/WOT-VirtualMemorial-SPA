var state = (function(){
    var endpoints = {search: 'http://www.waronterror.org/temp_wot/php/search.php',
                     info: 'http://www.waronterror.org/temp_wot/php/loadVetInformation.php'};

    var submitSearch = function(){

        var searchStr = $('#js-searchStr').val();

        try{
            $.ajax({type:'post', url: endpoints.search, data:{target: $('#js-searchStr').val()}})
                .then(function(result) {
                    $('#js-searchResults').html(result);
                });
        }
        catch (err){
            console.log(err);
        }

    };
    //Currently using internal script.
    var loadVetInfo  = function(){
        console.log('In "loadVetInfo"');
    };

    return{
        submitSearch: submitSearch,
        loadVetInfo: loadVetInfo,
        endpoints: endpoints
    }
}());