const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete() {
    if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
    }
}
// show new quote
function newQuote() {
    loading();
    //  pick a random quote from api quotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author field is blank and replace it with UNKNOWN
    if (!quote.author) {
        authorText.textContent = 'Unkonwn';
    } else {
        authorText.textContent = quote.author;
    }
    // check the quote length o determine the styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl='https://type.fit/api/quotes';
    try {
        const responce = await fetch(apiUrl);
        apiQuotes = await responce.json();
        newQuote();
    } catch (error) {
        // catch error here
    }
}

// https://twitter.com/intent/tweet
// tweet a quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuotes();