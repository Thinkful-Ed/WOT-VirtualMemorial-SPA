/**
 * Created by andrewPavlick on 8/8/2017.
 */
var state = (function(){
    var searchHtml;
    var infoHtml;
    var storiesHtml;
    var currentVet;
    var currentStoryVet;
    var currentStory;
    var newText = true;

    return{
        searchHtml: searchHtml,
        infoHtml: infoHtml,
        storiesHtml: storiesHtml,
        currentVet: currentVet,
        currentStoryVet: currentStoryVet,
        currentStory: currentStory,
        newText: newText
    }
});

var appEvents = function(){
    // Set which section is the initial screen
    $(document).ready(htmlTemplates.tour());

    // ================================ Main Menu
    // WebGL Tour Loader
    $('#menu-tour').click(function(ev){
        ev.preventDefault();
        htmlTemplates.tour();
    });
    // Search Main Menu
    $('#menu-search').click(function(ev){
        ev.preventDefault();
        htmlTemplates.searchUI();
    });
    // Information
    $('#menu-information').click(function(ev) {
        ev.preventDefault();
        htmlTemplates.info();
    });
    // Stories Main Menu
    $('#menu-stories').click(function(ev){
        ev.preventDefault();
        htmlTemplates.storyMainUI();
    });

    // ================================ Dynamic Menus
    // ====================== Search
    // Search Submission - "Mouse Click"
    $('#dynamic-container').on('click', '#js-submitSearch', function(ev){
        ev.preventDefault();
        crtl.submitSearch();
    });
    // View Vet Info
    $('#dynamic-container').on('click', '.vet-info', function(ev) {
        ev.preventDefault();
        crtl.veteranInfo(ev);
    });
    // View Exiting Vet Stories
    $('#dynamic-container').on('click', '.vet-story', function(ev) {
        ev.preventDefault();
        crtl.getTextStories(ev);
    });

    // ====================== Stories
    // =========== Stories Main Menu
    // Load current vet text stories
    $('#dynamic-container').on('click', '#story-text', (ev)=>{
        ev.preventDefault();
        htmlTemplates.textStoryUI();
    });
    // Load current vet picture stories
    $('#dynamic-container').on('click', '#story-picture', (ev)=>{
        ev.preventDefault();
        htmlTemplates.comingSoon();
    });
    // Load current vet audio stories
    $('#dynamic-container').on('click', '#story-audio', (ev)=>{
        ev.preventDefault();
        htmlTemplates.comingSoon();
    });
    // Load current vet video stories
    $('#dynamic-container').on('click', '#story-video', (ev)=>{
        ev.preventDefault();
        htmlTemplates.comingSoon();
    });

    // =========== View Stories
    // Load "Create New Story" window
    $('#dynamic-container').on('click', '#create-new-text-story', (ev)=>{
        ev.preventDefault();
        htmlTemplates.createReviseText();
    });
    $('#dynamic-container').on('click', '.edit', (ev)=>{
        ev.preventDefault();
        crtl.editTextStory(ev);
    });
    $('#dynamic-container').on('click', '.delete', (ev)=>{
        ev.preventDefault();
        crtl.deleteTextStory(ev);
    });

    // =========== Create New Story
    // Clear Text Fields
    $('#dynamic-container').on('click', '#text-story-clear', (ev)=>{
        ev.preventDefault();
        htmlTemplates.clearNewStoryFields();
    });
    // Submit Story
    $('#dynamic-container').on('click', '#text-story-submit', (ev)=>{
        ev.preventDefault();
        crtl.submitTextStory();
    });
};