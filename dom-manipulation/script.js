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
    randomQuotes = JSON.parse(storedQuotes);
  } else {
    randomQuotes = [
        { text: "rice", category: "food" },
  { text: "coke", category: "drinks" } 
      
    ];
    saveQuotesToStorage();
  }
}


function saveSelectedCategory(category) {
  localStorage.setItem("selectedCategory", category);
}

function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  if (!categoryFilter) return;

  const selected = localStorage.getItem("selectedCategory") || "all";
  const uniqueCategories = Array.from(new Set(randomQuotes.map(q => q.category)));

  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  uniqueCategories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    if (cat === selected) option.selected = true;
    categoryFilter.appendChild(option);
  });
}


function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  saveSelectedCategory(selectedCategory);

  const filtered = selectedCategory === "all"
    ? randomQuotes
    : randomQuotes.filter(q => q.category === selectedCategory);

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";

  if (filtered.length === 0) {
    quoteDisplay.innerText = "No quotes found in this category.";
    return;
  }

  filtered.forEach(quote => {
    const p = document.createElement("p");
    p.innerText = `"${quote.text}" — ${quote.category}`;
    quoteDisplay.appendChild(p);
  });
}


function showRandomQuote() {
  if (randomQuotes.length === 0) return;

  const randomIndex = Math.floor(Math.random() * randomQuotes.length);
  const quote = randomQuotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";

  const quoteElement = document.createElement("p");
  quoteElement.innerText = `"${quote.text}" — ${quote.category}`;
  quoteDisplay.appendChild(quoteElement);

  sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
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

  const newQuote = { text, category };
  randomQuotes.push(newQuote);
  saveQuotesToStorage();

  populateCategories();
  filterQuotes();

  textInput.value = "";
  categoryInput.value = "";

  alert("Quote added!");
}


function exportQuotes() {
  const dataStr = JSON.stringify(randomQuotes, null, 2);
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
        populateCategories();
        filterQuotes();

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


document.addEventListener("DOMContentLoaded", function () {
  loadQuotesFromStorage();

  const lastViewed = sessionStorage.getItem("lastViewedQuote");
  if (lastViewed) {
    const quote = JSON.parse(lastViewed);
    const quoteDisplay = document.getElementById("quoteDisplay");
    const p = document.createElement("p");
    p.innerText = `"${quote.text}" — ${quote.category}`;
    quoteDisplay.appendChild(p);
  }

  populateCategories();
  filterQuotes();

  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  document.querySelector("form").addEventListener("submit", addQuote);
  document.getElementById("exportBtn").addEventListener("click", exportQuotes);
  document.getElementById("importInput").addEventListener("change", importQuotes);
  document.getElementById("categoryFilter").addEventListener("change", filterQuotes);
});
const SERVER_ENDPOINT = "https://mockapi.io/clone/686aecbbe559eba908712b6c"; 


// Save to localStorage
function saveQuotesToStorage() {
  localStorage.setItem("randomQuotes", JSON.stringify(randomQuotes));
}

// Load from localStorage
function loadQuotesFromStorage() {
  const stored = localStorage.getItem("randomQuotes");
  randomQuotes = stored ? JSON.parse(stored) : [];
}

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.className = `notification ${type}`;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 4000);
}

// Fetch quotes from server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_ENDPOINT);
    if (!response.ok) throw new Error("Failed to fetch from server");

    const serverQuotes = await response.json();
    const merged = mergeQuotes(serverQuotes, randomQuotes);
    if (merged.updated) {
      randomQuotes = merged.quotes;
      saveQuotesToStorage();
      showNotification("Quotes synced with server. Server changes applied.", "success");
      if (typeof filterQuotes === "function") filterQuotes();
    }
  } catch (error) {
    console.error("Sync error:", error);
    showNotification("Failed to sync with server.", "error");
  }
}


async function pushQuotesToServer() {
  try {
    for (const quote of randomQuotes) {
      await fetch(SERVER_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quote),
      });
    }
    showNotification("Local quotes pushed to server.", "success");
  } catch (error) {
    console.error("Push error:", error);
    showNotification("Failed to push to server.", "error");
  }
}

// Merge server and local quotes with conflict resolution
function mergeQuotes(serverData, localData) {
  let updated = false;
  const merged = [...localData];

  serverData.forEach(serverQuote => {
    const exists = localData.some(
      localQuote =>
        localQuote.text === serverQuote.text &&
        localQuote.category === serverQuote.category
    );

    if (!exists) {
      merged.push(serverQuote);
      updated = true;
    }
  });

  return { quotes: merged, updated };
}


function resolveConflictsManually(serverQuote, localQuote) {
  const userChoice = confirm(`Conflict detected:
Server: "${serverQuote.text}" (${serverQuote.category})
Local: "${localQuote.text}" (${localQuote.category})
Use server version?`);

  return userChoice ? serverQuote : localQuote;
}


function syncQuotes() {
  fetchQuotesFromServer(); 
  setInterval(fetchQuotesFromServer, 15000); 
}
document.addEventListener("DOMContentLoaded", () => {
  loadQuotesFromStorage();
  syncQuotes();
});


});
