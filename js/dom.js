/**
 * {
  id: string | number,
  title: string,
  author: string,
  year: number,
  isComplete: boolean,
}
 */

/**
 *  membuat variabel global yang bersifat constant untuk menampung id elemen
 */

const UNCOMPLETED_LIST_BOOK = "uncompletedBooks";
const COMPLETED_LIST_BOOK = "completedBooks";

function inputBook() {
  const uncompletedListBook = document.getElementById(UNCOMPLETED_LIST_BOOK);

  const bookTitle = document.getElementById("inputBookTitle").value;
  const authorBook = document.getElementById("inputAuthorBook").value;
  const yearBook = document.getElementById("inputBookYear").value;
  console.log(`Judul : ${bookTitle}`);
  console.log(`Penulis : ${authorBook}`);
  console.log(`Tahun : ${yearBook}`);

  const uncompletedBooks = makeItemBook(bookTitle, authorBook, yearBook);
  uncompletedListBook.append(uncompletedBooks);
}

// membuat elemen
function makeItemBook(title, author, year, isCompleted) {
  const bookListContainer = document.createElement("div");
  bookListContainer.classList.add("book-list");

  const bookItemContainer = document.createElement("div");
  bookItemContainer.classList.add("book-item");

  const textBookTitle = document.createElement("h3");
  textBookTitle.classList.add("title");
  textBookTitle.innerText = title;

  const textAuthorBook = document.createElement("p");
  textAuthorBook.classList.add("author");
  textAuthorBook.innerText = author;

  const textBookYear = document.createElement("p");
  textBookYear.classList.add("year");
  textBookYear.innerText = year;

  const actionContainer = document.createElement("div");
  actionContainer.classList.add("action");

  bookItemContainer.append(textBookTitle, textAuthorBook, textBookYear);

  if (isCompleted) {
    actionContainer.append(createUndoButton(), createDeleteButton());
  } else {
    actionContainer.append(createCheckButton(), createDeleteButton());
  }

  bookListContainer.append(bookItemContainer, actionContainer);
  return bookListContainer;
}

/**
 *  FUNCTION MEMBUAT BUTTON
 *  param buttonClass = memberi nama class pada setap button
 *  param eventListener = memberi listener pada setiap button
 */
// function createButton(buttonClass, eventListener) {
//   const button = document.createElement("button");
//   button.classList.add(buttonClass);
//   button.addEventListener("click", function (event) {
//     // isi function ini yaitu, jalankan function tertentu pada saat pemanggilan method
//     eventListener(event);
//   });
//   return button;
// }

/**
 *  MEMINDAHKAN  BUKU DARI RAK "BELUM DIBACA" KE "SUDAH DIBACA"
 */
function addBookToCompleted(bookElement) {
  //ambil text / value dari element
  const taskTitle = bookElement.querySelector("#uncompletedBooks > .book-list > .book-item > h3.title").innerText;
  console.log(taskTitle);
  const taskAuthor = bookElement.querySelector("#uncompletedBooks > .book-list > .book-item > p.author").innerText;
  const taskYear = bookElement.querySelector("#uncompletedBooks > .book-list > .book-item > p.year").innerText;

  //panggil method  makeItemBook() lalu isi parameter dengan text / value yang sudah diambil
  const completedBook = makeItemBook(taskTitle, taskAuthor, taskYear, true);

  //panggil element dengan id COMPLETED_LIST_BOOK
  const listCompleted = document.getElementById(COMPLETED_LIST_BOOK);

  //masukan value variabel completedBooks ke listCompleted
  listCompleted.append(completedBook);

  bookElement.remove();
}

/**
 *  MENGEMBALIKAN BUKU DARI RAK "SUDAH DIBACA" KE "BELUM DIBACA"
 */
function returnBookToUncompleted(bookElement) {
  const taskTitle = bookElement.querySelector("#completedBooks > .book-list > .book-item > h3.title").innerText;
  const taskAuthor = bookElement.querySelector("#completedBooks > .book-list > .book-item > p.author").innerText;
  const taskYear = bookElement.querySelector("#completedBooks > .book-list > .book-item > p.year").innerText;

  const uncompletedBook = makeItemBook(taskTitle, taskAuthor, taskYear, false);
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK);
  listUncompleted.append(uncompletedBook);
  bookElement.remove();
}

/**
 *  MENGHAPUS BUKU PADA RAK
 */
function removeBookFromBookshelf(bookElement) {
  bookElement.remove();
}

/**
 *  MEMBUAT CHECK BUTTON
 */
// function createCheckButton() {
//   return createButton("complete", function (event) {
//     addBookToCompleted(event.target.parentElement.parentElement);
//   });
// }

/**
 *  MEMBUAT CHECK BUTTON
 */
function createCheckButton() {
  const button = document.createElement("button");
  button.classList.add("complete");
  button.innerHTML = '<i class="fas fa-check"></i>';
  button.addEventListener("click", function (event) {
    addBookToCompleted(event.target.parentElement.parentElement);
  });
  return button;
}

/**
 *  MEMBUAT DELETE BUTTON
 */
function createDeleteButton() {
  const button = document.createElement("button");
  button.classList.add("delete");
  button.innerHTML = '<i class="far fa-trash-alt"></i>';
  button.addEventListener("click", function (event) {
    removeBookFromBookshelf(event.target.parentElement.parentElement);
  });
  return button;
}

/**
 *  MEMBUAT UNDO BUTTON
 */
function createUndoButton() {
  const button = document.createElement("button");
  button.classList.add("undo");
  button.innerHTML = '<i class="fas fa-undo"></i>';
  button.addEventListener("click", function (event) {
    returnBookToUncompleted(event.target.parentElement.parentElement);
  });
  return button;
}
