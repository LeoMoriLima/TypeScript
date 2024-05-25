"use strict";
const form = document.querySelector("#form");
const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const message = document.querySelector("#message");
const buttonSend = document.querySelector("#send");
const root = document.querySelector("#root");
const modalDiv = document.createElement("div");
modalDiv.id = "modal-div";
modalDiv.style.display = "none";
root.appendChild(modalDiv);
form.addEventListener("submit", (e) => {
    e.preventDefault();
});
inputName.addEventListener("keypress", (event) => {
    const regex = /^[a-zA-Z\s]+$/;
    const keyboardEvent = event;
    const key = keyboardEvent.key;
    if (!regex.test(key)) {
        keyboardEvent.preventDefault();
    }
    if (inputName.value.length < 4) {
        inputName.classList.add("wrong");
        return;
    }
    inputName.classList.remove("wrong");
});
inputName.addEventListener("paste", (event) => {
    if (event.clipboardData) {
        const pastedText = event.clipboardData.getData("text/plain");
        const regex = /^[a-zA-Z\s]+$/;
        if (!regex.test(pastedText)) {
            event.preventDefault();
        }
        return;
    }
});
inputEmail.addEventListener("input", () => {
    const isValid = validateEmail(inputEmail.value);
    if (!isValid) {
        inputEmail.classList.add("wrong");
        return;
    }
    inputEmail.classList.remove("wrong");
});
inputPassword.addEventListener("input", () => {
    const isValid = validatePassword(inputPassword.value);
    if (!isValid) {
        inputPassword.classList.add("wrong");
        return;
    }
    inputPassword.classList.remove("wrong");
});
buttonSend.addEventListener("click", () => {
    const isValidEmail = validateEmail(inputEmail.value);
    const isValidPassword = validatePassword(inputPassword.value);
    if (inputName.value.length < 4) {
        showMessage("O nome deve conter mais de 4 caracteres!", false);
        return;
    }
    if (!isValidEmail) {
        showMessage("E-mail inválido", false);
        return;
    }
    if (inputPassword.value.length < 8) {
        showMessage("A senha deve conter 8 ou mais caracteres", false);
        return;
    }
    if (!isValidPassword) {
        showMessage("A senha deve conter pelo menos uma letra maíuscula e um número", false);
        return;
    }
    const modalContent = document.createElement("div");
    modalContent.id = "modal-content-div";
    modalContent.style.display = "flex";
    modalDiv.appendChild(modalContent);
    modalDiv.style.display = "flex";
    modalContent.innerText = "Usuário cadastrado com sucesso!";
    setTimeout(() => {
        modalDiv.style.display = "none";
        modalContent.remove();
        inputName.value = "";
        inputEmail.value = "";
        inputPassword.value = "";
    }, 3000);
});
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = regex.test(email);
    return result;
}
function validatePassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,}$/;
    const result = regex.test(password);
    return result;
}
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
