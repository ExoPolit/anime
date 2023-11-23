//API used: Jikan v4
const url = `https://api.jikan.moe/v4`;

document.getElementById("anime-form").addEventListener("submit", function(event){
  //Prevent default form submission
  event.preventDefault();

  //Call getAnimeData function
  getAnimeData();
})

async function getAnimeData() {
  const animeName = document.getElementById("anime-name").value;

  // Filter function
  const filterType = document.getElementById("filterType").value;
  let apiUrl = `${url}/anime?q=${animeName}`;
  if (filterType !== "all") {
    apiUrl += `&type=${filterType}`;
  }

  //Fetch API
  const response = await fetch(apiUrl);
  const result = await response.json();
  console.log(result); // Log entire API response

  // Sort by favorites (assuming favorites property exists in your data)
  const mostFeatured = result.data.sort((a, b) => b.favorites - a.favorites);

  // Clear existing content
  const animeDataDiv = document.getElementById("anime-data");
  animeDataDiv.innerHTML = "";

  // Get Title
  const animeTitle = result.data[0].title;
  console.log("Anime Title:", animeTitle);
  // Get ID
  const animeId = result.data[0].mal_id;
  console.log("Anime ID:", animeId);

  //Truncate the synonpsis(info) to show the first 3 sentences
  function truncateSynopsis(synopsis) {
    if (!synopsis) {
      return "";
    }
    const sentences = synopsis.split(".").slice(0, 2);
    return sentences.join(".") + ".";
  }

  /*

Disabled function, due to issues i could not fix. I will come back to it on Discord.
Show full Info-Text about the Anime you are interested in. Styl: smooth animation opens AnimeCard, displaying the output expected. Best Scenario: Each letter and spaces appear one by one. For userExperience, i think that this is a perfect option. 
function showFullSynopsis(synopsis) {
  const synonpsisDiv = document.createElement("div");
  synonpsisDiv.innerHTML = `<p>${synopsis}</p>`;
  document.body.appendChild(synonpsisDiv)
}

*/

  // Build in HTML
  if (result.data && result.data.length > 0) {
  result.data.forEach((item) => {
    const anime = item;
    const animeCard = document.createElement("div");
    if (filterType === "all" || anime.type.toLowerCase() === filterType) {
      const imageUrl = item.images;
      animeCard.innerHTML = `
      
    <p class="anime-title"> ${anime.title}</p> 
      <img src="${imageUrl.jpg.image_url}" alt="Anime Image"></img>
      <p class="local-name"><b>Local Name:</b> ${anime.title_japanese} <p>
      <p class="synopsis">${truncateSynopsis(anime.synopsis)}</p>
      <button id="interactive-Button" class="info-button" onmouseover="showInfo()" onmouseout="hideInfo()" onclick="showFullSynopsis('${anime.synopsis}')" style="cursor: no-drop">Show More</button>
      <div id="info-Text"><i class="fas fa-info"></i> This  button is currently not active.</div>
      <p><b>Type:</b> ${anime.type}</p>
      <p><b>Total Episodes:</b> ${anime.episodes}</p>
    `;
      animeCard.classList.add("anime-card"); // Add a class for styling
      animeCard.style.marginTop = "20px"; // Add margin between anime cards

      animeCard.addEventListener("contextmenu", (event) => {
        console.log("Right-click event detected");
        event.preventDefault(); // Prevent the context menu
      });
    }

    animeDataDiv.appendChild(animeCard);
  });
} else (console.error("No data available for the given filter"))

  // Show the anime-data section
  const animeSection = document.getElementById("anime");
  animeSection.style.display = "block";
}

  // Add eventListener for filter change outside the function(!)
  document
    .getElementById("filterType")
    .addEventListener("change", getAnimeData);

// Info Button onmouseover-/out
function showInfo() {
  document.getElementById("info-Text").style.display = "block";
}

function hideInfo() {
  document.getElementById("info-Text").style.display = "none";
}
// KeyPress function

function handleKeyPress(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getAnimeData();
  }
}

//Display AnimeCard when Clicked on "Anime" in Nav
function mostFeatured(){
  return getAnimeData();
}

// Hambuger
function openMenu() {
  document.body.classList += " menu--open";
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}
