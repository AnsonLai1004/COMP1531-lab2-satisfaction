/**
 * Given an array of fast food restaurants, return a new sorted
 * array in descending order by:
 *
 *     1. customerService
 *     2. foodVariety
 *     3. valueForMoney
 *     4. timeToMake
 *     5. taste
 *     6. name (in lexicographical order, case-insensitive)
 *
 * For example, if two restaurant have the same customerService
 * and foodVariety, the one with a higher valueForMoney will be
 * in front (nearer to the start of the returned array).
 *
 * If the all other fields are equal and the name is compared,
 * "hungry Jacks" will be before "KFC" because "h" is before "K".
 *
 * WARNING: You should NOT modify the order of the original array.
 *
 * @param {
 *     Array<{
 *         name: string,
 *         customerService: number,
 *         foodVariety: number,
 *         valueForMoney: number,
 *         timeToMake: number,
 *         taste: number
 *     }>
 * } fastFoodArray with information about fast food restaurants,
 * which should not be modified.
 * @returns array with the same items, sorted by the key-order given.
 */
function sortedFastFood(fastFoodArray) {
  let clone = [...fastFoodArray];
  clone.sort(
    function(a,b) {
      if (a.customerService === b.customerService) {
        if (a.foodVariety === b.foodVariety) {
          if (a.valueForMoney === b.valueForMoney) {
            if (a.timeToMake === b.timeToMake) {
              if (a.taste === b.taste) {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                return nameB - nameA;
              }
              return b.taste - a.taste;
            }
            return b.timeToMake - a.timeToMake;
          }
          return b.valueForMoney - a.valueForMoney;
        }
        return b.foodVariety - a.foodVariety;
      }
      return b.customerService - a.customerService;
    }
  );
  
  return clone;
}

/**
 * Given an array of fast food restaurants, return a new sorted
 * array ranked by the overall satisfaction.
 *
 * The satisfaction of a restaurant is the average score between
 * customerService, foodVariety, valueForMoney, timeToMake and taste.
 *
 * You do not need to round the satisfaction value.
 *
 * If two restaurants have the same satisfaction, the names
 * are compared in lexigraphical order (case-insensitive).
 * For example, "hungry Jacks" will appear before "KFC" because
 * "h" is before "K".
 *
 * WARNING: you should NOT modify the order of the original array.
 *
 * @param {
 *     Array<{
 *         name: string,
 *         customerService: number,
 *         foodVariety: number,
 *         valueForMoney: number,
 *         timeToMake: number,
 *         taste: number
 *    }>
 * } fastFoodArray with information about fast food restaurants,
 * which should not be modified.
 * @returns {
 *     Array<{
 *         restaurantName: string,
 *         satisfaction: number,
 *     }>
 * } a new sorted array based on satisfaction. The restaurantName
 * will be the same as the original name given.
 */
function sortedSatisfaction(fastFoodArray) {
  const clone = [...fastFoodArray];
  clone.sort(
    function(a,b) {
      let satisfactionA = (a.customerService + a.foodVariety + a.valueForMoney + a.timeToMake + a.taste) / 5;
      let satisfactionB = (b.customerService + b.foodVariety + b.valueForMoney + b.timeToMake + b.taste) / 5;
      if (satisfactionA === satisfactionB) {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        return nameB - nameA;
      }
      return satisfactionB - satisfactionA;
    }
  );
  return clone;
}

// ========================================================================= //

/**
 * Execute the file with:
 *     $ node satisfaction.js
 *
 * Feel free to modify the below to test your functions.
 */
const fastFoods = [
  {
    name: 'ABC',
    customerService: 5,
    foodVariety: 5,
    valueForMoney: 5,
    timeToMake: 5,
    taste: 5,
  },
  {
    // Same as above, but name starts with "f"
    // which is before "S" (case-insensitive)
    name: 'ACD',
    customerService: 10,
    foodVariety: 10,
    valueForMoney: 10,
    timeToMake: 10,
    taste: 10,
  },
  {
    // Worse foodVariety, but better overall
    name: 'BAH',
    customerService: 8,
    foodVariety: 8,
    valueForMoney: 8,
    timeToMake: 8,
    taste: 8,
  },
  {
    // Worse foodVariety, but better overall
    name: 'BDD',
    customerService: 3,
    foodVariety: 3,
    valueForMoney: 3,
    timeToMake: 3,
    taste: 3,
  },
  {
    // Worse foodVariety, but better overall
    name: 'CCC',
    customerService: 3,
    foodVariety: 3,
    valueForMoney: 3,
    timeToMake: 3,
    taste: 3,
  },
];

// Note: We are using console.log because arrays cannot be commpared with ===.
// There are better ways to test which we will explore in future weeks :).
console.log('========================');
console.log('1. Testing Fast Food');
console.log('===========');
console.log(sortedFastFood(fastFoods));
console.log();

console.log('========================');
console.log('2. Testing Satisfaction');
console.log('===========');
console.log(sortedSatisfaction(fastFoods));
console.log();
