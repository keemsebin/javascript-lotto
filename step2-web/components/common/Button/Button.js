// class Button {
//   constructor({ $target, text, onClick, styles = {} }) {
//     this.button = document.createElement("button");
//     this.button.className = "Button";
//     this.button.innerText = text;
//     this.button.onclick = onClick;
//     this.button.classList.add(
//       "button",
//       "flex",
//       "justify-center",
//       "items-center",
//       "text-md",
//       "font-semibold",
//       "white"
//     );

import Component from "../../../core/component";

//     if (styles) {
//       Object.entries(styles).forEach(([prop, value]) => {
//         this.button.style[prop] = value;
//       });
//     }

//     if ($target) {
//       $target.appendChild(this.button);
//     }
//   }

//   render() {
//     return this.button;
//   }

//   disable() {
//     this.button.disabled = true;
//   }

//   enable() {
//     this.button.disabled = false;
//   }
// }

// export default Button;

class Button extends Component {
  constructor() {
    super();
  }

  setDefaultProps() {
    this.props = {
      content: "",
      onClick: () => {},
      disabled: false,
      styles: {},
      key: "",
      id: "",
    };
  }

  template(props) {
    return (props) => {
      if (props) this.setProps(props);

      const { content, disabled, key, id, styles } = this.props;
      const inlineStyleString = Object.entries(styles)
        .map(([key, value]) => `${key}: ${value};`)
        .join(" ");

      return `
      <button 
        type="button"
        ${disabled && "disabled"}
        id=${id}
        class="${key} button flex justify-center items-center text-md font-semibold white" 
        style="${inlineStyleString}"
      >
        ${content}
      </button>
    `;
    };
  }
  setEvent() {
    const { onClick, id } = props;
    document.getElementById(id).addEventListener("click", () => onClick());
    console.log("11");
  }

  render(props) {
    if (props) this.setProps(props);
    console.log("2");
    const templateFn = this.template();
    const html = templateFn(this.props);

    // if (this.props.containerId) {
    //   const container = document.getElementById(this.props.containerId);
    //   if (container) {
    //     container.innerHTML = html;
    //     this.setEvent();
    //     this.componentDidMount();
    //   }
    // }

    return html;
  }
}

export default Button;
