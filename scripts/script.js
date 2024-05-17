const list_of_categories = data.categories.map(categ => categ.name);
const kategorije = document.getElementById("kategorije");
localStorage.currentCat = "Smooth black"
document.body.onload = display;

function display() {

   // categories
   const place = document.querySelector("#kategorije");
   const template = document.querySelector("#kat_row");
   for (let i = 0; i < data.categories.length; i++) {
      const clone = template.content.cloneNode(true);
      let line = clone.querySelector(".clickablecategory");
      line.textContent = data.categories[i].name;
      place.appendChild(clone);
   }

   if (localStorage.cart == undefined) {
      localStorage.cart = '{}'
   }
   if (localStorage.sum == undefined) {
      localStorage.sum = '0'
   }

   // items
   displayCategory(list_of_categories[0])
   displayCartNumber()

};

function displayCartNumber() {
   let numobj = document.querySelector("#cart_num")
   if (localStorage.sum != '0') {
      numobj.textContent = JSON.parse(localStorage.sum)
   } else {
      numobj.textContent = ''
   }

   //display circle behind number
   let circ = document.querySelector(".circle")
   if (localStorage.sum != '0') {
      circ.style.display = "inline-block"
   } else {
      circ.style.display = "none"
   }
}

//clickable categories
kategorije.addEventListener('click', (event) => {
   console.log(event.target.textContent);
   if (list_of_categories.includes(event.target.textContent)) {
      displayCategory(event.target.textContent);
   }
});

// change category
function displayCategory(newcat) {
   const itemscont = document.querySelector("#container_items");
   itemscont.replaceChildren(); //removes children
   const template2 = document.querySelector("#item");
   const cart = JSON.parse(localStorage.cart)
   localStorage.currentCat = newcat
   let index = list_of_categories.indexOf(newcat)

   for (let i = 0; i < data.categories[index].products.length; i++) {
      const clone = template2.content.cloneNode(true);
      let img = clone.querySelector(".item_slika");
      let name = clone.querySelector(".item_ime");
      let category = clone.querySelector(".item_cat");
      let cartimg = clone.querySelector(".cart_overlay_image");
      cartimg.addEventListener("click", e => clickedOnImage(e.currentTarget))

      let name_string = data.categories[index].products[i].name;
      img.src = data.categories[index].products[i].image;
      name.textContent = name_string
      category.textContent = data.categories[index].name;

      let circ = clone.querySelector(".circle_on_item");
      let itemnum = clone.querySelector(".num_of_this_item");
      if (cart[name_string] != undefined && cart[name_string] != 0) {
         circ.style.display = 'inline-block'
         itemnum.textContent = cart[name_string]

      }

      itemscont.appendChild(clone);
   }

   let naslov = document.querySelector("#naslov")
   naslov.textContent = newcat

}



function clickedOnImage(img) {
   addToCart(img.parentElement.parentElement.querySelector(".item_ime").textContent)
   console.log(img.parentElement.parentElement.querySelector(".item_ime").textContent)
   displayCartNumber()
   displayCategory(localStorage.currentCat)
}

function addToCart(itemobj) {
   let item = itemobj

   let currentCart = JSON.parse(localStorage.cart)
   if (currentCart[item] == undefined) {
      currentCart[item] = 1
   } else {
      currentCart[item]++
   }
   localStorage.cart = JSON.stringify(currentCart)
   console.log(localStorage.cart)

   let num = JSON.parse(localStorage.sum)
   localStorage.sum = JSON.stringify(num + 1)
   console.log(localStorage.sum)
}
