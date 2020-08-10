const sections = document.querySelectorAll("section");
const navList = document.getElementById("navbar__list");

// create navbar elements by iterating over sections
// and get data-link then make anchor with it
sections.forEach(section =>{
  const dataHeader = section.dataset.nav;
  const data = dataHeader.split(" ").join("").toLowerCase();
  const navItem = document.createElement("li");
  navItem.classList.add("menu__link");
  navItem.setAttribute("data-link", data);
  const anchor = document.createElement("a");
  anchor.href = "#" + data;
  anchor.textContent = dataHeader;
  navItem.appendChild(anchor);
  navList.appendChild(navItem);
})

// Initialize Intersection Observer API
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.6,
};

const handleIntersect = (entries) => {
  entries.forEach((entry) => {
    const navListElement = document.querySelector(
      `.menu__link[data-link='${entry.target.id}']`
    );
    const section = document.getElementById(entry.target.id);
    if (entry.isIntersecting) {
      navListElement.classList.add("active");
    } else {
      if (navListElement.classList.contains("active")) {
        navListElement.classList.remove("active");
      }
    }
  });
};
// Create Observer
let observer = new IntersectionObserver(handleIntersect, options);
sections.forEach(section => {
  observer.observe(section);
});

// smooth scrolling in css