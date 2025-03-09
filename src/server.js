import { Server, Model, RestSerializer } from "miragejs";
import { v4 as uuid } from "uuid";
import { products } from "./backend/db/products";
import { categories } from "./backend/db/categories";
import { users } from "./backend/db/users";
import {
  loginHandler,
  signupHandler,
} from "./backend/controllers/AuthController";
import {
  getAllProductsHandler,
  getProductHandler,
} from "./backend/controllers/ProductController";
import {
  getAllCategoriesHandler,
  getCategoryHandler,
} from "./backend/controllers/CategoryController";
import {
  getCartItemsHandler,
  addItemToCartHandler,
  removeItemFromCartHandler,
  updateCartItemHandler,
  clearCartHandler,
} from "./backend/controllers/CartController";
import {
  getWishlistItemsHandler,
  addItemToWishlistHandler,
  removeItemFromWishlistHandler,
} from "./backend/controllers/WishlistController";
import {
  getAddressListHandler,
  addAddressHandler,
  updateAddressHandler,
  removeAddressHandler,
} from "./backend/controllers/AddressController";
import {
  getOrderItemsHandler,
  addItemToOrdersHandler,
} from "./backend/controllers/OrderController";

// This file sets up a MirageJS server for a test API.
// It defines models, routes, and seeds with sample data.
export function makeServer({ environment = "development" } = {}) {
  return new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    models: {
      product: Model,
      category: Model,
      user: Model,
      cart: Model,
      wishlist: Model,
    },
    seeds(server) {
      // Disable logging in MirageJS
      server.logging = false;

      // Seed products
      products.forEach((item) => {
        server.create("product", { ...item });
      });

      // Seed users with empty cart, wishlist, and a sample address
      users.forEach((item) =>
        server.create("user", {
          ...item,
          cart: [],
          wishlist: [],
          addressList: [
            {
              _id: uuid(),
              name: "Sample User",
              street: "123 Sample Street",
              city: "Sample City",
              state: "Sample State",
              country: "Sample Country",
              pincode: "000000",
              phone: "0000000000",
            },
          ],
        })
      );

      // Seed categories
      categories.forEach((item) => server.create("category", { ...item }));
    },
    routes() {
      this.namespace = "api";

      // Auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

      // Products routes (public)
      this.get("/products", getAllProductsHandler.bind(this));
      this.get("/products/:productId", getProductHandler.bind(this));

      // Categories routes (public)
      this.get("/categories", getAllCategoriesHandler.bind(this));
      this.get("/categories/:categoryId", getCategoryHandler.bind(this));

      // Cart routes (private)
      this.get("/user/cart", getCartItemsHandler.bind(this));
      this.post("/user/cart", addItemToCartHandler.bind(this));
      this.post("/user/cart/clearCart", clearCartHandler.bind(this));
      this.post("/user/cart/:productId", updateCartItemHandler.bind(this));
      this.delete("/user/cart/:productId", removeItemFromCartHandler.bind(this));

      // Wishlist routes (private)
      this.get("/user/wishlist", getWishlistItemsHandler.bind(this));
      this.post("/user/wishlist", addItemToWishlistHandler.bind(this));
      this.delete("/user/wishlist/:productId", removeItemFromWishlistHandler.bind(this));

      // Address routes (private)
      this.get("/user/address", getAddressListHandler.bind(this));
      this.post("/user/address", addAddressHandler.bind(this));
      this.post("/user/address/:addressId", updateAddressHandler.bind(this));
      this.delete("/user/address/:addressId", removeAddressHandler.bind(this));

      // Order routes (private)
      this.get("/user/orders", getOrderItemsHandler.bind(this));
      this.post("/user/orders", addItemToOrdersHandler.bind(this));
    },
  });
}
