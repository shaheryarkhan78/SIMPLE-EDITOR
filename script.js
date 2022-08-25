const fileInput = document.querySelector(".file-input"),
previewimg = document.querySelector(".prev-img img"),
filterOpt = document.querySelectorAll(".filter button"),
filtername = document.querySelector(".filter-info .name"),
filtervalue = document.querySelector(".slider .filter-info .value"),
filterSlider = document.querySelector(".slider input"),
rotateOpt = document.querySelectorAll(".rotate button"),
resetfilterbutton = document.querySelector(".reset-filter"),
chooseimgbtn = document.querySelector(".choose-img"),
saveimgbtn = document.querySelector(".save-img");

let brightness=100, saturation=100, inversion=0, greyscale=0;
let rotate=0, vertical=1, horizontal=1;
const applyfilter = () => {
    previewimg.style.transform = `rotate(${rotate}deg) scale(${vertical}, ${horizontal})`;
    previewimg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${greyscale}%)` ;
}

const loadimage = () =>{
    let file = fileInput.files[0];
    if(!file) return;
    previewimg.src=URL.createObjectURL(file);
    previewimg.addEventListener("load", () => {
        document.getElementById("disable").removeAttribute("id");
    });
}

filterOpt.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filtername.innerText = option.innerText;

        if(option.id === "brightness"){
            filterSlider.max=200;
            filterSlider.value=brightness;
            filtervalue.innerText= `${brightness}%` ;
        }
        else if(option.id === "saturation"){
            filterSlider.max=200;
            filterSlider.value=saturation;
            filtervalue.innerText= `${saturation}%` ;
        }
        else if(option.id === "inversion"){
            filterSlider.max=100;
            filterSlider.value=inversion;
            filtervalue.innerText= `${inversion}%` ;
        }
        else{
            filterSlider.max=100;
            filterSlider.value=greyscale;
            filtervalue.innerText= `${greyscale}%` ;
        }
    });
    
});

const updaterange = () => {
    filtervalue.innerText= `${filterSlider.value}%` ;
    const selectedfilter = document.querySelector(".filter .active");
    if(selectedfilter.id === "brightness"){
        brightness=filterSlider.value;
    }else if(selectedfilter.id === "saturation"){
        saturation=filterSlider.value;
    }else if(selectedfilter.id === "inversion"){
        inversion=filterSlider.value;
    }else {
        greyscale=filterSlider.value;
    };
    applyfilter();
}

rotateOpt.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left"){
            rotate-= 90;
        }
        option.id === "right" ? rotate+= 90 : rotate=0;
        
        if(option.id === "vertical"){
           vertical = vertical===1 ? -1:1;
        }
        option.id === "horizontal" ? (horizontal = horizontal===1 ? -1:1) : (null) ;

        

        


        applyfilter();
    })
})

const ResetButton = () => {
    brightness=100; saturation=100; inversion=0; greyscale=0;
    rotate=0; vertical=1; horizontal=1;
    filterOpt[0].click();

    applyfilter();
}

const saveimg = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")
    canvas.width=previewimg.naturalWidth;
    canvas.height=previewimg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${greyscale}%)` ;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0){
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(vertical,horizontal);
    ctx.drawImage(previewimg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    const link = document.createElement("a");
    link.download="image.jpg";
    link.href= canvas.toDataURL();
    link.click();


}
 
resetfilterbutton.addEventListener("click", ResetButton)
filterSlider.addEventListener("input", updaterange)
fileInput.addEventListener("change", loadimage);
saveimgbtn.addEventListener("click", saveimg);
chooseimgbtn.addEventListener("click", () => fileInput.click() );

