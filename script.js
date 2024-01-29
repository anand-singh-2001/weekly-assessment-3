function genreStr(myGenre) {
  let genreStr = [];
  myGenre.map((genreID) => {
    genreStr.push(myMap.get(genreID));
  });
  return genreStr.join(", ");
}

let myMap = new Map();

const urlGenres = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const optionsGenres = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGRhMDI0MDI3OWQwMTQ5Y2JlZjIzNDlhMzBiNWVlYSIsInN1YiI6IjU2Y2ZjYWJiYzNhMzY4MWU0NDAwNTQ4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N4fQwyEQMyNvkGSD2SDJBf9K_iHlt0WcZw0yFZktmkw",
  },
};

fetch(urlGenres, optionsGenres)
  .then((res) => res.json())
  .then((json) => {
    json.genres.map((data) => {
      myMap.set(data.id, data.name);
    });
  })
  .catch((err) => console.error("error:" + err));

// Recommended section:
let imgPath = `https://image.tmdb.org/t/p/original`;
const url2 =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc";
const options2 = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGRhMDI0MDI3OWQwMTQ5Y2JlZjIzNDlhMzBiNWVlYSIsInN1YiI6IjU2Y2ZjYWJiYzNhMzY4MWU0NDAwNTQ4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N4fQwyEQMyNvkGSD2SDJBf9K_iHlt0WcZw0yFZktmkw",
  },
};

fetch(url2, options2)
  .then((res) => res.json())
  .then((json) => {
    let str = "";

    json.results.map((movie) => {
      str += ` <li class="splide__slide my-li-slide">
                        <div class="inside-li">
                            <div class="li-image">
                            <img class="li-img" src=${
                              imgPath + movie.poster_path
                            } alt="">
                            </div>
                            <h3>${movie.original_title}</h3>
                            <p>${genreStr(movie.genre_ids)}</p>
                        </div>
                    </li>`;
    });
    document.querySelector('ul[data-ref="ul"]').innerHTML = str;
    var splide = new Splide(".splide", {
      width: "100%",
      perPage: 4,
      gap: "5em",
      autoWidth: true,
      pagination: false,
    });
    splide.mount();
  });

document.querySelector(".search-div").addEventListener("submit", (e) => {
  e.preventDefault();
  const value = document.querySelector(".search-input").value;
  const moviesData = [];
  let movieGenres = [];
  let imgPath = `https://image.tmdb.org/t/p/original`;
  const url = `https://api.themoviedb.org/3/search/movie?query=${value}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGRhMDI0MDI3OWQwMTQ5Y2JlZjIzNDlhMzBiNWVlYSIsInN1YiI6IjU2Y2ZjYWJiYzNhMzY4MWU0NDAwNTQ4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N4fQwyEQMyNvkGSD2SDJBf9K_iHlt0WcZw0yFZktmkw",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      moviesData.push(json.results[0]);
      document.querySelector(".search-poster").src =
        imgPath + json.results[0].poster_path;
      document.querySelector(".title").innerText =
        json.results[0].original_title;
      document.querySelector(".discription").innerText =
        json.results[0].overview;
      document.querySelector(".relese-date").innerText =
        json.results[0].release_date;
      movieGenres = json.results[0].genre_ids;
      document.querySelector(".category").innerText = genreStr(
        json.results[0].genre_ids
      );
    })
    .then((data) => {
      const url2 =
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc" +
        "&with_genres=" +
        encodeURI(movieGenres.join(","));
      const options2 = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGRhMDI0MDI3OWQwMTQ5Y2JlZjIzNDlhMzBiNWVlYSIsInN1YiI6IjU2Y2ZjYWJiYzNhMzY4MWU0NDAwNTQ4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N4fQwyEQMyNvkGSD2SDJBf9K_iHlt0WcZw0yFZktmkw",
        },
      };

      fetch(url2, options2)
        .then((res) => res.json())
        .then((json) => {
          let str = "";

          json.results.map((movie) => {
            str += ` <li class="splide__slide my-li-slide">
                        <div class="inside-li">
                            <div class="li-image">
                            <img class="li-img" src=${
                              imgPath + movie.poster_path
                            } alt="">
                            </div>
                            <h3>${movie.original_title}</h3>
                            <p>${genreStr(movie.genre_ids)}</p>
                        </div>
                    </li>`;
          });
          document.querySelector('ul[data-ref="ul"]').innerHTML = str;
          var splide = new Splide(".splide", {
            type: "slide",
            width: "100%",
            perPage: 4,
            gap: "1.5rem",
            autoWidth: true,
            pagination: false,
          });
          splide.mount();
          document.querySelector(".search-input").value = "";
        })
        .catch((err) => console.error("error:" + err));
    })
    .catch((err) => console.error("error:" + err));
});

var splide = new Splide(".splider-two", {
  width: "100%",
  gap: "5em",
  autoWidth: true,
  pagination: false,
});
splide.mount();
