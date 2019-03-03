const min = (a, b) => {
  const c = 3;
  return (b - a) * c;
}

module.exports = {
  add(...arg) {
    return arg.reduce((one, two) => {
      return one + two;
    });
  },
  sub(...arg) {
    return arg.reduce((one, two) => {
      return one - two;
    })
  },
  cover(a,b) {
    if(a > b) {
      return a - b;
    } else if(a == b) {
      return a;
    } else {
      return min(a,b);
    }
  }
}