/*function validDenomination(coin) {
  const coinArray = [1, 5, 10, 25, 50, 100];
  if (coinArray.indexOf(coin) !== -1) {
    return true;
  }
}
validDenomination(1);*/

function valueFromCoinObject(obj) {
  const { count = 0, denom = 0 } = obj;
  return validDenomination(denom) ? denom * count : 0;
}

/*const valueFromArray = (arr) => {
  return arr.reduce((acc, coinObj) => {
    const coinValue = valueFromCoinObject(coinObj);
    return acc + coinValue;
  }, 0);
};*/

/*const coinCount = (...coinage) => {
    const coins = coinage.reduce((acc, curr) => {
      return acc.concat(curr);
    }, []);
    return valueFromArray(coins);
  };*/

console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));
console.log("[{}]", coinCount(coins));

module.exports = { coinCount };

function validDenomination(coin) {
    return [1, 5, 10, 25, 50, 100].indexOf(coin) !== -1;
}

function valueFromArray(arr) {
    return arr.reduce(
        (acc, val) =>
        Array.isArray(val) ? valueFromArray(val) : acc + valueFromCoinObject(val),
        0
    );
}

function coinCount(...coinage) {
    return valueFromArray(coinage);
}
