const addbutton = document.querySelector('.btn');
const addingbook = document.querySelector('.addingbook');
const ContainerSection = document.querySelector('.container');
const bookholder = {
  title: 'Don Quixote',
  author: 'Miguel de Cervantes',
};
let bookcollection;

if (((localStorage.getItem('links') === null) || ((localStorage.getItem('links'))))) {
  bookcollection = JSON.parse(localStorage.getItem('links'));
} else {
  bookcollection = [{
    title: 'Lord of the Rings',
    author: 'J.R.R. Tolkien',
    id: '1',
  },
  {
    title: 'Don Quixote',
    author: 'Miguel de Cervantes',
    id: '2',
  },
  ];
}
// dynamically load the page
function updatingstorage() {
  localStorage.setItem('links', JSON.stringify(bookcollection));
}

function bookremoval(id) {
  const filtered = bookcollection.filter((elem) => elem.id !== id);
  bookcollection = filtered;
  updatingstorage();
}

function bookArrangement(data) {
  const bookdetails = document.createElement('div');
  bookdetails.className = 'bookdetails';
  bookdetails.innerHTML = `<h1 class="booktitle">${data.title}</h1>
    <h3 class="author">${data.author}</h3>
    <button class="remove" type="submit" id="${data.id}" => Remove</button>
    
    <hr>`;
  ContainerSection.append(bookdetails);
  const removeBtn = document.getElementById(`${data.id}`);
  removeBtn.addEventListener('click', (e) => {
    bookremoval(e.target.id);
    ContainerSection.innerHTML = '';
    bookcollection.forEach((book) => {
      bookArrangement(book);
    });

    // console.log(bookcollection)
  });
}

function display() {
  ContainerSection.innerHTML = '';
  bookcollection.forEach((book) => {
    bookArrangement(book);

    // bookremoval(book);
  });
}

// storing in localstorage

display();

// adding books

addbutton.addEventListener('click', (event) => {
  event.preventDefault();
  const newBook = Object.create(bookholder);
  newBook.title = addingbook.elements.title.value;
  newBook.author = addingbook.elements.author.value;
  newBook.id = `${new Date().getTime()}`;
  bookcollection.push(newBook);
  bookArrangement(newBook);
  updatingstorage();
  bookremoval();
});