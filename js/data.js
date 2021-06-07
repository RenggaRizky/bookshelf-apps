const STORAGE_KEY = "BOOKSHELF_APPS";

let bookshelf = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser tidak mendukung local storage");
    return false;
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(bookshelf);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let dataApps = JSON.parse(serializedData);
  if (dataApps !== null) {
    bookshelf = dataApps;
  }
  document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataStorage() {
  if (isStorageExist()) {
    saveData();
  }
}

function composeBookshelfObject(title, author, year, isCompleted) {
  return {
    id: uniqeId(),
    title,
    author,
    year,
    isCompleted,
  };
}

function findBook(bookId) {
  for (book of bookshelf) {
    if (book.id === bookId) {
      return book;
    }
  }
  return null;
}

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

function uniqeId() {
  return Math.floor(Math.random() * 0x1000000000).toString(16);
}
