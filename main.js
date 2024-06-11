let menuIcon = document.querySelector('.header__menu');
let modalNavbarBackground = document.querySelector('.modal-navbar__background');
let closeModalNavbar = document.querySelector('.modal-navbar__close-icon');

menuIcon.addEventListener('click', () => {
  modalNavbarBackground.style.display = 'block';
});

closeModalNavbar.addEventListener('click', () => {
  modalNavbarBackground.style.display = 'none';
});

// Cambio de Cantidad de artículos ingresado por el Usuario
let minusBtn = document.querySelector('.input__minus');
let plusBtn = document.querySelector('.input__plus');
let userInput = document.querySelector('.input__number');
let userInputNumber = 0;

plusBtn.addEventListener('click', () => {
  userInputNumber++;
  userInput.value = userInputNumber;
});

minusBtn.addEventListener('click', () => {
  userInputNumber--;
  if (userInputNumber <= 0) {
    userInputNumber = 0;
  }
  userInput.value = userInputNumber;
});

// Agregar el total de productos cuando se presiona el botón Add to Cart

const addToCartBtn = document.querySelector('.details__button');
let cartNotification = document.querySelector('.header__cart--notification');
let lastValue = parseInt(cartNotification.innerText);
let priceModal = document.querySelector('.cart-modal__price');

addToCartBtn.addEventListener('click', () => {
  lastValue += userInputNumber;
  if (lastValue > 0) {
    cartNotification.innerText = lastValue;
    cartNotification.style.display = 'block';
    drawProductInModal();
    priceModal.innerHTML = `$25 x ${lastValue} <span class="cart-modal__span">$${
      lastValue * 25
    }.00</span>`;
  }
});

// Mostrar el modal cart cuando se presione el botón cart

const cartIconBtn = document.querySelector('.header__cart');
const cartModal = document.querySelector('.cart-modal');
const productContainer = document.querySelector(
  '.cart-modal__checkout-container'
);

cartIconBtn.addEventListener('click', () => {
  cartModal.classList.toggle('show');
  if (lastValue === 0) {
    productContainer.innerHTML =
      '<p class = "cart-empty" >Tú Cesta está Vacia.</p>';
  } else {
    drawProductInModal();
  }
});

// Vaciar Cart y Mostrar mensaje Vació

function deleteProduct() {
  const deleteProductBtn = document.querySelector('.cart-modal__delete');
  deleteProductBtn.addEventListener('click', () => {
    productContainer.innerHTML =
      '<p class = "cart-empty" >Tú Cesta está Vacia.</p>';
    lastValue = 0;
    cartNotification.innerText = lastValue;
    cartNotification.style.display = 'none';
  });
}

// Cambiar imágenes cuando se presione las flechas

const imageContainer = document.querySelector('.gallery__image-container');
const previousGalleryBtn = document.querySelector('.gallery__previous-icon');
const nextGalleryBtn = document.querySelector('.gallery__next-icon');
let imgIndex = 1;

nextGalleryBtn.addEventListener('click', () => {
  changeNextImage(imageContainer);
});

previousGalleryBtn.addEventListener('click', () => {
  ChangePreviousImage(imageContainer);
});

// Mostrar el Modal de imágenes al hacer click en imagen principal
const imageModal = document.querySelector('.modal-gallery__background');
const iconCloseModalBtn = document.querySelector('.modal-gallery__close');

imageContainer.addEventListener('click', () => {
  imageModal.style.display = 'grid';
});

iconCloseModalBtn.addEventListener('click', () => {
  imageModal.style.display = 'none';
});

// Cambiar las imágenes principales desde los thumbnails
let thumbnails = document.querySelectorAll('.gallery__thumbnail');
thumbnails = [...thumbnails];

let selectedThumbnail = null; // Variable para almacenar el thumbnail seleccionado

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener('click', (event) => {
    // console.log(event.target.id);

    const clickedThumbnail = event.target;

    // Si hay un thumbnail seleccionado y es igual al actual, no hacemos nada
    if (selectedThumbnail && selectedThumbnail === clickedThumbnail) {
      return;
    }
    // Cambiar la imagen principal
    imageContainer.style.backgroundImage = `url('../assets/images/thumbnail-image-product-${event.target.id}.png')`;
    // Agregar la clase 'opacity' al thumbnail actual
    clickedThumbnail.classList.add('opacity');
    // Si hay un thumbnail seleccionado, quitar la clase 'opacity'
    if (selectedThumbnail) {
      selectedThumbnail.classList.remove('opacity');
    }
    // Almacenar el thumbnail actual como seleccionado
    selectedThumbnail = clickedThumbnail;
  });
});
// Cambiar las imágenes principales desde los thumbnails en el Modal

const modalImageContainer = document.querySelector(
  '.modal-gallery__image-container'
);
let modalThumbnails = document.querySelectorAll('.modal-gallery__thumbnail');
modalThumbnails = [...modalThumbnails];

let selectedModalThumbnail = null; // Variable para almacenar el thumbnail seleccionado en el modal

modalThumbnails.forEach((modalThumbnail) => {
  modalThumbnail.addEventListener('click', (event) => {
    const clickedModalThumbnail = event.target;
    // Si hay un thumbnail seleccionado en el modal y es igual al actual, no hacemos nada
    if (
      selectedModalThumbnail &&
      selectedModalThumbnail === clickedModalThumbnail
    ) {
      return;
    }
    modalImageContainer.style.backgroundImage = `url('../assets/images/thumbnail-image-product-${event.target.id.slice(
      -1
    )}.png')`;

    // Agregar la clase 'opacity' al thumbnail actual en el modal
    clickedModalThumbnail.classList.add('opacity');

    // Si hay un thumbnail seleccionado en el modal, quitar la clase 'opacity'
    if (selectedModalThumbnail) {
      selectedModalThumbnail.classList.remove('opacity');
    }
    // Almacenar el thumbnail actual en el modal como seleccionado
    selectedModalThumbnail = clickedModalThumbnail;
  });
});

// Cambiar imagen principal de modal desde flechas en el Modal
const nextModalBtn = document.querySelector('.modal-gallery__previous-icon');
const previousModalBtn = document.querySelector('.modal-gallery__next-icon');

nextModalBtn.addEventListener('click', () => {
  changeNextImage(modalImageContainer);
});

previousModalBtn.addEventListener('click', () => {
  ChangePreviousImage(modalImageContainer);
});

// FUNCIONES

function drawProductInModal() {
  if (lastValue > 0) {
    productContainer.innerHTML = `
  <div class="cart-modal__details-container">
    <img class="cart-modal__image" src="/assets/images/thumbnail-image-product-${imgIndex}.png" alt="Camisa Hombre">
    <div>
      <p class="cart-modal__product">Camisa Formar Edición Limitada...</p>
      <p class="cart-modal__price">$25 x ${lastValue} <span class="cart-modal__span">$${
      lastValue * 25
    }.00</span>
    </div>
    <img class="cart-modal__delete" src="/assets/images/icon-delete.svg" alt="icon delete">
  </div>
  <button class="cart-modal__checkout">Comprar</button>`;
  }
  deleteProduct();
}

function changeNextImage(imgContainer) {
  if (imgIndex === 4) {
    imgIndex = 1;
  } else {
    imgIndex++;
  }
  imgContainer.style.backgroundImage = `url('../assets/images/image-product-${imgIndex}.png')`;
}

function ChangePreviousImage(imgContainer) {
  if (imgIndex === 1) {
    imgIndex = 4;
  } else {
    imgIndex--;
  }
  imgContainer.style.backgroundImage = `url('../assets/images/image-product-${imgIndex}.png')`;
}
