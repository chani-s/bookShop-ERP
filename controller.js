function main() {
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
            action: ["read", "update", "trash"]
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

main(); 


