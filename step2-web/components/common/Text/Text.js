// class Text {
//   constructor(content, { classList = [], styles = {} }) {
//     this.element = document.createElement("p");
//     this.element.textContent = content;
//     this.applyClassList(classList);
//     this.applyStyles(styles);
//   }

import Component from "../../../core/component";

//   applyClassList(classList) {
//     classList.forEach((className) => {
//       this.element.classList.add(className);
//     });
//   }

//   applyStyles(styles) {
//     Object.keys(styles).forEach((key) => {
//       this.element.style[key] = styles[key];
//     });
//   }

//   render() {
//     return this.element;
//   }
// }

// export default Text;

class Text extends Component {
  initState() {
    this.state = {
      content: "",
    };
  }

  setDefaultProps() {
    this.props = {
      content: "",
      classList: [],
      styles: {},
      key: "init",
    };
  }

  template(props) {
    return (props) => {
      if (props) this.setProps(props);

      const { content, classList, styles } = this.props;

      return `
      <p 
        class="${classList.join(" ")}" 
        style="${this.getInlineStyle(styles)}">
        ${content}
      </p>
    `;
    };
  }

  setEvent() {}

  getInlineStyle(styles) {
    return Object.entries(styles)
      .map(([key, value]) => `${key}: ${value}`)
      .join(";");
  }

  render(props) {
    if (props) this.setProps(props);

    const templateFn = this.template(this.props);
    const html = templateFn();

    return html;
  }
}

export default Text;
