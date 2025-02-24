import { isEmpty, isNumber, isRange } from "../utils/validation.js";

class LottoNumber {
  #number;

  static LOTTO_NUMBER = Object.freeze({
    MIN: 1,
    MAX: 45,
    LENGTH: 6,
  });

  constructor(number) {
    this.validate(number);
    this.#number = number;
  }

  validate(number) {
    isEmpty(number);
    isNumber(number);
    isRange(
      {
        min: this.constructor.LOTTO_NUMBER.MIN,
        max: this.constructor.LOTTO_NUMBER.MAX,
      },
      this.constructor.LOTTO_NUMBER.LENGTH
    );
  }

  getValue() {
    return this.#number;
  }

  equals(other) {
    return this.#number === other.getValue();
  }
}

export default LottoNumber;
