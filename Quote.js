//Javascriptpro_
 let generateQuoteBtn = document.querySelector('.new-quote-btn');
let quote = document.querySelector('.quote');
let author = document.querySelector('.author');
let copyBtn = document.querySelector('.copy');
let copyIcon = document.querySelector('.copy i');
let copyText = document.querySelector('.copy span');
let speakBtn = document.querySelector('.speak');
let twitterBtn = document.querySelector('.twitter');

const url = "https://api.quotable.io/random";

generateQuoteBtn.addEventListener('click',()=>{
 generateQuoteBtn.classList.add('click-animation'); 
  getQuote();
setTimeout(()=>{
 generateQuoteBtn.classList.remove('click-animation'); 
},200)
speechSynthesis.cancel();
})

let currentQuoteIndex = 0;
let quotesData = [];


const nextButton = document.querySelector('.new-quote-btn');

// fetch the quotes
const fetchQuotes = () => {
  fetch("https://type.fit/api/quotes")
    .then((response) => response.json())
    .then((data) => {
      quotesData = data;
      displayCurrentQuote();
    })
    .catch((error) => {
      console.error('Error fetching quotes:', error);
    });
};

// display the quote
const displayCurrentQuote = () => {
  const currentQuote = quotesData[currentQuoteIndex];
  if (currentQuote) {
    quote.innerHTML = currentQuote.text;
    author.innerHTML = '-' + currentQuote.author;
  } else {
    console.log('No more quotes available');
  }
};

const showNextQuote = () => {
  currentQuoteIndex++;
  if (currentQuoteIndex >= quotesData.length) {
    currentQuoteIndex = 0; // Start over if we reached the end
  }
  displayCurrentQuote();
};

nextButton.addEventListener('click', showNextQuote);

// Fetch quotes when the page loads
document.addEventListener('DOMContentLoaded', fetchQuotes);



copyBtn.addEventListener('click',()=>{
 navigator.clipboard.writeText(quote.textContent);
 copyIcon.style.display = 'none';
 copyText.style.display = 'block';
 setTimeout(()=>{
 copyIcon.style.display = 'block';
 copyText.style.display = 'none';
 },400)
})

speakBtn.addEventListener('click',()=>{
let speech = new SpeechSynthesisUtterance();
speech.text = `${quote.textContent} by ${author.textContent}`;
speechSynthesis.speak(speech);
});

twitterBtn.addEventListener('click',()=>{
 let tweetUrl = `https://twitter.com/intent/tweet?url=${quote.textContent}                              
 ${author.textContent}`;
 window.open(tweetUrl, "_blank");        
});

getQuote();