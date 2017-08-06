var htmlTemplates = (function(){
    let searchHtml = '';
    let infoHtml = '';
    let checkLoader = false;

    function tour(){
        console.log('Entering Function "tour()"');

        var htmlTemplate = `<div id="webgl-container"></div>`;
        $('#dynamic-container').html(htmlTemplate);
        wotScene.init();
    }
    function searchUI(){
        console.log('Entering Function "searchUI()"');

        // Html template for the search UI
        var htmlTemplate = `<div id="search-container">
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
        console.log('Entering Function "searchResults()"');

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
        console.log('Entering Function "buildSingleSearchResult()"');

        // Create html from each json object that represents a veteran
        return `
            <div>
                <div class="search-col inline"><p><b>${item.Name}</b></p></div>
                <div class="search-col inline">
                    <button class="vet-info" data-id="${item.Name}">View Information</button>
                    <button>View on Memorial</button>
                </div>
                <hr>
            </div>
        `
    }
    function info(jsonObj){
        console.log('Entering Function "info()"');

        if(!(jsonObj)){
            $('#dynamic-container').html(infoHtml);
        }
        else{
            infoHtml = buildInfo(jsonObj[0]);
            $('#dynamic-container').html(infoHtml);
        }
    }
    function buildInfo(jsonObj){
        console.log('Entering Function "buildInfo()"');

        return `
            <div id="info-container" class="bg-white scroll-y">
                <p><b>Name: </b>${jsonObj.Name}</p>
                <hr>
                <p><b>Age: </b>${jsonObj.Age}</p>
                <hr>
                <p><b>From: </b>${jsonObj.City}, ${jsonObj.State}, ${jsonObj.Country}</p>
                <hr>
                <p><b>Rank: </b>${jsonObj.Rank}</p>
                <hr>
                <p><b>Branch: </b>${jsonObj.Branch}</p>
                <hr>
                <p><b>Unit: </b>${jsonObj.Unit}</p>
                <hr>
                <p><b>Stationed: </b>${jsonObj.Stationed}</p>
                <hr>
                <p><b>Cause of Death: </b>${jsonObj.Cause}</p>
                <hr>
                <p><b>Place of Death: </b>${jsonObj.Province}, ${jsonObj.Date}</p>
            </div>
        `
    }
    function storyUI(){
        console.log('Entering Function "storyUI()"');

        return ``;
    }
    function loader(){
        console.log('Entering Function "loader()"');
        console.log(`CheckLoader current: ${checkLoader}`);

        let htmlTemplate = `<div id="loader">
                                <img src="imgs/loader.gif" alt="Loader">
                                <h1>Loading</h1>
                            </div>`;

        if(checkLoader === false){
            $('#app-container').append(htmlTemplate);
            checkLoader = true;
            console.log(`CheckLoader updated to: ${checkLoader}`);
        }
        else{
            $('#loader').remove();
            checkLoader = false;
            console.log(`CheckLoader updated to: ${checkLoader}`);
        }
    }
     return{
         tour: tour,
         searchUI: searchUI,
         searchResults: searchResults,
         info: info,
         storyUI: storyUI,
         loader: loader
     };
}());