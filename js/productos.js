const mainBody = document.getElementById("idMainBody");

mainBody.innerHTML = productos
  .map(
    (producto) =>
      `
<div class="card col-12 col-md-6 col-lg-4 p-0 border-0 card-producto" style="width: 32rem;">
  <div class="img-container">
    <img src="${producto.image}" class="card-img-top" alt="${producto.title}">
  </div>
  <div class="card-body">
    <h5 class="card-title">${producto.title}</h5>
    <p class="card-category">${producto.category}</p>
    <p class="card-price">$${producto.price}</p>
  </div>
</div>
`
  )
  .join("");

const slider1 = document.getElementById("slider1");
const slider2 = document.getElementById("slider2");
const sliderMinPrice = document.getElementById("idSliderMinPrice");
const sliderMaxPrice = document.getElementById("idSliderMaxPrice");
const rangeTrack = document.querySelector(".range-track");

const absoluteMaxPrice = 500000;

function updateRangeTrack() {
  const min = Math.min(slider1.value, slider2.value);
  const max = Math.max(slider1.value, slider2.value);
  rangeTrack.style.left = min + "%";
  rangeTrack.style.width = max - min + "%";
  sliderMinPrice.innerHTML = `$${(min * absoluteMaxPrice) / 100}`;
  sliderMaxPrice.innerHTML = `$${(max * absoluteMaxPrice) / 100}`;
}

slider1.addEventListener("input", updateRangeTrack);
slider2.addEventListener("input", updateRangeTrack);

updateRangeTrack(); // Initial update
