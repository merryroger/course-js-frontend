export default {
  title: "Price",
  display: "ra",
  render(value) {
    return `$${value.price}`;
  },
  getContent(value) {
    return +value.innerHTML.substr(1);
  },
  compare(value1, value2) {
    return value1 - value2;
  }
}
