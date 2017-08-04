var htmlTemplates = (function(){
    let searchHtml = '';
    let infoHtml = '';

    function tour(){
        var htmlTemplate = `<div id="webgl-container"></div>`;
        $('#dynamic-container').html(htmlTemplate);
    }
    function searchUI(){
        // Html tempplate for the search UI
        var htmlTemplate = `
            <div id="search-container">
                <div class="bg-red search-box">
                    <input id="js-searchStr" type="text" placeholder="Search by Name, Rank, Branch of Military, & More">
                    <button id="js-submitSearch">Search</button>
                </div>
                <div id="js-searchResults" class="dynamic-container-results">
                </div>
            </div>`;

        // Replace existing UI with search template and add any existing search results.
        $('#dynamic-container').html(htmlTemplate);
        $('#js-searchResults').html(searchHtml);
    }
    function searchResults(jsonObj){
        // Reset results
        searchHtml = '';
        $('#js-searchResults').html(searchHtml);

        // Call 'buildSingleSearchResult' to generate each name display for results and append to "searchHtml" string for return
        jsonObj.forEach(function(item){
            searchHtml = searchHtml + buildSingleSearchResult(item);
        });
        return searchHtml;
    }
    function buildSingleSearchResult(item){
        // Create html from each json object that represents a veteran
        return `
            <div>
                <div class="search-col inline"><p><b>${item.Name}</b></p></div>
                <div class="inline"><button>View Information</button></div>
                <div class="inline"><button>View on Memorial</button></div>
                <hr>
            </div>
        `
    }
    function info(vetName, vetAge, vetFrom, vetCountry, vetRank, vetBranch, vetUnit, vetStationed, vetDeath, vetCause, vetPlace, vetProvince){
        return `
            <div id="info-container" class="bg-white scroll-y">
                <p><b>Name: </b>${vetName}</p>
                <hr>
                <p><b>Age: </b>${vetAge}</p>
                <hr>
                <p><b>From: </b>${vetFrom}</p>
                <hr>
                <p><b>Country: </b>${vetCountry}</p>
                <hr>
                <p><b>Rank: </b>${vetRank}</p>
                <hr>
                <p><b>Branch: </b>${vetBranch}</p>
                <hr>
                <p><b>Unit: </b>${vetUnit}</p>
                <hr>
                <p><b>Stationed: </b>${vetStationed}</p>
                <hr>
                <p><b>Date of Death: </b>${vetDeath}</p>
                <hr>
                <p><b>Cause of Death: </b>${vetCause}</p>
                <hr>
                <p><b>Place of Death: </b>${vetPlace}</p>
                <hr>
                <p><b>Province: </b>${vetProvince}</p>
            </div>
        `
    }
    function storyUI(){}

     return{
         tour: tour,
         searchUI: searchUI,
         searchResults: searchResults,
         info: info,
         storyUI: storyUI
     };
}());