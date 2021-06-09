const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const present = document.getElementById('present')

let shuffleQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)

nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
 startButton.classList.add('hide')
 shuffleQuestions = questions.sort(() => Math.random() - .5) // shuffleQuestions: faz as quetões serem embaralhadas
 currentQuestionIndex = 0
 questionContainerElement.classList.remove('hide')
 setNextQuestion()

}

function setNextQuestion() {
    resetState()
    showQuestion(shuffleQuestions[currentQuestionIndex])

}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')

        if (answer.correct) {
            button.dataset.correct = answer.correct

        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)

    })
  
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }

}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct

    const video = document.createElement("video")
    video.src = "./videos/teste.mp4"
    video.alt = "video para a amada"
    video.controls = true
    video.classList.add("edt-video")

    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if (shuffleQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
                
        
        
        present.textContent = 'Parabéns você ganhou seu presente'
        present.insertAdjacentElement("beforeend", video)
        

        startButton.innerText = 'Reniciar'
        startButton.classList.remove('hide')

    }

}

function setStatusClass(element, correct) {
    clearStatusClass(element)

    if (correct){
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')

    }

}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')

}

const questions = [
    {
        question: 'Quanto é 2 + 2?',
        answers: [
            {text: '4', correct: true},
            {text: '10', correct: false},
            {text: '2', correct: false},
            {text: '22', correct: false}
        ]
    },

    {
        question: 'Quanto é 2 * 3?',
        answers: [
            {text: '3', correct: false},
            {text: '6', correct: true}
        ]
    },

    {
        question: 'Qual jogo mais ama jogar?',
        answers: [
            {text: 'Amung-us', correct: true},
            {text: 'Valorant', correct: true},
            {text: 'League of Legends', correct: true},
            {text: 'CS GO', correct: true}
        ]
    }

]





