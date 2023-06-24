var kotakMerah = document.getElementById("kotak-merah");
var kotakBiru = document.getElementById("kotak-biru");
var isDraggingMerah = false;
var isDraggingBiru = false;
var startOffsetXMerah, startOffsetYMerah;
var startOffsetXBiru, startOffsetYBiru;
var border = document.getElementById("border");
var borderRect = border.getBoundingClientRect();

var scoreBiru = 0;
var scoreMerah = 0;

var scoreBiruValue = document.getElementById("score-biru-value");
var scoreMerahValue = document.getElementById("score-merah-value");

var timerElement = document.getElementById("timer");
var startButton = document.getElementById("startButton");
var resetButton = document.getElementById("resetButton");

var totalSeconds = 180; // 3 menit
var seconds = totalSeconds;
var interval;

function updateBorderRect() {
  borderRect = border.getBoundingClientRect();
}

function handleMouseDownMerah(e) {
  e.preventDefault();
  isDraggingMerah = true;
  startOffsetXMerah = e.clientX - kotakMerah.getBoundingClientRect().left;
  startOffsetYMerah = e.clientY - kotakMerah.getBoundingClientRect().top;
}

function handleMouseMoveMerah(e) {
  if (isDraggingMerah) {
    var newX = e.clientX - startOffsetXMerah - borderRect.left;
    var newY = e.clientY - startOffsetYMerah - borderRect.top;

    newX = Math.max(0, Math.min(newX, borderRect.width - kotakMerah.offsetWidth));
    newY = Math.max(0, Math.min(newY, borderRect.height - kotakMerah.offsetHeight));

    var relativeX = (newX / borderRect.width) * 100;
    var relativeY = (newY / borderRect.height) * 100;

    kotakMerah.style.left = relativeX + "%";
    kotakMerah.style.top = relativeY + "%";

    // Mengirim posisi kotak ke Firebase Realtime Database - Kotak Merah
    database.ref("posisi_kotak_merah").set({
      left: relativeX + "%",
      top: relativeY + "%"
    });

    // Memperbarui borderRect setelah posisi kotak berubah
    updateBorderRect();
  }
}

function handleMouseUpMerah() {
  isDraggingMerah = false;
}

function handleMouseDownBiru(e) {
  e.preventDefault();
  isDraggingBiru = true;
  startOffsetXBiru = e.clientX - kotakBiru.getBoundingClientRect().left;
  startOffsetYBiru = e.clientY - kotakBiru.getBoundingClientRect().top;
}

function handleMouseMoveBiru(e) {
  if (isDraggingBiru) {
    var newX = e.clientX - startOffsetXBiru - borderRect.left;
    var newY = e.clientY - startOffsetYBiru - borderRect.top;

    newX = Math.max(0, Math.min(newX, borderRect.width - kotakBiru.offsetWidth));
    newY = Math.max(0, Math.min(newY, borderRect.height - kotakBiru.offsetHeight));

    var relativeX = (newX / borderRect.width) * 100;
    var relativeY = (newY / borderRect.height) * 100;

    kotakBiru.style.left = relativeX + "%";
    kotakBiru.style.top = relativeY + "%";

    // Mengirim posisi kotak ke Firebase Realtime Database - Kotak Biru
    database.ref("posisi_kotak_biru").set({
      left: relativeX + "%",
      top: relativeY + "%"
    });

    // Memperbarui borderRect setelah posisi kotak berubah
    updateBorderRect();
  }
}

function handleMouseUpBiru() {
  isDraggingBiru = false;
}

var posisiKotakMerahRef = database.ref("posisi_kotak_merah");
posisiKotakMerahRef.on("value", function(snapshot) {
  var posisiMerah = snapshot.val();
  if (posisiMerah) {
    kotakMerah.style.left = posisiMerah.left;
    kotakMerah.style.top = posisiMerah.top;
  }
});

var posisiKotakBiruRef = database.ref("posisi_kotak_biru");
posisiKotakBiruRef.on("value", function(snapshot) {
  var posisiBiru = snapshot.val();
  if (posisiBiru) {
    kotakBiru.style.left = posisiBiru.left;
    kotakBiru.style.top = posisiBiru.top;
  }
});

window.addEventListener("resize", updateBorderRect);

kotakMerah.addEventListener("mousedown", handleMouseDownMerah);
document.addEventListener("mousemove", handleMouseMoveMerah);
document.addEventListener("mouseup", handleMouseUpMerah);

kotakBiru.addEventListener("mousedown", handleMouseDownBiru);
document.addEventListener("mousemove", handleMouseMoveBiru);
document.addEventListener("mouseup", handleMouseUpBiru);

function handleTouchStartMerah(e) {
  e.preventDefault();
  isDraggingMerah = true;
  startOffsetXMerah = e.touches[0].clientX - kotakMerah.getBoundingClientRect().left;
  startOffsetYMerah = e.touches[0].clientY - kotakMerah.getBoundingClientRect().top;
}

function handleTouchMoveMerah(e) {
  if (isDraggingMerah) {
    var newX = e.touches[0].clientX - startOffsetXMerah - borderRect.left;
    var newY = e.touches[0].clientY - startOffsetYMerah - borderRect.top;

    newX = Math.max(0, Math.min(newX, borderRect.width - kotakMerah.offsetWidth));
    newY = Math.max(0, Math.min(newY, borderRect.height - kotakMerah.offsetHeight));

    var relativeX = (newX / borderRect.width) * 100;
    var relativeY = (newY / borderRect.height) * 100;

    kotakMerah.style.left = relativeX + "%";
    kotakMerah.style.top = relativeY + "%";

    database.ref("posisi_kotak_merah").set({
      left: relativeX + "%",
      top: relativeY + "%"
    });
  }
}

function handleTouchEndMerah() {
  isDraggingMerah = false;
}

function handleTouchStartBiru(e) {
  e.preventDefault();
  isDraggingBiru = true;
  startOffsetXBiru = e.touches[0].clientX - kotakBiru.getBoundingClientRect().left;
  startOffsetYBiru = e.touches[0].clientY - kotakBiru.getBoundingClientRect().top;
}

function handleTouchMoveBiru(e) {
  if (isDraggingBiru) {
    var newX = e.touches[0].clientX - startOffsetXBiru - borderRect.left;
    var newY = e.touches[0].clientY - startOffsetYBiru - borderRect.top;

    newX = Math.max(0, Math.min(newX, borderRect.width - kotakBiru.offsetWidth));
    newY = Math.max(0, Math.min(newY, borderRect.height - kotakBiru.offsetHeight));

    var relativeX = (newX / borderRect.width) * 100;
    var relativeY = (newY / borderRect.height) * 100;

    kotakBiru.style.left = relativeX + "%";
    kotakBiru.style.top = relativeY + "%";

    database.ref("posisi_kotak_biru").set({
      left: relativeX + "%",
      top: relativeY + "%"
    });
  }
}

function handleTouchEndBiru() {
  isDraggingBiru = false;
}

kotakMerah.addEventListener("touchstart", handleTouchStartMerah);
document.addEventListener("touchmove", handleTouchMoveMerah);
document.addEventListener("touchend", handleTouchEndMerah);

kotakBiru.addEventListener("touchstart", handleTouchStartBiru);
document.addEventListener("touchmove", handleTouchMoveBiru);
document.addEventListener("touchend", handleTouchEndBiru);

updateBorderRect();

// Variable Timer
var timerValue = 180; // 3 minutes (in seconds)
var timerInterval;

// Timer Elements
var timerElement = document.getElementById("timer-value");
var startButton = document.getElementById("start-button");
var resetButton = document.getElementById("reset-button");

// Start Timer
function startTimer() {
  startButton.disabled = true;
  resetButton.disabled = false;
  timerInterval = setInterval(updateTimer, 1000);
}

// Reset Timer
function resetTimer() {
  clearInterval(timerInterval);
  timerValue = 180; // Reset timer value to 3 minutes
  updateTimer();
  startButton.disabled = false;
  resetButton.disabled = true;
}

// Update Timer
function updateTimer() {
  var minutes = Math.floor(timerValue / 60);
  var seconds = timerValue % 60;
  timerElement.textContent = padZero(minutes) + ":" + padZero(seconds);

  if (timerValue === 0) {
    clearInterval(timerInterval);
    startButton.disabled = false;
  } else {
    timerValue--;
  }
}

// Helper function to pad zeros
function padZero(value) {
  return value.toString().padStart(2, "0");
}

// Event Listeners
startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);

// Mendapatkan perubahan nilai timer dari Firebase Realtime Database
var timerValueRef = database.ref("timer_value");
timerValueRef.on("value", function(snapshot) {
  var timerValue = snapshot.val();
  if (timerValue) {
    // Mengupdate nilai timer lokal dengan nilai dari Firebase
    updateLocalTimer(timerValue);
  }
});

function updateLocalTimer(value) {
  timerValue = value;
  var minutes = Math.floor(timerValue / 60);
  var seconds = timerValue % 60;
  timerElement.textContent = padZero(minutes) + ":" + padZero(seconds);
}

// Update Timer
function updateTimer() {
  var minutes = Math.floor(timerValue / 60);
  var seconds = timerValue % 60;
  timerElement.textContent = padZero(minutes) + ":" + padZero(seconds);

  // Mengirim nilai timer ke Firebase Realtime Database
  database.ref("timer_value").set(timerValue);

  if (timerValue === 0) {
    clearInterval(timerInterval);
    startButton.disabled = false;
  } else {
    timerValue--;
  }
}

var buttonTiang1 = document.getElementById("tiang1");
var buttonTiang2 = document.getElementById("tiang2");
var buttonTiang3 = document.getElementById("tiang3");
var buttonTiang4 = document.getElementById("tiang4");
var buttonTiang5 = document.getElementById("tiang5");
var buttonTiang6 = document.getElementById("tiang6");
var buttonTiang7 = document.getElementById("tiang7");
var buttonTiang8 = document.getElementById("tiang8");
var buttonTiang9 = document.getElementById("tiang9");
var buttonTiang10 = document.getElementById("tiang10");
var buttonTiang11 = document.getElementById("tiang11");

var scoreBiruValue = document.getElementById("score-biru-value");
var scoreMerahValue = document.getElementById("score-merah-value");

// Fungsi untuk mengubah warna dan mengupdate skor
// Fungsi untuk mengubah warna dan mengupdate skor
function updateScore(target, type, buttonId) {
  var button = document.getElementById("tiang" + buttonId);
  var scoreIncrement = 0;

  // Mengubah warna button sesuai dengan target dan type
  if (type === "type1") {
    if (button.style.backgroundColor === "black") {
      button.style.backgroundColor = "green";
    } else if (button.style.backgroundColor === "green") {
      button.style.backgroundColor = "red";
    } else if (button.style.backgroundColor === "red") {
      button.style.backgroundColor = "black";
    }
  } else if (type === "type2" || type === "type3") {
    if (button.style.backgroundColor === "black") {
      button.style.backgroundColor = "green";
    } else if (button.style.backgroundColor === "green") {
      button.style.backgroundColor = "red";
    } else if (button.style.backgroundColor === "red") {
      button.style.backgroundColor = "blue";
    } else if (button.style.backgroundColor === "blue") {
      button.style.backgroundColor = "black";
    }
  }

  // Mengupdate skor sesuai dengan type
  if (target === "merah") {
    if (type === "type1") {
      if (button.style.backgroundColor === "red") {
        scoreIncrement = -10;
      } else if (button.style.backgroundColor === "black") {
        scoreIncrement = 10;
        button.style.backgroundColor = "red"; // Ubah warna menjadi merah
      }
    } else if (type === "type2" || type === "type3") {
      if (button.style.backgroundColor === "red") {
        scoreIncrement = -30;
      } else if (button.style.backgroundColor === "blue") {
        scoreIncrement = 30;
        button.style.backgroundColor = "red"; // Ubah warna menjadi merah
      }
    }
    scoreMerah += scoreIncrement;
  } else if (target === "biru") {
    if (type === "type1") {
      if (button.style.backgroundColor === "blue") {
        scoreIncrement = -10;
      } else if (button.style.backgroundColor === "black") {
        scoreIncrement = 10;
        button.style.backgroundColor = "blue"; // Ubah warna menjadi biru
      }
    } else if (type === "type2" || type === "type3") {
      if (button.style.backgroundColor === "blue") {
        scoreIncrement = -30;
      } else if (button.style.backgroundColor === "red") {
        scoreIncrement = 30;
        button.style.backgroundColor = "blue"; // Ubah warna menjadi biru
      }
    }
    scoreBiru += scoreIncrement;
  }

  // Memastikan skor tidak negatif
  scoreBiru = Math.max(scoreBiru, 0);
  scoreMerah = Math.max(scoreMerah, 0);

  // Memastikan skor tidak melebihi batas maksimal
  scoreBiru = Math.min(scoreBiru, 220);
  scoreMerah = Math.min(scoreMerah, 220);

  // Menampilkan skor
  scoreBiruValue.textContent = scoreBiru;
  scoreMerahValue.textContent = scoreMerah;
}

buttonTiang1.addEventListener("click", function () {
  updateScore("merah", "type1", 1);
});

buttonTiang2.addEventListener("click", function () {
  updateScore("merah", "type1", 2);
});

buttonTiang3.addEventListener("click", function () {
  updateScore("merah", "type1", 3);
});

buttonTiang4.addEventListener("click", function () {
  updateScore("merah", "type1", 4);
});

buttonTiang5.addEventListener("click", function () {
  updateScore("merah", "type1", 5);
});

buttonTiang6.addEventListener("click", function () {
  updateScore("merah", "type1", 6);
});

buttonTiang7.addEventListener("click", function () {
  updateScore("all", "type2", 7);
});

buttonTiang8.addEventListener("click", function () {
  updateScore("all", "type2", 8);
});

buttonTiang9.addEventListener("click", function () {
  updateScore("all", "type2", 9);
});

buttonTiang10.addEventListener("click", function () {
  updateScore("all", "type2", 10);
});

buttonTiang11.addEventListener("click", function () {
  updateScore("all", "type3", 11);
});
