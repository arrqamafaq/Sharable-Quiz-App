//sample data
const questionItems = [
  {
    question: "What city are you from?",
    options: ["Srinagar", "Delhi", "Mumbai"],
    answer: "Srinagar",
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
    options: ["Yes","No"],
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
  if (/*selectedOption.tagName === "LABEL" ||*/selectedOption.type === "radio") {
    console.log(selectedOption);
    questionItems.forEach((item) => {
      if (selectedOption.id === item.answer) {
        correctAns.push(selectedOption.closest("li"));
        selectedOption.closest(".option").classList.add("correct-option");
        console.log(correctAns);
        console.log(selectedOption.closest("li"));
        return;
      }
      else{
        selectedOption.closest(".option").classList.add("incorrect-option");
      }
    });
  } else {
    console.log("not inside");
  }
  if(selectedOption.classList.contains("submit-btn")){
    e.preventDefault();
    evaluate();
    console.log("btn click")
  }
});

//function to evav result
function evaluate(){
  const li =document.querySelectorAll("li");//by default
  li.forEach((item)=>{
    item.classList.remove("correct");//reset
    item.classList.add("incorrect");//by default
  })
  correctAns.forEach((item)=>{
    item.classList.replace("incorrect","correct");
  })
}


//function to add quiz questions with answers
//questionItem an object with Question, array of options and correct answer
function quizQuestionItem(questionItem) {
  //container to hold quiz question
  const questionItemContainer = document.createElement("li");
  //The question itself;
  const question = document.createElement("h4");
  question.textContent = questionItem.question;
  questionItemContainer.appendChild(question);

  //Question options Container
  const questionOptionsContainer = document.createElement("div");
  questionOptionsContainer.classList.add("optionsContainer");
  questionItemContainer.appendChild(questionOptionsContainer);
  //options
  questionItem.options.forEach((option) => {
    const optionDiv = document.createElement("div");
    optionDiv.classList.add("option");
    const questionOption = document.createElement("input");
    questionOption.type = "radio";
    questionOption.name = questionItem.id;
    questionOption.value = option;
    questionOption.id = option;
    const label = document.createElement("label");
    label.htmlFor = option;
    label.textContent = option;
    label.id = option;
    questionOptionsContainer.appendChild(optionDiv);
    optionDiv.appendChild(questionOption);
    optionDiv.appendChild(label);
  });

  return questionItemContainer;
}
