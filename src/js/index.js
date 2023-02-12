import data from "../api/dataset.json";


// main section
const home = document.querySelector(".home");
const app = document.querySelector(".app");
const result = document.querySelector(".result");

// category container
const categoryTitle = document.querySelector(".categoryTitle");
const category = document.querySelectorAll(".category");
const startBtn = document.querySelector(".startBtn");
const select = document.querySelector(".category-select");
const scoreCard = document.querySelector(".scoreCard p");

// quiz container
const question = document.querySelector(".question h2");
const options = document.querySelector(".options");
const timing = document.querySelector(".time");
const message = document.querySelector(".message");
const next = document.querySelector(".submit-btn");
const prev = document.querySelector(".prev");
const resultBtn = document.querySelector(".result-btn");

// quiz container
const score = document.querySelector(".score h2");
const greet = document.querySelector(".score h3");
const newstart = document.querySelector(".start-new");

// empty container
let categoryName = "";
let categoryData = "";
let userAnswer = [];
let allAnwers = [];
let timer;
let timeCounter = 15;
let scores ="";


// To get the category
function selectCategory() {
  category.forEach((category) => {
    category.addEventListener("click", () => {
      if (document.querySelector(".selected")) {
        let selected = document.querySelector(".selected");
        selected.classList.remove("selected");
      }
      category.classList.add("selected");
      categoryTitle.textContent = category.textContent + " Quiz";
      categoryName = category.textContent.toLowerCase().split(" ").join("-");
      categoryData = data[categoryName];
      allAnwers = getAllAnswer(categoryData);
      category.classList.add("disable");
    });
  });
}


// To get the answer array
function getAllAnswer(data) {
  let answers = [];
  data.forEach((el) => {
    answers.push(el.answer);
  });
  return answers;
}



// To create the option
function createQuizOptions(options, optionCont) {
  for (let i = 0; i < options.length; i++) {
    let opt = document.createElement("div");
    let inp = document.createElement("input");
    let label = document.createElement("label");

    opt.classList.add("option");
    inp.name = "answer";
    inp.type = "radio"
    inp.id = options[i];
    inp.value = options[i];
    label.textContent = options[i];
    label.setAttribute("for", options[i]);
    
    opt.appendChild(inp);
    opt.appendChild(label);
    optionCont.appendChild(opt);
  }
}


// To start the quiz
function startQuiz() {
  if (categoryName !== "") {
    question.textContent = categoryData[count].question;
    let opt = categoryData[count].options;
    createQuizOptions(opt, options);
    app.classList.add("active");
    app.classList.remove("inactive");
    home.classList.remove("active");
    home.classList.add("inactive");
    // Time limit to answer a question
    timer = setInterval(() => {
      if (timeCounter === 0) {
        question.textContent = "";
        options.innerHTML = "";
        next.classList.add("inactive");
        prev.classList.add("inactive");
        resultBtn.classList.add("active");
        message.textContent = "Oh! You run out of Time. Please Try Again.";
        clearInterval(timer);
      }

      timing.textContent = timeCounter--;
    }, 1000);
  } else {
    select.innerText = "please select a category";
    select.style.color = "red";
    let timer = setTimeout(() => {
      select.innerText = "select a category";
    select.style.color = "black";
    }, 3000);
  }
}

selectCategory();


// To start the quiz
startBtn.addEventListener("click", () => {
  startQuiz();
});



// To count the number of questions finished
let count = 0;



// On Sumbit an answer with next question
next.addEventListener("click", () => {
  // Check if an option is selected
  let answer = document.querySelectorAll(".active .options .option input");
  let flag = false;
  answer.forEach((ans) => {
    if (ans.checked === true) {
      userAnswer.push(ans.value);
      flag = true;
    }
  });

  if (!flag) {
    // Alert
    message.textContent = "Please Select an Option";
    let timer = setTimeout(() => {
      message.classList.add("inactive");
      clearTimeout(timer);
    }, 3000);
  } else {
    // Check if the questions are finished
    if (count + 1 === categoryData.length) {
      question.textContent = "";
      options.innerHTML = "";
      next.classList.add("inactive");
      prev.classList.add("inactive");
      resultBtn.classList.add("active");
      message.textContent = "Well Done! You answered All the Questions.";
      clearInterval(timer);
      timing.textContent = 0;
    } else {
      clearInterval(timer);

      count++;
      prev.classList.remove("inactive");
      message.textContent = "";
      // Add Question and Option
      question.textContent = categoryData[count].question;
      options.innerHTML = "";
      let opt = categoryData[count].options;
      createQuizOptions(opt, options);
      timeCounter = 15;

      // Time limit to answer one question
      timer = setInterval(() => {
        if (timeCounter === 0) {
          question.textContent = "";
          options.innerHTML = "";
          next.classList.add("inactive");
          prev.classList.add("inactive");
          resultBtn.classList.add("active");
          message.textContent = "Oh! You went out of Time. Please Try Again.";
          clearInterval(timer);
        }
        timing.textContent = timeCounter--;
      }, 1000);
    }
  }
});


// To get on previous question and update answer
prev.addEventListener("click", () => {
  // Check if an option is selected
  let answer = document.querySelectorAll(".active .options .option input");
  let flag = false;
  answer.forEach((ans) => {
    if (ans.checked === true) {
      userAnswer.push(ans.value);
      flag = true;
    }
  });

  if (!flag) {
    // Alert
    message.textContent = "Please Select an Option";
    let timer = setTimeout(() => {
      message.classList.add("inactive");
      clearTimeout(timer);
    }, 3000);
  } else {
    // Check if the questions are finished
    if (count  === 0) {
      prev.classList.add("inactive");
      message.textContent = "Please select option and click on next";
      let timer = setTimeout(() => {
        message.classList.add("inactive");
        clearTimeout(timer);
      }, 3000);
      clearInterval(timer);
      timing.textContent = 0;
    } else {
      clearInterval(timer);
      
      count--;

      // Add Question and Option
      prev.classList.remove("inactive");
      question.textContent = categoryData[count].question;
      options.innerHTML = "";
      let opt = categoryData[count].options;
      createQuizOptions(opt, options);
      timeCounter = 15;

      // Time limit to answer one question
      timer = setInterval(() => {
        if (timeCounter === 0) {
          question.textContent = "";
          options.innerHTML = "";
          next.classList.add("inactive");
          prev.classList.add("inactive");
          resultBtn.classList.add("active");
          message.textContent = "Oh! You went out of Time. Please Try Again.";
          clearInterval(timer);
        }
        timing.textContent = timeCounter--;
      }, 1000);
    }
  }
});



// Get Results
resultBtn.addEventListener("click", () => {
  let rightAnswerCount = 0;
  let answerArray = [];
  timing.textContent = 0;
  console.log(userAnswer);
  console.log(allAnwers);

  userAnswer.forEach((el, index) => {
    if (el === allAnwers[index]) {
      rightAnswerCount++;
      answerArray.push(true);
    } else {
      answerArray.push(false);
    }
  });
  result.classList.add("active");
  result.classList.remove("inactive");
  app.classList.remove("active");
  app.classList.add("inactive");

  if (rightAnswerCount === allAnwers.length) {
    greet.textContent = "💥💥💥Congratulation💥💥💥 ";
    scoreCard.textContent = Number(scores) + rightAnswerCount;
  }

  score.textContent = `You got ${rightAnswerCount} out of ${allAnwers.length}`;
  scoreCard.textContent = Number(scores) + rightAnswerCount;
  let userStorage = JSON.parse(localStorage.getItem("record"));

  if (userStorage) {
    localStorage.removeItem("record");
    localStorage.setItem(
      "record",
      JSON.stringify([
        {
          categoryName: categoryName,
          userAnswer: rightAnswerCount,
          totalScore: allAnwers.length,
          date: new Date().toLocaleString(),
        },
        ...userStorage,
      ])
    );
  } else {
    localStorage.setItem(
      "record",
      JSON.stringify([
        {
          categoryName: categoryName,
          userAnswer: rightAnswerCount,
          totalScore: allAnwers.length,
          date: new Date().toLocaleString(),
        },
      ])
    );
  }
});



// new start
newstart.addEventListener("click", () => {

home.classList.add("active");
 home.classList.remove("inactive");
  result.classList.remove("active");
  result.classList.add("inactive");
  message.textContent = "";
  greet.textContent="Nice Try"
  score.textContent = '';
  next.classList.remove("inactive");
prev.classList.remove("inactive");
  resultBtn.classList.remove("active");
  count = 0;
 allAnwers = [];
 userAnswer = [];
scores =scoreCard.textContent;
categoryName = "";
categoryData = "";

});
