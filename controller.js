

function main() {
    if (localStorage.length === 0)
        saveBooksToLocalStorage();
    loadBooksFromLocalStorage();
    renderBooks(Gbooks);
    renderPagination(Gbooks);
    changePage(1);
}

window.onload = () => {
    main();
};


// Save Gbooks array to localStorage
function saveBooksToLocalStorage() {
    localStorage.setItem("books", JSON.stringify(Gbooks));
}

// Load books from localStorage into Gbooks
function loadBooksFromLocalStorage() {
    // let Gbooks = []; // מערך הספרים

    const booksFromStorage = localStorage.getItem("books");
    Gbooks.length = 0; // מנקים את המערך לפני הטעינה
    if (booksFromStorage) {
        const loadedBooks = JSON.parse(booksFromStorage);
        // מוודא שהספרים החדשים מתווספים ל-Gbooks
        Gbooks.push(...loadedBooks);
    }
}



// Add new book and save it to localStorage
function addNewBook() {
    const newTitle = document.getElementById("book-title-input").value;
    const newPrice = parseFloat(document.getElementById("book-price-input").value);
    const newImg = document.getElementById("book-image-input").value;

    if (newTitle && newPrice) {
        const existingBook = Gbooks.some(book => book.title === newTitle);
        if (existingBook) {
            alert("There is a book with the same title. Please choose another name.");
            return;
        }
        const newBook = {
            catalogId: Gbooks.length + 1,
            title: newTitle,
            price: newPrice,
            image: newImg,
            action: ["read", "update", "delete"]
        };

        Gbooks.push(newBook);
        saveBooksToLocalStorage(); // Save after adding a book
        renderPagination(Gbooks); // Update pagination with new book
        changePage(Math.ceil(Gbooks.length / itemsPerPage)); // Show last page where the new book is

        document.getElementById("new-book-form").reset();
        document.getElementById("new-book-form").style.display = "none";
    } else {
        alert("please fill in title and price fields");
    }
}


function updateBook(catalogId) {
    const bookIndex = Gbooks.findIndex(b => b.catalogId === catalogId);
    const book = Gbooks[bookIndex];
    console.log(`Updating book: ${book.title}`);

    // document.getElementById("form-title").textContent = `Update ${book.title}`;
    document.getElementById("book-title-input").value = book.title;
    document.getElementById("book-price-input").value = book.price;
    document.getElementById("book-image-input").value = book.image;

    openForm(true);

    // טיפול בכפתור ה-submit
    const submitButton = document.getElementById("submit-book");
    // submitButton.textContent = `Update`;
    submitButton.dataset.bookIndex = bookIndex;

    // הגדרת type="button" לכפתור כדי למנוע submit אוטומטי
    submitButton.type = "button";

    submitButton.onclick = function () {
        // עדכון פרטי הספר
        Gbooks[bookIndex].title = document.getElementById("book-title-input").value;
        Gbooks[bookIndex].price = document.getElementById("book-price-input").value;
        Gbooks[bookIndex].image = document.getElementById("book-image-input").value;

        // הסתרת הטופס לאחר העדכון
        document.getElementById("new-book-form").style.display = "none";
        saveBooksToLocalStorage(); // Save after adding a book

        // רענון התצוגה לאחר העדכון
        renderBooks(Gbooks);
        renderPagination(Gbooks);
        changePage(currentPage);
    };
}


function deleteBook(catalogId) {
    const bookIndex = Gbooks.findIndex(b => b.catalogId === catalogId);

    const book = Gbooks[bookIndex];
    const confirmation = confirm(`Are you sure you want to delete the book "${book.title}"?`);
    if (confirmation) {
        Gbooks.splice(bookIndex, 1); // מחיקת הספר מהמערך
        saveBooksToLocalStorage(); // שמירה מחדש ל-localStorage
        console.log(`Book deleted: ${book.title}`);
        renderBooks(Gbooks);
        renderPagination(Gbooks);
        changePage(currentPage); // שמירה על הדף הנוכחי בפגינציה
    }

}



main();


