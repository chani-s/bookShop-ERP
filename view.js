
const getBook = (book) => {
    
     return `
    <tr>
        <td>${book.Id}</td>
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
}

const showNewBookForm = () => {
    document.getElementById("new-book-form").style.display = "block";
};

