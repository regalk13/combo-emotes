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
      document.getElementById("name").innerHTML = name;
      if (isFFZ == true) {
        const URL = 'https://api.frankerfacez.com/v1/emote/' + image;
        $.get(URL, function (data, status) {
          document.getElementById("emote").src = data.emote.urls[Object.keys(data.emote.urls).sort().pop()];
        });
      } else {
        document.getElementById("emote").src = image;
      }
    }
  });
  socket.on('reset', function () {
    counterControl();
  });

});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function counterControl() {
  let combo = document.getElementById("combo");
  let number = combo.textContent.split("x");

  if (parseInt(number[1]) >= 30) {
    slideUp();
  }
  else if (parseInt(number[1]) >= 15) {
    await sleep(10000);
    slideUp();

  }

  else {
    await sleep(15000);
    slideUp();
  }
}

function emoteAppear() {
  document.querySelector(".container").style.opacity = "1";
}

async function slideUp() {
  combo = document.getElementById("combo");
  number = combo.textContent.split("x");
  console.log(number);
  if (parseInt(number[1]) <= 0 || number[1] == null) {
    document.querySelector(".container").style.opacity = "0";
  }

  else {
    document.querySelector(".container").style.opacity = "1";
    await sleep(5000);
    combo.innerHTML = "x0";
  }

}
