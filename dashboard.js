document.addEventListener('DOMContentLoaded', fetchFakeNews);
const newsContainer = document.querySelector('.news-container');

function setCardColor(prediction) {
    if (prediction == "Real") 
        return "green"
    else
        return "red"
}

function populateNews(news) {
    let newsContent = "";
    if (news.length == 0) {
        newsContent += `
            <div class="coming-soon">
                <h1>Coming Soon...</h1>
            </div>
        `
        newsContainer.innerHTML = newsContent;
        return;
    }
    news.forEach((newsArticle) => {
        let color = setCardColor(newsArticle.prediction);
        newsContent += `
            <div class="news-article ${color}">
                <h1 class="news-title">${newsArticle.title}</h1>
                <div class="news-article-info">
                    <div class="news-article-source-date">
                        <h5>${newsArticle.source}</h5>
                        <h5>${newsArticle.date_posted}</h5>
                    </div>
                    <div class="news-article-prediction-container">
                        <h5 class="news-article-prediction">${newsArticle.prediction}</h5>
                    </div>
                </div>
            </div>
        `
        newsContainer.innerHTML = newsContent;
    });
}


function fetchFakeNews() {
    let url = `https://fakenserver.herokuapp.com/api/predictednews`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        populateNews(data);
    }).catch(err => {
        console.log(err);
    });
}