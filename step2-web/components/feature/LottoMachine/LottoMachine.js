// import Box from "../../common/Box/Box";
// import Text from "../../common/Text/Text";

// class LottoMachine {
//   constructor({ count, numbers }) {
//     this.count = count;
//     this.numbers = numbers;
//     this.container = new Box({
//       classList: ["flex", "flex-col"],
//       styles: {
//         gap: "10px",
//         padding: "10px 0",
//         margin: "10px 0",
//         maxHeight: "200px",
//         overflowY: "auto",
//       },
//     });

//     this.updateContent();
//   }

//   update({ count, numbers }) {
//     this.count = count;
//     this.numbers = numbers;
//     this.updateContent();
//   }

//   updateContent() {
//     this.container.clear();

//     const purchaseText = new Text(`총 ${this.count}개를 구매하였습니다.`, {
//       classList: ["text-lg", "font-regular"],
//     });

//     this.container.addElement(purchaseText.render());
//     this.numbers.forEach((num) => {
//       const lottoNumbersText = new Text(
//         `🎟️ ${num.getLottoNumbers().join(", ")}`,
//         {
//           classList: ["text-lg"],
//         }
//       );
//       this.container.addElement(lottoNumbersText.render());
//     });
//   }

//   getCount() {
//     return this.count;
//   }

//   getNumbers() {
//     return this.numbers;
//   }

//   render() {
//     return this.container.render();
//   }
// }

// export default LottoMachine;

import Component from "../../../core/component";
import Text from "../../common/Text/Text";

class LottoMachine extends Component {
  initState() {
    this.state = {
      count: 0,
      numbers: [],
    };
  }

  template() {
    const purchaseText = this.addChild(Text);

    return (props) => {
      if (props) {
        this.setProps(props);
        // props로부터 상태 업데이트
        this.setState({
          count: props.count || 0,
          numbers: props.numbers || [],
        });
      }

      console.log("LottoMachine 렌더링:", this.state.count, this.state.numbers);

      const purchaseTextProps = {
        content: `총 ${this.state.count}개를 구매하였습니다.`,
        classList: ["text-lg", "font-regular"],
      };

      // 구매 텍스트 렌더링
      const renderedPurchaseText = purchaseText.render(purchaseTextProps);

      // 로또 번호 텍스트 직접 생성
      let lottoNumbersHtml = "";
      this.state.numbers.forEach((lotto, index) => {
        try {
          const lottoNumbers = lotto.getLottoNumbers();
          lottoNumbersHtml += `
                <div class="lotto-number-item" style="margin: 5px 0;">
                  🎟️ ${lottoNumbers.join(", ")}
                </div>
              `;
        } catch (e) {
          console.error("getLottoNumbers 호출 오류:", e);
        }
      });

      return `
        <div class="flex flex-col" style="border: 1px solid #ddd; padding: 15px; margin-top: 20px;">
          <div class="purchase-text-container">
            ${renderedPurchaseText}
          </div>
          <div class="lotto-numbers-container" style="max-height: 200px; overflow-y: auto; margin-top: 10px;">
            ${lottoNumbersHtml}
          </div>
        </div>
      `;
    };
  }

  getCount() {
    return this.state.count;
  }

  getNumbers() {
    return this.state.numbers;
  }
}

export default LottoMachine;
