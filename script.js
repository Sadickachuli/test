const refreshButton = document.getElementById('refreshButton');
const fetchNewsButton = document.getElementById('fetchNewsButton');
const newsListContainer = document.getElementById('newsList');

refreshButton.addEventListener('click', () => {
    location.reload(); // Reload the page
});

fetchNewsButton.addEventListener('click', async () => {
    const url = 'https://climate-news-feed.p.rapidapi.com/page/1?limit=10';
    const options = {
        method: 'GET',
    };
    
    options.headers = new Headers();
    options.headers.append('X-RapidAPI-Key', 'ae6ba3d50bmsh85ba12c29d2cc3cp1cd314jsnd37ec2a679b7');
    options.headers.append('X-RapidAPI-Host', 'climate-news-feed.p.rapidapi.com');
    
    try {
        const response = await fetch(url, options);
        const result = await response.json(); // Parse JSON response
        displayNews(result.articles); // Modify this line
    } catch (error) {
        console.error(error);
    }
});

function displayNews(data) {
    newsListContainer.innerHTML = ''; // Clear previous content
    
    if (Array.isArray(data)) {
        for (const news of data) {
            const newsDiv = document.createElement('div');
            newsDiv.className = 'news-item';
            
            const newsTitle = document.createElement('h2');
            newsTitle.textContent = news.title;
            
            const newsSource = document.createElement('p');
            newsSource.textContent = 'Source: ' + news.source;
            
            const newsDate = document.createElement('p');
            newsDate.textContent = 'Publish Date: ' + news.published;
            
            const newsLink = document.createElement('a');
            newsLink.href = news.url;
            newsLink.textContent = 'Read More';
            
            newsDiv.appendChild(newsTitle);
            newsDiv.appendChild(newsSource);
            newsDiv.appendChild(newsDate);
            newsDiv.appendChild(newsLink);
            
            newsListContainer.appendChild(newsDiv);
        }
    } else {
        newsListContainer.textContent = 'No news available.';
    }
}
