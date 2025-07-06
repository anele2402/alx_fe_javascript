document.addEventListener('DOMContentLoaded', function () {
   let randomQuotes = [
  { text: "rice", category: "food" },
  { text: "coke", category: "drinks" }
];

document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

function showNewQuote() {
  const randomIndex = Math.floor(Math.random() * randomQuotes.length);
  const randquote = randomQuotes[randomIndex];
  document.getElementById("quoteDisplay").innerText = `"${randquote.text}" — ${randquote.category}`;
}
function displayRandomQuote(){
    showNewQuote();
    randomQuote = ['showRandomQuote','innerHTML'];
}
function addQuote(event) {
  event.preventDefault();

  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Please enter both quote text and category.");
    return;
  }

  const newQuote = {
    text,
    category
  };


  randomQuotes.push(newQuote);
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";

  const newQuoteElement = document.createElement("p");
  newQuoteElement.innerText = `"${newQuote.text}" — ${newQuote.category}`;

  quoteDisplay.appendChild(newQuoteElement);

  textInput.value = "";
  categoryInput.value = "";

  alert("Quote added successfully!");
}

function createAddQuoteForm() {
  const form = document.querySelector("form");
  form.addEventListener("submit", addQuote);
}

document.getElementById("add_quote").addEventListener("click", addQuote);


});
