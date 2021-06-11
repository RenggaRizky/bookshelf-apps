// buat global variabel untuk menyimpan data rak buku di local storage
const STORAGE_KEY = "BOOKSHELF_APPS";

// array yang digunakan untuk menyimpan data buku
let bookshelf = [];

// cek apakah local storage tersedia pada browser client
function isStorageExist() {
  // jika tidak ada local storage pada browser client (undefined) maka jalankan muncul alert box
  if (typeof Storage === undefined) {
    alert("Browser tidak mendukung local storage");
    return false;
  }
  return true;
}

// menyimpan data ke local storage
function saveData() {
  // deklarasi variabel untuk mengubah data json yang ada di array bookshelf ke tipe data string
  const parsed = JSON.stringify(bookshelf);

  //masukan value dari variabel parsed ke key STORAGE_KEY
  localStorage.setItem(STORAGE_KEY, parsed);

  // mentrigger custom event ‘ondatasaved’
  document.dispatchEvent(new Event("ondatasaved"));
}

// memuat data dari web storage ke array bookeshelf
function loadDataFromStorage() {
  //deklarasi variabel untuk ambil dari key STORAGE_KEY
  const serializedData = localStorage.getItem(STORAGE_KEY);

  //deklarasi variabel untuk mengubah value dari variabel serializedData ke bentuk JSON
  let dataApps = JSON.parse(serializedData);

  //jika value dari dataApps tidak kosong maka..
  if (dataApps !== null) {
    //value dari array bookshelf = value dari variabel dataApps
    bookshelf = dataApps;
  }

  // mentrigger custom event ondataloaded
  document.dispatchEvent(new Event("ondataloaded"));
}

// digunakan sebagai perantara untuk menyimpan data, jika browser client memiliki local storage
function updateDataStorage() {
  if (isStorageExist()) {
    saveData();
  }
}

// menyusun object dengan key yang berasal dari parameter yang sudah ditentukan
function composeBookshelfObject(title, author, year, isCompleted) {
  return {
    id: uniqeId(),
    title,
    author,
    year,
    isCompleted,
  };
}

// mencari buku melalui id buku
function findBook(bookId) {
  for (book of bookshelf) {
    if (book.id === bookId) {
      return book;
    }
  }
  return null;
}

//mengembalikan index buku sesuai id buku
function findBookIndex(bookId) {
  let index = 0;
  for (book of bookshelf) {
    if (book.id === bookId) {
      return index;
    }
    index++;
  }
  return -1;
}

// memeberi data bookshelf pada object bookshelf
function refreshDataFromBookshelf() {
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK);
  let listCompleted = document.getElementById(COMPLETED_LIST_BOOK);

  //akses satu persatu data pada array bookshelf untuk memunculkan buku ke web pada saat onload
  for (book of bookshelf) {
    const inputBook = makeItemBook(book.title, book.author, book.year, book.isCompleted);
    inputBook[BOOK_ITEM_ID] = book.id;

    if (book.isCompleted) {
      listCompleted.append(inputBook);
    } else {
      listUncompleted.append(inputBook);
    }
  }
}

// membuat unique id
function uniqeId() {
  return Math.floor(Math.random() * 0x1000000000).toString(16);
}
