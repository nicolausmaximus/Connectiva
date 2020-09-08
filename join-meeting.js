sessionStorage["audio"]=0;
sessionStorage["video"]=0;
sessionStorage["xyz"]=0;



$( "#join-meeting_1" ).click(function( event ) {
 
        var channelname = $('#channel-name').val();
        sessionStorage["xyz"] = channelname;
        var audio = document.getElementById("audio").checked;
        sessionStorage["audio"] = audio;
        console.log(sessionStorage["audio"]);
        var video = document.getElementById("video").checked;
        sessionStorage["video"] = video;
        location.href= 'videocall.html';
      });
      

     