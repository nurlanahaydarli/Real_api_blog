let post_blog = document.getElementById("post_btn")
let post_title = document.getElementById("post_title")
let post_text = document.getElementById("post_text")
let blog_list = document.getElementById("blog_list")
let modal = document.querySelector(".modal")
let loadingSpinner = document.getElementById("loadingSpinner")
let close_modal = document.getElementById("close_modal")
let alert_box = document.querySelector(".alert_box")
let close_alert = document.querySelector("#close_alert")

let data = [];

// Get post list
async function getPosts() {
    try {
        //? 200-400 Status + JS code
        const response = await fetch("https://blog-api-t6u0.onrender.com/posts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        return data;
    } catch (err) {
        console.log("err", err);
    }
}

// create new post
async function createPost(form) {
    try {
        // el.style.display = "none";

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        };

        const response = await fetch(
            `https://blog-api-t6u0.onrender.com/posts`,
            options
        );

        const data = await response.json();

        return data;
    } catch (err) {
        // el.style.display = "block";
    }
}

post_blog.addEventListener("click", async function () {
    try {
        // loadingCrtPost = true

        post_blog.setAttribute("disabled", "true");
        loadingSpinner.classList.remove("d-none");
        loadingSpinner.classList.add("d-block");

        const title = post_title.value;
        const body = post_text.value;
        // const id = `BLG${Math.round(Math.random() * 100000)}`

        if (!title.trim() || !body.trim()) {
            modal.style.display = "block"
            return;
        }

        const form = {
            title,
            body,
        };
        const new_post = await createPost(form);

        data = [new_post, ...data];
        post_title.value = ""
        post_text.value = ""
        // App() sehf yanasmadi
        renderElements(data);
    } catch (err) {
        console.log("err", err);
    } finally {
        post_blog.removeAttribute("disabled");
        loadingSpinner.classList.add("d-none");
        loadingSpinner.classList.remove("d-block");
    }
});

// remove post
async function rmvPost(id) {
    try {
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(
            `https://blog-api-t6u0.onrender.com/posts/${id}`,
            options
        );

        const data = await response.json();

        // console.log("data:", data);

        return data;
    } catch (err) {
        console.log("err", err);
    }
}

async function handleRemoveEl(id) {
    try {
        console.log("id", id);

        // const removeEl = await rmvPost(id);
        await rmvPost(id);

        alert_box.style.display = "block"

        data = data.filter((post) => post.id !== id);

        renderElements(data);

        // App();
    } catch (err) {
        console.log("err", err);
    }
}
// edit post
async function uptPost(id, form) {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
    };

    const response = await fetch(
        `https://blog-api-t6u0.onrender.com/posts/${id}`,
        options
    );

    const data = await response.json();

    console.log("data:", data);
}
async function handleEditEl(id) {
    try {
        console.log("id", id);
        console.log("edit")
        await uptPost(id);

        alert_box.style.display = "block"

        data = data.filter((post) => post.id !== id);

        renderElements(data);

        // App();
    } catch (err) {
        console.log("err", err);
    }
}

//? GENERAL
function renderElements(data) {
    blog_list.innerHTML = data
        .map((post, index) => {
            if (index < 101) return null;
            return `
            <div class="col-lg-6">
                <div class="main-blog-box">
                    <a href="blog-detail.html"><img class="main-img" src="assets/img/office-implements-black-table 2.png" alt=""></a>
                    <div class="blog-bottom">
                        <span>${post.title}</span>
                        <h4>${post.body}</h4>
                        <button type="button" onclick="handleEditEl(${post.id})">Redatə</button>
                        <button type="button" onclick="handleRemoveEl(${post.id})">Silin</button>
                    </div>
                </div>
            </div>
    `;
        })
        .join("");
}


// Get api request
async function App() {
    const posts = await getPosts();

    data = posts;

    renderElements(posts);
}

App();


// Hide alerts
close_modal.addEventListener("click", function () {
    modal.style.display = 'none'
})
close_alert.addEventListener("click", function () {
    alert_box.style.display = 'none'
})