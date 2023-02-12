/*

Implement recursive-comments-widget

*/

/*
CSS: ===>
.list-item {
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
    cursor: pointer;
    font-size: 20px;
    user-select: none;
}
ul {
    list-style: none;
}
*/

(function () {
  const root = document.querySelector("#root"); // Assume that we have div with id="root" in html

  function addCommentBox(parentElement) {
    // First we are adding the input box
    const input = document.createElement("input");
    input.setAttribute("placeholder", "Comment Here");
    parentElement.appendChild(input);

    // Now we will add the UL so that later we can add child in it.
    const ul = document.createElement("ul");
    parentElement.appendChild(ul);

    // Event handler for input
    input.addEventListener("change", function () {
      if (this.value.length) {
        addComment(ul, { id: Date.now(), comment: this.value });
        this.value = "";
      }
    });
  }

  function addComment(parent, commentObj) {
    const li = document.createElement("li");
    li.classList.add("list-item");

    const div = document.createElement("div");
    div.appendChild(document.createTextNode(commentObj.comment));
    li.appendChild(div);

    addCommentBox(li);

    parent.insertBefore(li, parent.firstChild);
  }

  addCommentBox(root);
})();
