export default class Game {

    constructor(indicator, question, choices, result, nextButton, questions){
        this.indicator = indicator;
        this.question = question;
        this.choices = choices;
        this.result = result;
        this.nextButton = nextButton;
        this.questions = questions;
        this.score = 0;
    }

    clear = () => {
        this.indicator.textContent = '';
        this.question.textContent = '';
        this.choices.textContent = '';
        this.result.textContent = '';
    }
    
    updateIndicator = (questionID) => {
        this.indicator.textContent = `${questionID+1}/${this.questions.length}`;
    };
    
    setQuestion = (questionID) => {
        if (questionID < this.questions.length) {
            this.data = this.questions[questionID];
        }
        this.question.textContent = this.data.question;
    
        let htmlString = '';
        let count = 0;
    
        for(const choice of this.data.choices) {
            htmlString += `<button id='choice${count}' class='choice'>${choice}</button>\n`;
            count++;
        }
        this.choices.innerHTML = htmlString;
        count = 0;
    
        for(const choice of this.data.choices) {
            document.getElementById(`choice${count}`).addEventListener('click', (e) => {
                for(const child of this.choices.children) {
                    child.disabled = true;
                }
    
                if (e.target.textContent === this.data.answer) {
                    this.result.textContent = 'gagné';
                    this.score++;
                } else {
                    this.result.textContent = 'perdu';
                }
                this.nextButton.disabled = false;
            });
            count++;
        }
    };
    
    endGame = () => {
        this.nextButton.style.display = 'none';
        this.result.innerHTML =
        `Your score is ${this.score}/${this.questions.length}
        <br>`
        for(let i = 0; i < this.questions.length; i++) {
            this.result.innerHTML += `<div class="resultQuestion">Question ${i+1}: ${this.questions[i].question}`;
            this.result.innerHTML += `Answer: ${this.questions[i].answer}</div>`;
        }
        
    }
    
    nextQuestion = (questionID) => {
        this.clear();
        if (questionID < this.questions.length) {
            this.updateIndicator(questionID);
            this.setQuestion(questionID);
        } else {
            this.endGame();
        }
    };
    
    start = () => {
        this.nextButton.addEventListener('click', () => {
            this.nextQuestion(this.data.id+1);
        });
        this.updateIndicator(0);
        this.setQuestion(0);
    };
}