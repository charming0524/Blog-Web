import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

// Array to store posts, each with a unique ID
let blogPosts = [
    { id: 1, title: "First Post", description: "This is the first blog post description." },
    { id: 2, title: "Second Post", description: "This is the second blog post description." },
    { id: 3, title: "Third Post", description: "This is the third blog post description." },
    { id: 4, title: "Fourth Post", description: "This is the fourth blog post description with more than 150 characters to demonstrate truncation and the 'View Blog' functionality. Keep reading to see the rest of the description once you click 'View Blog'!" }
];

// Helper to generate unique IDs
let currentId = blogPosts.length + 1;

// Route to display posts and form
app.get('/', (req, res) => {
    res.render('index', { blogPosts });
});

// Route to render the blog list
app.get('/blog-list', (req, res) => {
    res.render('blogList', { blogPosts });
});

// Route to handle new post submissions
app.post('/add-post', (req, res) => {
    const { title, description } = req.body;
    blogPosts.push({ id: currentId++, title, description });
    res.redirect('/blog-list');
});

// Route to handle deletion of a post
app.post('/delete-post/:id', (req, res) => {
    const blogId = parseInt(req.params.id);
    blogPosts = blogPosts.filter((post) => post.id !== blogId);
    res.redirect('/');
});

// Route to render the edit form for a specific post
app.get('/edit-post/:id', (req, res) => {
    const blogId = parseInt(req.params.id);
    const postToEdit = blogPosts.find((post) => post.id === blogId);
    if (postToEdit) {
        res.render('edit', { post: postToEdit });
    } else {
        res.redirect('/');
    }
});

// Route to handle updating a post
app.post('/update-post/:id', (req, res) => {
    const blogId = parseInt(req.params.id);
    const { title, description } = req.body;
    const postIndex = blogPosts.findIndex((post) => post.id === blogId);
    if (postIndex !== -1) {
        blogPosts[postIndex] = { id: blogId, title, description };
    }
    res.redirect('/');
});

// Route to view a single blog post in full
app.get('/view-post/:id', (req, res) => {
    const blogId = parseInt(req.params.id);
    const post = blogPosts.find((post) => post.id === blogId);
    if (post) {
        res.render('view', { post });
    } else {
        res.redirect('/');
    }
});

//Route to display Contact
app.get("/contact", (req, res) => {
    res.render("contact.ejs");
  });
  
// Route to Display About 
app.get("/about", (req, res) => {
    res.render("about.ejs");
  });


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});