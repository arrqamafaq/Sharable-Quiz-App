//sample data
const questionItems = [
  {
    question: "What city are you from?",
    options: ["Srinagar", "Delhi", "Mumbai"],
    answer: "Srinagar",
  },
  {
    question: "What is you Name?",
    options: ["Arqam", "Huzaif","This is something beyound your imagination which I cant tell and wont tell and will never tell even if i tell mean i did tell but never tell to tell all the people", "Yarik", "Asrar"],
    answer: "Arqam",
  },
  {
    question: "What is your year of birth?",
    options: ["1999", "2000", "2001", "2002"],
    answer: "2002",
  },
  {
    question: "Do you know how to swim?",
    options: ["Yes", "No"],
    answer: "Yes",
  },
];

//form
const quizForm = document.querySelector("#quizForm");
// creating a submit button to check the result
const submitBtn = document.createElement("input");
submitBtn.type = "submit";
submitBtn.value = "Do I !";
submitBtn.classList.add("submit-btn");

//adding ID to each questionItem (kind of Question Number)
questionItems.forEach((item, index) => {
  item.id = index + 1;

  //creating UI of each questionItem
  const quizItem = quizQuestionItem(item);

  //inserting UI of each questionItem into the form
  quizForm.appendChild(quizItem);
});

//inserting the submit button after each and every question has been appended.
quizForm.appendChild(submitBtn);

let correctAns = [];
quizForm.addEventListener("click", (e) => {
  const selectedOption = e.target;
  // console.log(selectedOption)
  if (
    /*selectedOption.tagName === "LABEL" ||*/ selectedOption.type === "radio"
  ) {
    console.log(selectedOption);
    questionItems.forEach((item) => {
      if (selectedOption.id === item.answer) {
        correctAns.push(selectedOption.closest("li"));
        selectedOption.closest(".option").classList.add("correct-option");
        console.log(correctAns);
        console.log(selectedOption.closest("li"));
        return;
      } else {
        selectedOption.closest(".option").classList.add("incorrect-option");
      }
    });
  } else {
    console.log("not inside");
  }
  if (selectedOption.classList.contains("submit-btn")) {
    e.preventDefault();
    evaluate();
    console.log("btn click");
  }
});

//function to evav result
function evaluate() {
  const li = document.querySelectorAll("li"); //by default
  li.forEach((item) => {
    item.classList.remove("correct"); //reset
    item.classList.add("incorrect"); //by default
  });
  correctAns.forEach((item) => {
    item.classList.replace("incorrect", "correct");
  });
}

//function to add quiz questions with options
//questionItem is an object with Question, array of options and the correct answer with its id.
function quizQuestionItem(questionItem) {
  //container to hold quiz question
  const questionItemContainer = document.createElement("li");
  questionItemContainer.classList.add("questionItem");

  //The question itself;
  const question = document.createElement("h4");
  question.textContent = questionItem.question;
  questionItemContainer.appendChild(question);

  //questionitem options Container
  const questionItemOptionsContainer = document.createElement("div");
  questionItemOptionsContainer.classList.add("optionsContainer");
  questionItemContainer.appendChild(questionItemOptionsContainer);

  //options
  questionItem.options.forEach((option) => {
    //div to hold radio button with label
    const QuestionItemOptionDiv = document.createElement("div");
    QuestionItemOptionDiv.classList.add("option");
    QuestionItemOptionDiv.id = option;
    
    //label
    const questionOptionLabel = document.createElement("label");
    // questionOptionLabel.htmlFor = option;
    // questionOptionLabel.textContent = option;
    // questionOptionLabel.id = option;
    const labeltext = document.createElement("span");
    labeltext.textContent=option;

    //radio button
    const questionOptionRadio = document.createElement("input");
    questionOptionRadio.type = "radio";
    questionOptionRadio.name = questionItem.id;
    questionOptionRadio.value = option;
    // questionOptionRadio.id = option;


    //appending options into Li
    questionItemOptionsContainer.appendChild(QuestionItemOptionDiv);
    QuestionItemOptionDiv.appendChild(questionOptionLabel);
    questionOptionLabel.appendChild(questionOptionRadio);
    questionOptionLabel.appendChild(labeltext);
  });

  return questionItemContainer;
}
