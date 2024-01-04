const API_KEY = '6e55b7f5c2ef40ae8dab6fe6ab7a0ab6'
const url = 'https://newsapi.org/v2/everything?q='

window.addEventListener('load', () => fetchNews('India'))

function reload() {
    window.location.reload()
}

async function fetchNews(query) {
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await response.json()
    bindData(data.articles)
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container')
    const newsCardTemplate = document.getElementById('template-news-card')

    cardsContainer.innerHTML = ``;

    articles.forEach(article => {
        if (!article.urlToImage) return
        const cardClone = newsCardTemplate.content.cloneNode(true)
        fillDataInCard(cardClone, article)
        cardsContainer.appendChild(cardClone)
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img')
    const newsTitle = cardClone.querySelector('#news-title')
    const newsSource = cardClone.querySelector('#news-source')
    const newsDesc = cardClone.querySelector('#news-desc')

    newsImg.src = article.urlToImage
    newsTitle.innerText = article.title
    newsDesc.innerText = article.description

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    })

    newsSource.innerText = `${article.source.name} • ${date}`

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;
function onNavItemClick(query) {
    fetchNews(query);    
    const navItem = document.getElementById(query);
    if(curSelectedNav) curSelectedNav.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchBtn = document.getElementById('search-button')
const searchTxt = document.getElementById('news-input')

searchBtn.addEventListener('click', () => {
    const query = searchTxt.value
    if(!query) return
    fetchNews(query)
    currSelectedNav.classList.remove('active')
    currSelectedNav = null
})