module.exports = (totalRating, positiveRating, negativeRating) => {
  let ratingMarkUpString = '';
  const maxRating = 5;
  const minRating = 0;

  //the maximum number of stars is 5 and the minimum number of stars is 0
  if (totalRating > maxRating) totalRating = maxRating;
  if (totalRating < minRating) totalRating = minRating;

  //will take a function and run the function x number of times
  const runFunctionANumberOfTimes = numberOfTimes => inputFunction => {
    if (numberOfTimes > 0) {
      inputFunction();
      runFunctionANumberOfTimes(numberOfTimes - 1)(inputFunction);
    }
  }
 
  runFunctionANumberOfTimes(totalRating)(() => (ratingMarkUpString += positiveRating));
   //filled stars
  // for (let i = 0; i < totalNumber; i += 1) {
  //   stars += positiveRating;
  // }
  const remainingStars = () => {if (maxRating - totalRating !== minRating)
    return true;}

  if (remainingStars) runFunctionANumberOfTimes(maxRating - totalRating)(() => (ratingMarkUpString += negativeRating));
  //empty star
  // if (5 - totalNumber !== 0) {
  //   for (let i = 0; i < 5 - totalNumber; i += 1) {
  //     stars += negativeRating;
  //   }
  // }

  return ratingMarkUpString;
};
