import { PRICE } from "../src/domain/Price.js";
import LottoShop from "../src/domain/LottoShop.js";
import { divideByUnit } from "../src/utils/count.js";

test("입력받은 금액에 해당하는 개수를 구한다.", () => {
  // given
  const money = 1000;

  // when
  const result = divideByUnit(money, PRICE.UNIT);

  // then
  expect(result).toBe(1);
});

test("정해진 개수만큼 로또를 생성한다.", () => {
  // given
  const lottoCount = 3;

  // when
  const lottos = LottoShop.createLottos(lottoCount);

  // then
  expect(lottos.length).toBe(lottoCount);
});
