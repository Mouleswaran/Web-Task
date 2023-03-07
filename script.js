const API_URL = "https://api.openbrewerydb.org/breweries";

const breweriesContainer = document.getElementById("breweries");
const searchInput = document.getElementById("searchInput");

// Fetch data from API and display it
async function fetchBreweries() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    // Filter breweries based on search query
    const filteredData = data.filter((brewery) =>
      brewery.name.toLowerCase().includes(searchInput.value.toLowerCase())
    );

    // Display breweries
    breweriesContainer.innerHTML = "";
    filteredData.forEach((brewery) => {
      const breweryCard = document.createElement("div");
      breweryCard.classList.add("brewery-card");

      const breweryName = document.createElement("h2");
      breweryName.innerText = brewery.name;

      const breweryType = document.createElement("p");
      breweryType.innerText = brewery.brewery_type;

      const breweryAddress = document.createElement("p");
      breweryAddress.innerText = `${brewery.street}, ${brewery.city}, ${brewery.state}, ${brewery.postal_code}`;

      const breweryWebsite = document.createElement("a");
      breweryWebsite.href = brewery.website_url;
      breweryWebsite.target = "_blank";
      breweryWebsite.innerText = brewery.website_url;

      const breweryPhone = document.createElement("p");
      breweryPhone.innerText = brewery.phone;

      breweryCard.appendChild(breweryName);
      breweryCard.appendChild(breweryType);
      breweryCard.appendChild(breweryAddress);
      breweryCard.appendChild(breweryWebsite);
      breweryCard.appendChild(breweryPhone);

      breweriesContainer.appendChild(breweryCard);
    });
  } catch (error) {
    console.error(error);
  }
}

// Event listener for search input
searchInput.addEventListener("input", fetchBreweries);

// Initial fetch and display of breweries
fetchBreweries();
