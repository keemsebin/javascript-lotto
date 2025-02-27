import { LottoMachine } from "../../../../src/domain/LottoMachine";
import Button from "../../common/Button/Button";
import Table from "../../common/Table/Table";
import Text from "../../common/Text/Text";

class LottoResultBox {
  constructor(lottoResult) {
    this.lottoResult = lottoResult;
    this.element = document.createElement("section");
    this.element.classList.add("flex", "flex-col", "w-full");
    this.init();
  }

  init() {
    const history = this.lottoResult.getWinningHistory();
    const totalProfit = this.lottoResult.getRate();

    console.log("totalProfit", totalProfit);

    const headers = ["일치 갯수", "당첨금", "당첨 갯수"];
    const data = LottoMachine.LOTTO_STATUS.map((status) => {
      const { RANK, COUNT, REWORD, IS_BONUS } = status;
      const count = history[RANK] || 0;

      const matchText = IS_BONUS ? `${COUNT}개+보너스볼` : `${COUNT}개`;
      const prizeText = REWORD.toLocaleString("ko-KR");
      const countText = `${count}개`;

      return [matchText, prizeText, countText];
    }).reverse();

    const resultTable = new Table({
      headers,
      data,
      styles: {
        tableLayout: "auto",
        width: "100%",
      },
    });

    this.element.appendChild(resultTable.render());

    const profitContainer = new Text(
      `당신의 총 수익률은 ${totalProfit}%입니다.`,
      {
        classList: [
          "flex",
          "justify-center",
          "items-center",
          "text-lg",
          "font-bold",
        ],
        styles: {
          width: "full",
          padding: "40px 0px",
        },
      }
    );

    this.element.appendChild(profitContainer.render());

    const restartButton = new Button({
      text: "다시 시작하기",
      type: "submit",
    });

    const buttonElement = restartButton.render();

    buttonElement.addEventListener("click", () => {
      window.location.reload();
    });

    this.element.appendChild(buttonElement);
  }

  render() {
    return this.element;
  }
}

export default LottoResultBox;
