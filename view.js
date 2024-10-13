const itemsPerPage = 5;
let currentPage = 1;

const getBook = (book) => {
    return `
    <tr>
        <td>${book.catalogId}</td>
        <td>${book.title}</td>
        <td>₪${book.price}</td>
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


// Show New Book Form and hide Book Details
const showNewBookForm = () => {
    document.getElementById("new-book-form").style.display = "block";
    document.getElementById("book-details").style.display = "none";
};


function showBookDetails(catalogId) {
    const book = Gbooks.find(b => b.catalogId === catalogId);
    if (book) {
        document.getElementById("book-title").innerText = book.title;
        document.getElementById("book-image").src = book.image || "./default.jpg";
        document.getElementById("book-price").innerText = `Price: ₪${book.price}`;
        
        document.getElementById("book-details").style.display = "block";
        document.getElementById("new-book-form").style.display = "none";
    }
}


// פונקציה לעדכן ספר
function updateBook(catalogId) {
    const book = Gbooks.find(b => b.catalogId === catalogId);
    if (book) {
              // כאן תוכל להוסיף את הלוגיקה לעדכון הספר, כמו טופס שממלא את הנתונים הקיימים
        
        console.log(`Updating book: ${book.title}`);
    }
}

// פונקציה למחוק ספר
function deleteBook(catalogId) {
    // Gbooks = Gbooks.filter(book => book.catalogId !== catalogId);
    // saveBooksToLocalStorage();
    // renderBooks(Gbooks); // רענן את התצוגה לאחר המחיקה
    // renderPagination(Gbooks); // עדכן את מספר הדפים
}
