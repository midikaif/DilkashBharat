maptilersdk.config.apiKey = maptilerApiKey;

const map = new maptilersdk.Map({
  container: "map",
  style: maptilersdk.MapStyle.BRIGHT,
  center: place.geometry.coordinates, // starting position [lng, lat]
  zoom: 10, // starting zoom
});

console.log(place.title);

new maptilersdk.Marker()
  .setLngLat(place.geometry.coordinates)
  .setPopup(
    new maptilersdk.Popup({ offset: 25 }).setHTML(
      `<h3>${place.title}</h3><p>${place.location}</p>`
    )
  )
  .addTo(map);
