window.addEventListener("load", setMain)


function setMain() {
    const main = document.querySelector("main");
    const mainContainer = document.createElement("div");
    const list = document.createElement("ul");
    mainContainer.classList.add("container", "my-4");
    list.classList.add("list-group", "list-group-flush");
    mainContainer.appendChild(list);
    main.appendChild(mainContainer);

    const postsUrl = "https://jsonplaceholder.typicode.com/posts/";
    fetch(postsUrl)
        .then(response => response.json())
        .then(postList => {
            for (let i = 0; i < 10; i++) {
                const title = postList[i].title;
                const li = document.createElement("li");
                li.classList.add("list-group-item");
                li.innerText = title;
                list.appendChild(li);


            }
        });

}


