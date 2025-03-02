var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _price, _Price_instances, validate_fn, checkThousandUnit_fn, _number, _numbers, _Lotto_instances, checkDuplicate_fn, checkLength_fn, validate_fn2, sortLottoNumber_fn, _issuedLottoNumbers, _matchedLottoStatus, _LottoMachine_instances, updateFinalStatus_fn, _lottoStatus, _price2, _winningHistory;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
class Component {
  constructor(props) {
    __publicField(this, "props");
    __publicField(this, "state");
    __publicField(this, "children", []);
    this.props = props;
    this.children = [];
    this.initState();
    this.setDefaultProps();
  }
  initState() {
    this.state = {};
  }
  addChild(C, ...args) {
    const component = new C(...args);
    this.children.push(component);
    return component;
  }
  template() {
    return () => "";
  }
  setEvent() {
  }
  setDefaultProps() {
    this.props = {};
  }
  setProps(newProps) {
    this.props = {
      ...this.props,
      ...newProps
    };
  }
  setState(newState) {
    this.state = {
      ...this.state,
      ...newState
    };
    this.render();
  }
  componentDidMount() {
    this.children.forEach((child) => {
      if (typeof child.setEvent === "function") {
        child.setEvent();
      }
    });
  }
  render() {
    const templateFn = this.template();
    const html = templateFn(this.props);
    return html;
  }
  mount(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = this.render();
      this.componentDidMount();
    }
  }
}
class Header extends Component {
  initState() {
    this.state = {
      title: "🎱 행운의 로또"
    };
  }
  setDefaultProps() {
    this.props = {
      containerId: "header-container",
      title: null
    };
  }
  template() {
    return (props) => {
      if (props) this.setProps({ title: props.title });
      const title = props && props.title ? props.title : this.state.title;
      return `
        <header 
          class="header w-full box-border flex items-center primary bg-primary"
          style="height: 64px; padding: 0 0 0 30px;"
          >
          <span class="text-2xl font-extrabold white">${title}</span>
        </header>
      `;
    };
  }
  render(props) {
    if (props) this.setProps(props);
    const templateFn = this.template();
    const html = templateFn();
    const container = document.getElementById(this.props.containerId);
    if (container) {
      container.innerHTML = html;
      this.setEvent();
    }
    return html;
  }
}
const styleStr = (styles) => Object.entries(styles).map(([key, value]) => `${key}: ${value};`).join(" ");
class Text extends Component {
  initState() {
    this.state = {
      content: ""
    };
  }
  setDefaultProps() {
    this.props = {
      content: "",
      classList: [],
      styles: {},
      key: "init"
    };
  }
  template() {
    return (props) => {
      if (props) this.setProps(props);
      const { content, classList, styles } = this.props;
      return `
      <p 
        class="${classList.join(" ")}" 
        style="${styleStr(styles)}">
        ${content}
      </p>
    `;
    };
  }
  setEvent() {
  }
  render(props) {
    if (props) this.setProps(props);
    const templateFn = this.template(this.props);
    const html = templateFn();
    return html;
  }
}
const ERROR_PREFIX = "[ERROR]";
const ERROR = Object.freeze({
  EMPTY: "빈 값은 입력할 수 없습니다.",
  NOT_NUMBER: "숫자가 아닌 값은 입력할 수 없습니다.",
  INVALID_RANGE: "범위를 벗어난 입력은 할 수 없습니다.",
  INCLUDE: "보너스 번호는 로또 번호와 중복될 수 없습니다.",
  UNIT: "구입 금액은 1000원 단위로 입력해야 합니다.",
  INVALID_RETRY_STRING: "y 또는 n을 입력해주세요.",
  LENGTH: "로또 번호는 6개여야 합니다.",
  DUPLICATE: "중복된 숫자가 있습니다."
});
const throwError = (message) => {
  throw new Error(`${ERROR_PREFIX} ${message}`);
};
const isEmpty = (value) => {
  if (value === "") {
    throwError(ERROR.EMPTY);
  }
};
const isRange = ({ min, max }, number) => {
  if (number < min || number > max) {
    throwError(ERROR.INVALID_RANGE);
  }
};
const isNumber = (value) => {
  if (isNaN(value)) {
    throwError(ERROR.NOT_NUMBER);
  }
};
const PRICE = Object.freeze({
  UNIT: 1e3,
  MIN: 1e3,
  MAX: 1e5
});
class Price {
  constructor(price) {
    __privateAdd(this, _Price_instances);
    __privateAdd(this, _price);
    __privateSet(this, _price, price);
    __privateMethod(this, _Price_instances, validate_fn).call(this, __privateGet(this, _price));
  }
  getPrice() {
    return __privateGet(this, _price);
  }
}
_price = new WeakMap();
_Price_instances = new WeakSet();
validate_fn = function(price) {
  isEmpty(price);
  isNumber(price);
  isRange({ min: PRICE.MIN, max: PRICE.MAX }, price);
  __privateMethod(this, _Price_instances, checkThousandUnit_fn).call(this, price);
};
checkThousandUnit_fn = function(price) {
  if (price % PRICE.UNIT !== 0) {
    throwError(ERROR.UNIT);
  }
};
const divideByUnit = (unit, price) => Number(price / unit);
const _LottoNumber = class _LottoNumber {
  constructor(number) {
    __privateAdd(this, _number);
    __privateSet(this, _number, number);
    this.validate(number);
  }
  static of(number) {
    return new _LottoNumber(number);
  }
  validate(number) {
    isEmpty(number);
    isNumber(number);
    isRange(
      {
        min: this.constructor.CONSTRAINTS.MIN,
        max: this.constructor.CONSTRAINTS.MAX
      },
      number
    );
  }
  getValue() {
    return __privateGet(this, _number);
  }
  equals(other) {
    return __privateGet(this, _number) === other.getValue();
  }
};
_number = new WeakMap();
__publicField(_LottoNumber, "CONSTRAINTS", Object.freeze({
  MIN: 1,
  MAX: 45
}));
let LottoNumber = _LottoNumber;
class Lotto {
  constructor(numbers) {
    __privateAdd(this, _Lotto_instances);
    __privateAdd(this, _numbers);
    const lottoNumbers = numbers.map(LottoNumber.of);
    __privateSet(this, _numbers, __privateMethod(this, _Lotto_instances, sortLottoNumber_fn).call(this, lottoNumbers));
    __privateMethod(this, _Lotto_instances, validate_fn2).call(this, __privateGet(this, _numbers));
  }
  getLottoNumbers() {
    return __privateGet(this, _numbers).map((number) => number.getValue());
  }
  getIncludeSameNumbers(givenLottoNumber) {
    return this.getLottoNumbers().filter(
      (number) => givenLottoNumber.includes(number)
    ).length;
  }
}
_numbers = new WeakMap();
_Lotto_instances = new WeakSet();
checkDuplicate_fn = function(numbers) {
  const values = numbers.map((num) => num.getValue());
  if (new Set(values).size !== values.length) {
    throwError(ERROR.DUPLICATE);
  }
};
checkLength_fn = function(numbers) {
  if (numbers.length !== this.constructor.CONSTRAINTS.COUNT) {
    throwError(ERROR.LENGTH);
  }
};
validate_fn2 = function(numbers) {
  __privateMethod(this, _Lotto_instances, checkDuplicate_fn).call(this, numbers);
  __privateMethod(this, _Lotto_instances, checkLength_fn).call(this, numbers);
};
sortLottoNumber_fn = function(numbers) {
  return numbers.sort((a, b) => a.getValue() - b.getValue());
};
__publicField(Lotto, "CONSTRAINTS", Object.freeze({ COUNT: 6 }));
const LottoShop$1 = {
  checkAndAddLottoNumbers: (store, number) => {
    if (store.has(number)) return;
    store.add(number);
  },
  issueLottoNumbers: () => {
    return new Lotto(
      [...Array(LottoNumber.CONSTRAINTS.MAX)].map((_, i) => i + 1).sort(() => Math.random() - 0.5).slice(0, Lotto.CONSTRAINTS.COUNT)
    );
  },
  createLottos: (count) => {
    return Array.from({ length: count }, () => LottoShop$1.issueLottoNumbers());
  }
};
class Input extends Component {
  constructor() {
    super();
    this.setDefaultProps();
  }
  setDefaultProps() {
    this.props = {
      placeholder: "",
      type: "text",
      value: "",
      onChange: () => {
      },
      classList: [],
      styles: {},
      id: ""
    };
  }
  template() {
    return (props) => {
      if (props) this.setProps(props);
      const { placeholder, type, value, id, styles, classList } = this.props;
      return `
      <input
        id="${id}"
        type="${type}"
        placeholder="${placeholder}"
        value="${value}"
        class="${classList.join(
        " "
      )} input w-full h-36 box-border flex items-center justify-center rounded-sm text-lg p-8"
        style="${styleStr(styles)} border: 1px solid var(--gray-400);"
      />
    `;
    };
  }
  setEvent() {
    const { onChange, id } = this.props;
    const inputElement = document.getElementById(id);
    if (!inputElement) return;
    inputElement.addEventListener("input", (e) => {
      onChange(e.target.value);
    });
  }
  render(props) {
    if (props) this.setProps(props);
    const templateFn = this.template();
    const html = templateFn(this.props);
    return html;
  }
}
class Button extends Component {
  constructor() {
    super();
  }
  setDefaultProps() {
    this.props = {
      content: "",
      onClick: () => {
      },
      styles: {},
      classList: [],
      id: ""
    };
  }
  template() {
    return (props) => {
      if (props) this.setProps(props);
      const { content, classList, id, styles } = this.props;
      return `
      <button 
        id="${id}"  
        type="submit"
        class="${classList.join(
        " "
      )} button h-36 flex justify-center items-center text-md font-semibold rounded-sm white bg-primary cursor-pointer" 
        style="${styleStr(
        styles
      )} padding: 0 16px; border: none; white-space: nowrap;"
      >
        ${content}
      </button>
    `;
    };
  }
  setEvent() {
    const { onClick, id } = this.props;
    const button = document.getElementById(id);
    if (typeof onClick === "function") {
      button.addEventListener("click", (event) => {
        onClick(event);
      });
    }
  }
  render(props) {
    if (props) this.setProps(props);
    const templateFn = this.template();
    const html = templateFn(this.props);
    return html;
  }
}
class Modal extends Component {
  constructor() {
    super();
    this.setDefaultProps();
  }
  setDefaultProps() {
    this.props = {
      title: "",
      content: null,
      width: 414,
      padding: 20,
      isModalShow: false,
      key: "modal"
    };
  }
  template() {
    const titleText = this.addChild(Text);
    return (props) => {
      if (props) this.setProps(props);
      const { title, content, isModalShow, key } = this.props;
      const modalStyle = {
        display: isModalShow ? "flex" : "none"
      };
      const titleTextProps = {
        content: title,
        classList: [
          "flex",
          "items-center",
          "justify-center",
          "text-xl",
          "font-semibold",
          "px20-py0"
        ]
      };
      const renderedTitleText = titleText.render(titleTextProps);
      const contentHtml = this.renderContent();
      return `
      <div class="modal-container w-full h-full fixed justify-center items-center" id="${key}" style="${styleStr(
        modalStyle
      )}">
        <div class="modal max-w-350 relative rounded-lg bg-white px32-py15">
          <div 
            class="close-button black absolute cursor-pointer text-xl" 
            style="top: 10px; right: 10px; padding: 5px;"
            >
              X
            </div>
          ${renderedTitleText}
          <div class="modal-content flex justify-center items-center" style="padding: 20px;">
            ${contentHtml}
          </div>
        </div>
      </div>
    `;
    };
  }
  setEvent() {
    const { key } = this.props;
    const modalContainer = document.getElementById(key);
    if (!modalContainer) return;
    const closeButton = modalContainer.querySelector(".close-button");
    const modalBody = modalContainer.querySelector(".modal");
    document.addEventListener(
      "keydown",
      (e) => e.key === "Escape" && this.close()
    );
    closeButton.addEventListener("click", () => this.close());
    modalBody.addEventListener("click", (e) => e.stopPropagation());
    modalContainer.addEventListener(
      "click",
      (e) => e.target === modalContainer && this.close()
    );
    if (this.props.content && typeof this.props.content.setEvent === "function") {
      this.props.content.setEvent();
    }
  }
  open() {
    const modalHTML = this.render();
    const existingModals = document.querySelectorAll(".modal-container");
    existingModals.forEach((modal) => {
      modal.remove();
    });
    document.body.insertAdjacentHTML("beforeend", modalHTML);
    const modalContainer = document.getElementById(this.props.key);
    if (modalContainer) {
      modalContainer.style.display = "flex";
      this.setEvent();
    }
  }
  close() {
    this.setProps({ isModalShow: false });
    const modalContainer = document.getElementById(this.props.key);
    if (modalContainer) {
      modalContainer.remove();
    }
  }
  renderContent() {
    const { content } = this.props;
    if (!content) return "";
    if (typeof content === "string") {
      return content;
    }
    if (typeof content.render === "function") {
      return content.render();
    }
    if (typeof content === "object") {
      return `<pre>${JSON.stringify(content, null, 2)}</pre>`;
    }
    return String(content);
  }
  render() {
    const templateFn = this.template();
    const html = templateFn(this.props);
    return html;
  }
}
const _PriceForm = class _PriceForm extends Component {
  constructor() {
    super();
    this.initState();
    this.setDefaultProps();
  }
  initState() {
    this.state = {
      price: _PriceForm.savedPrice || ""
    };
  }
  setDefaultProps() {
    this.props = {
      containerId: "price-form",
      onPurchase: () => {
      }
    };
  }
  updatePrice(newValue) {
    _PriceForm.savedPrice = newValue;
    this.setState({
      price: newValue
    });
  }
  processLottoPurchase() {
    try {
      const price = new Price(this.state.price);
      const countNumber = this.calculateLottoCount(price);
      const lottos = this.generateLottos(countNumber);
      this.notifyPurchase(countNumber, lottos);
    } catch (error) {
      this.handleError(error);
    }
  }
  calculateLottoCount(price) {
    return divideByUnit(PRICE.UNIT, Number(price.getPrice()));
  }
  generateLottos(count) {
    return LottoShop$1.createLottos(count);
  }
  notifyPurchase(count, numbers) {
    if (this.props.onPurchase) {
      this.props.onPurchase({
        count,
        numbers,
        showMachineResult: true,
        showWinningNumberSection: true
      });
    }
  }
  handleError(error) {
    const cleanMessage = error.message.replace("[ERROR] ", "");
    this.showErrorModal(cleanMessage);
  }
  showErrorModal(message) {
    const modal = new Modal();
    modal.setProps({
      title: "🚨 에러 🚨",
      content: message,
      isModalShow: true,
      key: "result-modal"
    });
    modal.open();
  }
  renderPriceLabel() {
    const labelText = this.addChild(Text);
    return labelText.render({
      content: "구입할 금액을 입력해주세요.",
      classList: ["text-lg", "font-regular"]
    });
  }
  renderPriceInput() {
    const inputField = this.addChild(Input);
    return inputField.render({
      placeholder: "금액 입력",
      value: this.state.price,
      id: "price-input"
    });
  }
  renderSubmitButton() {
    const submitButton = this.addChild(Button);
    return submitButton.render({
      content: "구입",
      onClick: () => this.processLottoPurchase(),
      classList: [
        "inline-flex",
        "justify-center",
        "items-center",
        "rounded-md"
      ],
      styles: {
        width: "56px"
      },
      id: "purchase-button"
    });
  }
  template() {
    return (props) => {
      if (props) this.setProps(props);
      const renderedText = this.renderPriceLabel();
      const renderedInput = this.renderPriceInput();
      const renderedButton = this.renderSubmitButton();
      return `
        <form id="price-form" class="w-full gap-10" >
          ${renderedText}
          <div class="w-full flex flex-row justify-between items-center gap-10" style=" margin-top: 8px;">
            ${renderedInput}
            ${renderedButton}
          </div>
        </form>
      `;
    };
  }
  setEvent() {
    this.setupInputEvents();
    this.setupButtonEvents();
    this.setupFormEvents();
  }
  setupInputEvents() {
    const input = document.getElementById("price-input");
    if (input) {
      input.addEventListener("input", (e) => this.updatePrice(e.target.value));
    }
  }
  setupButtonEvents() {
    const button = document.getElementById("purchase-button");
    if (button) {
      button.addEventListener("click", () => this.processLottoPurchase());
    }
  }
  setupFormEvents() {
    const form = document.getElementById("price-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.processLottoPurchase();
      });
    }
  }
  render(props) {
    if (props) this.setProps(props);
    const templateFn = this.template();
    const html = templateFn(this.props);
    return html;
  }
};
__publicField(_PriceForm, "savedPrice", "");
let PriceForm = _PriceForm;
let LottoMachine$1 = class LottoMachine extends Component {
  constructor() {
    super();
    this.setDefaultProps();
  }
  setDefaultProps() {
    this.props = {
      count: 0,
      numbers: []
    };
  }
  renderPurchaseText() {
    const purchaseText = this.addChild(Text);
    return purchaseText.render({
      content: `총 ${this.props.count}개를 구매하였습니다.`
    });
  }
  renderLottoNumbers() {
    return this.props.numbers.map(
      (lotto) => `
        <div>
          🎟️ ${lotto.getLottoNumbers().join(", ")}
        </div>`
    ).join("");
  }
  template() {
    return (props) => {
      if (props) this.setProps(props);
      return `
          <div class="w-full flex items-start justify-start mt-20">
          ${this.renderPurchaseText()}
          </div>
          <div class="w-full flex flex-col items-start justify-start text-lg font-regular mt-20 gap-10" style=" overflow-y: auto;">
            ${this.renderLottoNumbers()}
          </div>

      `;
    };
  }
  render(props) {
    if (props) this.setProps(props);
    const templateFn = this.template();
    const html = templateFn(this.props);
    return html;
  }
};
const _NumberForm = class _NumberForm extends Component {
  constructor() {
    super();
    this.initState();
    this.setDefaultProps();
  }
  initState() {
    this.state = {
      winningNumbers: [..._NumberForm.savedWinningNumbers],
      bonusNumber: _NumberForm.savedBonusNumber
    };
  }
  setDefaultProps() {
    this.props = {
      onSubmit: () => {
      }
    };
  }
  updateWinningNumber(index, value) {
    const winningNumbers = [...this.state.winningNumbers];
    winningNumbers[index] = value;
    _NumberForm.savedWinningNumbers[index] = value;
    this.setState({ winningNumbers });
  }
  updateBonusNumber(value) {
    _NumberForm.savedBonusNumber = value;
    this.setState({ bonusNumber: value });
  }
  submitData() {
    try {
      const { winningNumbers, bonusNumber } = this.state;
      const winningLotto = new Lotto(winningNumbers.map(Number));
      const bonusLottoNumber = new LottoNumber(Number(bonusNumber));
      this.props.onSubmit({
        winningNumbers: winningLotto,
        bonusNumber: bonusLottoNumber
      });
    } catch (error) {
      this.handleError(error.message);
    }
  }
  handleError(error) {
    const cleanMessage = error.replace("[ERROR] ", "");
    this.showErrorModal(cleanMessage);
  }
  showErrorModal(message) {
    const modal = new Modal();
    modal.setProps({
      title: "🚨 에러 🚨",
      content: message,
      isModalShow: true,
      key: "number-error-modal"
    });
    modal.open();
  }
  renderWinningInputs() {
    const winningInputs = Array(6).fill().map((_, index) => {
      const input = this.addChild(Input);
      return input.render({
        placeholder: "0",
        value: this.state.winningNumbers[index],
        styles: {
          width: "36px"
        },
        id: `winning-input-${index}`
      });
    });
    return winningInputs;
  }
  renderBonusInput() {
    const bonusInput = this.addChild(Input);
    return bonusInput.render({
      placeholder: "0",
      value: this.state.bonusNumber,
      styles: {
        width: "36px"
      },
      id: "bonus-input"
    });
  }
  renderSubmitButton() {
    const submitButton = this.addChild(Button);
    return submitButton.render({
      content: "결과 확인하기",
      classList: ["w-full", "inline-flex", "justify-center", "items-center"],
      id: "result-submit-button"
    });
  }
  template() {
    return (props) => {
      if (props) this.setProps(props);
      const winningInputsHTML = this.renderWinningInputs().join("");
      const bonusInputHTML = this.renderBonusInput();
      const submitButtonHTML = this.renderSubmitButton();
      return `
        <form id="number-form" class="w-full">
          <div class="w-full flex flex-row justify-center items-center text-lg font-regular" style="gap: 20px;">
            <div class="flex flex-col gap-10">
              당첨 번호
              <div class="flex flex-row gap-10">
                ${winningInputsHTML}
              </div>
            </div>
            <div class="flex flex-col justify-end items-end gap-10 text-right" style="width: 50%;">
              보너스 번호
              <div class="flex flex-row" style="width: 36px;">
                ${bonusInputHTML}
              </div>
            </div>
          </div>
          <div class="w-full flex flex-row justify-start items-center mt-20" >
            ${submitButtonHTML}
          </div>
        </form>
      `;
    };
  }
  setEvent() {
    this.setupButtonEvents();
    this.setupWinningInputEvents();
    this.setupBonusInputEvents();
    this.setupFormEvents();
  }
  setupButtonEvents() {
    const button = document.getElementById("result-submit-button");
    if (button) {
      button.addEventListener("click", this.submitData.bind(this));
    }
  }
  setupWinningInputEvents() {
    [...Array(6).keys()].map((i) => document.getElementById(`winning-input-${i}`)).forEach((input, i) => {
      input.addEventListener("input", (e) => {
        this.updateWinningNumber(i, e.target.value);
      });
    });
  }
  setupBonusInputEvents() {
    const bonusInput = document.getElementById("bonus-input");
    if (bonusInput) {
      bonusInput.addEventListener("input", (e) => {
        this.updateBonusNumber(e.target.value);
      });
    }
  }
  setupFormEvents() {
    const form = document.getElementById("number-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.submitData();
      });
    }
  }
  render(props) {
    if (props) this.setProps(props);
    const templateFn = this.template();
    const html = templateFn(this.props);
    return html;
  }
};
__publicField(_NumberForm, "savedWinningNumbers", Array(6).fill(""));
__publicField(_NumberForm, "savedBonusNumber", "");
let NumberForm = _NumberForm;
class LottoMachine2 {
  constructor(issuedLottoNumbers) {
    __privateAdd(this, _LottoMachine_instances);
    __privateAdd(this, _issuedLottoNumbers);
    __privateAdd(this, _matchedLottoStatus);
    __privateSet(this, _issuedLottoNumbers, issuedLottoNumbers);
    __privateSet(this, _matchedLottoStatus, []);
  }
  updateStatus(callback) {
    const currentStatus = this.constructor.LOTTO_STATUS.find(callback);
    __privateGet(this, _matchedLottoStatus).push(currentStatus);
  }
  getMatchingNumbers(enteredLottoNumbers) {
    return __privateGet(this, _issuedLottoNumbers).map((lotto) => {
      return lotto.getIncludeSameNumbers(enteredLottoNumbers);
    });
  }
  getHasBonusNumbers(bonusLottoNumbers) {
    return __privateGet(this, _issuedLottoNumbers).map((lotto) => {
      return lotto.getIncludeSameNumbers([bonusLottoNumbers]) > 0;
    });
  }
  getMatchedLottoStatus(enteredLottoNumbers, bonusLottoNumber) {
    const matchingNumbers = this.getMatchingNumbers(enteredLottoNumbers);
    const isBonusArray = this.getHasBonusNumbers(bonusLottoNumber);
    __privateMethod(this, _LottoMachine_instances, updateFinalStatus_fn).call(this, matchingNumbers, isBonusArray);
    return __privateGet(this, _matchedLottoStatus);
  }
}
_issuedLottoNumbers = new WeakMap();
_matchedLottoStatus = new WeakMap();
_LottoMachine_instances = new WeakSet();
updateFinalStatus_fn = function(matchingNumbers, isBonusArray) {
  matchingNumbers.forEach((matchingNumber, index) => {
    if (matchingNumber < this.constructor.CONSTRAINTS.MIN_WINNING_COUNT)
      return;
    if (matchingNumber === this.constructor.CONSTRAINTS.BONUS_MATCH_COUNT && isBonusArray[index]) {
      this.updateStatus(
        (status) => status.COUNT === this.constructor.CONSTRAINTS.BONUS_MATCH_COUNT && status.IS_BONUS
      );
      return;
    }
    this.updateStatus(
      (status) => status.COUNT === matchingNumber && !status.IS_BONUS
    );
  });
};
__publicField(LottoMachine2, "CONSTRAINTS", Object.freeze({
  MIN_WINNING_COUNT: 3,
  BONUS_MATCH_COUNT: 5
}));
__publicField(LottoMachine2, "LOTTO_STATUS", Object.freeze([
  { RANK: 1, COUNT: 6, REWORD: 2e9, IS_BONUS: false },
  { RANK: 2, COUNT: 5, REWORD: 3e7, IS_BONUS: true },
  { RANK: 3, COUNT: 5, REWORD: 15e5, IS_BONUS: false },
  { RANK: 4, COUNT: 4, REWORD: 5e4, IS_BONUS: false },
  { RANK: 5, COUNT: 3, REWORD: 5e3, IS_BONUS: false }
]));
class Table extends Component {
  constructor() {
    super();
  }
  setDefaultProps() {
    this.props = {
      headers: [],
      data: [],
      styles: {}
    };
  }
  template() {
    return (props) => {
      if (props) this.setProps(props);
      const { headers, data, styles } = this.props;
      const headerHtml = headers.map(
        (header) => `<th class="cell p-8 text-center border-b">${header}</th>`
      ).join("");
      const rowsHtml = data.map(
        (rowData) => `<tr>${rowData.map(
          (cellData) => `<td class="cell p-8 text-center border-b">${cellData}</td>`
        ).join("")}
            </tr>`
      ).join("");
      return `
        <table 
          class="w-full" 
          style="${styleStr(
        styles
      )} table-layout: auto; border-collapse: collapse;">
          <thead>
            <tr>${headerHtml}</tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      `;
    };
  }
  render(props) {
    if (props) this.setProps(props);
    const templateFn = this.template();
    return templateFn(this.props);
  }
}
const HEADER = ["일치 갯수", "당첨금", "당첨 갯수"];
class LottoResultBox extends Component {
  constructor() {
    super();
    this.setDefaultProps();
  }
  setDefaultProps() {
    this.props = {
      lottoResult: null,
      lottoRate: 0
    };
  }
  renderTable() {
    const resultTable = this.addChild(Table);
    const data = LottoMachine2.LOTTO_STATUS.map(
      ({ RANK, COUNT, REWORD, IS_BONUS }) => {
        return [
          IS_BONUS ? `${COUNT}개+보너스볼` : `${COUNT}개`,
          REWORD.toLocaleString("ko-KR"),
          `${this.props.lottoResult[RANK] || 0}개`
        ];
      }
    ).reverse();
    return resultTable.render({ headers: HEADER, data });
  }
  renderProfitText() {
    const profitText = this.addChild(Text);
    return profitText.render({
      content: `당신의 총 수익률은 ${this.props.lottoRate}%입니다.`,
      classList: [
        "w-full",
        "flex",
        "justify-center",
        "items-center",
        "text-lg",
        "font-bold",
        "px32-py15"
      ]
    });
  }
  renderRestartButton() {
    const restartButton = this.addChild(Button);
    return restartButton.render({
      content: "다시 시작하기",
      onClick: () => {
        window.location.reload();
      },
      classList: ["block", "w-full"],
      styles: { padding: "10px", marginTop: "20px" },
      id: "restart-button"
    });
  }
  handleRestartClick() {
    console.log("handleRestartClick");
    window.location.reload();
  }
  template() {
    return (props) => {
      if (props) this.setProps(props);
      return `
        <div class="lotto-result-box flex flex-col w-full">
          ${this.renderTable()}
          ${this.renderProfitText()}
          ${this.renderRestartButton()}
        </div>
      `;
    };
  }
  setEvent() {
    const restartButton = document.getElementById("restart-button");
    if (restartButton) {
      restartButton.addEventListener("click", () => {
        this.handleRestartClick();
      });
    }
  }
  componentDidMount() {
    this.setEvent();
  }
  render(props) {
    if (props) this.setProps(props);
    const templateFn = this.template();
    const html = templateFn(this.props);
    this.componentDidMount();
    return html;
  }
}
class LottoResult {
  constructor(lottoStatus, price) {
    __privateAdd(this, _lottoStatus);
    __privateAdd(this, _price2);
    __privateAdd(this, _winningHistory);
    __privateSet(this, _lottoStatus, lottoStatus);
    __privateSet(this, _price2, price);
    __privateSet(this, _winningHistory, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  }
  getWinningHistory() {
    __privateGet(this, _lottoStatus).forEach((status) => {
      __privateGet(this, _winningHistory)[status.RANK] += 1;
    });
    return __privateGet(this, _winningHistory);
  }
  getTotalProfit() {
    return __privateGet(this, _lottoStatus).reduce((acc, cur) => acc + cur.REWORD, 0);
  }
  getRate() {
    return (this.getTotalProfit() / __privateGet(this, _price2) * 100).toFixed(1);
  }
}
_lottoStatus = new WeakMap();
_price2 = new WeakMap();
_winningHistory = new WeakMap();
class LottoShop extends Component {
  constructor() {
    super();
    this.initState();
    this.setDefaultProps();
  }
  initState() {
    this.state = {
      lottoCount: 0,
      lottoNumbers: [],
      showMachineResult: false,
      showWinningNumberSection: false,
      winningNumbers: [],
      bonusNumber: 0,
      lottoResult: {},
      lottoRate: 0
    };
  }
  setDefaultProps() {
    this.props = {
      containerId: "footer-container",
      content: null
    };
  }
  handlePurchase({ count, numbers }) {
    this.setState({
      lottoCount: count,
      lottoNumbers: numbers,
      showMachineResult: true,
      showWinningNumberSection: true
    });
  }
  handleWinningNumberSubmit({ winningNumbers, bonusNumber }) {
    this.setState({
      winningNumbers,
      bonusNumber
    });
    this.calculateLottoResult(winningNumbers, bonusNumber);
    this.showResultModal();
  }
  calculateLottoResult(winningNumbers, bonusNumber) {
    const lottoMachine = new LottoMachine2(this.state.lottoNumbers);
    const lottoStatus = lottoMachine.getMatchedLottoStatus(
      winningNumbers.getLottoNumbers(),
      bonusNumber.getValue()
    );
    const totalLottoResult = new LottoResult(
      lottoStatus,
      this.state.lottoCount
    );
    this.setState({
      lottoResult: totalLottoResult.getWinningHistory(),
      lottoRate: totalLottoResult.getRate()
    });
  }
  showResultModal() {
    const resultBox = new LottoResultBox();
    resultBox.setProps({
      lottoResult: this.state.lottoResult,
      lottoRate: this.state.lottoRate
    });
    const modal = new Modal();
    modal.setProps({
      title: "🏆 당첨 통계 🏆",
      content: resultBox,
      isModalShow: true,
      key: "result-modal"
    });
    modal.open();
  }
  renderTitle() {
    const titleText = this.addChild(Text);
    return titleText.render({
      content: "🎱 내 번호 당첨 확인 🎱",
      classList: [
        "flex",
        "items-center",
        "justify-center",
        "text-xl",
        "font-bold",
        "px20-py0"
      ],
      key: "lotto-shop-title"
    });
  }
  renderLottoMachine(count) {
    const lottoMachine = this.addChild(LottoMachine$1);
    return lottoMachine.render({
      count,
      numbers: this.state.lottoNumbers
    });
  }
  renderWinningNumberSection() {
    return `
      <div class="w-full mt-20">
        ${this.addChild(Text).render({
      content: "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.",
      classList: ["flex", "justify-start", "text-lg", "font-regular"],
      styles: { padding: "12px 0px" }
    })}
        ${this.addChild(NumberForm).render({
      onSubmit: this.handleWinningNumberSubmit.bind(this)
    })}
      </div>
    `;
  }
  renderPriceForm() {
    return this.addChild(PriceForm).render({
      onPurchase: this.handlePurchase.bind(this)
    });
  }
  template() {
    return (props) => {
      if (props) this.setProps(props);
      return `
      <main class="main flex w-full justify-center items-center bg-gray" id="lotto-shop" style="height: calc(100vh - 80px - 64px);">
        <div class="w-full max-w-414 flex flex-col justify-center items-center rounded-sm px32-py15" style=" border: 1px solid rgba(0, 0, 0, 0.12);">
          ${this.renderTitle()}
          <div id="price-form" class="w-full">
            ${this.renderPriceForm()}
          </div>
          ${this.state.showMachineResult ? this.renderLottoMachine(this.state.lottoCount) : ""}
          ${this.state.showWinningNumberSection ? this.renderWinningNumberSection() : ""}
        </div>
      </main>
      `;
    };
  }
  render() {
    const templateFn = this.template();
    const html = templateFn(this.props);
    const container = document.getElementById(this.props.containerId);
    if (container) {
      container.innerHTML = html;
      this.componentDidMount();
    }
    return html;
  }
  mount(containerId) {
    if (containerId) {
      this.setProps({ containerId });
    }
    this.render();
  }
}
class Footer extends Component {
  initState() {
    this.state = {
      content: "Copyright 2023. woowacourse"
    };
  }
  setDefaultProps() {
    this.props = {
      containerId: "footer-container",
      content: null
    };
  }
  template() {
    return (props) => {
      if (props) {
        this.setProps({ content: props.content });
      }
      return `
        <footer 
          class="footer w-full fixed flex justify-center items-center bg-gray" 
          style="bottom: 0; left: 0; height: 80px; border-top: 1px solid rgba(0, 0, 0, 0.12);"
        >
          <p class="flex justify-center items-center text-md font-bold primary">
            ${this.state.content}
          </p>
        </footer>
      `;
    };
  }
  render(props) {
    if (props) this.setProps(props);
    const templateFn = this.template();
    const html = templateFn();
    const container = document.getElementById(this.props.containerId);
    if (container) {
      container.innerHTML = html;
      this.setEvent();
      this.componentDidMount();
    }
    return html;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const header = new Header();
  const lottoShop = new LottoShop();
  const footer = new Footer();
  header.mount("header-container");
  lottoShop.mount("lotto-shop-container");
  footer.mount("footer-container");
});
