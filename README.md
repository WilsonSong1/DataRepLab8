
# Lab 6: React and Node/Express Data Representation and Querying

The following exercises focus on using **Node/Express** and **React** to represent and query data.

---


### Steps:
1. **Create a Git Repository:**
    First, create a folder for your project, initialize it as a Git repository using `git init`. This will allow you to track changes to your project.

    ```bash
    git init
    ```

2. **Stage and Commit Files:**
    Stage all files and create your first commit:
    
    ```bash
    git add .
    git commit -m "Initial commit"
    ```

3. **Rename the Default Branch:**
    Rename the default branch to `main` (since this is the new standard for Git):
    
    ```bash
    git branch -M main
    ```

4. **Push to GitHub:**
    Link the repository to a remote GitHub repository:
    
    ```bash
    git remote add origin <your-github-repo-url>
    git push -u origin main
    ```

5. **Commit Regularly:**
    After each exercise, make sure to commit your changes to track progress.

---

### 2. Clone and Setup a React Application

- In the last React lab, we built a React application that used components to create and read **movie** data.
- The final solution to the lab can be found at: [GitHub Repository](https://github.com/Data-Rep-MERN-Application/lab_four).
- Clone this application if you did not finish it last week:

```bash
git clone https://github.com/Data-Rep-MERN-Application/lab_four
```

- After cloning, install the required dependencies by running:

```bash
npm install
```

---

### 3. Create a Backend with Express

- Create a new folder in your React app called **BackEnd** and add a file named `server.js` inside it.
- Develop a server using the **Express** framework that returns the following JSON data when a GET request is made to `/api/movies`:

```json
{
  "movies": [
    {
      "Title": "Avengers: Infinity War (server)",
      "Year": "2018",
      "imdbID": "tt4154756",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    },
    {
      "Title": "Captain America: Civil War (server)",
      "Year": "2016",
      "imdbID": "tt3498820",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    },
    {
      "Title": "World War Z (server)",
      "Year": "2013",
      "imdbID": "tt0816711",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
    }
  ]
}
```
- Ensure that the domain of the server is now localhost:4000
---

### 4. Connect the React App to Read Data from the Node/Express Server

- Modify the React app to fetch the JSON data from the Node/Express server.
  
#### What is CORS?

- **CORS (Cross-Origin Resource Sharing)** is a security feature built into browsers that restricts web pages from making requests to a different domain or port than the one that served the web page.
- Without configuring CORS, the browser may block requests made from your React frontend (`localhost:3000`) to your Node/Express backend (`localhost:4000`), as they are considered to be on different origins.
  
#### Installing CORS Middleware in Node.js

To allow communication between your React app and Node/Express server, you need to install and configure the **cors** middleware. Follow these steps:

1. **Install CORS package:**

   Run the following command in the terminal inside your project directory to install the **cors** package:

   ```bash
   npm install cors
   ```

2. **Use CORS in the server:**

   In your `server.js` file, add the following code to enable CORS for your server:

   ```javascript
   const cors = require('cors');
   app.use(cors());

   app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
   });
   ```

   This middleware setup allows your frontend app (React) to make API requests to the backend (Express) without encountering CORS-related issues.

---

### 5. Add POST Request to the React App

- Modify the React app to send a **POST** request to the server, submitting a new "movie" object.
- Add a **POST** method to the Express server that logs the title, year, and poster URL of the movie object passed from the React app.
- The POST route should be available at `/api/movies` on the server.

1. **Install `body-parser`:**
   To handle POST requests, install `body-parser`:
   
   ```bash
   npm install body-parser
   ```

2. **Update `server.js`:**
   Add body-parser middleware:
   
   ```javascript
   const bodyParser = require('body-parser');
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(bodyParser.json());
   ```
3. **Modify Create.js as follows:**



```javascript
// create.js
const handleSubmit = (e) => {
  e.preventDefault();
  
  console.log(`Title: ${title}, Year: ${year}, Poster: ${poster}`);
  
  const movie = {
    title: title,
    year: year,
    poster: poster
  };
  
  axios.post('http://localhost:4000/api/movies', movie)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.data));
};
```

---

### Lab Summary: What You Have Learned

By completing this lab, you have gained practical experience in building and integrating a full-stack application using **React** and **Node/Express**. Specifically, you have learned:

1. **Cross-Origin Resource Sharing (CORS)**:
   - What CORS is, why it's important for communication between the frontend and backend when running on different domains or ports, and how to enable CORS in a Node/Express application.

2. **Making HTTP Requests from React**:
   - How to use the `axios` library in React to send GET requests to retrieve data from an API and render that data dynamically in the frontend.

3. **Handling POST Requests**:
   - How to create forms in React to submit new movie data.
   - How to configure Express to handle POST requests and log the data received from the React frontend.

By combining these skills, you now have a better understanding of how to create a full-stack application where the frontend communicates with a backend server, enabling dynamic data rendering and interaction.
