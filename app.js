//sample data
const questionItems = [
  {
    question: "Which city are you from?",
    options: ["Srinagar", "Delhi", "Mumbai"],
    answer: "Srinagar",
  },
  {
    question: "Which city would you prefer to live in?",
    options: ["Srinagar", "Delhi", "Mumbai"],
    answer: "Mumbai",
  },
  {
    question: "What is you Name?",
    options: ["Arqam", "Huzaif", "Yarik", "Asrar"],
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

//Event Listner for handling clicks
let correctAns = [];
quizForm.addEventListener("click", (e) => {
  const selectedOption = e.target.closest(".option");
  console.log(selectedOption);
  //remove all the correct classes (reset)

  //handle click on option
  if (selectedOption) {
    const questionLi = selectedOption.closest("li");
    const questionId = questionLi.querySelector("input").name;
    const correctAnswer = questionItems.find((q) => q.id == questionId).answer;

    // Reset classes for all options in the current question
    questionLi.querySelectorAll(".option").forEach((option) => {
      option.classList.remove("correct-option", "incorrect-option");
    });

    // Add correct or incorrect class based on the selection
    if (selectedOption.id === correctAnswer) {
      selectedOption.classList.add("correct-option");
      questionLi.classList.add("correct");
    } else {
      selectedOption.classList.add("incorrect-option");
      questionLi.classList.add("incorrect");
    }

    if (selectedOption.classList.contains("submit-btn")) {
      e.preventDefault();
      evaluate();
      console.log("btn click");
    }
  }
});

//function for reseting classes
function resetClasses() {
  const li = document.querySelectorAll("li");
  li.forEach((item) => {
    item.classList.remove("correct","incorrect");
  });

  const option = document.querySelectorAll(".option");
  option.forEach((item) => {
    item.classList.remove("correct-option","incorrect-option");
  });
}

//function to evav result
function evaluate() {
  

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
    labeltext.textContent = option;

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
