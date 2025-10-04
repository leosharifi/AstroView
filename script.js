const input = document.querySelector('input');
const btn = document.querySelector('button');
const result = document.querySelector('.result');



btn.addEventListener('click', () => {
    const inputVal = input.value;
    const url = `https://api.nasa.gov/planetary/apod?api_key=VjJCB3vmUW8yKVTjzJdhHWCxwcdulg51gNvvsvvq&date=${inputVal}`;
    result.innerHTML = ''
    if(!inputVal) {
        const error = document.createElement('h3');
        error.textContent = 'Please Enter a Date';
        result.appendChild(error);
        return;
    }
    else if(new Date(inputVal) > new Date()) {
        const error = document.createElement('h3');
        error.textContent = 'Date cannot be in the future';
        result.appendChild(error);
        return;
    }

    fetch(url)
    .then(res => res.json())
    .then(data => {
        if(data.code) {
            const error = document.createElement('h3');
            error.textContent = data.msg;
            result.appendChild(error);
            return;
        }
        const image = document.createElement('img');
        const title = document.createElement('h2');
        const descriptions = document.createElement('p');
        
        image.src = data.url;
        title.textContent = data.title;
        descriptions.textContent = data.explanation;
        

        result.appendChild(image);
        result.appendChild(title);
        result.appendChild(descriptions);
        

    })
    .catch(err => {
        alert(`Didn't fetch the Data at: ${err}`);
    })
})
