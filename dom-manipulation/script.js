document.addEventListener('DOMContentLoaded', function () {
    const getQuote = document.getElementById('newQuote');
    const addQuote = document.getElementById('add_quote');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');

    
    getQuote.addEventListener('click', function showRandomQuote () {
        const randQuote = [{ 'barlight': '$15.45' }];
        const arrayObj = JSON.stringify(randQuote);
        alert(arrayObj);
    });

    
    addQuote.addEventListener('click', function createAddQuoteForm() {
        const quote = newQuoteText.value;
        const category = newQuoteCategory.value;

        
        const newQuote = {
            text: quote,
            category: category
        };

        localStorage.setItem('Your quote', JSON.stringify(newQuote));
        alert('Your Quote is: ' + JSON.stringify(newQuote));
    });
});
