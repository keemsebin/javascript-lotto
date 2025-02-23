import { ERROR } from "../constants/message.js";
import { throwError } from "../utils/throwError.js";

class Validator {
  empty(input) {
    if (input === "") {
      throwError(ERROR.EMPTY);
    }
  }

  range({ min, max }, number) {
    if (number < min || number > max) {
      throwError(ERROR.INVALID_RANGE);
    }
  }

  number(input) {
    if (isNaN(Number(input))) {
      throwError(ERROR.NOT_NUMBER);
    }
  }
}

export default Validator;
