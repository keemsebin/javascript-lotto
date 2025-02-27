// import { Price as PriceDomain } from "../../../../src/domain/Price";
// import LottoShop from "../../../../src/domain/LottoShop";
// import { PRICE } from "../../../../src/domain/Price";
// import { divideByUnit } from "../../../../src/utils/count";
// import Box from "../../common/Box/Box";
// import Button from "../../common/Button/Button";
// import Input from "../../common/Input/Input";
// import Text from "../../common/Text/Text";
// import Modal from "../../common/Modal/Modal";

// class PriceForm {
//   constructor({ onPurchase }) {
//     this.onPurchase = onPurchase;
//     this.form = document.createElement("form");
//     this.form.addEventListener("submit", (e) => {
//       e.preventDefault();
//       this.handleButtonClick();
//     });

//     this.container = new Box({
//       classList: ["flex", "flex-col"],
//       styles: {
//         width: "100%",
//         gap: "10px",
//         padding: "10px 0px",
//         boxSizing: "border-box",
//       },
//     });

//     const lottoPriceInputText = new Text("구입할 금액을 입력해주세요.", {
//       classList: ["text-md", "font-regular"],
//     });

//     this.container.addElement(lottoPriceInputText.render());

//     const priceInputContainer = new Box({
//       classList: ["flex", "flex-row", "justify-between", "items-center"],
//       styles: {
//         width: "100%",
//         gap: "10px",
//       },
//     });

//     const inputButtonElement = priceInputContainer.render();

//     this.input = new Input({
//       $target: inputButtonElement,
//       placeholder: "금액 입력",
//       onInput: (e) => {
//         this.inputValue = e.target.value;
//       },
//       onKeyDown: this.handleKeyDown.bind(this),
//     });

//     this.button = new Button({
//       $target: inputButtonElement,
//       text: "구입",
//       type: "submit",
//       styles: {
//         display: "inline-flex",
//         alignItems: "align-center",
//         justifyContent: "center",
//         width: "56px",
//       },
//     });

//     this.container.addElement(priceInputContainer.render());

//     this.form.appendChild(priceInputContainer.render());
//     this.container.addElement(this.form);
//     document.body.appendChild(this.container.render());
//   }

//   handleKeyDown(e) {
//     if (e.key === "Enter") {
//       this.handleButtonClick();
//     }
//   }

//   handleButtonClick() {
//     try {
//       const inputValue = this.input.getValue();
//       const price = new PriceDomain(inputValue);
//       const countNumber = divideByUnit(PRICE.UNIT, Number(price.getPrice()));
//       const lottos = LottoShop.createLottos(countNumber);

//       if (this.onPurchase) {
//         this.onPurchase({
//           count: countNumber,
//           numbers: lottos.map((lotto) => lotto),
//         });
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

//   render() {
//     return this.container.render();
//   }
// }

// export default PriceForm;

// import { Price as PriceDomain } from "../../../../src/domain/Price";
// import { PRICE } from "../../../../src/domain/Price";
// import { divideByUnit } from "../../../../src/utils/count";
// import Button from "../../common/Button/Button";
// import Input from "../../common/Input/Input";
// import Text from "../../common/Text/Text";
// import Modal from "../../common/Modal/Modal";
// import Component from "../../../core/component";
// import LottoShop from "../../../../src/domain/LottoShop";

// class PriceForm extends Component {
//   constructor(props) {
//     super(props);
//     console.log("PriceForm 컴포넌트 생성됨");
//   }

//   initState() {
//     this.state = {
//       inputValue: "",
//     };
//   }

//   template() {
//     const lottoPriceInputText = this.addChild(Text);
//     const input = this.addChild(Input);
//     const button = this.addChild(Button);

//     return (props) => {
//       if (props) this.setProps(props);

//       const textProps = {
//         content: "구입할 금액을 입력해주세요.",
//         classList: ["text-md", "font-regular"],
//       };

//       const inputProps = {
//         placeholder: "금액 입력",
//         value: this.state.inputValue,
//         onChange: (e) => {
//           const newValue = e.target.value;
//           console.log("입력값 변경:", newValue);
//           // 숫자만 입력 가능하도록 제한

//           this.setState(
//             {
//               inputValue: newValue,
//             },
//             () => {
//               console.log(
//                 "상태 업데이트 후 inputValue:",
//                 this.state.inputValue
//               );
//             }
//           );
//         },
//       };

//       return `
//         <div class="price-form flex flex-col" style="width: 100%; gap: 10px; padding: 10px 0px; box-sizing: border-box;">
//           ${lottoPriceInputText.render(textProps)}
//           <div class="flex flex-row justify-between items-center" style="width: 100%; gap: 10px;">
//             ${input.render(inputProps)}
//             ${button.render({
//               content: "구입",
//               type: "button",
//               onClick: () => {
//                 console.log(
//                   "버튼 클릭 시 현재 inputValue:",
//                   this.state.inputValue
//                 );
//                 // Fix: actually call the method instead of just binding it
//                 this.handleButtonClick();
//               },
//               styles: {
//                 display: "inline-flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 width: "56px",
//               },
//               key: "purchase-button",
//               id: "purchase-button",
//             })}
//           </div>
//         </div>
//       `;
//     };
//   }

//   // showErrorModal(message) {
//   //   const errorContent = new Text(message, {
//   //     classList: [
//   //       "error-message",
//   //       "flex",
//   //       "justify-center",
//   //       "text-lg",
//   //       "font-bold",
//   //     ],
//   //   });

//   //   new Modal({
//   //     title: "🚨에러🚨",
//   //     content: errorContent,
//   //     onClose: () => console.log("Error modal closed"),
//   //     width: 300,
//   //     padding: 20,
//   //     isModalShow: true,
//   //     key: "error-modal",
//   //   }).open();
//   // }

//   $handleButtonClick() {
//     console.log("handleButtonClick 호출");
//     console.log("현재 입력값(inputValue):", this.state.inputValue);
//     try {
//       const price = new PriceDomain(this.state.inputValue);
//       const countNumber = divideByUnit(PRICE.UNIT, Number(price.getPrice()));
//       const lottos = LottoShop.createLottos(countNumber);
//       if (this.props.onPurchase) {
//         this.props.onPurchase({
//           count: countNumber,
//           numbers: lottos,
//         });
//       }
//     } catch (error) {
//       // this.showErrorModal(error.message);
//     }
//   }

//   render(props) {
//     const html = super.render(props);
//     const container = document.querySelector(".price-form");
//     if (container) {
//       container.__component__ = this;
//     }
//     return html;
//   }

//   setEvent() {
//     console.log("PriceForm - setEvent 호출");
//     const purchaseButton = document.getElementById("purchase-button");
//     if (purchaseButton) {
//       console.log("구매 버튼 이벤트 리스너 추가");
//       purchaseButton.addEventListener("click", (e) => {
//         e.preventDefault();
//         // Fix: actually call the method instead of just binding it
//         this.handleButtonClick();
//       });
//     } else {
//       console.error("구매 버튼을 찾을 수 없습니다.");
//     }
//   }
// }

// export default PriceForm;
import Component from "../../../core/component";
import { Price as PriceDomain } from "../../../../src/domain/Price";
import { PRICE } from "../../../../src/domain/Price";
import { divideByUnit } from "../../../../src/utils/count";
import LottoShop from "../../../../src/domain/LottoShop";
import Text from "../../common/Text/Text";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import Modal from "../../common/Modal/Modal";

export default class PriceForm extends Component {
  constructor() {
    super();
  }

  initState() {
    this.state = {
      inputValue: "",
    };
  }

  setDefaultProps() {
    this.props = {
      containerId: "price-form",
      onPurchase: () => {},
      key: "price-form",
    };
  }

  template() {
    const lottoPriceInputText = this.addChild(Text);
    const input = this.addChild(Input);
    const button = this.addChild(Button);

    return (props) => {
      if (props) this.setProps(props);

      // 안내 텍스트 렌더링
      const renderedText = lottoPriceInputText.render({
        content: "구입할 금액을 입력해주세요.",
        classList: ["text-md", "font-regular"],
        key: "price-form-text",
      });

      // 입력 필드 렌더링
      const renderedInput = input.render({
        placeholder: "금액 입력",
        value: this.state.inputValue,
        onChange: this.handleInputChange.bind(this),
        key: "price-form-input",
        id: "price-input",
      });

      // 구매 버튼 렌더링
      const renderedButton = button.render({
        content: "구입",
        onClick: this.handleButtonClick.bind(this),
        styles: {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "56px",
          backgroundColor: "#1a73e8",
        },
        id: "purchase-button",
      });

      return `
        <div class="price-form" id="price-form">
          ${renderedText}
          <div class="price-form__input-container flex flex-row justify-between items-center" style="width: 100%; gap: 10px; margin-top: 8px;">
            ${renderedInput}
            ${renderedButton}
          </div>
        </div>
      `;
    };
  }

  handleInputChange(value) {
    this.setState({
      inputValue: value,
    });
  }

  handleButtonClick() {
    try {
      const price = new PriceDomain(this.state.inputValue);
      const countNumber = divideByUnit(PRICE.UNIT, Number(price.getPrice()));
      const lottos = LottoShop.createLottos(countNumber);
      console.log("PriceForm - handleButtonClick 실행됨", {
        countNumber,
        lottos,
      });

      if (this.props.onPurchase) {
        console.log("PriceForm - onPurchase 실행됨", {
          countNumber,
          lottos,
        });

        this.props.onPurchase({
          count: countNumber,
          numbers: lottos,
        });
      }
    } catch (error) {
      this.showErrorModal(error.message);
    }
  }

  showErrorModal(message) {
    const errorContent = new Text(message, {
      classList: [
        "error-message",
        "flex",
        "justify-center",
        "text-lg",
        "font-bold",
      ],
      key: "error-message",
    });

    new Modal({
      title: "🚨에러🚨",
      content: errorContent,
      onClose: () => console.log("Error modal closed"),
      width: 300,
      padding: 20,
      isModalShow: true,
      key: "error-modal",
    }).open();
  }

  setEvent() {
    console.log("PriceForm - setEvent 실행됨");
    const button = document.getElementById("purchase-button");
    if (button) {
      console.log("PriceForm - 버튼 이벤트 등록됨");
      button.addEventListener("click", this.handleButtonClick.bind(this));
    } else {
      console.log("PriceForm - 버튼을 찾을 수 없음");
    }
  }

  render(props) {
    if (props) this.setProps(props);
    const templateFn = this.template();
    const html = templateFn();
    console.log("ㅁㅁ", document.getElementById("price-form"));
    const container = document.getElementById(this.props.containerId);
    console.log("container", container);
    if (container) {
      container.innerHTML = html;
      this.setEvent();
      this.componentDidMount();
    }

    return html;
  }
}
