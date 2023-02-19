/* eslint-disable max-classes-per-file */
const addbutton = document.querySelector('.btn');
const addingbook = document.querySelector('.addingbook');
const ContainerSection = document.querySelector('.container');

let bookcollection;

class Books {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

if (localStorage.getItem('links') === null) {
  bookcollection = JSON.parse(localStorage.getItem('links'));
} else {
  const book1 = new Books('Lord of the Rings', 'J.R.R. Tolkien', '1');
  const book2 = new Books('Don Quixote', 'Miguel de Cervantes', '2');
  bookcollection = [book1, book2];
}
// dynamically load the page
function updatingstorage() {
  localStorage.setItem('links', JSON.stringify(bookcollection));
}

class Activity {
  addbook() {
    const newBook = new Books();
    newBook.title = addingbook.elements.title.value;
    newBook.author = addingbook.elements.author.value;
    // newBook.id = `${new Date().getTime()}`;
    newBook.id = `${bookcollection.length + 1}`;
    bookcollection.push(newBook);

    updatingstorage();
    addingbook.elements.title.value = '';
    addingbook.elements.author.value = '';

    return this;
  }

  bookremoval(id) {
    const filtered = bookcollection.filter((elem) => elem.id !== id);
    bookcollection = filtered;
    updatingstorage();
    return this;
  }
}

const newAction = new Activity();
function bookArrangement(data) {
  const bookdetails = document.createElement('div');
  bookdetails.className = 'bookdetails';
  bookdetails.innerHTML = `<h1 class="booktitle">"${data.title}" </h1>
    <h3 class="author"> by ${data.author}</h3>
    <button class="remove" type="submit" id="${data.id}" => Remove</button>
    
    <hr>`;
  ContainerSection.append(bookdetails);
  const removeBtn = document.getElementById(`${data.id}`);
  removeBtn.addEventListener('click', (e) => {
    newAction.bookremoval(e.target.id);
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
  newAction.addbook();
  display();
});

const currentDate = document.querySelector('.date');
const contactdetail = document.querySelector('.contactdetail');
const addbooksection = document.querySelector('.addbookSection');

const booklistdisplay = document.querySelector('.booklistdisplay');

const dateTime = new Date();
const day = dateTime.toLocaleDateString('en-US', {
  dateStyle: 'long',
});

const time = dateTime.toLocaleTimeString('en-US', {
  timeStyle: 'medium',
});
currentDate.innerHTML = `${day}  ${time}`;

const links = document.querySelectorAll('.link');
const fun = document.querySelectorAll('.fun');

links.forEach((link) => link.addEventListener('click', (e) => {
  if (e.target.id === 'list') {
    fun.forEach((funs) => {
      funs.classList.remove('blue');
    });
    e.target.classList.add('blue');
    addbooksection.classList.add('hide');
    contactdetail.classList.add('hide');
    booklistdisplay.classList.remove('hide');
  } else if (e.target.id === 'addbook') {
    fun.forEach((funs) => {
      funs.classList.remove('blue');
    });

    e.target.classList.add('blue');
    addbooksection.classList.remove('hide');
    contactdetail.classList.add('hide');
    booklistdisplay.classList.add('hide');
  } else if (e.target.id === 'contact') {
    fun.forEach((funs) => {
      funs.classList.remove('blue');
    });

    e.target.classList.add('blue');
    addbooksection.classList.add('hide');
    contactdetail.classList.remove('hide');
    booklistdisplay.classList.add('hide');
  }
}));