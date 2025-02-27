// class Input {
//   constructor({ $target, placeholder, onInput }) {
//     this.input = document.createElement("input");
//     this.input.type = "text";
//     this.input.placeholder = placeholder;
//     this.input.addEventListener("input", onInput);
//     this.input.classList.add("input");

import Component from "../../../core/component";

//     if ($target) {
//       $target.appendChild(this.input);
//     }
//   }

//   render() {
//     return this.input;
//   }

//   getValue() {
//     return this.input.value;
//   }

//   setValue(value) {
//     this.input.value = value;
//   }

//   clearValue() {
//     this.input.value = "";
//   }

//   focus() {
//     this.input.focus();
//   }

//   blur() {
//     this.input.blur();
//   }

//   addClass(className) {
//     this.input.classList.add(className);
//   }

//   removeClass(className) {
//     this.input.classList.remove(className);
//   }
// }
// export default Input;

class Input extends Component {
  constructor() {
    super();
  }

  setDefaultProps() {
    this.props = {
      placeholder: "innertext",
      type: "text",
      value: "",
      onChange: () => {},
      id: "",
    };
  }

  template() {
    return (props) => {
      if (props) this.setProps(props);

      const { placeholder, type, value, classList, id } = this.props;

      return `
      <input
        id="${this.props.id}"
        type="${type}"
        placeholder="${placeholder}"
        value="${value}"
        class="input flex items-center justify-center"
      />
    `;
    };
  }

  setEvent(props) {
    const { id } = props;
    document.getElementById(id).addEventListener("change", () => onChange());
  }

  // render(props) {
  //   if (props) this.setProps(props);

  //   const templateFn = this.template();
  //   const html = templateFn();

  //   return html;
  // }
  // setEvent() {
  //   const input = document.getElementById(this.props.id);
  //   if (input) {
  //     input.addEventListener("input", (e) => {
  //       if (this.props.onChange) {
  //         this.props.onChange(e.target.value);
  //       }
  //     });
  //   }
  // }
}

export default Input;
