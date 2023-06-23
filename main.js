var kotakMerah = document.getElementById("kotak-merah");
var kotakBiru = document.getElementById("kotak-biru");
var isDraggingMerah = false;
var isDraggingBiru = false;
var startOffsetXMerah, startOffsetYMerah;
var startOffsetXBiru, startOffsetYBiru;
var border = document.getElementById("border");
var borderRect = border.getBoundingClientRect();
var toggleButton = document.getElementById("toggle-button");
var currentColor = "black";
var toggleRef = database.ref("toggle_button");

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

// Membuat button toggle dengan bentuk lingkaran di tengah
var toggleButton = document.createElement("button");
toggleButton.classList.add("toggle-button");
toggleButton.style.position = "absolute";
toggleButton.style.top = "50%";
toggleButton.style.left = "50%";
toggleButton.style.transform = "translate(-50%, -50%)";
toggleButton.style.width = "60px";
toggleButton.style.height = "60px";
toggleButton.style.borderRadius = "50%";
toggleButton.style.backgroundColor = "black";
toggleButton.style.border = "none";
toggleButton.style.outline = "none";
toggleButton.style.cursor = "pointer";

document.body.appendChild(toggleButton);

// Memasang listener pada tombol toggle
toggleButton.addEventListener("click", toggleButtonClicked);

// Menerima perubahan nilai pada Firebase Realtime Database
toggleRef.on("value", function(snapshot) {
  var value = snapshot.val();
  if (value === "on") {
    toggleButton.style.backgroundColor = "green";
  } else if (value === "off") {
    toggleButton.style.backgroundColor = "red";
  }
});

// Fungsi untuk membalikkan nilai tombol toggle
function toggleButtonClicked() {
  if (currentColor === "black") {
    toggleRef.set("on");
  } else if (currentColor === "green") {
    toggleRef.set("off");
  } else if (currentColor === "red") {
    toggleRef.set("on");
  }
}

// Mengubah warna tombol toggle saat ditekan
toggleButton.addEventListener("mousedown", function() {
  if (currentColor === "black") {
    toggleButton.style.backgroundColor = "green";
    currentColor = "green";
  } else if (currentColor === "green") {
    toggleButton.style.backgroundColor = "red";
    currentColor = "red";
  } else if (currentColor === "red") {
    toggleButton.style.backgroundColor = "blue";
    currentColor = "blue";
  } else if (currentColor === "blue") {
    toggleButton.style.backgroundColor = "black";
    currentColor = "black";
  }
});

// Mengubah warna tombol toggle saat dilepas
toggleButton.addEventListener("mouseup", function() {
  if (currentColor === "black") {
    toggleButton.style.backgroundColor = "black";
    currentColor = "black";
  }
});

// Mengubah warna tombol toggle saat disentuh pada perangkat mobile
toggleButton.addEventListener("touchstart", function() {
  if (currentColor === "black") {
    toggleButton.style.backgroundColor = "green";
    currentColor = "green";
  } else if (currentColor === "green") {
    toggleButton.style.backgroundColor = "red";
    currentColor = "red";
  } else if (currentColor === "red") {
    toggleButton.style.backgroundColor = "blue";
    currentColor = "blue";
  } else if (currentColor === "blue") {
    toggleButton.style.backgroundColor = "black";
    currentColor = "black";
  }
});

// Mengubah warna tombol toggle saat sentuhan diangkat pada perangkat mobile
toggleButton.addEventListener("touchend", function() {
  if (currentColor === "black") {
    toggleButton.style.backgroundColor = "black";
    currentColor = "black";
  }
});
