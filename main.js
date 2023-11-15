//Fetch API Jikan
const url = `https://api.jikan.moe/v4`;

async function getAnimeData() {
  const animeName = document.getElementById("anime-name").value;
  const response = await fetch(`${url}/anime?q=${animeName}`);
  const result = await response.json();
  console.log(result);

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
if(!synopsis){
  return '';
}
  const sentences = synopsis.split('.').slice(0, 3);
  return sentences.join('.') + '.';
}

/*

// disabled function

function showFullSynopsis(synopsis) {
  const synonpsisDiv = document.createElement("div");
  synonpsisDiv.innerHTML = `<p>${synopsis}</p>`;
  document.body.appendChild(synonpsisDiv)
}

*/

  // Build in HTML
  result.data.forEach((item) => {
    const anime = item;
    const imageUrl = item.images;
    const animeCard = document.createElement("div");
    animeCard.innerHTML = `
      
    <p> ${anime.title}</p> 
      <img src="${imageUrl.jpg.image_url}" alt="Anime Image"></img>
      <p class="local-name"><b>Local Name:</b> ${anime.title_japanese} <p>
      <p class="synopsis"><b>Synopsis:</b> ${truncateSynopsis(anime.synopsis)}</p>
      <button class="info-button" onclick="showFullSynopsis('${anime.synopsis}')" style="cursor: no-drop">Show More</button>
      <p><b>Type:</b> ${anime.type}</p>
      <p><b>Total Episodes:</b> ${anime.episodes}</p>
    `;
    animeCard.classList.add("anime-card"); // Add a class for styling
    animeCard.style.marginTop = "20px"; // Add margin between anime cards

    animeCard.addEventListener("contextmenu", (event) => {
      // Handle right-click on anime card, if needed
      event.preventDefault(); // Prevent the context menu
    });

    animeDataDiv.appendChild(animeCard);
  });

  // Show the anime-data section
  const animeSection = document.getElementById("anime");
  animeSection.style.display = "block";
}

// KeyPress function

function handleKeyPress(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getAnimeData();
  }
}


// Hambuger
function openMenu() {
  document.body.classList += " menu--open"
}

function closeMenu() {
  document.body.classList.remove ('menu--open')
}