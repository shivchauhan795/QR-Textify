let imgBox = document.getElementById("imgBox");
let qrImg = document.getElementById("qrImg");
let qrText = document.getElementById("qrText");
let selectColor = document.getElementById("selectColor");   // select color from the color pallet
let selectBgColor = document.getElementById("selectBgColor");   // select color from the color pallet
let downloadButton = document.getElementById("downloadButton");

selectColor.addEventListener("input", generateQR);  // whenever we choose color, generateQR() is called
selectBgColor.addEventListener("input", generateQR);  // whenever we choose color, generateQR() is called

function generateQR(){

    let newColor = selectColor.value.replace('#','')    // remove '#' from the color hex code
    let newBgColor = selectBgColor.value.replace('#','')    // remove '#' from the color hex code
    
    if(qrText.value.length > 0){
        qrImg.src = "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=" + qrText.value + "&color=" + newColor + "&bgcolor=" + newBgColor + "&margin=" + margin.value;
        imgBox.classList.add("show-img");
        downloadButton.classList.add("show-button");

    }
    else{
        qrText.classList.add('error');
        setTimeout(()=>{
            qrText.classList.remove('error');
        },1000);
    }

}


var margin = document.getElementById("myRange");

margin.addEventListener("input", ()=>{
    generateQR();
});

 

downloadButton.addEventListener('click', () => {
    let imgg = document.querySelector('#imgBox img');
    if (qrText.value.length > 0) {
        let imgAtr = imgg.getAttribute('src');

        // Convert the image URL to a Blob object
        fetch(imgAtr)
            .then(response => response.blob())
            .then(blob => {
                // Create a new anchor element to trigger the download
                let downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(blob);
                downloadLink.download = 'qr_code.png'; // Set a default download filename

                // Trigger a click event on the anchor element to initiate the download
                downloadLink.click();
            });
    } else {
        qrText.classList.add('error');
        setTimeout(() => {
            qrText.classList.remove('error');
        }, 1000);
    }
});
