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
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    randomQuotes.push({ text, category });
    document.getElementById("newQuoteText").value = '';
    document.getElementById("newQuoteCategory").value = '';
    alert("Quote added!");
  } else {
    alert("Please fill in both fields.");
  }
}
function createAddQuoteForm (){
    addQuote();
}
document.getElementById("add_quote").addEventListener("click", addQuote);


});
