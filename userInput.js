import { quizQuestionItem } from "./app.js";
const questionItems=[];

//form
const userinputForm=document.querySelector(".userInput");
//submit button
const addQuestionBtn = document.querySelector("#addQuestion");
//display added questions
const questionDisplay = document.querySelector("#questionDisplay")
//eventListner
userinputForm.addEventListener(("submit"),(e)=>{
    e.preventDefault();
    const question= document.querySelector("#question").value.trim();
    const options = document.querySelector("#options").value.split(",").map(opt => opt.trim());
    console.log("options",options);
    const answer = document.querySelector("#answer").value.trim();
    

    //tooltip for answer validation
    const tooltipDiv = document.createElement("div");
    const tooltipMessage = document.createElement("p");
    tooltipMessage.textContent="Your answer doesn't match with the options provided";
    tooltipDiv.appendChild(tooltipMessage);
    console.log(tooltipDiv);
    //answer validation with options
    options.forEach((option) => {
        if(option === answer){
            questionItems.push({ question, options, answer});
            return;
        }
        else{
            console.log("Answer does't match with any of the options");
        }
    });

    //add to array
    console.log(questionItems);
    document.querySelector("#question").value="";
    document.querySelector("#options").value="";
    document.querySelector("#answer").value="";
})

//appending added question into the ul(added questions)
questionItems.forEach((item)=>{
    const questionItem = quizQuestionItem(item);
    questionDisplay.appendChild(questionItem);

})