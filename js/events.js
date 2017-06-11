$(document).ready(function(){
    console.log('Doc Ready');
    dReset();
    dWebgl();
});

$('#js-tour').click(function(){
    dWebgl();
});
$('#js-search').click(function(){
    dSearch();
});
$('#js-stories').click(function(){
    dInfo();
});