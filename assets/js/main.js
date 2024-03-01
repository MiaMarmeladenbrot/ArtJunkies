// ! Variablen
const searchOutput = document.querySelector(".search-output");
const submitBtn = document.querySelector("#submit-btn");

// ! Funktion, um Art-Daten über User-Input zu fetchen
const fetchData = () => {
  const searchInput = document.querySelector("#search-input").value;
  // console.log(searchInput);

  // * 1. Fetch, um Suchinput in der API zu suchen:
  fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchInput}
  `)
    .then((res) => res.json())
    .then((artData) => {
      // console.log(artData);
      // console.log(artData.objectIDs);

      // * über die gesuchten Daten loopen, um alle weiteren Einzeldaten zu erhalten:
      artData.objectIDs.map((objectIds) => {
        // console.log(objectIds);

        // * 2. Fetch, um mit den geloopten IDs aus dem Suchinput die weiteren Daten über eine ander API-Adresse zu holen:
        fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectIds}`
        )
          .then((res) => res.json())
          .then((artItem) => {
            // console.log(artItem);

            // * die gesuchten und geloopten Daten im HTML rendern:
            searchOutput.innerHTML += `
            <div>
            <img src="${artItem.primaryImageSmall}" alt="${artItem.title}">
            <h3>${artItem.title}</h3>
            <p>${artItem.objectName}</p>
            <h4>${artItem.artistDisplayName}</h4>
            <p>${artItem.objectDate}</p>
            <a class="button" href="${artItem.objectURL}">Go to Art</a>
            </div>

            `;
          })
          .catch((err) => console.log("fehler 2. Loop", err));
      });
    })
    .catch((err) => console.log("fehler im 1. Loop", err));
};

// ! EventListener auf submit-Button
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  // console.log("EL läuft");

  // * Höhe des Headers anpassen, damit man gleich die divs sieht
  document.querySelector("header").classList.add("less-height");

  // * Search-Output leeren:
  searchOutput.innerHTML = "";

  // * Funktionsaufruf, um die Daten zu fetchen:
  fetchData();
});
