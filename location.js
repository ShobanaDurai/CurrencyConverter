const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [0, 0],
    zoom: 1
  });
  
  const currencySelect = document.querySelector("#currency-select");
  const locateButton = document.querySelector("#locate-button");
  
  locateButton.addEventListener("click", () => {
    const currency = currencySelect.value;
  
    // Make a request to the free currency exchange API to get the coordinates of the nearest exchange area
    const url = `https://api.currencylayer.com/live?access_key=97547ba79ba3bc582ea5fba1767278d7&currencies=${currency}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Get the coordinates of the nearest exchange area
        const coordinates = data.quotes["USD" + currency].source;
  
        // Add a marker to the map at the coordinates of the nearest exchange area
        const marker = new mapboxgl.Marker()
          .setLngLat(coordinates)
          .addTo(map);
  
        // Fly the map to the coordinates of the nearest exchange area
        map.flyTo({ center: coordinates, zoom: 15 });
      });
  });
  