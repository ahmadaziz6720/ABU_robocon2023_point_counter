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
