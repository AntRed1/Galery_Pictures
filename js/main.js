document.addEventListener("DOMContentLoaded", function () {
  var galleryItems = document.querySelectorAll(".imagenes");
  var modalImage = document.getElementById("modalImage");
  var uploadInput = document.getElementById("uploadImage");
  var uploadBtn = document.getElementById("uploadBtn");

  // Mostrar la imagen en el modal al hacer clic en una imagen de la galería
  galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {
      var src = item.getAttribute("src");
      modalImage.setAttribute("src", src);

      // Guardar el elemento de imagen actual que fue clicado
      modalImage.setAttribute("data-current-image", item.getAttribute("src"));
    });
  });

  // Cargar nueva imagen desde el input file
  uploadBtn.addEventListener("click", function () {
    uploadInput.click(); // Simular clic en el input de archivo
  });

  // Manejar la carga de la nueva imagen
  uploadInput.addEventListener("change", function () {
    var file = this.files[0];

    if (file) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var newImageSrc = e.target.result;

        // Actualizar la imagen en el modal
        modalImage.setAttribute("src", newImageSrc);

        // Obtener la imagen principal que se va a reemplazar
        var currentImageSrc = modalImage.getAttribute("data-current-image");
        var galleryItem = document.querySelector(`img[src="${currentImageSrc}"]`);

        if (galleryItem) {
          // Reemplazar la imagen principal con la nueva imagen
          galleryItem.setAttribute("src", newImageSrc);

          // Guardar la nueva imagen en localStorage
          localStorage.setItem(currentImageSrc, newImageSrc);
        }
      };

      reader.readAsDataURL(file); // Leer la imagen como Data URL
    }
  });

  // Al cargar la página, verificar si hay imágenes guardadas en localStorage
  galleryItems.forEach(function (item) {
    var storedImage = localStorage.getItem(item.getAttribute("src"));

    if (storedImage) {
      // Reemplazar la imagen por la guardada en localStorage
      item.setAttribute("src", storedImage);
    }
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
