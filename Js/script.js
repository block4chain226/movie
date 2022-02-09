// const url = "https://type.fit/api/quotes";
// async function getData() {
//   const res = await fetch(url);
//   const data = await res.json();
//   console.log(data);
// }

// let p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("request data...");
//     const backendData = {
//       port: 2000,
//       server: "aws",
//     };
//     resolve(backendData);
//   }, 2000);
// })
//   .then((data) => {
//     console.log("data recieved", data);
//     return new Promise((resolve, reject) => {
//       data.newproperty = "new";

//       resolve(data);
//     }, 3000);
//   })
//   .catch((err) => console.error("error", err))
//   .then((data) => {
//     console.log("data updated", data);
//   });

// const buyPromise = new Promise((resolve, reject) => {
//   const money = 26000;
//   const phorn = 25000;
//   if (money > phorn) {
//     resolve({
//       brand: "iphone",
//       model: 12,
//       price: 24000,
//     });
//   } else {
//     reject("have not money");
//   }
// })
//   .then((data) => {
//     console.log("buy", data.model, data.brand);
//   })
//   .catch((reason) => {
//     console.log("not buy ", reason);
//   });

// const delay = (ms) => {
//   return new Promise((r) => setTimeout(() => r(), ms));
// };

// //delay(2000).then(() => console.log("2ms"));

// function fetchData() {
//   return delay(2000)
//     .then(() => fetch(url))
//     .then((resolve) => resolve.json());
// }

// fetchData()
//   .then((data) => console.log("data", data))
//   .catch((err) => console.error("error ", err));

//get elements

//functions

//const searchInput = document.querySelector("form").firstElementChild;

const searchInput = document.getElementById("search1");
searchInput.focus();
const submitButton = document.querySelector("#submit");
const searchCross = document.querySelector(".search__cross");

let url;

url =
  "https://api.themoviedb.org/3/search/movie?query=spring&api_key=3fd2be6f0c70a2a598f084ddfb75487c";

if (sessionStorage.getItem("url") && sessionStorage.getItem("film")) {
  searchInput.value = sessionStorage.getItem("film");
  url = sessionStorage.getItem("url");
}
async function getMovieData(url) {
  try {
    let data = await fetch(url);
    let resolve = await data.json();
    createCard(resolve);
  } catch (e) {
    console.error(e);
  }
}

function createCard(data) {
  // data.Search.map((item) => {
  //   console.log(item);
  // });
  const moviesContainer = document.querySelector(".movies__container");
  moviesContainer.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const moviesCard = document.createElement("div");
    moviesCard.classList.add("movies__card", "card");
    const cardPoster = document.createElement("div");
    cardPoster.classList.add("card__poster");
    const img = document.createElement("img");
    img.src =
      "https://image.tmdb.org/t/p/w1280" + data["results"][i]["poster_path"];
    //film description
    const description = document.createElement("div");
    description.classList.add("card__description");
    description.textContent = data["results"][i]["overview"];
    cardPoster.append(description);
    cardPoster.append(img);
    moviesCard.append(cardPoster);

    const cardText = document.createElement("div");
    cardText.classList.add("card__text");
    const cardFilm = document.createElement("div");
    cardFilm.classList.add("card__film", "movies__film");
    const p = document.createElement("p");
    p.textContent = data["results"][i]["title"];
    cardFilm.append(p);
    cardText.append(cardFilm);

    const cardRating = document.createElement("div");
    cardRating.classList.add("card__rating", "movies__rating");
    const span = document.createElement("span");
    span.textContent = data["results"][i]["vote_average"];
    cardRating.append(span);
    cardText.append(cardRating);

    moviesCard.append(cardText);

    moviesContainer.append(moviesCard);
  }
}

function search(e) {
  let film = searchInput.value;
  url = `https://api.themoviedb.org/3/search/movie?query=${film}&api_key=3fd2be6f0c70a2a598f084ddfb75487c`;
  sessionStorage.setItem("url", url);
  sessionStorage.setItem("film", film);
  getMovieData(url);
}

function searchEmpty(e) {
  searchInput.value = "";
  sessionStorage.removeItem("film");
}

//call functions
getMovieData(url);

//event
submitButton.addEventListener("click", search);
searchCross.addEventListener("click", searchEmpty);
