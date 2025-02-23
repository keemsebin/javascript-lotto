import { ERROR } from "../constants/message.js";
import { throwError } from "../utils/throwError.js";
import { isEmpty, isNumber, isRange } from "../utils/validation.js";

export const LOTTO_NUMBER = Object.freeze({
  MIN: 1,
  MAX: 45,
  LENGTH: 6,
});

class Lotto {
  #numbers = [];

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
    if (numbers.length !== LOTTO_NUMBER.LENGTH) {
      throwError(ERROR.LENGTH);
    }
  }

  validate(numbers) {
    numbers.map((number) => {
      isEmpty(number);
      isNumber(number);
      isRange(
        { min: LOTTO_NUMBER.MIN, max: LOTTO_NUMBER.MAX },
        LOTTO_NUMBER.LENGTH
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
