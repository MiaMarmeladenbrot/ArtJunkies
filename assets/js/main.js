// # APIs
// MET Museum: https://metmuseum.github.io/
// visuelle Suche: https://www.artpi.co/
// Art Institute Chicago: https://www.artic.edu/open-access/public-api
// Artsy.net: https://developers.artsy.net/

// # To Dos
// - Variablen für Output festlegen
// - Funktion für Daten-Fetchen mit Such-Input
// - EventListener auf Such-Button
// -

// https://collectionapi.metmuseum.org/public/collection/v1/search
// query request: https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers

// ! Variablen
const searchOutput = document.querySelector(".search-output");
const submitBtn = document.querySelector("#submit-btn");

// ! Funktion, um Art-Daten über User-Input zu fetchen
const fetchData = () => {
  const searchInput = document.querySelector("#search-input").value;
  console.log(searchInput);

  fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchInput}
  `)
    .then((res) => res.json())
    .then((artData) => console.log(artData))
    // --> das gibt eine Sammlung von ObjectIDs, damit müsste man dann noch diese Daten fetchen: https://collectionapi.metmuseum.org/public/collection/v1/objects/[objectID] und deren Inhalte im HTML ausgeben

    .catch((err) => console.log(err));
};

// ! EventListener auf submit-Button
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("EL läuft");
  fetchData();
});
