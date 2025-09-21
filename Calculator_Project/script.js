let display = document.getElementById('display');
let resultDisplay = document.getElementById('result');
let currentInput = '';

function appendNumber(num){
    if (num === '.' && currentInput.includes('.'))
        return;
    currentInput += num;
    display.innerText = currentInput;
    updateResult();

}
function appendOperator(op){
    if (currentInput === '') return;
    const lastChar = currentInput.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) return;
    currentInput +=op;
    display.innerText = currentInput;
}
function clearDisplay(){
    currentInput = '';
    display.innerText = '0';
    resultDisplay.innerText = '0';
}
function deleteLast(){
    currentInput = currentInput.slice(0, -1 );
    display.innerText = currentInput || '0';
    updateResult();
}
function updateResult(){
    try{
        const res = eval(currentInput);
        resultDisplay.innerText = res !== undefined ? res : '0';

    }catch{
        resultDisplay.innerText = '';
    }
}
function calculate(){
    try{
        const res = eval(currentInput);
        currentInput = res.toString();
        display.innerText = currentInput;
        resultDisplay.innerText = currentInput;
    }catch{
        display.innerText = 'Error';
        resultDisplay.innerText = '';
        currentInput = '';
    }
}

// Dark and Light Section
document.getElementById('toggle-theme').addEventListener('click',()=>{
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
})