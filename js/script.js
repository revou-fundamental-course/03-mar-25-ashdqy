// Script JS

// Hi, User!
let name = prompt("Hello! What's your name?", "") || "Guest";
document.getElementById("home-nama").innerHTML = name;

// Home Slide
var slideIndex = 0;
showDivs();

function showDivs() {
  var i;
  var x = document.getElementsByClassName("home-slide-photo");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {
    slideIndex = 1;
  }
  x[slideIndex - 1].style.display = "block";
  setTimeout(showDivs, 3000);
}

// Output Message
function displayData() {
  event.preventDefault();

  // Get input values
  let nama = document.getElementById("input-nama").value.trim();
  let tglLahir = document.getElementById("input-tgl-lahir").value.trim();
  let jenisKelamin = document.querySelector(
    'input[name="jenis-kelamin"]:checked'
  );
  let pesan = document.getElementById("textarea-pesan").value.trim();

  // Default messages for empty fields
  let defaultMessage = "Not Filled Yet";
  let defaultClass = "not-filled";

  // Current Time
  let currentDate = new Date();
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZoneName: "short",
  };
  let formattedDate = currentDate.toLocaleString("en-US", options);

  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  let day = currentDate.getDate();
  let daySuffix = getDaySuffix(day);
  formattedDate = formattedDate.replace(/\d+/, day + daySuffix);

  // GMT inside parentheses
  formattedDate = formattedDate.replace(/GMT.*/, (match) => `(${match})`);

  // Date of Birth Formatting
  let formattedTglLahir = defaultMessage;
  if (tglLahir) {
    let tgl = new Date(tglLahir);
    let day = String(tgl.getDate()).padStart(2, "0");
    let month = String(tgl.getMonth() + 1).padStart(2, "0");
    let year = tgl.getFullYear();
    formattedTglLahir = `${day}/${month}/${year}`;
  }

  // Gender
  let jenisKelaminValue = jenisKelamin ? jenisKelamin.value : defaultMessage;

  // Display Output
  function setOutputText(elementId, value) {
    let element = document.getElementById(elementId);
    element.innerText = value;

    if (value === "Not Filled Yet") {
      element.classList.add("not-filled");
    } else {
      element.classList.remove("not-filled");
    }
  }

  document.getElementById("currentTime").innerText = formattedDate;
  setOutputText("outputLabelNama", nama || defaultMessage);
  setOutputText("outputLabelTglLahir", formattedTglLahir);
  setOutputText("outputLabelJnsKelamin", jenisKelaminValue);
  setOutputText("outputLabelPesan", pesan || defaultMessage);

  // Output Box
  document.getElementById("output").style.display = "flex";
}
