import words from './words.json';

function randomIntFromInterval(min: number, max: number){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function() {
    const wordIndex = randomIntFromInterval(0, words.length - 1);
    return words[wordIndex];
}