var urls = [
    {url: 'https://jsonplaceholder.typicode.com/posts/1'},
    {url: 'https://jsonplaceholder.typicode.com/posts/2'},
    {url: 'https://jsonplaceholder.typicode.com/posts/3'}
];

var responses = [];
for (var i = 0; i < urls.length; i++) {
    let response = await fetch(urls[i].url);
    if (response.ok) {
        responses[i] = await response.json();
    }
}

// should display a list of posts
console.log(responses);