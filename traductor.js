const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
selectTag = document.querySelectorAll("select"),
exchangeIcon = document.querySelector(".exchange")
translateBtn = document.querySelector("button");
icons = document.querySelectorAll(".row i")


selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        // Seleccionamos el Ingles como pordefecto de igual manera el español
        let selected;

        if(id == 0 && country_code == "en-GB") {
            selected = "selected";
        }

        else if(id == 1 && country_code == "es-ES") {
            selected = "selected";
        }

        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`; 
        tag.insertAdjacentHTML("beforeend", option); // Añadimos la opcion de los demas idiomas
    }
});

exchangeIcon.addEventListener("click", () => {
    // Intercambio del selector de idiomas
    let tempText = fromText.value;
    tempLang = selectTag[0].value,
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
})

// HACEMOS FUNCIONAR EL BOTON TRADUCIR
translateBtn.addEventListener("click", () => {
    let text = fromText.value,
    translateFrom = selectTag[0].value, // Obtenemos el valor del primer idioma
    translateTo = selectTag[1].value; // Obtenemos el valor del segundo idioma
    
    if (!text) return;
    toText.setAttribute("placeholder", "Traduciendo...");    

    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    // Obtenemos la respuesta del API y la devolvemos analizando el ancho en js
    // Y en otro momento recibimos ese obj
    
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder", "Traducido");  
    });
});

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if (target.classList.contains("fa-copy")) {
            // Funcion con el fin de copiar ambos idiomas sleccionados
            if (target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            }

            else {
                navigator.clipboard.writeText(toText.value);
            }
        }

        else {
            let utterance;
            // Funcion con el fin de escuchar las traducciones
            if (target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value; // Escuchamos el lenguaje seleccionado
            }

            else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value; // Escuchamos el lenguaje traducido
            }

            speechSynthesis.speak(utterance);
        }
    });
});