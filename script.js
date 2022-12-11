const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')


quoteInputElement.addEventListener('input', () => {
    const arrayQuote = document.querySelectorAll('span')
    const arrayInput = quoteInputElement.value.split('')
    let correct = true
    arrayQuote.forEach((characterSpan,index) => {
        const characterInput = arrayInput[index]
        if(characterInput == null){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        } else if(characterInput === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.add('incorrect')
            characterSpan.classList.remove('correct')
            correct = false
        }
    })

    if (correct) renderNewText()
})

function randomText() {
    return fetch('http://api.quotable.io/random')
            .then(res => res.json())
            .then(data => data.content)
                
}

async function renderNewText() {
    const quote = await randomText()
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
    startTimer()
}

let startTime;
function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timerElement.innerText = getTimer();
    },1000)
}

function getTimer(){
    return Math.floor((new Date() - startTime) / 1000)
}

renderNewText()