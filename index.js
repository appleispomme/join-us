const quizData = [
    {
      question: "Are you a woman?",
      if_no: "You are not a woman",
    },
    {
      question: "Are you a single?",
      if_no: "You are not single",
    },
]

// Getting the table
const questionnaire_table = document.getElementById("questionnaire_table");

const output_div = document.getElementById('output');

// // Prepare the new div
// const output_div = document.createElement("div", { id: "output"});

// Adding all the questions to the table
for (let i = 0; i < quizData.length; i++) {
    // Insert a new rows
    let row = questionnaire_table.insertRow(1+i)
    // Inserting the cells
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    // Filling in the question
    cell1.innerHTML = quizData[i].question;
    // Yes option
    let div = document.createElement("input");
    div.setAttribute('type', 'radio');
    div.setAttribute('id', 'q' + i + '_y');
    div.setAttribute('name', 'q' + i);
    div.setAttribute('value', 'Y');
    cell2.appendChild(div);
    // NO option
    div = document.createElement("input"); // already defined
    div.setAttribute('type', 'radio');
    div.setAttribute('id', 'q' + i + '_n');
    div.setAttribute('name', 'q' + i);
    div.setAttribute('value', 'N');
    cell3.appendChild(div);
} 

// Form filled results
let questionnaire = document.getElementById("questionnaire_form");
questionnaire.addEventListener("submit", (e) => {
    e.preventDefault();

    let answer_count = 0;
    let answer_y_count = 0;
    let marked_answers = questionnaire.querySelector('input:checked');

    // Check filled all the questions and count if all yes 
    if (marked_answers == null) {
        alert('Please fill in all the questions.');
    } else {
        // Ugly but will be fixed later
        for (let i = 0; i < quizData.length; i++) {
            let my_check_y = document.getElementById('q' + i + '_y');
            let my_check_n = document.getElementById('q' + i + '_n');
            if (my_check_n.checked) {
                answer_count++;
            } else if (my_check_y.checked) {
                answer_y_count++;
                answer_count++;
            }
        }
    }

    if (answer_count != quizData.length) {
        alert('Please fill in all the questions.');
    } else if (answer_y_count == quizData.length) {
        alert('You are a robot.');
    } else {
        // Remove old version of div
        output_div.innerHTML = "";
        // Adding basic template
        output_div.innerHTML += "<div>Thank you for taking the time to fil-in the survey.<div>";
        output_div.innerHTML += "<div>Unfortunately, we cannot accept your request, since you answered no to the following:<div>";

        // Check did not answer yes to everything (maybe if list empty)

        // Get the questions that were answered no
        for (let i = 0; i < quizData.length; i++) {
            let my_check = document.getElementById('q' + i + '_n');
            if (my_check.checked) {
                let new_content = document.createTextNode('Q' + i + ' - ' + quizData[i].question);
                output_div.appendChild(new_content);
                // console.log(quizData[i].question);
            }
        }
        // Append the new div to the document
        document.getElementById('main').remove();
        document.body.appendChild(output_div)
    }
    // Clear the form?
});

// function showResult() {
//     // Test temp
//     document.getElementById("submit").style.color = "red";

//     // Check filled all the questions

//     // Check did not answer yes to everything (maybe if list empty)

//     // Get the questions that were answered no
//     for (let i = 0; i < quizData.length; i++) {

//     }

//     // quiz.innerHTML = `
//     //   <h1>Quiz Completed!</h1>
//     //   <p>Your score: ${score}/${quizData.length}</p>
//     // `;
//   }