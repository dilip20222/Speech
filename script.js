const main = document.querySelector('main');
const voiceSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data= [
   { image:'./img/drink.png',
    text:"I'm Thisty"
    },  
    { image:'./img/angry.png',
    text:"I'm Angry"
    },  
    { image:'./img/babu-Rao.png',
    text:"I'm Babu Rao"
    },  
    { image:'./img/happy.png',
    text:"I'm Happy"
    },  
    { image:'./img/sad.png',
    text:"I'm Sad"
    },  
    { image:'./img/scad.gif',
    text:"I'm Scared"
    },  
    { image:'./img/outsite.png',
    text:"I Want To Go Outside"
    },  
    { image:'./img/granma.png',
    text:"I Want To Go Grandmas"
    }
];
data.forEach(createBox);

//create Speech Boxes
function createBox(item){
    const box = document.createElement('div');

    const {image,text}=item;

    box.classList.add('box');
    box.innerHTML = `<img src = "${image}" alt="${text}"/> 
    <p class="info">${text}</p>
    `;

    box.addEventListener('click', () =>{
        setTextMessage(text); 
        speakText();
        //add active effect
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'),800)
    });
    //@ todo speak event 
    main.appendChild(box);


}
//init speech synth
const message =new SpeechSynthesisUtterance();

//store voices
let voices = [];
function getVoices(){
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');

        option.value = voice.name;
        option.innerHTML =`${voice.name} ${voice.lang} `;

        voiceSelect.appendChild(option);
    });
}

//set text
function setTextMessage(text){
    message.text = text ;
}

//speack text
function speakText(){
    speechSynthesis.speak(message);
}

function setVoice(e){

    message.voice = voices.find(voice => voice.name === e.target.value);

}

//voice change
speechSynthesis.addEventListener('voiceschanged', getVoices);

//toggle text box
toggleBtn.addEventListener('click',() => document.getElementById('text-box').classList.toggle('show')
);
closeBtn.addEventListener('click',() => document.getElementById('text-box').classList.remove('show')
);

//chnage voice
voiceSelect.addEventListener('change', setVoice);

// read text button
readBtn.addEventListener('click',() =>{
    setTextMessage(textarea.value);
    speakText();
})
getVoices();







