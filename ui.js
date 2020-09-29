$(document).ready(function () {
  var agoraAppId = 'c4762b14fa5c4cfb8fd48e16ace2258d';
  var channelName = sessionStorage["xyz"];
  initClientAndJoinChannel(agoraAppId, channelName);

  readData($("#data_username"));
});

// UI buttons
function enableUiControls(localStream) {

  $("#mic-btn").prop("disabled", false);
  $("#video-btn").prop("disabled", false);
  $("#screen-share-btn").prop("disabled", false);
  $("#exit-btn").prop("disabled", false);
  $("#add-rtmp-btn").prop("disabled", false);

  $("#mic-btn").click(function(){
    toggleMic(localStream);
  });

  $("#video-btn").click(function(){
    toggleVideo(localStream);
  });

  $("#screen-share-btn").click(function(){
    toggleScreenShareBtn(); // set screen share button icon
    $("#screen-share-btn").prop("disabled",true); // disable the button on click
    if(screenShareActive){
      stopScreenShare();
    } else {
      var agoraAppId = 'c4762b14fa5c4cfb8fd48e16ace2258d';
      var channelName =sessionStorage["xyz"];
      initScreenShare(agoraAppId, channelName); 
    }
  });

  $("#exit-btn").click(function(){
    console.log("so sad to see you leave the channel");
    leaveChannel(); 
  });
  $("#start-RTMP-broadcast").click(function(){
    startLiveTranscoding();
    $('#addRtmpConfigModal').modal('toggle');
    $('#rtmp-url').val('');
  });
  $("#add-external-stream").click(function(){  
    addExternalSource();
    $('#add-external-source-modal').modal('toggle');
  });

 


  // keyboard listeners 
  $(document).keypress(function(e) {
    if (($("#addRtmpUrlModal").data('bs.modal') || {})._isShown ||
    ($("#addRtmpConfigModal").data('bs.modal') || {})._isShown){
  return;
}
    switch (e.key) {
      case "m":
        console.log("squick toggle the mic");
        toggleMic(localStream);
        break;
      case "v":
        console.log("quick toggle the video");
        toggleVideo(localStream);
        break; 
      case "s":
        console.log("initializing screen share");
        toggleScreenShareBtn(); // set screen share button icon
        $("#screen-share-btn").prop("disabled",true); // disable the button on click
        if(screenShareActive){
          stopScreenShare();
        } else {
          initScreenShare(); 
        }
        break;  
      case "q":
        console.log("so sad to see you quit the channel");
        leaveChannel(); 
        break;   
      default:  // do nothing
    }

    // (for testing) 
    if(e.key === "r") { 
      window.history.back(); // quick reset
    }
  });
}

function toggleBtn(btn){
  btn.toggleClass('btn-dark').toggleClass('btn-danger');
}

function toggleScreenShareBtn() {
  $('#screen-share-btn').toggleClass('btn-danger');
  $('#screen-share-icon').toggleClass('fa-share-square').toggleClass('fa-times-circle');
}

function toggleVisibility(elementID, visible) {
  if (visible) {
    $(elementID).attr("style", "display:block");
  } else {
    $(elementID).attr("style", "display:none");
  }
}

function toggleMic(localStream) {
  toggleBtn($("#mic-btn")); // toggle button colors
  $("#mic-icon").toggleClass('fa-microphone').toggleClass('fa-microphone-slash'); // toggle the mic icon
  if ($("#mic-icon").hasClass('fa-microphone')) {
    localStream.unmuteAudio(); // enable the local mic
    toggleVisibility("#mute-overlay", false); // hide the muted mic icon
  } else {
    localStream.muteAudio(); // mute the local mic
    toggleVisibility("#mute-overlay", true); // show the muted mic icon
  }
}

function toggleVideo(localStream) {
  toggleBtn($("#video-btn")); // toggle button colors
  $("#video-icon").toggleClass('fa-video').toggleClass('fa-video-slash'); // toggle the video icon
  if ($("#video-icon").hasClass('fa-video')) {
    localStream.unmuteVideo(); // enable the local video
    toggleVisibility("#no-local-video", false); // hide the user icon when video is enabled
  } else {
    localStream.muteVideo(); // disable the local video
    toggleVisibility("#no-local-video", true); // show the user icon when video is disabled
  }
}



// default config for rtmp
var defaultConfigRTMP = {
  width: 640,
  height: 360,
  videoBitrate: 400,
  videoFramerate: 15,
  lowLatency: false,
  audioSampleRate: 48000,
  audioBitrate: 48,
  audioChannels: 1,
  videoGop: 30,
  videoCodecProfile: 100,
  userCount: 0,
  userConfigExtraInfo: {},
  backgroundColor: 0x000000,
  transcodingUsers: [],
};


function leaveChannel() {

  client.leave(function() {
    console.log('client leaves channel');
    localStreams.camera.stream.stop() // stop the camera stream playback
    localStreams.camera.stream.close(); // clean up and close the camera stream
    client.unpublish(localStreams.camera.stream); // unpublish the camera stream
    //disable the UI elements
    $('#mic-btn').prop('disabled', true);
    $('#video-btn').prop('disabled', true);
    $('#exit-btn').prop('disabled', true);
    $("#add-rtmp-btn").prop("disabled", true);
    $("#rtmp-config-btn").prop("disabled", true);
  }, function(err) {
    console.log('client leave failed ', err); //error handling
  });
}



function startLiveTranscoding() {
  console.log("start live transcoding"); 
  var rtmpUrl = $('#rtmp-url').val();
  var width = parseInt($('#window-scale-width').val(), 10);
  var height = parseInt($('#window-scale-height').val(), 10);

  var configRtmp = {
    width: width,
    height: height,
    videoBitrate: parseInt($('#video-bitrate').val(), 10),
    videoFramerate: parseInt($('#framerate').val(), 10),
    lowLatency: ($('#low-latancy').val() === 'true'),
    audioSampleRate: parseInt($('#audio-sample-rate').val(), 10),
    audioBitrate: parseInt($('#audio-bitrate').val(), 10),
    audioChannels: parseInt($('#audio-channels').val(), 10),
    videoGop: parseInt($('#video-gop').val(), 10),
    videoCodecProfile: parseInt($('#video-codec-profile').val(), 10),
    userCount: 1,
    userConfigExtraInfo: {},
    backgroundColor: parseInt($('#background-color-picker').val(), 16),
    transcodingUsers: [{
      uid: localStreams.uid,
      alpha: 1,
      width: width,
      height: height,
      x: 0,
      y: 0,
      zOrder: 0
    }],
  };

  // set live transcoding config
  client.setLiveTranscoding(configRtmp);
  if(rtmpUrl !== '') {
    client.startLiveStreaming(rtmpUrl, true)
    externalBroadcastUrl = rtmpUrl;
    addExternalTransmitionMiniView(rtmpUrl)
  }
}

function addExternalSource() {
  var externalUrl = $('#external-url').val();
  var width = parseInt($('#external-window-scale-width').val(), 10);
  var height = parseInt($('#external-window-scale-height').val(), 10);

  var injectStreamConfig = {
    width: width,
    height: height,
    videoBitrate: parseInt($('#external-video-bitrate').val(), 10),
    videoFramerate: parseInt($('#external-framerate').val(), 10),
    audioSampleRate: parseInt($('#external-audio-sample-rate').val(), 10),
    audioBitrate: parseInt($('#external-audio-bitrate').val(), 10),
    audioChannels: parseInt($('#external-audio-channels').val(), 10),
    videoGop: parseInt($('#external-video-gop').val(), 10)
  };

  // set live transcoding config
  client.addInjectStreamUrl(externalUrl, injectStreamConfig)
  injectedStreamURL = externalUrl;
  // TODO: ADD view for external url (similar to rtmp url)
}

// RTMP Connection (UI Component)
function addExternalTransmitionMiniView(rtmpUrl){
  var container = $('#rtmp-controlers');
  // append the remote stream template to #remote-streams
  container.append(
    $('<div/>', {'id': 'rtmp-container',  'class': 'container row justify-content-end mb-2'}).append(
      $('<div/>', {'class': 'pulse-container'}).append(
          $('<button/>', {'id': 'rtmp-toggle', 'class': 'btn btn-lg col-flex pulse-button pulse-anim mt-2'})
      ),
      $('<input/>', {'id': 'rtmp-url', 'val': rtmpUrl, 'class': 'form-control col-flex" value="rtmps://live.facebook.com', 'type': 'text', 'disabled': true}),
      $('<button/>', {'id': 'removeRtmpUrl', 'class': 'btn btn-lg col-flex close-btn'}).append(
        $('<i/>', {'class': 'fas fa-xs fa-trash'})
      )
    )
  );
  
  $('#rtmp-toggle').click(function() {
    if ($(this).hasClass('pulse-anim')) {
      client.stopLiveStreaming(externalBroadcastUrl)
    } else {
      client.startLiveStreaming(externalBroadcastUrl, true)
    }
    $(this).toggleClass('pulse-anim');
    $(this).blur();
  });

  $('#removeRtmpUrl').click(function() { 
    client.stopLiveStreaming(externalBroadcastUrl);
    externalBroadcastUrl = '';
    $('#rtmp-container').remove();
  });

}
