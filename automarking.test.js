const rewire = require('rewire');
const process = require('process');
const s = rewire(process.cwd() + '/satisfaction');
const sortedFastFood = s.__get__('sortedFastFood');
const sortedSatisfaction = s.__get__('sortedSatisfaction');

describe('Testing sortedFastFood', () => {
  test('empty case', () => {
    expect(sortedFastFood([])).toEqual([]);
  });

  test('one item', () => {
    const timTam = {
      name: 'Tim Tam',
      customerService: 3,
      foodVariety: 3,
      valueForMoney: 3,
      timeToMake: 3,
      taste: 3
    };
    expect(sortedFastFood([timTam])).toEqual([timTam]);
  });

  describe('two items', () => {
    const timTam = {
      name: 'Tim Tam',
      customerService: 3,
      foodVariety: 3,
      valueForMoney: 3,
      timeToMake: 3,
      taste: 3,
    };

    const expectSwapAndNoSwap = (better, worse) => {
      expect(sortedFastFood([better, worse])).toEqual([better, worse]);
      expect(sortedFastFood([worse, better])).toEqual([better, worse]);
    };

    // Tests below makes the next key different to see if sorting order is also correct
    test('differ by customerService', () => {
      const worse = { ...timTam, name: 'worse', customerService: 2, foodVariety: 500 };
      expectSwapAndNoSwap(timTam, worse);
    });

    test('differ by foodVariety', () => {
      const worse = { ...timTam, name: 'worse', foodVariety: 2, valueForMoney: 500 };
      expectSwapAndNoSwap(timTam, worse);
    });

    test('differ by timeToMake', () => {
      const worse = { ...timTam, name: 'worse', timeToMake: 2, taste: 500 };
      expectSwapAndNoSwap(timTam, worse);
    });

    test('differ by taste', () => {
      const worse = { ...timTam, name: 'worse', taste: 2 };
      expectSwapAndNoSwap(timTam, worse);
    });

    test('differ by name', () => {
      const worse = { ...timTam, name: 'worse' };
      expectSwapAndNoSwap(timTam, worse);
    });
  });

  describe('multiple items', () => {
    const template = {
      name: 'Tim Tam',
      customerService: 3,
      foodVariety: 3,
      valueForMoney: 3,
      timeToMake: 3,
      taste: 3,
    };

    const fastFoodArray = [
      template,
      {
        ...template,
        name: 'Hayden Hut',
        timeToMake: 5,
      },
      {
        ...template,
        name: 'Rani Rooster',
        customerService: 5,
      },
      {
        ...template,
        name: 'Giuliana Gomez',
        foodVariety: 5,
      },
    ];
    const [timTam, haydenHut, raniRooster, giulianaGomez] = fastFoodArray;

    test('correct order', () => {
      expect(sortedFastFood([...fastFoodArray])).toEqual([raniRooster, giulianaGomez, haydenHut, timTam]);
    });

    test('original array not modified', () => {
      const copy = [...fastFoodArray];
      sortedFastFood(copy);
      expect(copy).toEqual(fastFoodArray);
    });
  });
});

describe('Testing sortedSatisfaction', () => {
  const getSatisfaction = (restaurant) => {
    const { name, ...restaurantWithoutName } = restaurant;
    const ratings = Object.values(restaurantWithoutName);
    return ratings.reduce((a, b) => a + b, 0) / ratings.length;
  };

  const satistify = (restaurant) => ({
    restaurantName: restaurant.name,
    satisfaction: getSatisfaction(restaurant),
  });

  test('empty', () => {
    expect(sortedSatisfaction([])).toEqual([]);
  });

  test('one item', () => {
    const kfc = {
      name: 'KFC',
      customerService: 5,
      foodVariety: 3,
      valueForMoney: 3,
      timeToMake: 2,
      taste: 4,
    };
    const kfcExpected = satistify(kfc);
    expect(sortedSatisfaction([kfc])).toEqual([kfcExpected]);
  });

  describe('two items', () => {
    const kfc = {
      name: 'KFC',
      customerService: 5,
      foodVariety: 3,
      valueForMoney: 3,
      timeToMake: 2,
      taste: 4,
    };
    const kfcExpected = satistify(kfc);

    test('correct order and calculation', () => {
      const mcdonalds = {
        name: 'mcdonalds',
        customerService: 3,
        foodVariety: 3,
        valueForMoney: 4,
        timeToMake: 4,
        taste: 2,
      };
      const mcdonaldsExpected = satistify(mcdonalds);
      expect(sortedSatisfaction([kfc, mcdonalds])).toEqual([kfcExpected, mcdonaldsExpected]);
      expect(sortedSatisfaction([mcdonalds, kfc])).toEqual([kfcExpected, mcdonaldsExpected]);
    });

    test('comparing name', () => {
      expect(sortedSatisfaction([kfc, { ...kfc, name: 'kfd' }])).toEqual([kfcExpected, { ...kfcExpected, restaurantName: 'kfd' }]);
      expect(sortedSatisfaction([{ ...kfc, name: 'kfd' }, kfc])).toEqual([kfcExpected, { ...kfcExpected, restaurantName: 'kfd' }]);
    });

    describe('multiple', () => {
      const mcdonalds = { ...kfc, name: 'mcdonalds', taste: kfc.taste + 1 };
      const hungryJacks = { ...kfc, name: 'mcdonalds', taste: kfc.taste + 2 };
      const fastFoodArray = [mcdonalds, kfc, hungryJacks];

      test('correct order', () => {
        expect(sortedSatisfaction([...fastFoodArray])).toEqual([satistify(hungryJacks), satistify(mcdonalds), satistify(kfc)]);
      });

      test('original array unchanged', () => {
        const copy = [...fastFoodArray];
        sortedSatisfaction(fastFoodArray);
        expect(copy).toEqual(fastFoodArray);
      });
    });
  });
});
