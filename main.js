var kotak = document.getElementById("kotak");
var isDragging = false;
var startOffsetX, startOffsetY;

// Event listener for mouse movements on laptops/desktops
kotak.addEventListener("mousedown", function(e) {
  e.preventDefault();
  isDragging = true;
  startOffsetX = e.clientX - kotak.offsetLeft;
  startOffsetY = e.clientY - kotak.offsetTop;
});

document.addEventListener("mousemove", function(e) {
  if (isDragging) {
    var newX = e.clientX - startOffsetX;
    var newY = e.clientY - startOffsetY;
    kotak.style.left = newX + "px";
    kotak.style.top = newY + "px";

    // Send box position to Firebase Realtime Database
    database.ref().child("posisi_kotak").set({
      left: newX,
      top: newY
    });
  }
});

document.addEventListener("mouseup", function() {
  isDragging = false;
});

// Event listener for touch movements on smartphones
kotak.addEventListener("touchstart", function(e) {
  e.preventDefault();
  isDragging = true;
  startOffsetX = e.touches[0].clientX - kotak.offsetLeft;
  startOffsetY = e.touches[0].clientY - kotak.offsetTop;
});

document.addEventListener("touchmove", function(e) {
  if (isDragging) {
    var newX = e.touches[0].clientX - startOffsetX;
    var newY = e.touches[0].clientY - startOffsetY;
    kotak.style.left = newX + "px";
    kotak.style.top = newY + "px";

    // Send box position to Firebase Realtime Database
    database.ref().child("posisi_kotak").set({
      left: newX,
      top: newY
    });
  }
});

document.addEventListener("touchend", function() {
  isDragging = false;
});

// Retrieve box position from Firebase Realtime Database
var posisiRef = database.ref("posisi_kotak");
posisiRef.on("value", function(snapshot) {
  var posisi = snapshot.val();
  if (posisi) {
    kotak.style.left = posisi.left + "px";
    kotak.style.top = posisi.top + "px";
  }
});
