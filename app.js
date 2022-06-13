//Storing information
class Calculator {
    constructor(previousOpTextEl, currentOpTextEl) {
      this.previousOpTextEl = previousOpTextEl;
      this.currentOpTextEl = currentOpTextEl;
      this.reset = false;
      this.clear();
    }
    //clear method for clear the screen
    clear(){
      this.currentOperand = "";
      this.previousOperand = "";    
      this.operation = undefined
    }
    //removing a single number
    delete(){
      this.currentOperand = this.currentOperand.toString().slice(0 ,-1);
    }
    //appending the number  to the screen
    appendNumber(number){
      // if ((this.currentOperand.includes(".")) && number ==="." ) return;
      if (number === "." &&(this.currentOperand.includes("."))) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();    
    }
    //chooseOperation 
    chooseOperation(operation){
      if(this.currentOperand === "") return;
      if(this.previousOperand !== "") {
        this.Operate();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand="";      
    }
    
    //compute the values and compute a single value/result to display on the calculator
    Operate(){
      let computedResult;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      if(isNaN(prev) || isNaN(current)) return;
      switch(this.operation) {
        case '+':
          computedResult = prev + current ;
          break;
        case '-':
          computedResult = prev - current;
          break;
        case '*':
          computedResult = prev * current;
          break;
        case '/':
          computedResult = prev / current;
          break;
        default:
          return;        
      }
      this.reset = true;
      this.currentOperand = computedResult.toFixed(8);
      this.operation = undefined;
      this.previousOperand = "";
    }
  
    
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay;
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    //updates values inside the output container
    updateDisplay(){
      this.currentOpTextEl.innerText = this.getDisplayNumber(this.currentOperand);
      // this.previousOpTextEl.innerText = this.previousOperand;
      if(this.operation != null) {
        this.previousOpTextEl.innerText = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
      } else {
        this.previousOpTextEl.innerText = ""
      } 
    }
  }
  
  const numberBtns = document.querySelectorAll(".number");
  const operationBtns = document.querySelectorAll(".operator");
  const equalsBtn = document.querySelector("[data-equals]");
  const deleteBtn = document.querySelector(".delete");
  const clearBtn = document.querySelector("[data-clear]");
  const previousOpTextEl = document.querySelector(
    ".previous-operand"
  );
  const currentOpTextEl = document.querySelector(
    ".current-operand"
  );
  
  //Create a claculator
const calculator = new Calculator(previousOpTextEl, currentOpTextEl);
numberBtns.forEach(button => {
  button.addEventListener("click" ,()=> {
    
    if(calculator.previousOperand === "" && calculator.currentOperand !=="" &&calculator.reset){
      calculator.currentOperand = "";
      calculator.reset = false;
    }
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
});

operationBtns.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
});

equalsBtn.addEventListener("click", button => {
  calculator.Operate();
  calculator.updateDisplay();
});

clearBtn.addEventListener("click", button => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", button => {
  calculator.delete();
  calculator.updateDisplay();
});
