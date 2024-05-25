const root = document.querySelector("#root") as HTMLDivElement;
const inputDiv = document.querySelector("#div-input") as HTMLDivElement;
const input = document.querySelector("#number-input") as HTMLInputElement;
const buttonSend = document.querySelector("#send") as HTMLButtonElement;
const buttonClear = document.querySelector("#clear") as HTMLButtonElement;
const galleryDiv = document.querySelector("#gallery") as HTMLDivElement;
let arrayGallery: string[] = [];

interface DogImage{
    url: string;
}

const divModal :HTMLDivElement = document.createElement("div");
divModal.style.display = "none";
divModal.id = "div-modal";
root.appendChild(divModal);

buttonSend.addEventListener("click", async (): Promise<void> => {
    const value :number = Number(input.value);
    buttonSend.classList.add("disabled");
    buttonClear.classList.add("disabled-red");
    buttonSend.disabled = true;
    buttonClear.disabled = true;
    galleryDiv.innerHTML = "";
    
    if (value === 0) {
        showMessage("O valor do input não pode ser zero", false);
        buttonSend.disabled = false
        buttonClear.disabled = false;
        buttonSend.classList.remove("disabled");
        buttonClear.classList.remove("disabled-red");
        return;
    }

    if (value < 0) {
        showMessage("O valor do input não pode ser menor do que zero", false);
        buttonSend.disabled = false
        buttonClear.disabled = false;
        buttonSend.classList.remove("disabled");
        buttonClear.classList.remove("disabled-red");
        return;
    }

    if (value > 100) {
        showMessage("O valor do input não pode ser maior do que cem", false);
        buttonSend.disabled = false
        buttonClear.disabled = false;
        buttonSend.classList.remove("disabled");
        buttonClear.classList.remove("disabled-red");
        return;
    }

    try{
        const response: Response = await fetch(`https://api.thedogapi.com/v1/images/search?limit=${value}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            'x-api-key': 'live_P62b5vGPYMogVR2PwmrdmmMHl71WnOdzpOUcy4fKn94f2cD58EJ9247iW5UySb6R'
        }
    });
    if (!response.ok){
        throw new Error("Erro while making the request: " + response.status);
    }

    const data: DogImage[] = await response.json();
    input.value = "";
    buttonSend.classList.remove("disabled");
    buttonClear.classList.remove("disabled-red");
    buttonSend.disabled = false;
    buttonClear.disabled = false;

    arrayGallery = [];
    data.forEach((dog: { url: string }) => {
        arrayGallery.push(dog.url);
    });

    const imageDiv :HTMLDivElement = document.createElement("div");
    imageDiv.id = "images";
    galleryDiv.appendChild(imageDiv);

    if (value > 10) {
        let count :number = 0;
        displayImage(count);

        let pageCount :number = 1;
        const page :HTMLParagraphElement = document.createElement("p");
        page.classList.add("page-index");
        page.innerText = String(pageCount);

        const buttonPlus :HTMLButtonElement = document.createElement("button");
        buttonPlus.innerText = ">";
        buttonPlus.classList.add("button-page");
        buttonPlus.addEventListener("click", (): void => {
            if (count + 10 < arrayGallery.length) {
                count += 10;
                displayImage(count);
                pageCount += 1;
                page.innerText = String(pageCount);
            }
            buttonPlus.disabled = (count + 10 >= arrayGallery.length);
            buttonMinus.disabled = false;
            buttonMinus.classList.remove("disabled")

            if(buttonPlus.disabled){
                buttonPlus.classList.add("disabled");
            } else {
                buttonPlus.classList.remove("disabled");
            }
        });

        const buttonMinus :HTMLButtonElement = document.createElement("button");
        buttonMinus.innerText = "<";
        buttonMinus.classList.add("button-page");
        buttonMinus.addEventListener("click", (): void => {
            if (count - 10 >= 0) {
                count -= 10;
                displayImage(count);
                pageCount -= 1;
                page.innerText = String(pageCount);
            }
            buttonMinus.disabled = (count === 0);
            buttonPlus.disabled = false;
            buttonPlus.classList.remove("disabled");

            if(buttonMinus.disabled){
                buttonMinus.classList.add("disabled");
            } else {
                buttonMinus.classList.remove("disabled");
            }
        });

        const divButtonControl :HTMLDivElement = document.createElement("div");
        divButtonControl.id = "div-button-control";
        galleryDiv.appendChild(divButtonControl);

        divButtonControl.appendChild(buttonMinus);
        divButtonControl.appendChild(page);
        divButtonControl.appendChild(buttonPlus);

        buttonMinus.disabled = true;
        buttonMinus.classList.add("disabled")
        buttonPlus.disabled = (count + 10 >= arrayGallery.length);
        
    } else {
        arrayGallery.forEach((image: string): void => {
            contentCreator(image);
        });
    }
    } catch(err: any) {
        console.error("Erro ao fazer requisição:" + err)
    }    
});

buttonClear.addEventListener("click", (): void => {
    galleryDiv.innerHTML = "";
    arrayGallery = [];
    input.value = "";
});

function showMessage(message: string, success: boolean): void {
    const messageElement = document.querySelector("#message") as HTMLDivElement;
    messageElement.innerText = message;

    if (success) {
        messageElement.style.backgroundColor = "#8AB661";
        messageElement.style.color = "var(--color-text)";
        messageElement.style.display = "block";
    } else {
        messageElement.style.backgroundColor = "tomato";
        messageElement.style.color = "var(--color-background)";
        messageElement.style.display = "block";
    }

    setTimeout((): void => {
        messageElement.innerText = "";
        messageElement.style.display = "none";
    }, 3000);
}

function contentCreator(content: string): void {
    const img = document.createElement("img");
    img.classList.add('gallery-image');
    img.src = content;
    const imageDiv = document.querySelector("#images") as HTMLDivElement;
    imageDiv.appendChild(img);

    img.addEventListener("click", ():void =>{
        divModal.style.display = "flex";

        const divModalContent :HTMLDivElement = document.createElement("div");
        divModalContent.id =  "div-modal-content";
        divModal.appendChild(divModalContent);

        const imgDiv :HTMLImageElement = document.createElement("img");
        imgDiv.classList.add("image-modal");
        imgDiv.src = content;
        divModalContent.appendChild(imgDiv)

        divModal.addEventListener("click", ():void => {
            divModal.style.display = "none";
            divModalContent.remove();
        })

        divModalContent.addEventListener("click", (event: Event):void =>{
            event.stopPropagation();
        })
    })
}

function displayImage(startIndex: number): void {
    const imageDiv = document.querySelector("#images") as HTMLDivElement;
    imageDiv.innerHTML = '';

    let endIndex: number = startIndex + 10;

    if (startIndex < 0) {
        startIndex = 0;
    }

    if (endIndex > arrayGallery.length) {
        endIndex = arrayGallery.length;
    }

    if (startIndex >= arrayGallery.length) {
        startIndex = Math.max(0, arrayGallery.length - 10);
    }

    arrayGallery.slice(startIndex, endIndex).forEach((image): void => {
        contentCreator(image);
    });
}
