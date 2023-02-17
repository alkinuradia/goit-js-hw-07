import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");

function createGallaryMarkup(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
  <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </div>
        `;
    })
    .join("");
}

const Markup = createGallaryMarkup(galleryItems);

gallery.insertAdjacentHTML("beforeend", Markup);
gallery.addEventListener("click", onGalleryClick);

function onGalleryClick(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }

  event.preventDefault();

  const closeModal = (event) => {
    const Escape = "Escape";

    if (event.code === Escape) {
      instance.close();
    }
  };

  const instance = basicLightbox.create(
    `
      <img src="${event.target.dataset.source}" width="800" height="600">
    `,
    {
      onShow: () => {
        window.addEventListener("keydown", closeModal);
      },

      onclose: () => {
        window.removeEventListener("keydown", closeModal);
      },
    }
  );
  instance.show();
}

console.log(galleryItems);