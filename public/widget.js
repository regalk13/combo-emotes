var currentEmote = "";
console.log("Connected..");
$(function () {
  var socket = io();
  socket.on('new combo', function (count, image, name, isFFZ) {
    if (currentEmote == name) {
      document.getElementById("combo").innerHTML = "x" + count;
      document.getElementById("emote").className = "nil";
      document.getElementById("name").innerHTML = name;
      setTimeout(emoteAppear, 20);
    } else {
      currentEmote = name;
      document.getElementById("combo").innerHTML = "x" + count;
      if (isFFZ == true) {
        const URL = 'https://api.frankerfacez.com/v1/emote/' + image;
        $.get(URL, function (data, status) {
          document.getElementById("emote").src = data.emote.urls[Object.keys(data.emote.urls).sort().pop()];
        });
      } else {
        document.getElementById("emote").src = image;
      }
      document.getElementById("emote").className = "nil";
      document.getElementById("border").className = "container";
    }
  });
  socket.on('reset', function () {
    console.log("Ending");
    slideUp();
  });

});

function emoteAppear() {
  document.querySelector(".container").style.opacity = "1";
}

function slideUp() {
  document.querySelector(".container").style.opacity = "0";
}
