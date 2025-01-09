function calculate() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const operation = document.getElementById("operation").value;
    const resultDiv = document.getElementById("result");
  
    if (isNaN(num1) || isNaN(num2)) {
      resultDiv.textContent = "Please enter valid numbers.";
      resultDiv.className = "error";
      return;
    }
  
    let result;
    switch (operation) {
      case "add":
        result = num1 + num2;
        break;
      case "subtract":
        result = num1 - num2;
        break;
      case "multiply":
        result = num1 * num2;
        break;
      case "divide":
        if (num2 === 0) {
          resultDiv.textContent = "Division by zero is not allowed.";
          resultDiv.className = "error";
          return;
        }
        result = num1 / num2;
        break;
      case "modulus":
        if (num2 === 0) {
          resultDiv.textContent = "Division by zero is not allowed.";
          resultDiv.className = "error";
          return;
        }
        result = num1 % num2;
        break;
      default:
        resultDiv.textContent = "Invalid operation.";
        resultDiv.className = "error";
        return;
    }
  
    resultDiv.textContent = `Result: ${result}`;
    resultDiv.className = "";
  }
  
  function clearCalculator() {
    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
    document.getElementById("operation").value = "add";
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = "";
    resultDiv.className = "";
  }
  