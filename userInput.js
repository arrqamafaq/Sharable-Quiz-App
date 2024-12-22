export const questionItems = [];

//form
document.addEventListener("DOMContentLoaded", () => {
  const userinputForm = document.querySelector(".userInput");
  //submit button
  const addQuestionBtn = document.querySelector("#addQuestion");
  //display added questions
  const questionDisplay = document.querySelector("#questionDisplay");
  //eventListner
  userinputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const question = document.querySelector("#question").value.trim();
    const options = document
      .querySelector("#options")
      .value.split(",")
      .map((opt) => opt.trim());
    console.log("options", options);
    const answer = document.querySelector("#answer").value.trim();

    //tooltip for answer validation
    // const tooltipDiv = document.createElement("div");
    const answerValMessage = document.createElement("p");
    answerValMessage.classList.add("answerValidationMessage");
    answerValMessage.textContent =
      "Your answer doesn't match with the options provided";
    // tooltipDiv.appendChild(answerValMessage);
    // console.log(tooltipDiv);

    //answer validation with options
    const messageContainer= document.querySelector(".answerValidation");
    const existingMessage=document.querySelector(".answerValidationMessage");

    // options.filter(())
    if(options.includes(answer)){
      //answer is valid
      questionItems.push({ question, options, answer });
      resetInputFields();
      existingMessage?.remove();
      addItemToUi();
    }
    else{
      //answer is invalid
      existingMessage?.remove();
      messageContainer.appendChild(answerValMessage);
      console.log("Answer does't match with any of the options");
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
  //function appending added question into the ul(added questions)
  function addItemToUi() {
    //clearing the ul
    questionDisplay.innerHTML = "";
    questionItems.forEach((item) => {
      console.log(item);
      const questionItem = quizQuestionItem(item);
      console.log("Question item logged in ui", questionItem);
      questionDisplay.appendChild(questionItem);
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
});
