const slideLeft = document.querySelector(".slide-left");
const slideRight = document.querySelector(".slide-right");
const cardsContainer = document.querySelector(".cards"); // Target the container instead of individual cards

let offset = 0; // Tracks the offset position of the cards

// Slide left
slideLeft.addEventListener("click", () => {
    offset -= 150; // Move 150px to the right
    cardsContainer.scrollLeft = offset; // Set scrollLeft property of the container
});

// Slide right
slideRight.addEventListener("click", () => {
    offset += 150; // Move 150px to the left
    cardsContainer.scrollLeft = offset; // Set scrollLeft property of the container
});

// Log the width for debugging


const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const imgPath = "https://image.tmdb.org/t/p/w1280";
const apiUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const moviesBox = document.querySelector(".cards");

// Fetch movies and display them
const getMovies = async (apiUrl) => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        showMovies(data.results);
        console.log(data);
        
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
};
const getImage = async (SEARCHAPI) => {
    try {
        const response = await fetch(SEARCHAPI);
        const data = await response.json();
        console.log(data);
        
    } catch (error) {
        console.error("it's Faild", error);
    }
};
getImage(SEARCHAPI)
// Update the `showMovies` function to include data-bg for each card
const showMovies = (movies) => {
    moviesBox.innerHTML = ""; // Clear existing content
    movies.forEach(movie => {
        const year = movie.release_date ? movie.release_date.split("-")[0] : "Unknown";
        const backgroundImage = imgPath + movie.backdrop_path; // Use backdrop_path for a larger image

        const movieHTML = `
            <a href="#" 
               class="card" 
               data-title="${movie.title}" 
               data-overview="${movie.overview}" 
               data-rating="${Math.round(movie.vote_average * 10) / 10}" 
               data-bg="${backgroundImage}">
                <img src="${imgPath + movie.poster_path}" alt="" class="poster">
                <div class="rest_card">
                    <img src="${imgPath + movie.backdrop_path}" alt="${movie.title}">
                    <div class="content">
                        <h2>${movie.title}</h2>
                        <div class="sub-title">
                            <p>Action, ${year}</p>
                            <h3><span>IMDB</span> <i class="fa-solid fa-star"></i>${Math.round(movie.vote_average * 10) / 10}</h3>
                        </div>
                    </div>
                </div>
            </a>
        `;
        moviesBox.innerHTML += movieHTML;
    });
};

// Add event listener for card clicks to update the header background
moviesBox.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) {
        const bgImage = card.getAttribute("data-bg");
        const header = document.querySelector("header");
        const video =  document.querySelector("header video");

        // Dynamically update the header's background
        header.style.setProperty("--bg-image", `url('${bgImage}')`);
        header.style.backgroundImage = `url('${bgImage}')`; // Fallback
        video.style.display = "none"
    }
});

// Function to update movie information
const updateMovieInfo = (title, overview, rating) => {
    document.querySelector("#title").innerText = title;
    document.querySelector("#breif").innerText = overview;
    document.querySelector("#rate").innerHTML = `
        <h3 id="rate">
            <span>IMDB</span> 
            <i class="fa-solid fa-star"></i> 
            ${rating}
        </h3>`;
};

// Event delegation for handling card clicks
moviesBox.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) {
        // Retrieve movie data from the card's data attributes
        const title = card.getAttribute("data-title");
        const overview = card.getAttribute("data-overview");
        const rating = card.getAttribute("data-rating");

        // Update the information panel
        updateMovieInfo(title, overview, rating);
    }
});

// Initial call to display popular movies
getMovies(apiUrl);

// Optional: Implement search functionality
const search = document.querySelector('#search');
const searching = document.querySelector(".searching");

// Search functionality
search.addEventListener("input", (e) => {
    const searchTerm = e.target.value.trim();

    if (searchTerm) {
        // Fetch movies matching the search term
        getMovies(SEARCHAPI + searchTerm);

        // Simulate an example movie result (use the API result for dynamic data)
        fetch(SEARCHAPI + searchTerm)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    const movie = data.results[0]; // Use the first result for the demo
                    const movieTitle = movie.title;
                    const movieYear = movie.release_date ? movie.release_date.split("-")[0] : "Unknown";
                    const movieRating = movie.vote_average;
                    const moviePoster = imgPath + movie.poster_path;
                    
                    // Update the searching section with dynamic data
                    searching.style.display = "block";
                    searching.innerHTML = `
                        <a href="#" class="card">
                            <img src="${moviePoster}" alt="${movieTitle}" class="poster">
                            <div class="content">
                                <h3>${movieTitle}</h3>
                                <p class="details">
                                    Action ${movieYear} &nbsp;|&nbsp; 
                                    <span>IMDB</span> 
                                    <i class="fa-solid fa-star"></i> ${Math.round(movieRating * 10) / 10}
                                </p>
                            </div>
                        </a>`;
                } else {
                    searching.innerHTML = `<p>No results found for "${searchTerm}"</p>`;
                }
            })
            .catch(error => {
                console.error("Error fetching movie data:", error);
                searching.innerHTML = `<p>Sorry, something went wrong. Please try again later.</p>`;
            });
    } else {
        // Show the default movie list if the search input is empty
        getMovies(apiUrl);
        
        // Hide the searching container
        searching.style.display = "none";
    }
});






const hoverDivs = document.querySelectorAll(".btns a");
const tooltip = document.querySelector("#tooltip");

// Loop through each <a> tag and add event listeners
hoverDivs.forEach((hoverDiv) => {
    // Show the tooltip on mouse move
    hoverDiv.addEventListener("mousemove", (e) => {
        tooltip.style.display = "block"; // Make tooltip visible
        tooltip.style.left = `${e.pageX - 60}px`; // Position tooltip near the cursor
        tooltip.style.top = `${e.pageY - 60}px`;
    });

    // Hide the tooltip when mouse leaves the <a> tag
    hoverDiv.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
    });
});
