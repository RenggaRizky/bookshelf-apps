/**
 *  membuat variabel global yang bersifat constant untuk menampung id elemen
 */

const UNCOMPLETED_LIST_BOOK = "uncompletedBooks";
const COMPLETED_LIST_BOOK = "completedBooks";
const BOOK_ITEM_ID = "bookItemid";

/**
 *  Memasukan buku pada rak
 */
function inputBook() {
  const uncompletedListBook = document.getElementById(UNCOMPLETED_LIST_BOOK);
  const completedListBook = document.getElementById(COMPLETED_LIST_BOOK);

  // ambil value dari elemen input pada form
  const bookTitle = document.getElementById("inputBookTitle").value;
  const authorBook = document.getElementById("inputAuthorBook").value;
  const yearBook = document.getElementById("inputBookYear").value;

  // mendeklarasikan variabel untuk buku yang belum selesai dan buku yang sudah selesai
  const uncompletedBooks = makeItemBook(bookTitle, authorBook, yearBook, false);
  const completedBooks = makeItemBook(bookTitle, authorBook, yearBook, true);
  const check = document.getElementById("checkboxForComplete");
  let bookshelfObject;

  // statement untuk checkbox "buku sudah selesai" jika diklik
  if (check.checked == true) {
    completedListBook.append(completedBooks);

    //variabel yang dibuat untuk menyimpan object yang disusun method composeBookshelfObject
    bookshelfObject = composeBookshelfObject(bookTitle, authorBook, yearBook, true);

    //deklarikan variabel untuk memilih id pada objek(yang disimpan di variabel bookshelfObject) lalu simpan di variabel completedBooks dengan indeks key BOOK_ITEM_ID
    completedBooks[BOOK_ITEM_ID] = bookshelfObject.id;
  } else {
    uncompletedListBook.append(uncompletedBooks);
    bookshelfObject = composeBookshelfObject(bookTitle, authorBook, yearBook, false);
    uncompletedBooks[BOOK_ITEM_ID] = bookshelfObject.id;
  }

  //masukan data ke object bookshelf
  bookshelf.push(bookshelfObject);
  updateDataStorage();
}

// membuat elemen buku
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

  // statement untuk button yang ditampilkan pada container
  if (isCompleted) {
    actionContainer.append(createUndoButton(), createDeleteButton());
  } else {
    actionContainer.append(createCheckButton(), createDeleteButton());
  }

  bookListContainer.append(bookItemContainer, actionContainer);
  return bookListContainer;
}

/**
 *  MEMINDAHKAN  BUKU DARI RAK "BELUM DIBACA" KE "SUDAH DIBACA"
 */
function addBookToCompleted(bookElement) {
  //ambil text atau value dari elemen
  const taskTitle = bookElement.querySelector("#uncompletedBooks > .book-list > .book-item > h3.title").innerText;
  const taskAuthor = bookElement.querySelector("#uncompletedBooks > .book-list > .book-item > p.author").innerText;
  const taskYear = bookElement.querySelector("#uncompletedBooks > .book-list > .book-item > p.year").innerText;

  //panggil method  makeItemBook() lalu isi parameter dengan text atau value yang sudah diambil
  const completedBook = makeItemBook(taskTitle, taskAuthor, taskYear, true);

  //mencari objek bookshelf yang akan diupdate melalui id buku yang didapat dari key BOOK_ITEM_ID
  const book = findBook(bookElement[BOOK_ITEM_ID]);

  //memperbarui status buku
  book.isCompleted = true;
  completedBook[BOOK_ITEM_ID] = book.id;

  //panggil element dengan id COMPLETED_LIST_BOOK
  const listCompleted = document.getElementById(COMPLETED_LIST_BOOK);

  //masukan value dari variabel completedBooks ke listCompleted
  listCompleted.append(completedBook);

  // menghapus elemen yang dituju
  bookElement.remove();

  updateDataStorage();
}

/**
 *  MENGEMBALIKAN BUKU DARI RAK "SUDAH DIBACA" KE "BELUM DIBACA"
 */
function returnBookToUncompleted(bookElement) {
  //ambil text atau value dari elemen
  const taskTitle = bookElement.querySelector("#completedBooks > .book-list > .book-item > h3.title").innerText;
  const taskAuthor = bookElement.querySelector("#completedBooks > .book-list > .book-item > p.author").innerText;
  const taskYear = bookElement.querySelector("#completedBooks > .book-list > .book-item > p.year").innerText;

  //panggil method  makeItemBook() lalu isi parameter dengan text atau value yang sudah diambil
  const uncompletedBook = makeItemBook(taskTitle, taskAuthor, taskYear, false);

  const book = findBook(bookElement[BOOK_ITEM_ID]);
  book.isCompleted = false;
  uncompletedBook[BOOK_ITEM_ID] = book.id;

  //panggil element dengan id UNCOMPLETED_LIST_BOOK
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK);

  //masukan value dari variabel uncompletedBooks ke listUncompleted
  listUncompleted.append(uncompletedBook);

  // menghapus elemen yang dituju
  bookElement.remove();

  updateDataStorage();
}

/**
 *  MENGHAPUS BUKU PADA RAK
 */
function removeBookFromBookshelf(bookElement) {
  // buat konfirmasi, apakah buku akan dihapus atau tidak
  const deleteConfirmationBox = confirm("Apakah anda yakin ingin menghapus buku ini?");

  // jika buku dihapus jalankan statemen ini
  if (deleteConfirmationBox == true) {
    const bookPosition = findBookIndex(bookElement[BOOK_ITEM_ID]);
    bookshelf.splice(bookPosition, 1);

    bookElement.remove();
    updateDataStorage();
  }
}

/**
 *  DASAR PEMBUATAN BUTTON
 */
function createButton(buttonTypeClass, eventListener) {
  // buat elemen button
  const button = document.createElement("button");

  // tambah class parameter buttonTypeClass ke button yang dibuat
  button.classList.add(buttonTypeClass);

  // tambahkan event listener pada button yang dibuat
  button.addEventListener("click", function (event) {
    //fungsi yang dijalankan merupakan suatu fungsi yang dideklarasikan di method tertentu
    eventListener(event);
  });

  return button;
}

/**
 *  MEMBUAT CHECK BUTTON
 */
function createCheckButton() {
  // mengembalikan fungsi createButton, paramaternya yaitu class complete dan jalankan suatu fungsi
  return createButton("complete", function (event) {
    // fungsi yang dijalankan adalah addBookToCompleted() dengan paramater yaitu targetnya parent element dari parent elemen yang dituju
    addBookToCompleted(event.target.parentElement.parentElement);
  });
}

/**
 *  MEMBUAT DELETE BUTTON
 */
function createDeleteButton() {
  // mengembalikan fungsi createButton, paramaternya yaitu class delete dan jalankan suatu fungsi
  return createButton("delete", function (event) {
    // fungsi yang dijalankan adalah removeBookFromBookshelf() dengan paramater yaitu targetnya parent element dari parent elemen yang dituju
    removeBookFromBookshelf(event.target.parentElement.parentElement);
  });
}

/**
 *  MEMBUAT UNDO BUTTON
 */
function createUndoButton() {
  // mengembalikan fungsi createButton, paramaternya yaitu class delete dan jalankan suatu fungsi
  return createButton("undo", function (event) {
    // fungsi yang dijalankan adalah removeBookFromBookshelf() dengan paramater yaitu targetnya parent element dari parent elemen yang dituju
    returnBookToUncompleted(event.target.parentElement.parentElement);
  });
}
