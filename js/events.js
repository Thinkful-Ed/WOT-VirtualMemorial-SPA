$(document).ready(function(){
    console.log('Doc Ready');
    dReset();
    dWebgl();
});
    console.log('Document Ready | Events Added');
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
        }, 500);
});