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
