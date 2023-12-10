let btn = document.querySelectorAll(".btn");
let quantity = document.querySelector(".quantity");
let content = document.querySelector(".content");
// let cartArray = JSON.parse(localStorage.getItem("cart")) || [];
let cartArray = [];

let currentQuantity = +quantity.innerText;

function checkLogin() {
  if (localStorage.getItem("dangnhap")) {
    let rightHeader = document.querySelector(".rightHeader");
    rightHeader.innerHTML = `
        <i class="fa-solid fa-user"></i>
            <span>
                ${localStorage.getItem("dangnhap")}
            </span>
            <ul>
                <li>Thông tin tài khoản</li>
                <li class="logout">Đăng xuất</li>
            </ul>
        `;
    let btnLogout = document.querySelector(".logout");
    btnLogout.addEventListener("click", function () {
      localStorage.removeItem("dangnhap");
      checkLogin();
      quantity.innerText = "0";
    });
  } else {
    let rightHeader = document.querySelector(".rightHeader");
    rightHeader.innerHTML = `
        <a href="dangnhap.html">Login</a>
            <a href="signin.html">SignIn</a>
        `;
  }
}

function loadDanhSachSanPham() {
  for (let i = 0; i < data.length; i++) {
    let nameItem = data[i].name;
    let priceItem = data[i].newPrice;
    let imageItem = data[i].img;
    content.innerHTML += `
    <div class="content-item" id=${data[i].id}>
            <img src="${imageItem}" alt="">
            <h3> ${nameItem}...</h3>
            <p>${priceItem}$</p>
            <button class="btn" id=${data[i].id}>
                <i class="fa-solid fa-cart-shopping"></i>
                Add to cart</button>
        </div>
    `;
  }

  // Lay nut mua hang
  let btnAddItems = document.querySelectorAll(".btn");
  for (let i = 0; i < btnAddItems.length; i++) {
    let btnItem = btnAddItems[i];
    btnItem.addEventListener("click", function () {
      let idItem = btnItem.id;
      console.log(idItem);
      // bien data la file data.js
      for (let i = 0; i < data.length; i++) {
        // KIme tra cai id cua nguoi dung click vao va id cua data co trung hay khong

        let idData = data[i].id;
        if (JSON.parse(localStorage.getItem("cart")).length > 1) {
          let cartLocal = JSON.parse(localStorage.getItem("cart"));
          console.log(cartLocal);
        }
        if (idItem == idData) {
          cartArray.push(data[i]);
          // Neu trung thi dua vao gio hang
          localStorage.setItem("cart", JSON.stringify(cartArray));
          loadCart();
          loadQuantity();
        }
      }
    });
  }

  // Them su kien click vao content-item
  let contentItems = document.querySelectorAll(".content-item");
  for (let i = 0; i < contentItems.length; i++) {
    let contentItem = contentItems[i];
    contentItem.addEventListener("click", function () {
      let idItem = contentItem.id;
      localStorage.setItem("idchitiet", idItem);
      location.href = "chitietsanpham.html";
    });
  }
}

// Kiểm tra localStorage nếu có thì đặt số lượng vào quantity Nếu không có thì set bằng 0

function loadQuantity() {
  let quantityArray = JSON.parse(localStorage.getItem("cart"));
  if (quantityArray) {
    quantity.innerText = quantityArray.length;
  } else {
    quantity.innerText = 0;
  }
}

function checkLocalStorageCart() {
  if (localStorage.getItem("cart")) {
    return true;
  } else {
    return false;
  }
}

function loadCart() {
  // khi mà hàm này được gọi
  // lấy thằng element cart-product-wrapper = "cart-wrapper"
  let cartWrapper = document.querySelector(".cart-product-wrapper");
  let isChecked = checkLocalStorageCart();
  let cartArray = JSON.parse(localStorage.getItem("cart"));
  let html = "";
  // Nó sẽ kiểm tra trên localstorage có key cart hay không ?
  if (isChecked) {
    // Nếu có
    // Thì nó sẽ ...
    // cart-wrapper.innerHTML = `ul danh sach`
    html += `<ul class="cart-products">`;
    for (let i = 0; i < cartArray.length; i++) {
      let image = cartArray[i].img;
      let name = cartArray[i].name;
      let price = cartArray[i].price;
      let id = cartArray[i].id;
      html += `
            <li class="product-item">
            <img src=${image} alt="sanpham1">
            <div class="product-body">
                <p class="product-name">${name}</p>
                <div class="productQuantityPrice">
                    <p class="price">${price}$</p>
                    <p class="quantityProductCart">x 1</p>
                </div>
            </div>
            <i onclick="deleteCart(${id})"class="fa-solid fa-trash deleteCart"></i>
        </li>
      `;
    }
    html += `</ul>
<p class="totalprice">
    Tổng tiền : 1000$
</p>
<button class="pay">
    Thanh toán
</button> `;
    cartWrapper.innerHTML = html;
  } else {
    // Không có
    // Thì nó sẽ
    // Cart-wrapper.innerHTML =<img />
    html += `
    <img class="no-product-image" src="https://www.tharagold.in/assets/img/no-product-found.png"/>
    `;
    cartWrapper.innerHTML = html;
  }
}

// Ham chay
loadQuantity();
loadDanhSachSanPham();
checkLogin();
loadCart();

// Xoa san pham
//  1 Dau tien tao mảng []
//  2. Lấy được id cần xóa (id:1)
// 3. Dùng vòng for để lập qua từng phần tử trong giỏ hàng
// 4. if(!id:1 == id cua phan tu thu i){
// push phan tu thu i vao [ư]
// }
//

function deleteCart(id) {
  let newCart = [];
  let oldCart = JSON.parse(localStorage.getItem("cart"));
  for (let i = 0; i < oldCart.length; i++) {
    if (id !== oldCart[i].id) {
      newCart.push(oldCart[i]);
    }
  }
  console.log(newCart);
  // Mat du lieu
  localStorage.setItem("cart", JSON.stringify(newCart));
  // Mat giao dien
  loadCart();
  loadQuantity();
}
