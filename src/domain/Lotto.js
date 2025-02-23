import { ERROR } from "../constants/message.js";
import { throwError } from "../utils/throwError.js";
import { isEmpty, isNumber, isRange } from "../utils/validation.js";

class Lotto {
  #numbers = [];
  static LOTTO_NUMBER = Object.freeze({
    MIN: 1,
    MAX: 45,
    LENGTH: 6,
  });

  constructor(numbers) {
    this.#numbers = this.sortLottoNumber(numbers);
    this.validate(this.#numbers);
  }

  isDuplicate(numbers) {
    if (new Set(numbers).size !== numbers.length) {
      throwError(ERROR.DUPLICATE);
    }
  }

  checkLength(numbers) {
    if (numbers.length !== this.constructor.LOTTO_NUMBER.LENGTH) {
      throwError(ERROR.LENGTH);
    }
  }

  validate(numbers) {
    numbers.map((number) => {
      isEmpty(number);
      isNumber(number);
      isRange(
        {
          min: this.constructor.LOTTO_NUMBER.MIN,
          max: this.constructor.LOTTO_NUMBER.MAX,
        },
        this.constructor.LOTTO_NUMBER.LENGTH
      );
    });
    this.isDuplicate(numbers);
    this.checkLength(numbers);
  }

  sortLottoNumber(numbers) {
    return numbers.sort((a, b) => a - b);
  }

  getLottoNumbers() {
    return this.#numbers;
  }

  getIncludeSameNumbers(givenLottoNumber) {
    return this.#numbers.filter((number) => givenLottoNumber.includes(number))
      .length;
  }

  hasBonusNumber(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
}

export default Lotto;
