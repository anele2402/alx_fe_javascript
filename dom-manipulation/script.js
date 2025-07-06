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

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

function saveQuotesToStorage() {
  localStorage.setItem("randomQuotes", JSON.stringify(randomQuotes));
}

function loadQuotesFromStorage() {
  const storedQuotes = localStorage.getItem("randomQuotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}


function exportQuotes() {
  const dataStr = JSON.stringify(randomQuotesuotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "randomQuotes.json";
  link.click();

  URL.revokeObjectURL(url);
}

function importQuotes(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);

      if (Array.isArray(importedQuotes)) {
        importedQuotes.forEach(quote => {
          if (quote.text && quote.category) {
            randomQuotes.push({ text: quote.text, category: quote.category });
          }
        });

        saveQuotesToStorage();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format. Must be an array of quote objects.");
      }
    } catch (err) {
      alert("Error reading JSON file.");
    }
  };

  reader.readAsText(file);
}

// Attach event listeners
document.addEventListener("DOMContentLoaded", function () {
  loadQuotesFromStorage();

  document.getElementById("exportBtn").addEventListener("click", exportQuotes);
  document.getElementById("importInput").addEventListener("change", importQuotes);
});


});
