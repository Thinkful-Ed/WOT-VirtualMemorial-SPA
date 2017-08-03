console.log('Document Ready | Events Added');
// Core
$('#js-submitSearch').click(function(ev){
    ev.preventDefault();
    console.log('Search Query Goes Here');
});


// Temp
$('#js-tour').click(function(){
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
});
$('#js-search').click(function(){
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
});
$('#js-stories').click(function(){
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500)});