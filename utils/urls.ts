export default {
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "https://museknoxville.org"
      : "http://localhost:3000",
  api: {
    booking: "/api/booking",
    cart: "/api/cart",
    contact: "/api/contact",
    orders: "/api/orders",
    dropdowns: "/api/dropdowns",
  },
};
