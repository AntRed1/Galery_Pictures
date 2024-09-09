document.addEventListener("DOMContentLoaded", function () {
  var galleryItems = document.querySelectorAll(".imagenes");
  var modalImage = document.getElementById("modalImage");

  galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {
      var src = item.getAttribute("src");
      modalImage.setAttribute("src", src);
    });
  });
});

/* Control para el Switch del DarkMode and LightMode */
document.addEventListener("DOMContentLoaded", (event) => {
  const htmlElement = document.documentElement;
  const switchElement = document.getElementById("darkModeSwitch");

  // Set the default theme to dark if no setting is found in local storage
  const currentTheme = localStorage.getItem("bsTheme") || "dark";
  htmlElement.setAttribute("data-bs-theme", currentTheme);
  switchElement.checked = currentTheme === "dark";

  switchElement.addEventListener("change", function () {
    if (this.checked) {
      htmlElement.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("bsTheme", "dark");
    } else {
      htmlElement.setAttribute("data-bs-theme", "light");
      localStorage.setItem("bsTheme", "light");
    }
  });
});
