var sections = [
  {
    id: 1,
    sectionName: "Section1",
    sectionDescription: `Sed non urna. Donec et ante. Phasellus eu ligula
        Vestibulum sit amet purus. Vivamus hendrerit, dolor
        at aliquet laoreet, mauris turpis porttitor velit,
        faucibus interdum tellus libero ac justo. Vivamus 
        non quam. In suscipit faucibus urna.`,
  },
  {
    id: 2,
    sectionName: "Section2",
    sectionDescription: `Sed non urna. Donec et ante. Phasellus eu ligula
        Vestibulum sit amet purus. Vivamus hendrerit, dolor
        at aliquet laoreet, mauris turpis porttitor velit,
        faucibus interdum tellus libero ac justo. Vivamus 
        non quam. In suscipit faucibus urna.`,
  },
  {
    id: 3,
    sectionName: "Section3",
    sectionDescription: `Sed non urna. Donec et ante. Phasellus eu ligula
        Vestibulum sit amet purus. Vivamus hendrerit, dolor
        at aliquet laoreet, mauris turpis porttitor velit,
        faucibus interdum tellus libero ac justo. Vivamus 
        non quam. In suscipit faucibus urna.`,
  },
];

function createSection({ id, sectionName, sectionDescription }) {
  const sectionContainer = document.createElement("div");
  sectionContainer.style.width = "100%";
  sectionContainer.style.padding = "5px";
  sectionContainer.style.border = "1px solid black";

  const sectionNameElement = document.createElement("h3");
  sectionNameElement.setAttribute("id", id);
  sectionNameElement.style.cursor = "pointer";
  sectionNameElement.style.border = "1px solid pink";
  const caret = document.createElement("span");
  caret.textContent = "> ";
  sectionNameElement.appendChild(caret);
  sectionNameElement.appendChild(document.createTextNode(sectionName));

  const sectionDescriptionElement = document.createElement("div");
  sectionDescriptionElement.style.display = "none";
  sectionDescriptionElement.textContent = sectionDescription;

  sectionContainer.appendChild(sectionNameElement);
  sectionContainer.appendChild(sectionDescriptionElement);
  return sectionContainer;
}

function buildAccordion(root, sections) {
  const documentFragment = document.createDocumentFragment();
  const sectionsArray = [];
  sections.forEach((section) => {
    const sectionElement = createSection(section);
    documentFragment.appendChild(sectionElement);
    sectionsArray.push(sectionElement);
  });
  root.appendChild(documentFragment);

  root.addEventListener("click", function ({ target }) {
    if (target.nodeName === "H3") {
      sectionsArray
        .filter((section) => section.firstChild.id !== target.id)
        .forEach((section) => {
          section.lastChild.style.display = "none"; // lastChild is description
          section.firstChild.firstChild.textContent = "> ";
        });
      target.nextSibling.style.display =
        target.nextSibling.style.display === "none" ? "block" : "none";

      target.firstChild.textContent =
        target.firstChild.textContent === "> " ? "V " : "> ";
    }
  });
}

buildAccordion(document.querySelector("#root"), sections);
