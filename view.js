const itemsPerPage = 5;
let currentPage = 1;

const getBook = (book) => {
    return `
    <tr>
        <td>${book.catalogId}</td>
        <td>${book.title}</td>
        <td>₪${book.price}</td>
        <td>
            <button>${book.action[0]}</button>
            <button>${book.action[1]}</button>
            <button>${book.action[2]}</button>
        </td>
    </tr>`;
}

// render pagination buttons
function renderPagination(books) {
    const pageCount = Math.ceil(books.length / itemsPerPage);
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= pageCount; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.onclick = () => changePage(i);
        paginationContainer.appendChild(pageButton);
    }
}




// change page when a pagination button is clicked
function changePage(page) {
    currentPage = page;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const booksToShow = Gbooks.slice(startIndex, endIndex);
    renderBooks(booksToShow);
}


// render books for the current page
function renderBooks(books) {
    let booksStr = ``;
    for (const book of books) {
        booksStr += getBook(book);
    }

    document.getElementById("book-line").innerHTML = booksStr;

    // Add event listeners to rows for book details
    const rows = document.querySelectorAll("#book-line tr");
    rows.forEach((row, index) => {
        row.addEventListener("click", () => {
            showBookDetails(books[index]);
        });
    });
}


// Show New Book Form and hide Book Details
const showNewBookForm = () => {
    document.getElementById("new-book-form").style.display = "block";
    document.getElementById("book-details").style.display = "none";
};

// Show Book Details and hide New Book Form
function showBookDetails(book) {
    document.getElementById("book-title").innerText = book.title;
    document.getElementById("book-image").src = book.image || "./default-image.jpg"; // default image
    document.getElementById("book-price").innerText = `מחיר: ₪${book.price}`;

    // Toggle visibility
    document.getElementById("book-details").style.display = "block";
    document.getElementById("new-book-form").style.display = "none";
}




