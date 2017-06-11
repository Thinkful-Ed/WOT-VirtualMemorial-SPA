/**
 * Created by Andrew on 6/10/2017.
 */
function dReset(){
    console.log('Resetting stage.');
    $('#stage').html('');
};
function dWebgl(){
    console.log('Loading WebGL.');
    dReset();
    $('#stage').html(templates.webgl);
};
function dSearch(){
    console.log('Loading Search.');
    dReset();
    $('#stage').html(templates.search);
};
function dInfo(){
    console.log('Loading Info.');
    dReset();
    $('#stage').html(templates.story);
};