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
    //CLICK ON EVENT TO LOAD TIMETABLE 
    $('#content').on('click', '#event a', function(e) { //USER CLICKS ON PLACE 
        e.preventDefault(); //PREVENT LOADING PAGE 
        var loc = this.is.toUpperCase(); //GET THE VALUE OF ID ATTR
        var newContent = ''; //TO BUILD UP TIMETABLE 
        for (var i = 0; i < times[loc].legnth; i++) { //LOOP THROUGH SESSIONS 
            newContent += '<li> <span class="time">' + times[loc] [i].time + '</span>'; //session stored in li which displays the time  
            newContent += '<a href="descriptions.html#'; //the link loads the description - # links to correct part of page
            newContent += times[loc][i].title.replace(/ /g, '-') + '">'; //sesson title is added after the # replace switches out the spaces for a dash in the description.html file
            newContent += times[loc][i].title + '</a></li>'; //inside the link you can see the title of the session 
        }
        $('sessions').html('<ul>' + newContent + '</ul>'); //DISPLAY TIME
        
        $('#event a.current').removeClass('current'); //UPDATE SELECTED LINK
        $(this).addClass('current');
        
        $('#details').text(''); //CLEAR THE THIRD COLUMN
    });
    //CLICK ON A SESSION TO LOAD THE DESCRIPTION 
    $('#content').on('click', '#sessions li a', function(e) { //CLICK ON SESSION 
        e.preventDefault(); //PREVENT LOADING 
        var fragment = this.href; //TITLE IS IN HREF
        
        fragment = fragment.replace ('#', ' #'); //ADD SPACE AFTER#
        $('#details').load(fragment); //TO LOAD INFO
        
        $('#sessions a.current').removeClass('current'); //UPDATE SELECTED 
        $(this).addClass('current'); 
    });
    
    //CLICK ON PRIMARY NAVIGATION 
    $('nav a').on('click', function(e) { //CLICK ON NAV
        e.preventDefault();  //PREVENT LOADING
        var url = this.href; //GET URL TO LOAD 
        $('nav a.current').removeClass('current'); //UPDATE NAV
        $(this).addClass('current');
        
        $('#container').remove(); //REMOVE OLD
        $('#content').load(url + '#container').hide().fadeIn('slow'); //ADD NEW
        
    }); 
});