
        const loginPage = document.getElementById("loginPage");
        const libraryPage = document.getElementById("libraryPage");
        const errorMsg = document.getElementById("errorMsg");
        const bookList = document.getElementById("bookList");
        const adminControls = document.getElementById("adminControls");

        // Load books from LocalStorage or default
        let books = JSON.parse(localStorage.getItem("books")) || [
            { title: "&#x2728; Magical Forest", content: "Once upon a time in a magical forest..." },
            { title: "&#x1F30A; Ocean Adventure", content: "Deep under the sea lived a curious dolphin..." },
            { title: "&#x1F680; Space Journey", content: "In the year 3025, humanity traveled across the stars..." },
            { title: "&#x1F3F0; Kingdom Tales", content: "In a faraway kingdom, there was a brave knight..." }
        ];

        let currentUserRole = "";

        function saveBooks() {
            localStorage.setItem("books", JSON.stringify(books));
        }

        function renderBooks() {
            bookList.innerHTML = "";
            books.forEach((book, idx) => {
                const div = document.createElement("div");
                div.className = "book";
                div.innerHTML = `<img src="https://picsum.photos/200/280?random=${idx + 1}" alt="Book"><p>${book.title}</p>`;
                div.onclick = () => openModal(book.title, book.content);

                if (currentUserRole === "admin") {
                    const btnDiv = document.createElement("div");
                    btnDiv.className = "admin-btns";
                    btnDiv.innerHTML = `<button onclick="editBook(${idx},event)">Edit</button>
                         <button onclick="deleteBook(${idx},event)">Delete</button>`;
                    div.appendChild(btnDiv);
                }

                bookList.appendChild(div);
            });
        }

        function login() {
            const user = document.getElementById("username").value;
            const pass = document.getElementById("password").value;

            if (user === "admin" && pass === "1234") {
                currentUserRole = "admin";
            } else if (user === "client" && pass === "1234") {
                currentUserRole = "client";
            } else {
                errorMsg.innerHTML = "&#x274C; Invalid username or password!";
                return;
            }

            loginPage.style.display = "none";
            libraryPage.classList.remove("hidden");

            if (currentUserRole === "admin") {
                adminControls.classList.remove("hidden");
            }

            renderBooks();
        }

        function addBook() {
            const title = document.getElementById("newBookTitle").value;
            const content = document.getElementById("newBookContent").value;
            if (title && content) {
                books.push({ title, content });
                saveBooks();
                renderBooks();
                document.getElementById("newBookTitle").value = "";
                document.getElementById("newBookContent").value = "";
            }
        }

        function editBook(idx, event) {
            event.stopPropagation();
            const newTitle = prompt("Edit Title:", books[idx].title);
            const newContent = prompt("Edit Content:", books[idx].content);
            if (newTitle && newContent) {
                books[idx].title = newTitle;
                books[idx].content = newContent;
                saveBooks();
                renderBooks();
            }
        }

        function deleteBook(idx, event) {
            event.stopPropagation();
            if (confirm("Are you sure you want to delete this book?")) {
                books.splice(idx, 1);
                saveBooks();
                renderBooks();
            }
        }

        // Modal
        const modal = document.getElementById("modal");
        const modalTitle = document.getElementById("modalTitle");
        const modalContent = document.getElementById("modalContent");

        function openModal(title, content) {
            modal.style.display = "flex";
            modalTitle.innerHTML = title;
            modalContent.innerText = content;
        }
        function closeModal() { modal.style.display = "none"; }
    