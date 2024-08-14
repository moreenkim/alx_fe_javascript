// script.js

document.addEventListener('DOMContentLoaded', function () {
    // Initialize quotes array
    let quotes = [
        { text: "The only way to do great work is to love what you do.", category: "Inspirational" },
        { text: "Life is what happens when you're busy making other plans.", category: "Life" },
        { text: "The purpose of our lives is to be happy.", category: "Happiness" }
    ];

    // Select DOM elements
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');

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
        const form = document.createElement('form');
        form.id = 'addQuoteForm';

        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.name = 'quoteText';
        textInput.placeholder = 'Enter quote text';
        textInput.required = true;

        const categoryInput = document.createElement('input');
        categoryInput.type = 'text';
        categoryInput.name = 'quoteCategory';
        categoryInput.placeholder = 'Enter quote category';
        categoryInput.required = true;

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Add Quote';

        form.appendChild(textInput);
        form.appendChild(categoryInput);
        form.appendChild(submitButton);

        // Handle form submission
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const quoteText = textInput.value.trim();
            const quoteCategory = categoryInput.value.trim();

            if (quoteText && quoteCategory) {
                quotes.push({ text: quoteText, category: quoteCategory });
                textInput.value = '';
                categoryInput.value = '';
                createAddQuoteForm(); // Reset the form
                showRandomQuote(); // Show a new random quote
            }
        });

        // Display the form
        const formContainer = document.getElementById('addQuoteFormContainer');
        if (formContainer) {
            formContainer.innerHTML = ''; // Clear any existing form
            formContainer.appendChild(form);
        }
    }

    // Attach event listeners
    newQuoteButton.addEventListener('click', function () {
        // Show form to add new quote
        if (!document.getElementById('addQuoteForm')) {
            createAddQuoteForm();
        }
        // Show a new random quote
        showRandomQuote();
    });

    // Display a random quote on page load
    showRandomQuote();
});
