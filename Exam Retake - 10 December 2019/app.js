function solution() {
    let sections = document.querySelectorAll("section");

    let input = document.querySelector("input");
    let button = document.querySelector("button");

    let ulList = sections[1].children[1];

    let ulSent = sections[2].children[1];

    let ulDiscarted = sections[3].children[1];

    button.addEventListener("click", function (e) {
        e.preventDefault();

        if (input.value === "") {
            return;
        }

        let li = create("li", `${input.value}`, "gift");
        let sendButton = create("button", "Send","","sendButton");
        let discardButton = create("button", "Discard","", "discardButton");

        li.appendChild(sendButton);
        li.appendChild(discardButton);

        ulList.appendChild(li);
        sortList(ulList);
        input.value = "";

        sendButton.addEventListener("click", function(e){
            let actualLi=e.target.parentNode;

            actualLi.removeChild(sendButton);
            actualLi.removeChild(discardButton);
            ulSent.appendChild(actualLi);

            ulList.removeChild(actualLi);
        })

        discardButton.addEventListener("click", function(e){
            let actualLi=e.target.parentNode;

            actualLi.removeChild(sendButton);
            actualLi.removeChild(discardButton);
            ulDiscarted.appendChild(actualLi);

            ulList.removeChild(actualLi);
        })
    })

    function sortList(ul) {
        let sorted = Array.from(ul.getElementsByTagName("li")).sort((a, b) =>
            a.textContent.localeCompare(b.textContent));

        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
        sorted.forEach((li) => ul.appendChild(li));


    }
    function create(el, text, classList, id) {
        let e = document.createElement(el);

        if (text) {
            e.textContent = text;
        }
        if (classList) {
            e.classList = classList;
        }
        if (id) {
            e.id = id;
        }
        return e;
    }
}