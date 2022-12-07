var urls = [                                                 // url should be a string or a Request object
    {url: 'https://jsonplaceholder.typicode.com/posts/1'},
    {url: 'https://jsonplaceholder.typicode.com/posts/2'},
    {url: 'https://jsonplaceholder.typicode.com/posts/3'}
];

for (i = 0; i <= urls.length; i++) {                         // i is not declared, i should be < to urls.length
    response = fetch(urls[i]);                               // response is not declared, fetch returns a promise and should be used asynchronously
    urls[i] = response;                                      // responses should be stored in a separate array
}

// should display a list of posts
console.log(urls);                                           // this will run before fetch finishes