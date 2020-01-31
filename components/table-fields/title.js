export default {
  title: "Name",
  render(text) {
    return text.title;
  },
  getContent(value) {
    return value.innerHTML;
  },
  compare(value1, value2) {
    return value1 > value2 ? 1 :
      value1 == value2 ? 0 : 
      -1;
  }
}
