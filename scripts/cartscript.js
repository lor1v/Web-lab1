
// adds item in localstorage.cart 
function addItem(cartrowelem) {

   const cart = JSON.parse(localStorage.cart)
   let item = cartrowelem.parentElement.parentElement.firstElementChild.textContent
   if (cart[item] !== undefined) {
      cart[item]++;
   } else {
      cart[item] = 1;
   }
   localStorage.cart = JSON.stringify(cart)


   // changes number of items in cart
   updateCartNum();

   showCart();

}

// subs item in localstorage.cart 
function subItem(cartrowelem) {
   const cart = JSON.parse(localStorage.cart)
   let item = cartrowelem.parentElement.parentElement.firstElementChild.textContent
   if (cart[item] !== undefined && cart[item] !== 0) {
      cart[item]--;
   }

   localStorage.cart = JSON.stringify(cart)

   showCart();

}


// shows all cart elements
function showCart() {
   const cart = JSON.parse(localStorage.cart)
   const itemscontainer = document.querySelector("#proizvodi_container");
   itemscontainer.replaceChildren()
   const template = document.querySelector("#cart_row_temp")
   for (key of Object.keys(cart)) {
      const clone = template.content.cloneNode(true);
      let text = clone.querySelector("#itemname")
      text.textContent = key
      let num = clone.querySelector("#num")
      num.textContent = cart[key]
      let minus = clone.querySelector("#minus")
      let plus = clone.querySelector("#plus")
      minus.addEventListener("click", e => subItem(e.currentTarget))
      plus.addEventListener("click", e => addItem(e.currentTarget))

      itemscontainer.appendChild(clone)
   }
   displayCartNumber()
}

function clearCart() {
   cart = JSON.parse(localStorage.cart)
   for (key of Object.keys(cart)) {
      if (cart[key] == 0) {
         delete cart[key]
      }
   }
   localStorage.cart = JSON.stringify(cart)
}

// displays number on cart only if its > 0
function displayCartNumber() {
   updateCartNum()
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

//updates number shown on cart
function updateCartNum() {
   let num = 0
   const cart = JSON.parse(localStorage.cart)
   for (elem of Object.keys(cart)) {
      num += Number(cart[elem])
   }
   localStorage.sum = JSON.stringify(num)
}

document.body.onload = clearCart();
document.body.onload = showCart();
