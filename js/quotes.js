const quotes = [
    {quote: "Don't wait! The time will never be just right.", author: "Napoleon Hill"},
    {quote: "Lay a firm foundation with the bricks that others throw at you.", author: "David McClure Brinkley"},
    {quote: "Love looks not with the eyes, but with the mind.", author: "William Shakespeare"},
    {quote: "Nothing is more despicable than respect based on fear.", author: "Albert Camus"},
    {quote: "If you want the present to be different from the past, study the past.", author: "Baruch Spinoza"},
    {quote: "In youth we learn in age we understand.", author: "Marie von Ebner-Eschenbach"},
    {quote: "Luck is the residue of design.", author: "Wesley Branch Rickey"},
    {quote: "It is a bad plan that admits of no modification.", author: "Publilius Syrus"},
    {quote: "One word frees us of all the weight and pain of life. That word is love.", author: "Sophocles"},
    {quote: "Prosperity makes friends, adversity tries them.", author: "Publilius Syrus"}
]

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const todayQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todayQuote.quote;
author.innerText = todayQuote.author;