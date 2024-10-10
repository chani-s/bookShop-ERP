function main() {
    console.log(renderBooks(Gbooks))
}

function addNewBook(){
    const newTitle = document.getElementById("new-book-title").value;
    const newPrice = parseFloat(document.getElementById("new-book-price").value);
    const newImg = document.getElementById("new-book-image").value;

    if (newTitle && newPrice) {
        const newBook = {
            catalogId: Gbooks.length + 1, // מזהה ייחודי חדש
            title: newTitle,
            price: newPrice,
            action: ["read", "update", "trash"]
        };

        if (newImg) {
            newBook.image = `.\{newImg}`;
        }

        Gbooks.push(newBook); 

        renderBooks(Gbooks); // רענון התצוגה של הספרים
        document.getElementById("new-book-form").style.display = "none"; // הסתרת הטופס לאחר ההוספה
    } else {
        alert("אנא מלאי את כל השדות");
    }
};


main();