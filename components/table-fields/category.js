export default {
  title: "Category",
  render(text) {
    return text.subcategory.category.title;
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
