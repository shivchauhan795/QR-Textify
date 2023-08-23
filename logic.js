let imgBox = document.getElementById("imgBox");
let qrImg = document.getElementById("qrImg");
let qrText = document.getElementById("qrText");
let selectColor = document.getElementById("selectColor");   // select color from the color pallet
let selectBgColor = document.getElementById("selectBgColor");   // select color from the color pallet
let downloadButton = document.getElementById("downloadButton");
let qrCodeName = document.getElementById("qrCodeName");
let downloadFormat = document.getElementById("downloadFormat");
let shortURLValue = document.getElementById("shortURLGenerated");

selectColor.addEventListener("input", generateQR);  // whenever we choose color, generateQR() is called
selectBgColor.addEventListener("input", generateQR);  // whenever we choose color, generateQR() is called

// URL Shortning
function shortenURL() {
    const longURL = document.getElementById("qrText").value;
    const tinyURLAPI = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longURL)}`;

    fetch(tinyURLAPI)
        .then(response => response.text())
        .then(shortURLGenerated => {
            shortURLValue.textContent = shortURLGenerated;
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

document.querySelectorAll('input[name="shortURL"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
        if (this.checked) {
            // When a radio button is checked, call the shortenURL function
            shortenURL();
        }
    });
});

// Generate Button
function generateQR() {

    let newColor = selectColor.value.replace('#', '')    // remove '#' from the color hex code
    let newBgColor = selectBgColor.value.replace('#', '')    // remove '#' from the color hex code

    if (qrText.value.length > 0) {
        if (shortURLValue.textContent.length > 0) {
            qrImg.src = "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=" + shortURLValue.textContent + "&color=" + newColor + "&bgcolor=" + newBgColor + "&margin=" + margin.value;
        }
        else {
            qrImg.src = "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=" + qrText.value + "&color=" + newColor + "&bgcolor=" + newBgColor + "&margin=" + margin.value;
        }
        imgBox.classList.add("show-img");
        downloadButton.classList.add("show-button");
        qrCodeName.classList.add("show-text");
        downloadFormat.classList.add("show-format");
    }
    else {
        qrText.classList.add('error');
        setTimeout(() => {
            qrText.classList.remove('error');
        }, 1000);
    }

}

// Margin
var margin = document.getElementById("myRange");

margin.addEventListener("input", () => {
    generateQR();
});

// Download Button
downloadButton.addEventListener('click', () => {
    let imgg = document.querySelector('#imgBox img');
    let qrCodeNameText = document.getElementById("qrCodeName");
    let selectedFormat = document.querySelector('input[name="format"]:checked');
    if (qrText.value.length > 0 && qrCodeNameText.value.length > 0 && selectedFormat) {
        let imgAtr = imgg.getAttribute('src');
        let format = selectedFormat.value;
        // Convert the image URL to a Blob object
        fetch(imgAtr)
            .then(response => response.blob())
            .then(blob => {
                // Create a new anchor element to trigger the download
                let downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(blob);
                downloadLink.download = qrCodeNameText.value + '.' + format; // Set a default download filename

                // Trigger a click event on the anchor element to initiate the download
                downloadLink.click();
            });
    } else {
        if (qrText.value.length === 0) {
            qrText.classList.add('error');
            setTimeout(() => {
                qrText.classList.remove('error');
            }, 1000);
        }
        if (qrCodeNameText.value.length === 0) {
            qrCodeNameText.classList.add('error');
            setTimeout(() => {
                qrCodeNameText.classList.remove('error');
            }, 1000);
        }
        if (!selectedFormat) {
            downloadFormat.classList.add('error');
            setTimeout(() => {
                downloadFormat.classList.remove('error');
            }, 1000);
        }
    }
});