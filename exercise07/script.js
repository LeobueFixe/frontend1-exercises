
const IMAGE_COUNT = 5;

function getRandomImages(count) {
  const images = [];
  for (let i = 0; i < count; i++) {
    const id = Math.floor(Math.random() * 1000);
    images.push(`https://picsum.photos/id/${id}/800/400`);
  }
  return images;
}

function loadCarouselImages() {
  const list = document.querySelector(".splide__list");
  const images = getRandomImages(IMAGE_COUNT);

  images.forEach(url => {
    const li = document.createElement("li");
    li.className = "splide__slide";

    const img = document.createElement("img");
    img.src = url;

    li.appendChild(img);
    list.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadCarouselImages();

  new Splide("#image-carousel", {
    type: "loop",
    perPage: 1,
    autoplay: true,
    interval: 2000,
  }).mount();
});

let startTime = null;
let interval = null;

function updateChrono() {
  const diff = dayjs().diff(startTime, "millisecond");
  const time = dayjs(diff).format("mm:ss:SSS");
  document.getElementById("chrono").textContent = time;
}

document.getElementById("start").onclick = () => {
  if (!interval) {
    startTime = dayjs();
    interval = setInterval(updateChrono, 10);
  }
};

document.getElementById("stop").onclick = () => {
  clearInterval(interval);
  interval = null;
};

document.getElementById("reset").onclick = () => {
  clearInterval(interval);
  interval = null;
  document.getElementById("chrono").textContent = "00:00:00";
};
