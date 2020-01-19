export default function sumObjectValues(chartData) {
  let arr = Object.values(chartData);
  let result = arr.reduce((sum, current) => sum + current, 0);

  return result;
}
