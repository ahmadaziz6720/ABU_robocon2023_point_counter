var kotakMerah = document.getElementById("kotak-merah");
var kotakBiru = document.getElementById("kotak-biru");
var isDraggingMerah = false;
var isDraggingBiru = false;
var startOffsetXMerah, startOffsetYMerah;
var startOffsetXBiru, startOffsetYBiru;

// Event listener for mouse movements on laptops/desktops - Kotak Merah
kotakMerah.addEventListener("mousedown", function(e) {
  e.preventDefault();
  isDraggingMerah = true;
  startOffsetXMerah = e.clientX - kotakMerah.offsetLeft;
  startOffsetYMerah = e.clientY - kotakMerah.offsetTop;
});

document.addEventListener("mousemove", function(e) {
  if (isDraggingMerah) {
    var newX = e.clientX - startOffsetXMerah;
    var newY = e.clientY - startOffsetYMerah;
    kotakMerah.style.left = newX + "px";
    kotakMerah.style.top = newY + "px";

    // Send box position to Firebase Realtime Database - Kotak Merah
    database.ref().child("posisi_kotak_merah").set({
      left: newX,
      top: newY
    });
  }
});

document.addEventListener("mouseup", function() {
  isDraggingMerah = false;
});

// Event listener for mouse movements on laptops/desktops - Kotak Biru
kotakBiru.addEventListener("mousedown", function(e) {
  e.preventDefault();
  isDraggingBiru = true;
  startOffsetXBiru = e.clientX - kotakBiru.offsetLeft;
  startOffsetYBiru = e.clientY - kotakBiru.offsetTop;
});

document.addEventListener("mousemove", function(e) {
  if (isDraggingBiru) {
    var newX = e.clientX - startOffsetXBiru;
    var newY = e.clientY - startOffsetYBiru;
    kotakBiru.style.left = newX + "px";
    kotakBiru.style.top = newY + "px";

    // Send box position to Firebase Realtime Database - Kotak Biru
    database.ref().child("posisi_kotak_biru").set({
      left: newX,
      top: newY
    });
  }
});

document.addEventListener("mouseup", function() {
  isDraggingBiru = false;
});

// Event listener for touch movements on smartphones - Kotak Merah
kotakMerah.addEventListener("touchstart", function(e) {
  e.preventDefault();
  isDraggingMerah = true;
  startOffsetXMerah = e.touches[0].clientX - kotakMerah.offsetLeft;
  startOffsetYMerah = e.touches[0].clientY - kotakMerah.offsetTop;
});

document.addEventListener("touchmove", function(e) {
  if (isDraggingMerah) {
    var newX = e.touches[0].clientX - startOffsetXMerah;
    var newY = e.touches[0].clientY - startOffsetYMerah;
    kotakMerah.style.left = newX + "px";
    kotakMerah.style.top = newY + "px";

    // Send box position to Firebase Realtime Database - Kotak Merah
    database.ref().child("posisi_kotak_merah").set({
      left: newX,
      top: newY
    });
  }
});

document.addEventListener("touchend", function() {
  isDraggingMerah = false;
});

// Event listener for touch movements on smartphones - Kotak Biru
kotakBiru.addEventListener("touchstart", function(e) {
  e.preventDefault();
  isDraggingBiru = true;
  startOffsetXBiru = e.touches[0].clientX - kotakBiru.offsetLeft;
  startOffsetYBiru = e.touches[0].clientY - kotakBiru.offsetTop;
});

document.addEventListener("touchmove", function(e) {
  if (isDraggingBiru) {
    var newX = e.touches[0].clientX - startOffsetXBiru;
    var newY = e.touches[0].clientY - startOffsetYBiru;
    kotakBiru.style.left = newX + "px";
    kotakBiru.style.top = newY + "px";

    // Send box position to Firebase Realtime Database - Kotak Biru
    database.ref().child("posisi_kotak_biru").set({
      left: newX,
      top: newY
    });
  }
});

document.addEventListener("touchend", function() {
  isDraggingBiru = false;
});

// Retrieve box positions from Firebase Realtime Database
var posisiKotakMerahRef = database.ref("posisi_kotak_merah");
posisiKotakMerahRef.on("value", function(snapshot) {
  var posisiMerah = snapshot.val();
  if (posisiMerah) {
    kotakMerah.style.left = posisiMerah.left + "px";
    kotakMerah.style.top = posisiMerah.top + "px";
  }
});

var posisiKotakBiruRef = database.ref("posisi_kotak_biru");
posisiKotakBiruRef.on("value", function(snapshot) {
  var posisiBiru = snapshot.val();
  if (posisiBiru) {
    kotakBiru.style.left = posisiBiru.left + "px";
    kotakBiru.style.top = posisiBiru.top + "px";
  }
});
