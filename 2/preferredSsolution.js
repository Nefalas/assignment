// base URL for posts
const postBaseUrl = 'https://jsonplaceholder.typicode.com/posts/';

let responses = [];
for (let i = 0; i < 3; i++) {
    // build post URL and await response
    let response = await fetch(postBaseUrl + (i + 1));
    if (response.ok) {
        // await JSON content and save it to responses
        responses[i] = await response.json();
    }
}

// should display a list of posts
console.log(responses);