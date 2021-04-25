/* Sent email */

let form = document.querySelector("#ajax-contact");

form.onsubmit = (e) => {
  e.preventDefault();

  let user_name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let message = document.querySelector("#message").value;
  let subject = document.querySelector("#subject").value;

  fetch("/send_email", {
    method: "POST",
    body: JSON.stringify({
      name: user_name,
      email: email,
      subject: subject,
      message: message,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then(() => {
      document.querySelector("#name").value = "";
      document.querySelector("#email").value = "";
      document.querySelector("#message").value = "";
      document.querySelector("#subject").value = "";

      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: true,
        positionClass: "toast-bottom-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };

      toastr["success"]("Message sent successfully! ");
    })
    .catch((e) => {
      console.log("error", e);
      toastr["error"]("Message could not be sent. Please try again.");
    });
};

/* Animation of color theme buttons */

const palette = document.querySelector("#action-button");
const buttonContainer = document.querySelector(".theme-button-container");
let themeButtons = document.querySelectorAll(".theme-button");

palette.onclick = () => {
  buttonContainer.classList.toggle("button-container-active");

  themeButtons.forEach((button, index) => {
    if (button.style.animation) {
      button.style.animation = "";
    } else {
      button.style.animation = `buttonsFade 0.5s ease forwards ${
        (index + 1) / 3
      }s`;
    }
  });
};

/* Switch themes */
let theme = localStorage.getItem("theme");

if (theme) {
  setTheme(theme);
} else {
  setTheme("lite-blue");
}

for (themeButton of themeButtons) {
  themeButton.onclick = (e) => {
    console.log(e.target.dataset.mode);
    let mode = e.target.dataset.mode;
    setTheme(mode);
  };
}

function setTheme(mode) {
  if (mode == "lite-blue") {
    document
      .querySelector("#switcher")
      .setAttribute(
        "href",
        "../static/css/css/theme-color/lite-blue-theme.css"
      );
  }
  if (mode == "dark-blue") {
    document
      .querySelector("#switcher")
      .setAttribute(
        "href",
        "../static/css/css/theme-color/dark-blue-theme.css"
      );
  }
  if (mode == "purple") {
    document
      .querySelector("#switcher")
      .setAttribute("href", "../static/css/css/theme-color/purple-theme.css");
  }
  localStorage.setItem("theme", mode);
}
