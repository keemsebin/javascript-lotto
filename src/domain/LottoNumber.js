import { isEmpty, isNumber, isRange } from "../utils/validation.js";

class LottoNumber {
  #number;

  static CONSTRAINTS = Object.freeze({
    MIN: 1,
    MAX: 45,
  });

  constructor(number) {
    this.#number = number;
    this.validate(number);
  }

  validate(number) {
    isEmpty(number);
    isNumber(number);
    isRange(
      {
        min: this.constructor.CONSTRAINTS.MIN,
        max: this.constructor.CONSTRAINTS.MAX,
      },
      number
    );
  }

  getValue() {
    return this.#number;
  }

  equals(other) {
    return this.#number === other.getValue();
  }
}

export { LottoNumber };
