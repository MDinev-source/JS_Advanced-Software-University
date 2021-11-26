function solve() {
    let input = document.querySelectorAll("input");
    let buttonOnScreen = document.querySelector("button");

    let sections = document.querySelectorAll("section");

    let movieSection = sections[0];
    let ulMovie = movieSection.children[1];

    let archiveSection = sections[1];
    let ulArchive = archiveSection.children[1];

    let name = input[0];
    let hall = input[1];
    let ticketPrice = input[2];

    buttonOnScreen.addEventListener("click", function (e) {
        e.preventDefault();

        if (
            name.value === "" ||
            hall.value === "" ||
            ticketPrice.value === "" ||
            Number.isNaN(Number(ticketPrice.value))) {
            return;
        }

        else {
            let li = document.createElement("li");
            let div = document.createElement("div");

            let span = create("span", name.value);
            let strongHall = create("strong", `Hall: ${hall.value}`)

            let strongPrice = create("strong", `${Number(ticketPrice.value).toFixed(2)}`);
            let input = document.createElement("input");
            input.placeholder = "Ticket Sold";
            let button = create("button", "Archive");

            div.appendChild(strongPrice);
            div.appendChild(input);
            div.appendChild(button);

            li.appendChild(span);
            li.appendChild(strongHall);

            li.appendChild(div);

            ulMovie.appendChild(li);

            name.value = "";
            hall.value = "";
            ticketPrice.value = "";

            button.addEventListener("click", function () {
                if (Number.isNaN(Number(input.value)) || input.value === "") {
                    return;
                }
                else {
                    li.removeChild(div);
                    let deleteButton = create("button", "Delete");
                    strongHall.textContent = "Total amount: " +
                        (Number(input.value) * Number(strongPrice.textContent)).toFixed(2);

                    li.appendChild(deleteButton);
                    ulArchive.appendChild(li);

                    deleteButton.addEventListener("click", function (e) {
                        let parent = e.target.parentNode.parentNode;
                        parent.removeChild(li);
                    });
                }
                let clearButton = sections[1].children[2];
                clearButton.addEventListener("click", function () {
                    ulArchive.innerHTML = "";
                })
            });
        }
    });

    function create(el, text, classList) {
        let e = document.createElement(el);

        if (text) {
            e.textContent = text;
        }
        if (classList) {
            e.classList = classList;
        }
        return e;
    }
}