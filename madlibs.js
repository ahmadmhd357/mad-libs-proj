let objectsArray = [];
//This function will be used for alert 
function onlyLetters(str) {
  return /^[A-Za-z]*$/.test(str);
}
function parseStory(rawStory) {
  let storyArr = rawStory.split(" ");
  storyArr.forEach((element) => {
    let storyWord = element.match(/\w+(?=\s*\[)/g);
    let wordType = element.substr(-3);
    let checkWordType = () => {
      if (wordType === "[a]") {
        return "adjective";
      } else if (wordType === "[n]") {
        return "noun";
      } else if (wordType === "[v]") {
        return "verb";
      }
    };
    if (storyWord) {
      return objectsArray.push({ word: element.slice(0, -3), pos: checkWordType() });
    } 
    else {
      return objectsArray.push({ word: element });
    }
  });
  let inputValue;
  let p = document.getElementById("paragraph");
  objectsArray.map((object, index) => {
    if (object.pos) {
      let input = document.createElement("input");

      input.setAttribute("type", "text");
      input.setAttribute("placeholder", object.pos);
      input.setAttribute("class", "inputs");
      input.setAttribute("maxLength", "20");
      p.appendChild(input);
      input.addEventListener("keydown", (e) => {
        if (!onlyLetters(e.key)) {
          e.preventDefault();
          alert("Please enter alphabetic characters");
        }
      })

      input.addEventListener("input", (e) => {
        inputValue = e.target.value;
        let x = document.getElementById(index);
        x.innerText = e.target.value;
      });
    } else {
      let text = document.createTextNode(" " + object.word);
      p.appendChild(text);
      return;
    }
  });
//Preview mode
  let p2 = document.getElementById("paragraph2");
  objectsArray.map((object, index) => {
    if (object.pos) {
      valueSpan = document.createElement("span");
      valueSpan.setAttribute("id", index);
      p2.appendChild(valueSpan);
    } else {
      text = document.createTextNode(" " + object.word + " ");
      p2.appendChild(text);
    }
  });
  let inputs = document.getElementsByClassName("inputs");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keydown", (e) => {
      if (e.which === 13 || e.which === 39) {
        e.preventDefault();
        inputs[i].nextElementSibling.focus();
      } else if (e.which === 37) {
        e.preventDefault();
        inputs[i].previousElementSibling.focus();
      }
    });
  }
  
}
let flex = document.getElementsByClassName('flex')
let preview = document.getElementById("preview");
let story = document.getElementById("story");
  let mainContainer = document.getElementById('main').style.display = 'none';
    let welcome = document.createElement('div');
    welcome.classList.add('welcome');
    let head = document.createElement('h1')
    head.classList.add('welcome-title')
    welcome.appendChild(head);
    head.textContent = 'Welcome To #Codezilla Mad Libs'
    document.querySelector('body').appendChild(welcome)
    
    let btn = document.createElement('button')
    welcome.appendChild(btn)
    btn.classList.add('btn')
    btn.textContent = 'START';
    btn.addEventListener('click',(e)=>{
    e.preventDefault()
    welcome.style.display = 'none';
    mainContainer = document.getElementById('main').style.display = 'block';
    })

let headers = document.getElementsByTagName("h1");
for (let i = 0, len = headers.length; i < len; i++) {
  headers[i].innerHTML = headers[i].innerHTML.toUpperCase();
}
getRawStory().then(parseStory);
