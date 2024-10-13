function main() {
    // console.log(renderBooks(Gbooks))
    //loadBooksFromLocalStorage();
    renderBooks(Gbooks); 
    renderPagination(Gbooks); 
    changePage(1);
}

window.onload = () => {
    //loadBooksFromLocalStorage();
    renderPagination(Gbooks); // Create pagination buttons
    changePage(1); // Show the first page when loading
};


// // Save Gbooks array to localStorage
// function saveBooksToLocalStorage() {
//     localStorage.setItem("books", JSON.stringify(Gbooks));
// }



// // function loadBooksFromLocalStorage() {
//     const savedBooks = localStorage.getItem("books");
//     if (savedBooks) {
//         const localStorageBooks = JSON.parse(savedBooks);
//         Gbooks = [...Gbooks, ...localStorageBooks]; // מאחד את הספרים מ-localStorage עם אלה שבמודל
//     }
// }


// Add new book and save it to localStorage
function addNewBook() {
    const newTitle = document.getElementById("new-book-title").value;
    const newPrice = parseFloat(document.getElementById("new-book-price").value);
    const newImg = document.getElementById("new-book-image").value;

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
        
        //saveBooksToLocalStorage(); // Save after adding a book
        renderPagination(Gbooks); // Update pagination with new book
        changePage(Math.ceil(Gbooks.length / itemsPerPage)); // Show last page where the new book is

        document.getElementById("new-book-form").reset();
        document.getElementById("new-book-form").style.display = "none";
    } else {
        alert("please fill in title and price fields");
    }
}



main();