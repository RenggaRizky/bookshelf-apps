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

    //menambahkan buku ke buku list
    inputBook();
  });
});
