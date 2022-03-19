const btn = document.querySelector('.get-jokes');
btn.addEventListener('click', getJokes);

function getJokes(e) {
  const number = document.querySelector('input[type=number]').value;
  const formGroup = document.querySelector('.form-group');
  const xhr = new XMLHttpRequest();

  if (number !== '') {
    xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);
  
    xhr.onload = function() {
      if (this.status === 200) {
        const response = JSON.parse(this.responseText);
  
        let output = '';
  
        if (response.type === 'success') {
          response.value.forEach(function(joke) {
            output += `<li>${joke.joke}</li>`;
          });
        } else {
          output += '<li>Something went wrong</li>'
        }
  
        document.querySelector('.jokes').innerHTML = output;
      }
    }
    xhr.send();
  } else {
    const message = 'Hit a number, baby!';
    const div = document.createElement('div');
    div.className = 'alert';
    div.style.color = 'red';
    div.appendChild(document.createTextNode(message));
    formGroup.appendChild(div);

    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000)
  }

  e.preventDefault();
}