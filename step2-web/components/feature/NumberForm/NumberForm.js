// import Box from "../../common/Box/Box";
// import Button from "../../common/Button/Button";
// import Input from "../../common/Input/Input";
// import Text from "../../common/Text/Text";
// import { LottoNumber as LottoNumberDomain } from "../../../../src/domain/LottoNumber";
// import { Lotto as LottoDomain } from "../../../../src/domain/Lotto";
// import Modal from "../../common/Modal/Modal";

// class NumberForm {
//   constructor({ onSubmit }) {
//     this.winningInputs = [];
//     this.bonusInput = 0;
//     this.onSubmit = onSubmit;

//     this.container = new Box({
//       classList: ["flex", "flex-col", "justify-between", "items-center"],
//       styles: {
//         width: "100%",
//         boxSizing: "border-box",
//         padding: "10px 0px",
//         gap: "10px",
//       },
//     });

//     this.numbersContainer = new Box({
//       classList: ["flex", "flex-row", "justify-center", "items-center"],
//       styles: {
//         width: "100%",
//         gap: "20px",
//       },
//     });

//     this.winningNumbersBox = new Box({
//       classList: ["flex", "flex-col"],
//       styles: {
//         gap: "10px",
//       },
//     });

//     const winningNumbersTitle = new Text("당첨 번호", {
//       classList: ["text-lg", "font-regular"],
//     });

//     this.winningNumbersBox.addElement(winningNumbersTitle.render());

//     this.winningNumbersInputBox = new Box({
//       classList: ["flex", "flex-row"],
//       styles: {
//         gap: "10px",
//         width: "100%",
//       },
//     });

//     for (let i = 0; i < 6; i++) {
//       const input = new Input({
//         placeholder: "",
//         styles: {
//           width: "36px",
//         },
//       });
//       this.winningInputs.push(input);
//       this.winningNumbersInputBox.addElement(input.render());
//     }
//     this.winningNumbersBox.addElement(this.winningNumbersInputBox.render());

//     this.bonusNumberBox = new Box({
//       classList: ["flex", "flex-col", "justify-end", "items-end"],
//       styles: {
//         width: "40%",
//         gap: "10px",
//         "text-align": "right",
//       },
//     });

//     const bonusNumberTitle = new Text("보너스 번호", {
//       classList: ["text-lg", "font-regular"],
//     });
//     this.bonusNumberBox.addElement(bonusNumberTitle.render());

//     this.bonusNumbersInputBox = new Box({
//       classList: ["flex", "flex-row"],
//       styles: {
//         width: "36px",
//       },
//     });

//     const bonusInput = new Input({
//       placeholder: "",
//     });
//     this.bonusInput = bonusInput;
//     this.bonusNumbersInputBox.addElement(bonusInput.render());
//     this.bonusNumberBox.addElement(this.bonusNumbersInputBox.render());

//     this.numbersContainer.addElement(this.winningNumbersBox.render());
//     this.numbersContainer.addElement(this.bonusNumberBox.render());

//     this.container.addElement(this.numbersContainer.render());

//     this.buttonContainer = new Box({
//       styles: {
//         display: "flex",
//         justifyContent: "center",
//         marginTop: "20px",
//       },
//     });

//     this.button = new Button({
//       $target: this.buttonContainer.render(),
//       text: "결과 확인하기",
//       onClick: this.handleButtonClick.bind(this),
//     });

//     this.container.addElement(this.buttonContainer.render());
//   }

//   render() {
//     return this.container.render();
//   }

//   getWinningLottoNumbers() {
//     return this.winningInputs.map(
//       (input) => new LottoNumberDomain(Number(input.getValue()))
//     );
//   }

//   getBonusLottoNumber() {
//     return new LottoNumberDomain(Number(this.bonusInput.getValue()));
//   }

//   handleButtonClick() {
//     try {
//       const winningNumbers = this.winningInputs.map((input) =>
//         Number(input.getValue())
//       );
//       const winningLotto = new LottoDomain(winningNumbers);
//       const bonusNumber = new LottoNumberDomain(
//         Number(this.bonusInput.getValue())
//       );

//       if (typeof this.onSubmit === "function") {
//         this.onSubmit(winningLotto, bonusNumber);
//       }
//     } catch (error) {
//       this.showErrorModal(error.message);
//     }
//   }

//   showErrorModal(message) {
//     const errorContent = new Text(message, {
//       classList: [
//         "error-message",
//         "flex",
//         "justify-center",
//         "text-lg",
//         "font-bold",
//       ],
//     });

//     new Modal({
//       title: "🚨에러🚨",
//       content: errorContent,
//     }).open();
//   }
// }
// export default NumberForm;

import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import Text from "../../common/Text/Text";
import { LottoNumber as LottoNumberDomain } from "../../../../src/domain/LottoNumber";
import { Lotto as LottoDomain } from "../../../../src/domain/Lotto";
import Modal from "../../common/Modal/Modal";
import Component from "../../../core/component";

export default class NumberForm extends Component {
  initState() {
    this.state = {
      winningNumbers: Array(6).fill(0),
      bonusNumber: "",
    };
  }

  submitData() {
    try {
      const { winningNumbers, bonusNumber } = this.state;
      const winningLotto = new LottoDomain(winningNumbers.map(Number));
      const bonusLottoNumber = new LottoNumberDomain(Number(bonusNumber));

      if (typeof this.props.onSubmit === "function") {
        this.props.onSubmit(winningLotto, bonusLottoNumber);
      }
    } catch (error) {
      this.showErrorModal(error.message);
    }
  }

  showErrorModal(message) {
    const modal = new Modal({
      title: "🚨에러🚨",
      content: `<div class="error-message flex justify-center text-lg font-bold">${message}</div>`,
    });
    modal.open();
  }

  updateWinningNumber(index, value) {
    const winningNumbers = [...this.state.winningNumbers];
    winningNumbers[index] = value;
    this.setState({ winningNumbers });
  }

  template() {
    const winningTitle = this.addChild(Text);
    const bonusTitle = this.addChild(Text);
    const winningInputs = Array(6)
      .fill()
      .map((_, i) => this.addChild(Input));
    const bonusInput = this.addChild(Input);
    const submitButton = this.addChild(Button);

    return (props) => {
      if (props) this.setProps(props);

      const winningTitleProps = {
        content: "당첨 번호",
        className: "text-lg font-regular",
      };

      const bonusTitleProps = {
        content: "보너스 번호",
        className: "text-lg font-regular",
      };

      const winningInputsProps = winningInputs.map((_, index) => ({
        placeholder: "",
        value: this.state.winningNumbers[index],
        onChange: (newValue) => this.updateWinningNumber(index, newValue),
        className: "lotto-number-input",
        style: "width: 36px;",
        key: `winning-input-${index}`,
      }));

      const bonusInputProps = {
        placeholder: "",
        value: this.state.bonusNumber,
        onChange: (newValue) => this.setState({ bonusNumber: newValue }),
        className: "lotto-number-input",
        style: "width: 36px;",
        key: "bonus-input",
      };

      const buttonProps = {
        content: "결과 확인하기",
        onClick: this.submitData.bind(this),
        key: "submit-button",
      };

      const winningInputsHTML = winningInputs
        .map((input, index) => input.render(winningInputsProps[index]))
        .join("");

      return `
        <div class="number-form flex flex-col justify-between items-center" style="width: 100%; box-sizing: border-box; padding: 10px 0px; gap: 10px;">
          <div class="numbers-container flex flex-row justify-center items-center" style="width: 100%; gap: 20px;">
            <div class="winning-numbers-box flex flex-col" style="gap: 10px;">
              ${winningTitle.render(winningTitleProps)}
              <div class="winning-numbers-input-box flex flex-row" style="gap: 10px; width: 100%;">
                ${winningInputsHTML}
              </div>
            </div>

            <div class="bonus-number-box flex flex-col justify-end items-end" style="width: 40%; gap: 10px; text-align: right;">
              ${bonusTitle.render(bonusTitleProps)}
              <div class="bonus-numbers-input-box flex flex-row" style="width: 36px;">
                ${bonusInput.render(bonusInputProps)}
              </div>
            </div>
          </div>

          <div class="button-container" style="display: flex; justify-content: center; margin-top: 20px;">
            ${submitButton.render(buttonProps)}
          </div>
        </div>
      `;
    };
  }
}
