const splideList = document.querySelector(".splide__list");

(async function generateSlider() {
  async function fetchData() {
    const result = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=3a8866f399840a6b6a592f097f506f6c"
    );
    const res = await result.json();
    console.log(res.results);
    return res.results;

    // console.log(res);
  }

  let data = await fetchData();
  console.log(data);

  //   Getting all the genres from teh TMDB api and storing them as an array:
  const allGenres = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];

  function getCurrentGenre(id) {
    // console.log(id);
    const currentGenres = [];
    for (let i = 0; i < id.length; i++) {
      for (let j = 0; j < allGenres.length; j++) {
        if (allGenres[j].id === id[i]) {
          currentGenres.push(allGenres[i].name);
        }
      }
    }
    // console.log(currentGenres);
    return currentGenres;
  }

  async function getCurrentImage(poster_path) {
    const image = await fetch(`https://image.tmdb.org/t/p/w300/${poster_path}`);

    // console.log(image.url);
    return image.url;
  }

  splideList.innerHTML = data
    .map((item) => {
      //   console.log(item);
      const currentItemImage = getCurrentImage(item.poster_path);
      //   console.log(currentItemImage);
      const currentGenre = getCurrentGenre(item.genre_ids).join(",");
      //   console.log(currentGenre);
      return `<div class="splide__slide">
        <img src='https://image.tmdb.org/t/p/w300//9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg]' class="item-image" alt="Item Image"/>
        <p class="item-title">${item.title}</p>
        <p>${currentGenre}</p>
        <div class="splide-slide-overlay" onclick="addFavourite(${item.id})">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="favourite-btn">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.17157 5.48284C4.73367 3.96185 7.26633 3.96185 8.82842 5.48284L9.99999 6.62359L11.1716 5.48284C12.7337 3.96185 15.2663 3.96185 16.8284 5.48284C18.3905 7.00383 18.3905 9.46984 16.8284 10.9908L9.99999 17.6396L3.17157 10.9908C1.60948 9.46984 1.60948 7.00383 3.17157 5.48284Z" fill="#D1D5DB"/>
</svg></div>
    </div>`;
    })
    .join("");

  // Function to search the movie:

  //   function displaySearchedMovie() {
  const searchText = document.getElementById("search-bar").value;
  console.log(searchText);
  const searchButton = document.querySelector(".search-btn");
  searchButton.addEventListener("click", searchMovie);

  async function searchMovie() {
    const movie = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=3a8866f399840a6b6a592f097f506f6c&query=The%20Shawshank%20Redemption`
    );
    console.log(movie);
  }
  //   }

  //   displaySearchedMovie();

  //   Function to set the favourites part:
  let basket = JSON.parse(localStorage.getItem("data"))
    ? JSON.parse(localStorage.getItem("data"))
    : [];

  function addFavourite(id) {
    basket.push({ id: id, item: 1 });
  }

  const favouritesSection = document.querySelector(".favourites-section");

  basket.map((item) => {
    return;
  });
})();

const splide = new Splide(".splide", {
  type: "loop",
  perPage: 4,
  gap: "80px",
  width: "100%",
  arrows: true,
  prev: true,
  permove: 4,
  breakpoints: {
    700: {
      width: "100%",
    },
    480: {
      width: "100%",
    },
  },
});
splide.mount();
