const form = document.querySelector("#form") as HTMLFormElement;
const inputName = document.querySelector("#name") as HTMLInputElement;
const inputEmail = document.querySelector("#email") as HTMLInputElement;
const inputPassword = document.querySelector("#password") as HTMLInputElement;
const message = document.querySelector("#message") as HTMLDivElement;
const buttonSend = document.querySelector("#send") as HTMLButtonElement;
const root = document.querySelector("#root") as HTMLDivElement;

const modalDiv :HTMLDivElement = document.createElement("div");
modalDiv.id = "modal-div";
modalDiv.style.display = "none"
root.appendChild(modalDiv);

form.addEventListener("submit", (e: Event):void =>{
    e.preventDefault()
});

inputName.addEventListener("keypress" , (event: Event):void =>{
    const regex :RegExp = /^[a-zA-Z\s]+$/;

    const keyboardEvent :KeyboardEvent = event as KeyboardEvent;

    const key :string  = keyboardEvent.key;

    if (!regex.test(key)){
        keyboardEvent.preventDefault();
    }

    if(inputName.value.length < 4){
        inputName.classList.add("wrong");
        return;
    }

    inputName.classList.remove("wrong");
})

inputName.addEventListener("paste", (event: ClipboardEvent): void =>{
    if(event.clipboardData){
        const pastedText = event.clipboardData.getData("text/plain");

        const regex :RegExp = /^[a-zA-Z\s]+$/;

        if(!regex.test(pastedText)) {
            event.preventDefault();
        }

        return;
    }    
})

inputEmail.addEventListener("input", ():void =>{
    const isValid :boolean = validateEmail(inputEmail.value);
    if(!isValid){
        inputEmail.classList.add("wrong")
        return;
    }

    inputEmail.classList.remove("wrong")
})

inputPassword.addEventListener("input", ():void =>{
    const isValid :boolean = validatePassword(inputPassword.value);
    if(!isValid){
        inputPassword.classList.add("wrong")
        return;
    }

    inputPassword.classList.remove("wrong")
})

buttonSend.addEventListener("click", ():void =>{
    const isValidEmail :boolean = validateEmail(inputEmail.value);
    const isValidPassword :boolean = validatePassword(inputPassword.value);

    if (inputName.value.length < 4){
        showMessage("O nome deve conter mais de 4 caracteres!", false);
        return;
    }
    
    if (!isValidEmail){
        showMessage("E-mail inválido", false);
        return;
    }

    if(inputPassword.value.length < 8){
        showMessage("A senha deve conter 8 ou mais caracteres", false);
        return;
    }

    if (!isValidPassword){
        showMessage("A senha deve conter pelo menos uma letra maíuscula e um número", false);
        return;
    }

    const modalContent :HTMLDivElement = document.createElement("div");
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

})

function validateEmail(email: string) :boolean {
    const regex :RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const result :boolean = regex.test(email);

    return result;
}

function validatePassword(password: string) :boolean{
    const regex :RegExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,}$/;

    const result :boolean = regex.test(password);

    return result;
}

function showMessage(message: string, success: boolean): void{
    const messageElement = document.querySelector("#message") as HTMLDivElement;
    messageElement.innerText = message;

    if(success){
        messageElement.style.backgroundColor = "#8AB661"
        messageElement.style.color = "var(--color-text)"
        messageElement.style.display = "block"
    } else {
        messageElement.style.backgroundColor = "tomato";
        messageElement.style.color = "var(--color-background)"
        messageElement.style.display = "block"
    }

    setTimeout(():void =>{
        messageElement.innerText = "";
        messageElement.style.display = "none"
    }, 3000)


}

