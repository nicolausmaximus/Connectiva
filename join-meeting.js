sessionStorage["audio"] = 0;
sessionStorage["video"] = 0;
sessionStorage["xyz"] = 0;

$("#join-meeting_1").click(function (event) {
  var channelname = $("#channel-name").val();
  sessionStorage["xyz"] = channelname;
  var audio = document.getElementById("audio").checked;
  sessionStorage["audio"] = audio;
  var video = document.getElementById("video").checked;
  sessionStorage["video"] = video;
  var jqxhr = $.ajax({
    url: "https://script.google.com/macros/s/AKfycbxEilqsFj6S3pjAYPUU0hvZbaHRwyfXOXn6535kyDXlCgO9-V4/exec",
    method: "GET",
    dataType: "json",
    data: $("#fill-form").serializeObject(),
  });
});


