function splitArrayByRatio(arr, ratios) {
  const totalRatio = ratios.reduce((sum, ratio) => sum + ratio, 0);
  const totalLength = arr.length;

  const result = [];
  let startIndex = 0;

  for (let i = 0; i < ratios.length; i++) {
    const subArrayLength = Math.floor((totalLength * ratios[i]) / totalRatio);
    result.push(arr.slice(startIndex, startIndex + subArrayLength));
    startIndex += subArrayLength;
  }

  // Handle any remaining elements
  if (startIndex < totalLength) {
    result[result.length - 1] = result[result.length - 1].concat(arr.slice(startIndex));
  }

  return result;
}


function setup() {
  
// Example usage
const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
const ratios = [5, 11, 22];
const splitArrays = splitArrayByRatio(originalArray, ratios);

console.log(splitArrays);
// Output: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20, 21, 22, 23, 25]]

}

function draw() {
  // background(220);
}