const quizData = [

    {
      question: "Are you single?",
      if_no: "You are not single",
    },
    {question: "Are you based in the Netherlands?"},
    {question: "Are you based in Germany?"},
    {question: "Are you based in France?"},
    {question: "Are you based in the UK?"},
    {question: "Are you based in another EU country?"},
    {question: "Are you planning to relocate within the next 6 months?"},
    {question: "Have you lived in your current country for more than 1 year?"},
    {question: "Have you lived in your current country for less than 1 year?"},
    {question: "Are you married?"},
    {question: "Are you married to a European citizen?"},
    {question: "Are you married to a non-European foreigner?"},
    {question: "Are you married to another Asian person?"},
    {question: "Did you move here because of your partner?"},
    {question: "Is your partner a corporate expat?"},
    {question: "Is your partner a locally hired employee?"},
    {question: "Are you currently on a spouse visa?"},
    {question: "Are you currently on a student visa?"},
    {question: "Are you currently on a work visa?"},
    {question: "Are you on an artist visa?"},
    {question: "Did your employer sponsor your visa?"},
    {question: "Do you hold a permanent residency card?"},
    {question: "Are you currently employed full-time?"},
    {question: "Are you working in tech?"},
    {question: "Are you working in marketing, PR, or “communications”?"},
    {question: "Do you have children?"},
    {question: "Are your children multilingual?"},
    {question: "Do you raise your children in your native language?"},
    {question: "Are you freelancing or self-employed?"},
    {question: "Do you speak fluent English?"},
    {question: "Do you speak the language of the country you live in?"},
    {question: "Are you unemployed but looking for work?"},
    {question: "Do you use KakaoTalk?"},
    {question: "Have you ever felt too Asian for your European friends?"},
    {question: "Have you ever felt too Westernized for your Asian friends?"},
    {question: "Do you communicate with your in-laws in English?"},
    {question: "Do you communicate with your partner in a non-native language?"},
    {question: "Do you use WhatsApp?"},
    {question: "Do you use WeChat?"},
    {question: "Do you use Telegram?"},
    {question: "Is your profile photo your actual face?"},
    {question: "Is your username your real name?"},
    {question: "Do you identify as a feminist?"},
    {question: "Do you identify as a radical feminist?"},
    {question: "Do you avoid the word “feminist” in group bios or intros?"},
    {question: "Do you support a conservative party?"},
    {question: "Do you support a progressive party?"},
    {question: "Do you support a third party?"},
    {question: "Do you vote in your home country's elections?"},
    {question: "Do you vote in your resident country's elections?"},
    {question: "Are you Christian?"},
    {question: "Are you Catholic?"},
    {question: "Are you Protestant?"},
    {question: "Are you Buddhist?"},
    {question: "Are you Muslim?"},
    {question: "Are you Hindu?"},
    {question: "Are you an atheist?"},
    {question: "Are you agnostic?"},
    {question: "Do you attend religious services regularly?"},
    {question: "Do you identify as a woman?"},
    {question: "Do you identify as a man?"},
    {question: "Do you identify as non-binary?"},
    {question: "Are you heterosexual?"},
    {question: "Are you LGBTQ+?"},
    {question: "Are you out to your family?"},
    {question: "Are you married to someone of a different gender?"},
    {question: "Were you born in South Korea?"},
    {question: "Do you hold South Korean citizenship?"},
    {question: "Do you have dual citizenship?"},
    {question: "Did you grow up in South Korea?"},
    {question: "Did you grow up outside South Korea?"},
    {question: "Did you attend university?"},
    {question: "Did you study abroad?"},
    {question: "Did you graduate from a university ranked in the top 100?"},
    {question: "Did you receive a scholarship for your education?"},
    {question: "Did you grow up in a middle-class household?"},
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
    row.insertCell(1);
    row.insertCell(2);
    let cell2 = row.insertCell(3);
    let cell3 = row.insertCell(4);

    // let cell2 = row.insertCell(1);
    // let cell3 = row.insertCell(2);
    // Filling in the question
    cell1.innerHTML = quizData[i].question;
    cell1.setAttribute('class', 'question');
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
        output_div.innerHTML += "<p>Thank you for taking the time to fill-in the survey.<p>";
        output_div.innerHTML += "<p>Unfortunately, we cannot accept your request, since you answered \"no\" to the following:<p>";

        // Check did not answer yes to everything (maybe if list empty)

        // Get the questions that were answered no 
        for (let i = 0; i < quizData.length; i++) {
            let my_check = document.getElementById('q' + i + '_n');
            if (my_check.checked) {

                var text_out = "Q" + i + " - " + quizData[i].question;    
                output_div.appendChild(document.createElement("br"));           
                output_div.appendChild(document.createTextNode(text_out));
                // console.log(quizData[i].question);
            }
        }
        console.log(text_out);
        
        // Fix title: sorry you are rejected
        document.getElementById('title').innerText = 'Sorry, you are rejected';
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
