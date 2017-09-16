$(function() { //WHEN THE DOM IS READY
    //SET UP THE REQUEST
    var times; //DECLARE GLOBAL VARIABLE that stores TIMETABLES FOR EVENTS 
    $.ajax({ //SET UP REQUEST
        beforeSend: function(xhr) {  //BEFORE REQUESTING DATA
            if (xhr.overrideMimeType) { //IF JSON SUPPORTED CHECKS IF SERVER RESPONES USING DIFFERANT FORMAT 
                xhr.overrideMimeType("application/json"); //SET MIME TO PREVENT ERRORS 
                } 
        }
    });
    //FUNCTION THAT COLLECTS DATA FROM JSON FILE
    function loadTimetable() { //DECLARE FUNCTION
        $.getJSON('data/example.json') //TRY TO COLLECT JSON DATA
        .done( function(data) { //IF SUCCESSFUL
            times = data; //STORE IT IN A VAARIABLE
        }).fail ( function() { //IF A PROBLEM: SHOW A MESSAGE
            $('#event').html('sorry! we could not load the timetable at the moment');
        });
    }
    loadTimetable; //CALL THE FUNCTION
})