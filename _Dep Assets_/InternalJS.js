var canSearch = false;

function CanSearch(){
    canSearch = true;
    document.getElementById('search-name').disabled = false;
}

function loadInfo(){
    var sendTarget = $('#search-name').val();

    $.ajax({
        type: 'post',
        url: 'php/search.php',
        data:{
            target: sendTarget,
        },
        success: function(response){
            $('#search-results').html(response);
        }

    });
    document.getElementById('instr').style.visibility = "visible";
}

function loadVetInfo(number){
    var vetTarget = $('#vet-name' + number).text();

    $.ajax({
        type: 'post',
        url: 'php/loadVetInformation.php',
        data:{
            target: vetTarget,
        },
        success: function(response){
            $('#search-results').html(response);
        }

    });
    document.getElementById('instr').style.visibility = "visible";
}

function viewVet(number){
    var vetTarget = $('#vet-name' + number).text();
    var splitVetTarget = vetTarget.split(" ");
    if(splitVetTarget.length == 3){
        if(splitVetTarget[2].length > 2){
            splitVetTarget[2] = splitVetTarget[2].charAt(0) + ".";
        }
        vetTarget = splitVetTarget[1] + " " + splitVetTarget[2] + " " + splitVetTarget[0];
    }
    if(splitVetTarget.length == 2){
        vetTarget = splitVetTarget[1] + " " + splitVetTarget[0];
    }
    //alert(vetTarget);
    SendMessage("VeteranDataManager","SubmitName",vetTarget);
    loadVetInfo(number);
}

function resumeTour(){
    SendMessage("VeteranDataManager","ResumeTour","asdf");
}

// $(document).ready(function() {
//
//   $('#search-vet').click(function() {
//       //show name in tour
//     var target = $('#search-name').val();
//     SendMessage("VeteranDataManager","SubmitName",target);
//
//   });
// });
//