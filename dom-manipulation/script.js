// script.js

document.addEventListener("DOMContentLoaded", function () {
  // Initialize quotes array
  let quotes = loadQuotes(); // Load quotes from localStorage or initialize with an empty array

  // Select DOM elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteButton = document.getElementById("newQuote");
  const exportButton = document.getElementById("exportQuotes");
  const importInput = document.getElementById("importFile");

  // Function to show a random quote
  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.textContent = "No quotes available.";
      return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
  }

  // Function to create and display the add quote form
  function createAddQuoteForm() {
    const form = document.createElement("form");
    form.id = "addQuoteForm";

    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.name = "quoteText";
    textInput.placeholder = "Enter quote text";
    textInput.required = true;

    const categoryInput = document.createElement("input");
    categoryInput.type = "text";
    categoryInput.name = "quoteCategory";
    categoryInput.placeholder = "Enter quote category";
    categoryInput.required = true;

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Add Quote";

    form.appendChild(textInput);
    form.appendChild(categoryInput);
    form.appendChild(submitButton);

    // Handle form submission
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const quoteText = textInput.value.trim();
      const quoteCategory = categoryInput.value.trim();

      if (quoteText && quoteCategory) {
        // Add new quote to the quotes array
        quotes.push({ text: quoteText, category: quoteCategory });
        // Save the updated quotes array to localStorage
        saveQuotes();
        // Clear the form and show a new random quote
        textInput.value = "";
        categoryInput.value = "";
        createAddQuoteForm(); // Reset the form
        showRandomQuote(); // Show a new random quote
      }
    });

    // Display the form
    const formContainer = document.getElementById("addQuoteFormContainer");
    if (formContainer) {
      formContainer.innerHTML = ""; // Clear any existing form
      formContainer.appendChild(form);
    }
  }

  // Save quotes to localStorage
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }

  // Load quotes from localStorage
  function loadQuotes() {
    const storedQuotes = localStorage.getItem("quotes");
    return storedQuotes ? JSON.parse(storedQuotes) : [];
  }

  // Function to export quotes to a JSON file
  function exportQuotes() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url); // Clean up the URL object
  }

  // Function to import quotes from a JSON file
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

  <input
    type="file"
    id="importFile"
    accept=".json"
    onchange="importFromJsonFile(event)"
  />;

//   function importFromJsonFile(event) {
//     const fileReader = new FileReader();
//     fileReader.onload = function (event) {
//       const importedQuotes = JSON.parse(event.target.result);
//       quotes.push(...importedQuotes);
//       saveQuotes();
//       alert("Quotes imported successfully!");
//     };
//     fileReader.readAsText(event.target.files[0]);
//   }
  // Attach event listeners
  newQuoteButton.addEventListener("click", function () {
    // Show form to add new quote
    if (!document.getElementById("addQuoteForm")) {
      createAddQuoteForm();
    }
    // Show a new random quote
    showRandomQuote();
  });

  exportButton.addEventListener("click", exportQuotes);
  importInput.addEventListener("change", importFromJsonFile);

  // Display a random quote on page load
  showRandomQuote();
});
