/**
 *  listener akan menjalankan kode didalamnya jika DOM sudah diload dengan baik
 */
document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBookForm");

  /**
   *  variable submitForm diberikan listener ketika tombol submit diklik.
   *  ketika tombol submit diklik, maka kode event.preventDefault() akan dijalankan
   */
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();

    //menambahkan buku ke rak buku
    inputBook();
  });

  /**
      Jika web storage ada pada browser, jalankan method loadDataFromStorage()
   */
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

// custom event ondatasaved
document.addEventListener("ondatasaved", function () {
  console.log("Data berhasil disimpan");
});

//custom event ondataloaded,
document.addEventListener("ondataloaded", function () {
  refreshDataFromBookshelf();
});
