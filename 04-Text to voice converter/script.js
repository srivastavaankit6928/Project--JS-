'use strict'
const playButton = document.querySelector('button');
const selectVoice = document.querySelector('select');
const textArea = document.querySelector('textarea');

const speakThis = new SpeechSynthesisUtterance();
const synth = window.speechSynthesis;

let voices = [];

const loadVoices = function(){
    voices = synth.getVoices();
    speakThis.voice = voices[0];
      voices.forEach((voices,i) => {
        console.log(voices,i);
        const option = document.createElement("option");
        option.textContent = `${voices.name} (${voices.lang})`;
        option.value = i;
        selectVoice.appendChild(option);
      })
}


if ("onvoiceschanged" in synth) {
    synth.onvoiceschanged = loadVoices;
  } else {
    loadVoices();
  }


selectVoice.addEventListener('change',function(){
    speakThis.voice = voices[selectVoice.value];
    console.log( voices[selectVoice.value]);
});

playButton.addEventListener('click',function(){
    speakThis.text = textArea.value;
    synth.speak(speakThis);
});
