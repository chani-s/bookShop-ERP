
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

const renderBooks = (books) => {
    let booksStr = ``;
    for (const book of books) {
        booksStr += getBook(book);
    }
    document.getElementById("book-line").innerHTML = booksStr;

    // הוספת מאזיני אירועים לשורות הספרים
    const rows = document.querySelectorAll("#book-line tr");
    rows.forEach((row, index) => {
        row.addEventListener("click", () => {
            showBookDetails(books[index]); // קריאה לפונקציה להצגת פרטי הספר
        });
    });
}

function showBookDetails(book) {
    // עדכון פרטי הספר בחלונית
    document.getElementById("book-title").innerText = book.title;
    document.getElementById("book-image").src = book.image || "./default-image.jpg"; // תמונה ברירת מחדל אם אין תמונה
    document.getElementById("book-price").innerText = `מחיר: ₪${book.price}`;

    // הצגת החלונית
    document.getElementById("book-details").style.display = "block";
}



const showNewBookForm = () => {
    document.getElementById("new-book-form").style.display = "block";
};


