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
      // Mostrar alerta de confirmación
      Swal.fire({
        title: "Do you want to upload this image?",
        text: "You can cancel if you don't want to upload this image.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Upload",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          var reader = new FileReader();

          reader.onload = function (e) {
            var newImageSrc = e.target.result;

            // Actualizar la imagen en el modal
            modalImage.setAttribute("src", newImageSrc);

            // Obtener la imagen principal que se va a reemplazar
            var currentImageSrc = modalImage.getAttribute("data-current-image");
            var galleryItem = document.querySelector(
              `img[src="${currentImageSrc}"]`
            );

            if (galleryItem) {
              // Reemplazar la imagen principal con la nueva imagen
              galleryItem.setAttribute("src", newImageSrc);

              // Guardar la nueva imagen en localStorage
              localStorage.setItem(currentImageSrc, newImageSrc);

              Swal.fire("Uploaded!", "The image has been updated.", "success");
            }
          };

          reader.readAsDataURL(file); // Leer la imagen como Data URL
        } else {
          Swal.fire("Cancelled", "The image was not uploaded.", "info");
        }
      });
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

document.addEventListener("DOMContentLoaded", function () {
  var galleryContainer = document.getElementById("imageGallery");
  var modalImage = document.getElementById("modalImage");
  var uploadModalInput = document.getElementById("uploadModalImage");
  var uploadModalBtn = document.getElementById("uploadModalBtn");
  var uploadNavBtn = document.getElementById("uploadNavBtn");
  var uploadNavInput = document.createElement("input");

  // Configuración del input para subir imágenes desde el navbar
  uploadNavInput.type = "file";
  uploadNavInput.accept = "image/*";
  uploadNavInput.style.display = "none";
  document.body.appendChild(uploadNavInput);

  // Función para mostrar la imagen en el modal
  function showImageInModal(src) {
    modalImage.setAttribute("src", src);
    modalImage.setAttribute("data-current-image", src);
  }

  // Función para añadir una imagen a la galería
  function addImageToGallery(imageSrc) {
    var newImageDiv = document.createElement("div");
    newImageDiv.classList.add("col", "col-sm-12", "col-md-6", "col-lg-3");

    newImageDiv.innerHTML = `
      <div class="alert cell link-opacity-25-hover col-lg-auto col-md-auto col-sm-auto">
        <img class="imagenes" src="${imageSrc}" alt="Imagen" data-bs-toggle="modal" data-bs-target="#myModal" />
      </div>
    `;

    galleryContainer.appendChild(newImageDiv);

    // Añadir evento para que la nueva imagen abra el modal
    newImageDiv
      .querySelector(".imagenes")
      .addEventListener("click", function () {
        showImageInModal(imageSrc);
      });
  }

  // Mostrar la imagen en el modal al hacer clic en una imagen de la galería
  galleryContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("imagenes")) {
      var src = event.target.getAttribute("src");
      showImageInModal(src);
    }
  });

  // Manejar la carga de la nueva imagen desde el navbar
  uploadNavBtn.addEventListener("click", function () {
    uploadNavInput.click(); // Simular clic en el input de archivo del navbar
  });

  uploadNavInput.addEventListener("change", function () {
    var file = this.files[0];

    if (file) {
      // Mostrar alerta de confirmación
      Swal.fire({
        title: "Do you want to upload this image?",
        text: "You can cancel if you don't want to upload this image.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Upload",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          var reader = new FileReader();

          reader.onload = function (e) {
            var newImageSrc = e.target.result;

            // Añadir la nueva imagen a la galería
            addImageToGallery(newImageSrc);

            // Guardar la nueva imagen en localStorage
            var images = JSON.parse(localStorage.getItem("images")) || [];
            images.push(newImageSrc);
            localStorage.setItem("images", JSON.stringify(images));

            Swal.fire(
              "Uploaded!",
              "The image has been added to the gallery.",
              "success"
            );
          };

          reader.readAsDataURL(file); // Leer la imagen como Data URL
        } else {
          Swal.fire("Cancelled", "The image was not uploaded.", "info");
        }
      });
    }
  });

  // Manejar la carga de la nueva imagen desde el modal
  uploadModalBtn.addEventListener("click", function () {
    uploadModalInput.click(); // Simular clic en el input de archivo del modal
  });

  uploadModalInput.addEventListener("change", function () {
    var file = this.files[0];

    if (file) {
      // Mostrar alerta de confirmación
      Swal.fire({
        title: "Do you want to upload this image?",
        text: "You can cancel if you don't want to upload this image.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Upload",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          var reader = new FileReader();

          reader.onload = function (e) {
            var newImageSrc = e.target.result;

            // Obtener la imagen principal que se va a reemplazar
            var currentImageSrc = modalImage.getAttribute("data-current-image");
            var galleryItem = document.querySelector(
              `img[src="${currentImageSrc}"]`
            );

            if (galleryItem) {
              // Reemplazar la imagen principal con la nueva imagen
              galleryItem.setAttribute("src", newImageSrc);

              // Guardar la nueva imagen en localStorage
              localStorage.setItem(currentImageSrc, newImageSrc);

              Swal.fire("Updated!", "The image has been updated.", "success");
            }
          };

          reader.readAsDataURL(file); // Leer la imagen como Data URL
        } else {
          Swal.fire("Cancelled", "The image was not uploaded.", "info");
        }
      });
    }
  });

  // Al cargar la página, verificar si hay imágenes guardadas en localStorage
  var storedImages = JSON.parse(localStorage.getItem("images")) || [];
  storedImages.forEach(function (imageSrc) {
    addImageToGallery(imageSrc);
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
