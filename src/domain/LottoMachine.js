class LottoMachine {
  #issuedLottoNumbers = [];
  #matchedLottoStatus;

  static LOTTO_STATUS = Object.freeze([
    { RANK: 1, COUNT: 6, REWORD: 2_000_000_000, IS_BONUS: false },
    { RANK: 2, COUNT: 5, REWORD: 30_000_000, IS_BONUS: true },
    { RANK: 3, COUNT: 5, REWORD: 1_500_000, IS_BONUS: false },
    { RANK: 4, COUNT: 4, REWORD: 50_000, IS_BONUS: false },
    { RANK: 5, COUNT: 3, REWORD: 5000, IS_BONUS: false },
  ]);

  constructor(issuedLottoNumbers) {
    this.#issuedLottoNumbers = issuedLottoNumbers;
    this.#matchedLottoStatus = [];
  }

  updateStatus(callback) {
    const currentStatus = this.constructor.LOTTO_STATUS.find(callback);
    this.#matchedLottoStatus.push(currentStatus);
  }

  getMatchingNumbers(enteredLottoNumbers) {
    return this.#issuedLottoNumbers.map((lotto) => {
      return lotto.getIncludeSameNumbers(enteredLottoNumbers);
    });
  }

  getHasBonusNumbers(bonusLottoNumbers) {
    return this.#issuedLottoNumbers.map((lotto) => {
      return lotto.hasBonusNumber(bonusLottoNumbers);
    });
  }

  updateFinalStatus(matchingNumbers, isBonusArray) {
    matchingNumbers.forEach((matchingNumber, index) => {
      if (matchingNumber < 3) return;

      if (matchingNumber === 5 && isBonusArray[index]) {
        this.updateStatus((status) => status.COUNT === 5 && status.IS_BONUS);
        return;
      }

      this.updateStatus(
        (status) => status.COUNT === matchingNumber && !status.IS_BONUS
      );
    });
  }

  getMatchedLottoStatus(enteredLottoNumbers, bonusLottoNumber) {
    const matchingNumbers = this.getMatchingNumbers(enteredLottoNumbers);
    const isBonusArray = this.getHasBonusNumbers(bonusLottoNumber);

    this.updateFinalStatus(matchingNumbers, isBonusArray);

    return this.#matchedLottoStatus;
  }
}

export default LottoMachine;
