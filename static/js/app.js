$(function () {
  // Get the form.
  var form = $("#ajax-contact");

  // Get the messages div.
  var formMessages = $("#form-messages");

  // Set up an event listener for the contact form.
  $(form).submit(function (e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    var formData = $(form).serialize();

    // Submit the form using AJAX.
    $.ajax({
      type: "POST",
      url: $(form).attr("action"),
      data: formData,
    })
      .done(function (response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass("error");
        $(formMessages).addClass("success");

        // Set the message text.
        $(formMessages).text(response);

        // Clear the form.
        $("#name").val("");
        $("#email").val("");
        $("#subject").val("");
        $("#message").val("");
      })
      .fail(function (data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass("success");
        $(formMessages).addClass("error");

        // Set the message text.
        if (data.responseText !== "") {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text(
            "Oops! An error occured and your message could not be sent."
          );
        }
      });
  });
});

/* Animation of color theme buttons */

const palette = document.querySelector("#action-button");
const buttonContainer = document.querySelector(".theme-button-container");
const themeButtons = document.querySelectorAll(".theme-button");

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

theme = document.querySelector("#switcher");
liteBlue = document.querySelector("#lite-blue");
purple = document.querySelector("#purple");
darkBlue = document.querySelector("#dark-blue");

liteBlue.onclick = (e) => {
  theme.setAttribute(
    "href",
    "../static/css/css/theme-color/lite-blue-theme.css"
  );
  console.log(e);
};

purple.onclick = (e) => {
  theme.setAttribute("href", "../static/css/css/theme-color/purple-theme.css");
  console.log(e);
};

darkBlue.onclick = (e) => {
  theme.setAttribute(
    "href",
    "../static/css/css/theme-color/dark-blue-theme.css"
  );
  console.log(e);
};
