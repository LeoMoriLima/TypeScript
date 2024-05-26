"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const root = document.querySelector("#root");
const inputDiv = document.querySelector("#div-input");
const input = document.querySelector("#number-input");
const buttonSend = document.querySelector("#send");
const buttonClear = document.querySelector("#clear");
const galleryDiv = document.querySelector("#gallery");
let arrayGallery = [];
const divModal = document.createElement("div");
divModal.style.display = "none";
divModal.id = "div-modal";
root.appendChild(divModal);
buttonSend.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const value = Number(input.value);
    buttonSend.classList.add("disabled");
    buttonClear.classList.add("disabled-red");
    buttonSend.disabled = true;
    buttonClear.disabled = true;
    galleryDiv.innerHTML = "";
    if (value === 0) {
        showMessage("O valor do input não pode ser zero", false);
        buttonSend.disabled = false;
        buttonClear.disabled = false;
        buttonSend.classList.remove("disabled");
        buttonClear.classList.remove("disabled-red");
        return;
    }
    if (value < 0) {
        showMessage("O valor do input não pode ser menor do que zero", false);
        buttonSend.disabled = false;
        buttonClear.disabled = false;
        buttonSend.classList.remove("disabled");
        buttonClear.classList.remove("disabled-red");
        return;
    }
    if (value > 100) {
        showMessage("O valor do input não pode ser maior do que cem", false);
        buttonSend.disabled = false;
        buttonClear.disabled = false;
        buttonSend.classList.remove("disabled");
        buttonClear.classList.remove("disabled-red");
        return;
    }
    try {
        const response = yield fetch(`https://api.thedogapi.com/v1/images/search?limit=${value}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                'x-api-key': 'API_KEY'
            }
        });
        if (!response.ok) {
            throw new Error("Erro while making the request: " + response.status);
        }
        const data = yield response.json();
        input.value = "";
        buttonSend.classList.remove("disabled");
        buttonClear.classList.remove("disabled-red");
        buttonSend.disabled = false;
        buttonClear.disabled = false;
        arrayGallery = [];
        data.forEach((dog) => {
            arrayGallery.push(dog.url);
        });
        const imageDiv = document.createElement("div");
        imageDiv.id = "images";
        galleryDiv.appendChild(imageDiv);
        if (value > 10) {
            let count = 0;
            displayImage(count);
            let pageCount = 1;
            const page = document.createElement("p");
            page.classList.add("page-index");
            page.innerText = String(pageCount);
            const buttonPlus = document.createElement("button");
            buttonPlus.innerText = ">";
            buttonPlus.classList.add("button-page");
            buttonPlus.addEventListener("click", () => {
                if (count + 10 < arrayGallery.length) {
                    count += 10;
                    displayImage(count);
                    pageCount += 1;
                    page.innerText = String(pageCount);
                }
                buttonPlus.disabled = (count + 10 >= arrayGallery.length);
                buttonMinus.disabled = false;
                buttonMinus.classList.remove("disabled");
                if (buttonPlus.disabled) {
                    buttonPlus.classList.add("disabled");
                }
                else {
                    buttonPlus.classList.remove("disabled");
                }
            });
            const buttonMinus = document.createElement("button");
            buttonMinus.innerText = "<";
            buttonMinus.classList.add("button-page");
            buttonMinus.addEventListener("click", () => {
                if (count - 10 >= 0) {
                    count -= 10;
                    displayImage(count);
                    pageCount -= 1;
                    page.innerText = String(pageCount);
                }
                buttonMinus.disabled = (count === 0);
                buttonPlus.disabled = false;
                buttonPlus.classList.remove("disabled");
                if (buttonMinus.disabled) {
                    buttonMinus.classList.add("disabled");
                }
                else {
                    buttonMinus.classList.remove("disabled");
                }
            });
            const divButtonControl = document.createElement("div");
            divButtonControl.id = "div-button-control";
            galleryDiv.appendChild(divButtonControl);
            divButtonControl.appendChild(buttonMinus);
            divButtonControl.appendChild(page);
            divButtonControl.appendChild(buttonPlus);
            buttonMinus.disabled = true;
            buttonMinus.classList.add("disabled");
            buttonPlus.disabled = (count + 10 >= arrayGallery.length);
        }
        else {
            arrayGallery.forEach((image) => {
                contentCreator(image);
            });
        }
    }
    catch (err) {
        console.error("Erro ao fazer requisição:" + err);
    }
}));
buttonClear.addEventListener("click", () => {
    galleryDiv.innerHTML = "";
    arrayGallery = [];
    input.value = "";
});
function showMessage(message, success) {
    const messageElement = document.querySelector("#message");
    messageElement.innerText = message;
    if (success) {
        messageElement.style.backgroundColor = "#8AB661";
        messageElement.style.color = "var(--color-text)";
        messageElement.style.display = "block";
    }
    else {
        messageElement.style.backgroundColor = "tomato";
        messageElement.style.color = "var(--color-background)";
        messageElement.style.display = "block";
    }
    setTimeout(() => {
        messageElement.innerText = "";
        messageElement.style.display = "none";
    }, 3000);
}
function contentCreator(content) {
    const img = document.createElement("img");
    img.classList.add('gallery-image');
    img.src = content;
    const imageDiv = document.querySelector("#images");
    imageDiv.appendChild(img);
    img.addEventListener("click", () => {
        divModal.style.display = "flex";
        const divModalContent = document.createElement("div");
        divModalContent.id = "div-modal-content";
        divModal.appendChild(divModalContent);
        const imgDiv = document.createElement("img");
        imgDiv.classList.add("image-modal");
        imgDiv.src = content;
        divModalContent.appendChild(imgDiv);
        divModal.addEventListener("click", () => {
            divModal.style.display = "none";
            divModalContent.remove();
        });
        divModalContent.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    });
}
function displayImage(startIndex) {
    const imageDiv = document.querySelector("#images");
    imageDiv.innerHTML = '';
    let endIndex = startIndex + 10;
    if (startIndex < 0) {
        startIndex = 0;
    }
    if (endIndex > arrayGallery.length) {
        endIndex = arrayGallery.length;
    }
    if (startIndex >= arrayGallery.length) {
        startIndex = Math.max(0, arrayGallery.length - 10);
    }
    arrayGallery.slice(startIndex, endIndex).forEach((image) => {
        contentCreator(image);
    });
}
