//form
document.addEventListener("DOMContentLoaded", () => {
  const userinputForm = document.querySelector(".userInput");
  //submit button
  const addQuestionBtn = document.querySelector("#addQuestion");
  //display added questions
  const questionDisplay = document.querySelector("#questionDisplay");
  //quiz name
  const quizNameInput = document.querySelector("#quizName"); // Input for quiz name
  // let quizName = "firstQuiz";
  let questionItems = [];
  let currentQuizName = null;

  // Enable quiz name input initially
  quizNameInput.disabled = false;
  // questionItems = loadQuestionItems(quizName);
  // addItemToUi();

  //eventListner
  userinputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //Get the current quiz name
    const quizName = quizNameInput.value.trim();
    if (!quizName) {
      alert("Please specify a unique name for your quiz.");
      return;
    }
    //setting the current quizname
    currentQuizName = quizName;
    //disabling the quizName once entered
    quizNameInput.disabled = true;

    // Get question, options, and answer from inputs
    const question = document.querySelector("#question").value.trim();
    if (!inpValidate(question, "Question")) return;

    const optionsInput = document.querySelector("#options").value.trim();
    const options = validateOptions(optionsInput);
    if (!options) return; // stop if option validation fails
    console.log("options", options);

    const answer = document.querySelector("#answer").value.trim();
    if (!inpValidate(answer, "Answer")) return;

    if (validateAnswer(answer, options)) {
      questionItems.push({ question, options, answer });
      resetInputFields();
      addItemToUi();
    } else {
      return;
    }

    //add to array
    console.log(questionItems);
  });
  //function to rest inpt values
  function resetInputFields() {
    document.querySelector("#question").value = "";
    document.querySelector("#options").value = "";
    document.querySelector("#answer").value = "";
  }

  //function for input validation
  function inpValidate(inputField, fieldName) {
    if (!inputField) {
      alert(`${fieldName} can't be empty`);
      return false;
    }
    return true;
  }

  // Function to validate options as comma-separated values
  function validateOptions(optionsInput) {
    // Check if the input contains at least one comma
    if (!optionsInput.includes(",")) {
      alert("Options must be separated by commas.");
      return false;
    }

    // Split, trim, and remove empty options
    const optionsArray = optionsInput
      .split(",")
      .map((opt) => opt.trim()) //maps into an array
      .filter((opt) => opt); //removes empty string

    // Ensure all options are non-empty
    if (optionsArray.length < 2) {
      alert("Provide at least two valid options, separated by commas.");
      return false;
    }

    return optionsArray;
  }

  //function to validate if answer matches to options provided
  function validateAnswer(answer, options) {
    //a message element for validation feedback
    const answerValMessage = document.createElement("p");
    answerValMessage.classList.add("answerValidationMessage");
    answerValMessage.textContent =
      "Your answer doesn't match with the options provided";

    //answer validation with options
    const messageContainer = document.querySelector(".answerValidation");
    const existingMessage = document.querySelector(".answerValidationMessage");

    // check if answer entered is present in options provided
    if (options.includes(answer)) {
      //answer is valid
      existingMessage?.remove();
      return true;
    } else {
      //answer is invalid
      existingMessage?.remove(); //clear any previous messages
      messageContainer.appendChild(answerValMessage);
      console.log("Answer does't match with any of the options.");
      return false;
    }
  }

  //function appending added question into the ul(added questions)
  function addItemToUi() {
    //clearing the ul inorder to remove duplicate elements
    questionDisplay.innerHTML = "";
    questionItems.forEach((item) => {
      console.log(item);
      const questionItem = quizQuestionItem(item);
      console.log("Question item logged in ui", questionItem);
      questionDisplay.appendChild(questionItem);
    });
    //display create button
    if (questionItems.length > 0) {
      document.querySelector(".createQuizBtn").style.display = "initial";
    }

    // resetForm();
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

  const createBtn = document.querySelector(".createQuizBtn");
  createBtn.addEventListener("click", () => {
    console.log("clicked create quiz");
    createQuiz(currentQuizName);
  });

  //function to createQuiz
  function createQuiz(quizName) {
    // Check if a quiz with the same name exists
    if (localStorage.getItem(quizName)) {
      if (!confirm("A quiz with this name already exists. Overwrite it?")) {
        return;
      }
    }

    //saving the quiz questionItems array to localStorage on creating quiz
    saveQuestionItems(quizName);
    alert(`Quiz "${quizName}" has been created successfully!`);
    resetForm();
  }

  function resetForm() {
    questionItems = [];
    // currentQuizName = null;
    quizNameInput.disabled = false;
    quizNameInput.value = "";
    questionDisplay.innerHTML = "";
    // createQuizBtn.style.display = "none";
  }
  //function to save questionItems to local Storage
  function saveQuestionItems(quizName) {
    const questionItemsJson = JSON.stringify(questionItems);
    localStorage.setItem(quizName, questionItemsJson);
  }
  //function to load savedQuestions from local Strorage.
  function loadQuestionItems(quizName) {
    const questionItemsArray = localStorage.getItem(quizName) || "[]";
    return JSON.parse(questionItemsArray);
  }
});
