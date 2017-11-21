new Vue({
  el: '#app',
  data:{
    groupWrapper: "list-group-item",
    isShowingCart: false,
    cart: {
      items: []
    },
    products: [
      {
        img: "Pictures/garfield.jpg",
        name: "Garfield Logo Shirt",
        description:
        "100% cotton Garfield Logo Shirt. Soft and shows off your querky attitude!",
        price: 15,
        inStock: 50
      },
      {
        id: 2,
        img: "Pictures/jeans.jpg",
        name: "Denim Jeans",
        description:
        "Denim Jeans! Looks great, regular wash. Show off your rugged side! ",
        price: 35,
        inStock: 755
      },
      {
        id: 3,
        img: "Pictures/vans.jpg",
        name: "HP Officejet 5740 e-All-in-One-printer",
        description:
        "Black and white Vans shoes. Comfortable and yet stylish.",
        price: 60,
        inStock: 100
      },
    ]
  },
  computed:{
    cartTotal: function() {
      var total = 0;
      this.cart.items.forEach(function(item) {
        total += item.quantity * item.product.price;
      });
      return total;
    },
    taxAmount: function() {
      return this.cartTotal * 10 / 100;
    }
  },
  filters: {
    currency: function(value) {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0
      });
      return formatter.format(value);
    }
  },
  methods:{
    removeItemFromCart: function(cartItem) {
      var index = this.cart.items.indexOf(cartItem);
      if (index !== -1) {
        this.cart.items.splice(index, 1);
      }
    },
    checkout: function() {
      if (confirm('Are you sure that you want to purchase these products?')) {
        this.cart.items.forEach(function(item) {
          item.product.inStock += item.quantity;
        });
        this.cart.items = [];
      }
    },
    addProductToCart: function(product) {
      var cartItem = this.getCartItem(product);
      if (cartItem != null) {
        cartItem.quantity++;
      } else {
        this.cart.items.push({
          product: product,
          quantity: 1
        });
      }
      product.inStock--;
    },
    increaseQuantity: function(cartItem) {
      cartItem.product.inStock--;
      cartItem.quantity++;
    },
    decreaseQuantity: function(cartItem) {
      cartItem.quantity--;
      cartItem.product.inStock++;
      if (cartItem.quantity == 0) {
        this.removeItemFromCart(cartItem);
      }
    },
    getCartItem: function(product) {
      for (var i = 0; i < this.cart.items.length; i++) {
        if (this.cart.items[i].product.id === product.id) {
          return this.cart.items[i];
        }
      }
      return null;
    },
    listWrapper:function(){
      this.groupWrapper = "list-group-item"
    },
    gridWrapper:function(){
      this.groupWrapper = "grid-group-item"
    }
  }
});
