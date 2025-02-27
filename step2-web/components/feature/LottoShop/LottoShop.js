// import Box from "../../common/Box/Box";
// import Text from "../../common/Text/Text";
// import NumberForm from "../NumberForm/NumberForm";
// import PriceForm from "../PriceForm/PriceForm";
// import LottoMachine from "../LottoMachine/LottoMachine";
// import { LottoResult as LottoResultDomain } from "../../../../src/domain/LottoResult";
// import { LottoMachine as LottoMachineDomain } from "../../../../src/domain/LottoMachine";
// import Modal from "../../common/Modal/Modal";
// import LottoResultBox from "../LottoResultBox/LottoResultBox";

// import Component from "../../../core/component";
// import Text from "../../common/Text/Text";
// import LottoMachine from "../LottoMachine/LottoMachine";
// import NumberForm from "../NumberForm/NumberForm";
// import PriceForm from "../PriceForm/PriceForm";
// import { LottoMachine as LottoMachineDomain } from "../../../../src/domain/LottoMachine";

// class LottoShop {
//   constructor() {
//     this.mainContainer = document.createElement("main");
//     this.mainContainer.classList.add(
//       "main",
//       "flex",
//       "justify-center",
//       "items-center"
//     );
//     this.init();
//   }

//   init() {
//     const LottoBox = new Box({
//       classList: ["flex", "flex-col"],
//       styles: {
//         padding: "32px 16px",
//         border: "1px solid rgba(0, 0, 0, 0.12)",
//       },
//     });

//     const TitleText = new Text("🎱 내 번호 당첨 확인 🎱", {
//       classList: [
//         "flex",
//         "items-center",
//         "justify-center",
//         "text-xl",
//         "font-bold",
//       ],
//       styles: {
//         padding: "12px 0px",
//       },
//     });

//     LottoBox.addElement(TitleText.render());

//     const lottoPriceInput = new PriceForm({
//       onPurchase: this.handlePurchase.bind(this),
//     });
//     LottoBox.addElement(lottoPriceInput.render());

//     this.machineResultContainer = new Box({
//       styles: {
//         display: "none",
//       },
//     });

//     this.lottoMachine = new LottoMachine({
//       count: 0,
//       numbers: [],
//     });
//     this.machineResultContainer.addElement(this.lottoMachine.render());
//     LottoBox.addElement(this.machineResultContainer.render());

//     this.winningNumberSection = new Box({
//       styles: {
//         display: "none",
//       },
//     });

//     const prevLottoText = new Text(
//       "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.",
//       {
//         classList: ["flex", "justify-start", "text-lg", "font-regular"],
//         styles: {
//           padding: "12px 0px",
//         },
//       }
//     );
//     this.winningNumberSection.addElement(prevLottoText.render());

//     this.LottoNumber = new NumberForm({
//       onSubmit: this.handleWinningNumbersSubmit.bind(this),
//     });
//     this.winningNumberSection.addElement(this.LottoNumber.render());

//     LottoBox.addElement(this.winningNumberSection.render());

//     this.mainContainer.appendChild(LottoBox.render());
//     document.body.appendChild(this.mainContainer);
//   }

//   handlePurchase({ count, numbers }) {
//     this.lottoMachine.update({ count, numbers });
//     this.machineResultContainer.element.style.display = "block";
//     this.winningNumberSection.element.style.display = "block";
//   }

//   handleWinningNumbersSubmit(winningLotto, bonusLotto) {
//     const winningNumbers = winningLotto.getLottoNumbers();

//     const bonusNumber = bonusLotto.getValue();
//     const lotto = new LottoMachineDomain(this.lottoMachine.getNumbers());

//     const lottoStatus = lotto.getMatchedLottoStatus(
//       winningNumbers,
//       bonusNumber
//     );
//     console.log("lottoStatus", lottoStatus);
//     console.log(
//       "this.lottoMachine.getCount() * 1000",
//       this.lottoMachine.getCount() * 1000
//     );
//     const lottoResult = new LottoResultDomain(
//       lottoStatus,
//       this.lottoMachine.getCount() * 1000
//     );
//     this.showResultModal(lottoResult);
//   }

//   showResultModal(lottoResult) {
//     const resultModal = new Modal({
//       title: "🏆 당첨 통계 🏆",
//       content: new LottoResultBox(lottoResult),
//       onClose: () => {
//         console.log("Modal closed");
//       },
//     });

//     resultModal.open();
//   }
// }

// export default LottoShop;

// class LottoShop extends Component {
//   initState() {
//     this.state = {
//       lottoCount: 0,
//       lottoNumbers: [],
//       showMachineResult: false,
//       showWinningNumberSection: false,
//     };
//   }

//   template() {
//     const titleText = this.addChild(Text);
//     const lottoPriceInput = this.addChild(PriceForm);
//     const lottoMachine = this.addChild(LottoMachine);
//     const prevLottoText = this.addChild(Text);
//     // const lottoNumberForm = this.addChild(NumberForm);

//     return (props) => {
//       if (props) this.setProps(props);

//       const titleTextProps = {
//         content: "🎱 내 번호 당첨 확인 🎱",
//         classList: [
//           "flex",
//           "items-center",
//           "justify-center",
//           "text-xl",
//           "font-bold",
//         ],
//         styles: {
//           padding: "20px 0px",
//         },
//       };

//       const handlePurchase = ({ count, numbers }) => {
//         console.log("구매 정보:", { count, numbers });

//         this.setState({
//           lottoCount: count,
//           lottoNumbers: numbers,
//           showMachineResult: true,
//         });
//       };

//       const lottoPriceInputProps = {
//         onPurchase: handlePurchase.bind(this),
//       };

//       const lottoMachineProps = {
//         count: this.state.lottoCount,
//         numbers: this.state.lottoNumbers,
//       };

//       const renderedTitleText = titleText.render(titleTextProps);
//       const renderedLottoPriceInput =
//         lottoPriceInput.render(lottoPriceInputProps);
//       const renderedLottoMachine = this.state.showMachineResult
//         ? lottoMachine.render(lottoMachineProps)
//         : "";

//       // 직접 HTML 템플릿 생성
//       return `
//       <main class="main flex flex-col justify-center items-center">
//         <div class="box flex flex-col" style="padding: 32px 16px; border: 1px solid rgba(0, 0, 0, 0.12);">
//           ${renderedTitleText}
//           ${renderedLottoPriceInput}
//           ${renderedLottoMachine}
//         </div>
//       </main>
//       `;
//     };
//   }

//   // showResultModal(lottoResult) {
//   //   const resultModal = new Modal({
//   //     title: "🏆 당첨 통계 🏆",
//   //     content: new LottoResultBox(lottoResult),
//   //     onClose: () => {
//   //       console.log("Modal closed");
//   //     },
//   //   });

//   //   resultModal.open();
//   // }

//   render(props) {
//     console.log("LottoShop render 메서드 호출");
//     const html = super.render(props);

//     const mainContainer = document.getElementById("lotto-shop-container");
//     if (mainContainer) {
//       mainContainer.innerHTML = html;

//       // 이벤트 바인딩을 명시적으로 호출
//     } else {
//       console.error("메인 컨테이너를 찾을 수 없습니다");
//     }

//     return html;
//   }
// }

// export default LottoShop;

import Text from "../../common/Text/Text";
import PriceForm from "../PriceForm/PriceForm";
import LottoMachine from "../LottoMachine/LottoMachine";
import NumberForm from "../NumberForm/NumberForm";
import Modal from "../../common/Modal/Modal";
import LottoResultBox from "../LottoResultBox/LottoResultBox";
import Component from "../../../core/component";

export default class LottoShop extends Component {
  constructor() {
    super();
  }
  initState() {
    this.state = {
      lottoCount: 0,
      lottoNumbers: [],
      showMachineResult: false,
      showWinningNumberSection: false,
      winningNumbers: [],
      bonusNumber: null,
    };
  }

  setDefaultProps() {
    this.props = {
      containerId: "lotto-shop-container",
    };
  }

  template() {
    const titleText = this.addChild(Text);
    const lottoPriceInput = this.addChild(PriceForm);
    const lottoMachine = this.addChild(LottoMachine);
    const instructionText = this.addChild(Text);
    const numberForm = this.addChild(NumberForm);

    return (props) => {
      if (props) this.setProps(props);

      // 타이틀 텍스트 설정
      const renderedTitleText = titleText.render({
        content: "🎱 내 번호 당첨 확인 🎱",
        classList: [
          "flex",
          "items-center",
          "justify-center",
          "text-xl",
          "font-bold",
        ],
        styles: {
          padding: "20px 0px",
        },
        key: "lotto-shop-title",
      });

      // 가격 입력 폼 설정
      const renderedLottoPriceInput = lottoPriceInput.render({
        onPurchase: (...args) => {
          console.log("LottoShop - onPurchase 설정됨", ...args);
          this.handlePurchase(...args);
        },
        key: "lotto-shop-price-form",
      });
      console.log("LottoShop에서 PriceForm을 렌더링할 때 onPurchase 설정됨"); // 디버깅용
      // 로또 기계 조건부 렌더링
      let renderedLottoMachine = "";
      if (this.state.showMachineResult) {
        renderedLottoMachine = lottoMachine.render({
          count: this.state.lottoCount,
          numbers: this.state.lottoNumbers,
          key: "lotto-shop-machine",
        });
      }

      // 당첨 번호 입력 섹션 조건부 렌더링
      let renderedWinningSection = "";
      if (this.state.showWinningNumberSection) {
        const renderedInstructionText = instructionText.render({
          content: "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.",
          classList: ["flex", "justify-start", "text-lg", "font-regular"],
          styles: { padding: "12px 0px" },
          key: "lotto-shop-instruction",
        });

        const renderedNumberForm = numberForm.render({
          onSubmit: this.handleWinningNumberSubmit.bind(this),
          key: "lotto-shop-number-form",
        });

        renderedWinningSection = `
          <div class="lotto-shop__winning-section" style="margin-top: 20px;">
            ${renderedInstructionText}
            ${renderedNumberForm}
          </div>
        `;
      }

      // 전체 템플릿 반환
      return `
        <main class="lotto-shop flex justify-center items-center main" id="lotto-shop">
          <div class="lotto-shop__box" style="padding: 32px 16px; border: 1px solid rgba(0, 0, 0, 0.12);">
            ${renderedTitleText}
            <div id="price-form">
              ${renderedLottoPriceInput}
            </div>
            ${renderedLottoMachine}
            ${renderedWinningSection}
          </div>
        </main>
      `;
    };
  }

  handlePurchase({ count, numbers }) {
    console.log("handlePurchase", { count, numbers });
    this.setState({
      lottoCount: count,
      lottoNumbers: numbers,
      showMachineResult: true,
      showWinningNumberSection: true,
    });
  }

  showResultModal() {
    const { lottoNumbers, winningNumbers, bonusNumber } = this.state;

    if (
      !lottoNumbers.length ||
      !winningNumbers.length ||
      bonusNumber === null
    ) {
      return;
    }

    // 당첨 결과 계산 로직
    const lottoResult = this.calculateLottoResult(
      lottoNumbers,
      winningNumbers,
      bonusNumber
    );

    const resultModal = new Modal({
      title: "🏆 당첨 통계 🏆",
      content: new LottoResultBox(lottoResult),
      onClose: () => {
        console.log("Modal closed");
      },
      key: "lotto-result-modal",
    });

    resultModal.open();
  }

  render(props) {
    if (props) this.setProps(props);

    const templateFn = this.template();
    const html = templateFn(this.props);

    const container = document.getElementById(this.props.containerId);
    if (container) {
      container.innerHTML = html;
      this.setEvent();
      this.componentDidMount();
    }

    return html;
  }
}
