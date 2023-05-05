window.addEventListener("load", setMain)


const postsUrl = "http://localhost:3000/posts";
const posts24Url = "http://localhost:3000/posts?_page=1&_limit=24";
const usersUrl = "http://localhost:3000/users";
const commentsUrl = "http://localhost:3000/comments";



function setMain() {

    const postsContainer = document.querySelector("#main-posts-container");

    const imgSrc = "images/postimage.jpg";

    const rowContainer = document.createElement("div");
    rowContainer.classList.add("row", "row-cols-1", "row-cols-sm-1", "row-cols-md-2", "row-cols-lg-3", "row-cols-xl-4", "g-3");
    postsContainer.appendChild(rowContainer);


    fetch(posts24Url)
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                const cardWrapper = document.createElement("div");
                cardWrapper.classList.add("card-wrapper", "col");
                rowContainer.appendChild(cardWrapper);

                const card = document.createElement("div");
                card.classList.add("card", "px-0",);
                //card.style = "width: 18rem;";
                card.setAttribute("data-bs-toggle", "modal");
                card.setAttribute("data-bs-target", "#post-modal");

                //INTERESTING
                card.setAttribute("role", "button");
                cardWrapper.appendChild(card);

                const img = document.createElement("img");
                img.classList.add("card-img-top");
                img.src = imgSrc;
                card.appendChild(img);

                const cardBody = document.createElement("div");
                cardBody.classList.add("card-body");
                card.appendChild(cardBody);

                const cardTitle = document.createElement("h5");
                cardTitle.classList.add("card-title");
                cardTitle.innerText = element.title;


                cardBody.appendChild(cardTitle);

                const postModal = document.querySelector("#post-modal");
                postModal.addEventListener("show.bs.modal", setPostModal);
            });
        })
}

async function setPostModal(event) {

    const modalTitle = document.querySelector("#modal-post-title");
    const modalBody = document.querySelector("#modal-post-body");
    const modalUsername = document.querySelector("#modal-post-username");
    const modalEmail = document.querySelector("#modal-post-email");
    const commentsButton = document.querySelector("#comments-button");


    const postTitle = event.relatedTarget.lastElementChild.firstElementChild.innerText;
    const postTitleUrl = `http://localhost:3000/posts?title=${postTitle}`;

    const titleResponse = await fetch(postTitleUrl);
    const titleData = await titleResponse.json();
    modalTitle.innerText = titleData[0].title;
    modalBody.innerText = titleData[0].body;
    const authorId = titleData[0].id;

    const authorUrl = `http://localhost:3000/users?id=${authorId}`;

    const authorResponse = await fetch(authorUrl);
    const authorData = await authorResponse.json();
    modalUsername.innerText = authorData[0].username;
    modalEmail.innerText = authorData[0].email;

    commentsButton.addEventListener("click", showComments);


}

function showComments() {
    const modalContent = document.querySelector("#modal-content");
    const modalBodyComments = document.createElement("div");
    const commentsButton = document.querySelector("#comments-button");
    modalBodyComments.classList.add("modal-body");
    modalBodyComments.innerText = "NOMELOCREO NI YO";
    modalBodyComments.id = "body-coments";
    modalContent.appendChild(modalBodyComments);

    commentsButton.innerText = "Hide Comments";
    commentsButton.removeEventListener("click", showComments);
    commentsButton.addEventListener("click", hideComments);


}


function hideComments() {
    const modalContent = document.querySelector("#modal-content");
    const modalBodyComments = document.querySelector("#body-coments")
    const commentsButton = document.querySelector("#comments-button");

    modalContent.removeChild(modalBodyComments);

    commentsButton.innerText = "Show Comments";
    commentsButton.removeEventListener("click", hideComments);
    commentsButton.addEventListener("click", showComments);
}