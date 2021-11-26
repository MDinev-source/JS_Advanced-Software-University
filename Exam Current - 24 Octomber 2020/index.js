function solve() {

   let input = document.querySelectorAll('input');
   let lecture = input[0];
   let date = input[1];

   let module = document.getElementsByName("lecture-module")[0];

   let button = document.querySelector("button");

   let divModules = document.querySelectorAll('div')[0];

   let arrayModule = [];

   button.addEventListener("click", function (e) {
      e.preventDefault();

      let lectureValue = lecture.value;
      let dateValue = date.value;
      let moduleValue = module.value;

      if (lectureValue === ""
         || dateValue === ""
         || moduleValue === "Select module") {
         return;
      }
      else {
         let date = dateValue.substring(0, 10).replace(/-/g, '/');
         let time = dateValue.substring(11);

         let textH3 = `${moduleValue.toUpperCase()}-MODULE`

         if (arrayModule.find(x => x.firstChild.textContent === textH3) === undefined) {

            let h3 = ce('h3', textH3);

            let divMod = ce('div', '', "module");

            let ul = ce('ul');

            divMod.appendChild(h3);
            divMod.appendChild(ul);

            divModules.appendChild(divMod);

            arrayModule.push(divMod);
         }

         let currentDivMod = arrayModule.find(x => x.firstChild.textContent === textH3);

         let li = ce('li', '', 'flex')
         let h4 = ce('h4', `${lectureValue} - ${date} - ${time}`);
         let buttonDel = ce('button', 'Del', 'red');

         li.appendChild(h4);
         li.appendChild(buttonDel);

         let ulChild = currentDivMod.lastChild;
         ulChild.appendChild(li);
         sortList(ulChild);

         currentDivMod.appendChild(ulChild);

         checkDate = date;
         checkModule = textH3;

         buttonDel.addEventListener("click", function (e) {
            e.preventDefault();
            let parent = e.target.parentNode.parentNode;
            let superParent = parent.parentNode.parentNode;

            e.target.parentNode.remove();
            if (parent.childElementCount === 0) {
               superParent.removeChild(parent.parentNode);
            }
         })
      }
   });

   function sortList(ul) {
      let sorted = Array.from(ul.getElementsByTagName("li")).sort((a, b) =>
         a.textContent.substring(a.textContent.length - 16, a.textContent.length - 8)
            .localeCompare
            (b.textContent.substring(b.textContent.length - 16, b.textContent.length - 8))
      );
      while (ul.firstChild) {
         ul.removeChild(ul.firstChild);
      }
      sorted.forEach((li) => ul.appendChild(li));
   }

   function ce(el, text, className, id) {
      let e = document.createElement(el);

      if (text) {
         e.textContent = text;
      }
      if (className) {
         e.className = className;
      }
      if (id) {
         e.id = id;
      }
      return e;
   }

};