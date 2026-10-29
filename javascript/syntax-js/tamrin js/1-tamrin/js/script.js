"use strict";
// 1;
const num1 = prompt("inter your num1");
const num2 = prompt("inter your num2");
console.log(+num1 + +num2, num1 - num2, num1 * num2, num1 / num2);
// 2;
const personNum = prompt("enter number");
if (personNum == 0) {
  console.log("0");
} else if (personNum > 0) {
  console.log("+");
} else if (personNum < 0) {
  console.log("-");
}
3;
for (let i = 0; i <= 10; i++) {
  console.log(i);
}
// 4;
let Number1 = 1;
while (Number1 <= 20) {
  if (Number1 % 2 == 0) {
    console.log(Number1);
  }
  Number1++;
}
// 5;
const func = (one, two) => {
  if (one > two) {
    console.log(one);
  } else if (two > one) {
    console.log(two);
  }
};
func(50, 60);
// 6;
const funcPerson = (name) => {
  console.log("welcome", "" + name);
};
funcPerson("parsa");
// 7;
const numberFuctoril = (num) => {
  if (num == 0 || num == 1) {
    return 1;
  }
  return num * numberFuctoril(num - 1);
};
console.log(numberFuctoril(10));
// 8;
const numberFuctoril1 = (n) => {
  if (n == 0 || n == 1) {
    return 1;
  }
  let num = 1;
  let i = n;
  while (i > 1) {
    num *= i;
    i--;
  }
  return num;
};
console.log(numberFuctoril1(5));
// 9;
const arrNum = [50, 40, 56, 80, 90, 70, -89, 78, 96];
const totalNum = (num) => {
  let total = 0;
  for (let i = 0; i < num.length; i++) {
    total += num[i];
  }
  return total;
};
console.log(totalNum(arrNum));
// 10;
const names = ["ali", "mahammad", "nima", "reza", "hossein"];
const longName = names.filter((name) => name.length > 5);
console.log(longName);
// 11;
const informationPerson = {
  name: "parsa",
  Age: "15",
  job: "web dev",
};
const informationPersonObject = (obj) => {
  for (let key in obj) {
    console.log(`${key} : ${obj[key]}`);
  }
};
informationPersonObject(informationPerson);
// 12;
const pOneEl = document.querySelector("#pOne");
const buttonOneEl = document.querySelector("#buttonOne");
buttonOneEl.addEventListener("click", () => {
  const randomColer = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  pOneEl.style.backgroundColor = randomColer;
  buttonOneEl.style.backgroundColor = randomColer;
});
// 13;
(async () => {
  try {
    const section13EL = document.querySelector(".section-13");
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    console.log(data);
    data?.map((e) => {
      section13EL.innerHTML += `
            <div>
            <h1>${e.id}</h1>
            <h2>${e.title}</h2>
            <p>${e.body}</p>
            </div>
        `;
    });
  } catch (error) {
    section13EL.textContent = `error${error}`;
  }
})();
// 14;
const display = document.querySelector("#display");
let currentInput = "0";
let operator = null;
let previousInput = null;
function clearDisplay() {
  currentInput = "0";
  operator = null;
  previousInput = null;
  updateDisplay();
}
function toggleSign() {
  currentInput = (parseFloat(currentInput) * -1).toString();
  updateDisplay();
}
function calculatePercent() {
  currentInput = (parseFloat(currentInput) / 100).toString();
  updateDisplay();
}
function appendNamber(num) {
  if (currentInput === "0") {
    currentInput = num;
  } else {
    currentInput += num;
  }
  updateDisplay();
}
function appendDecimal(decimal) {
  if (!currentInput.includes(decimal)) {
    currentInput += decimal;
  }
  updateDisplay();
}
function appendOperator(op) {
  if (operator && previousInput !== null) {
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = "0";
}
function calculate() {
  if (operator && previousInput !== null) {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    switch (operator) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "/":
        if (curr === 0) {
          result = "Error";
        } else {
          result = prev / curr;
        }
        break;
      default:
        return;
    }
    currentInput = result.toString();
    operator = null;
    previousInput = null;
    updateDisplay();
  }
}
function updateDisplay() {
  display.value = currentInput;
}
// 15;
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Add a task");
    return;
  }
  const liEl = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function () {
    taskTextSpan.classList.toggle("completed", this.checked);
  });
  const taskTextSpan = document.createElement("span");
  taskTextSpan.className = "task-text";
  taskTextSpan.textContent = taskText;
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "delete";
  deleteBtn.addEventListener("click", function () {
    taskList.removeChild(liEl);
  });
  liEl.appendChild(checkbox);
  liEl.appendChild(taskTextSpan);
  liEl.appendChild(deleteBtn);
  taskList.appendChild(liEl);
  taskInput.value = "";
}
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
// 16;
const updateClock = setInterval(() => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const second = now.getSeconds();
  const hourDeg = (hours % 12) * 30 + (minutes / 60) * 30;
  const minutesDeg = minutes * 6 + (second / 60) * 6;
  const secondDeg = second * 6;
  const hourHandEl = document.querySelector("#hourHand");
  const minutsHandEl = document.querySelector("#minutsHand");
  const secondHandEl = document.querySelector("#secondHand");
  hourHandEl.style.transform = `translate(-50%,-100%) rotate(${hourDeg}deg)`;
  minutsHandEl.style.transform = `translate(-50%,-100%) rotate(${minutesDeg}deg)`;
  secondHandEl.style.transform = `translate(-50%,-100%) rotate(${secondDeg}deg)`;
}, 1000);
// 17;
const units = {
  temperature: [
    { name: "celsius", value: "celsius" },
    { name: "fahrenheit", value: "fahrenheit" },
    { name: "kelvin", value: "kelvin" },
  ],
  length: [
    { name: "meter", value: "meter" },
    { name: "centimeter", value: "centimeter" },
    { name: "kilometer", value: "kilometer" },
    { name: "inch", value: "inch" },
    { name: "foot", value: "foot" },
  ],
  weight: [
    { name: "kilogram", value: "kilogram" },
    { name: "gram", value: "gram" },
    { name: "pound", value: "pound" },
    { name: "ounce", value: "ounce" },
  ],
};
const converters = {
  temperature: {
    celsius: {
      fahrenheit: (c) => (c * 9) / 5 + 32,
      kelvin: (c) => c + 273.15,
    },
    fahrenheit: {
      celsius: (f) => ((f - 32) * 5) / 9,
      kelvin: (f) => ((f - 32) * 5) / 9 + 273.15,
    },
    kelvin: {
      celsius: (k) => k - 273.15,
      fahrenheit: (k) => ((k - 273.15) * 9) / 5 + 32,
    },
  },
  length: {
    meter: {
      centimeter: (m) => m * 100,
      kilometer: (m) => m / 1000,
      inch: (m) => m * 39.37,
      foot: (m) => m * 3.281,
    },
    centimeter: {
      meter: (cm) => cm / 100,
      kilometer: (cm) => cm / 100000,
      inch: (cm) => cm * 0.3937,
      foot: (cm) => cm * 0.0328,
    },
    kilometer: {
      meter: (km) => km * 1000,
      centimeter: (km) => km * 100000,
      inch: (km) => km * 39370,
      foot: (km) => km * 3281,
    },
    inch: {
      meter: (inch) => inch * 0.0254,
      centimeter: (inch) => inch * 2.54,
      kilometer: (inch) => inch * 0.0000254,
      foot: (inch) => inch / 12,
    },
    foot: {
      meter: (foot) => foot * 0.3048,
      centimeter: (foot) => foot * 30.48,
      kilometer: (foot) => foot * 0.0003048,
      inch: (foot) => foot * 12,
    },
  },
  weight: {
    kilogram: {
      gram: (kg) => kg * 1000,
      pound: (kg) => kg * 2.205,
      ounce: (kg) => kg * 35.274,
    },
    gram: {
      kilogram: (g) => g / 1000,
      pound: (g) => g * 0.002205,
      ounce: (g) => g * 0.035274,
    },
    pound: {
      kilogram: (lb) => lb / 2.205,
      gram: (lb) => lb * 453.6,
      ounce: (lb) => lb * 16,
    },
    ounce: {
      kilogram: (oz) => oz / 35.274,
      gram: (oz) => oz * 28.35,
      pound: (oz) => oz / 16,
    },
  },
};
function populateUnits() {
  const unitType = document.getElementById("unitType").value;
  const fromUnit = document.getElementById("fromUnit");
  const toUnit = document.getElementById("toUnit");
  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";
  units[unitType].forEach((unit) => {
    const option1 = document.createElement("option");
    option1.value = unit.value;
    option1.textContent = unit.name;
    fromUnit.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = unit.value;
    option2.textContent = unit.name;
    toUnit.appendChild(option2);
  });
}
function convert() {
  const unitType = document.getElementById("unitType").value;
  const inputValue = parseFloat(document.getElementById("inputValue").value);
  const fromUnit = document.getElementById("fromUnit").value;
  const toUnit = document.getElementById("toUnit").value;

  if (isNaN(inputValue)) {
    alert("Please enter avalue");
    return;
  }

  if (fromUnit === toUnit) {
    document.getElementById("result").textContent =
      "Converted value: " + inputValue;
    return;
  }

  const result = converters[unitType][fromUnit][toUnit](inputValue);
  document.getElementById("result").textContent =
    "Converted value:" + result.toFixed(2);
}
document.getElementById("unitType").addEventListener("change", populateUnits);
populateUnits();

