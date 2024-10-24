const itemsPerPage = 5;
let currentPage = 1;
let isEditMode = false;



const getBook = (book) => {
    return `
    <tr>
        <td>${book.catalogId}</td>
        <td>${book.title}</td>
        <td>$${book.price}</td>
        <td>
            <button onclick="showBookDetails(${book.catalogId})">${book.action[0]}</button>
            <button onclick="updateBook(${book.catalogId})">${book.action[1]}</button>
            <button onclick="deleteBook(${book.catalogId})">${book.action[2]}</button>
        </td>
    </tr>`;
}

// render books for the current page
function renderBooks(books) {
    let booksStr = ``;
    for (const book of books) {
        booksStr += getBook(book);
    }

    document.getElementById("book-line").innerHTML = booksStr;

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


function openForm(isEdit) {
    isEditMode = isEdit;

    // שינוי הכותרת של הטופס בהתאם למצב
    const formTitle = document.getElementById("form-title");
    const submitButton = document.getElementById("submit-book");

    if (isEditMode) {
        formTitle.textContent = "Update Book";
        submitButton.textContent = "Update";
    } else {
        document.getElementById("new-book-form").reset();
        formTitle.textContent = "Add New Book";
        submitButton.textContent = "Add";
        submitButton.onclick = function() {
            addNewBook();
        };
    }

    // הצגת הטופס
    document.getElementById("new-book-form").style.display = "block";
}

function closeForm() {
    document.getElementById("new-book-form").style.display = "none";
}



function showBookDetails(catalogId) {
    const book = Gbooks.find(b => b.catalogId === catalogId);
    if (book) {
        document.getElementById("book-title").innerText = book.title;
        document.getElementById("book-image").src = book.image || "./imgs/default.jpg";
        document.getElementById("book-price").innerText = `Price: $${book.price}`;

        document.getElementById("book-details").style.display = "block";
    }
}

