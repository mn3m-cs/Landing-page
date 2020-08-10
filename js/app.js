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

// Initialize Intersection Observer API, we uses this API to know which sections is visible in the view port ( asynchronously)
// IntersectionObserver()  takes options (circumstances to execute), and callback function to execute at circumstances.
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.6, // indicate at what percentage of the target's visibility the observer's callback should be executed
};

// this code snippet from MDN, exmaple as  how to write observer callback
//https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
const handleIntersect = (entries) => {
  entries.forEach((entry) => {
    elemID = entry.target.id //DRY, use Event Delegation
    
    const navListElement = document.querySelector(
      `[data-link='${elemID}']`);  //get the id of the navbar element

    const section = document.getElementById(entry.target.id); // id of the section
    
    if (entry.isIntersecting) { // if the section intesect the viewport by at least .6 (threshold) --> add active class to current navbar element.
      navListElement.classList.add("active");
    } else { // if not intesecting remove active class
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