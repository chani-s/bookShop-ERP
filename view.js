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
};

function closeForm() {
    document.getElementById("new-book-form").style.display = "none";
}



function showBookDetails(catalogId) {
    const book = Gbooks.find(b => b.catalogId === catalogId);
    if (book) {
        document.getElementById("book-title").innerText = book.title;
        document.getElementById("book-image").src = book.image || "./imgs/default.jpg";
        document.getElementById("book-price").innerText = `Price: ₪${book.price}`;
        
        document.getElementById("book-details").style.display = "block";
    }
}


function updateBook(catalogId) {
    const bookIndex = Gbooks.findIndex(b => b.catalogId === catalogId);
    if (bookIndex !== -1) {
        const book = Gbooks[bookIndex];
        console.log(`Updating book: ${book.title}`);
        
        document.getElementById("form-title").textContent = `Update ${book.title}`;
        document.getElementById("book-title-input").value = book.title;
        document.getElementById("book-price-input").value = book.price;
        document.getElementById("book-image-input").value = book.image;

        // הצגת הטופס
        document.getElementById("new-book-form").style.display = "block";

        // טיפול בכפתור ה-submit
        const submitButton = document.getElementById("submit-book");
        submitButton.textContent = `Update`;
        submitButton.dataset.bookIndex = bookIndex; // שמירה של אינדקס הספר בכפתור

        submitButton.onclick = function() {
            // עדכון פרטי הספר
            Gbooks[bookIndex].title = document.getElementById("book-title-input").value;
            Gbooks[bookIndex].price = document.getElementById("book-price-input").value;
            Gbooks[bookIndex].image = document.getElementById("book-image-input").value;

            // שמירה מחדש ל-localStorage
            localStorage.setItem("Gbooks", JSON.stringify(Gbooks));
            console.log(`Book updated: ${Gbooks[bookIndex].title}`);

            // הסתרת הטופס לאחר העדכון
            document.getElementById("new-book-form").style.display = "none";

            // רענון התצוגה לאחר העדכון
            refreshBookList();
        };
    }
}

function refreshBookList() {
    const bookListElement = document.getElementById("book-line");
    bookListElement.innerHTML = ""; // מנקה את רשימת הספרים הקיימת
    Gbooks.forEach(book => {
        const bookElement = document.createElement("tr");
        bookElement.innerHTML = `
            <td>${book.catalogId}</td>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td><button onclick="updateBook(${book.catalogId})">Update</button></td>
        `;
        bookListElement.appendChild(bookElement);
    });
}

// קריאה לפונקציה של רענון התצוגה ברגע העלאת הדף
document.addEventListener("DOMContentLoaded", refreshBookList);





// פונקציה למחוק ספר
function deleteBook(catalogId) {
    const book = Gbooks.find(b => b.catalogId === catalogId);
    console.log(`Deleting book: ${book.title}`);
    

}
