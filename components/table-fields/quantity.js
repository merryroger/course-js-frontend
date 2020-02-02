export default {
  title: "Quantity",
  display: "ra",
  render(value) {
    return value.quantity;
  },
  getContent(value) {
    return +value.innerHTML;
  },
  compare(value1, value2) {
    return value1 - value2;
  }
}
