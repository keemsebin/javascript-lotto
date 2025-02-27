// class Box {
//   constructor({ classList = [], styles = {} }) {
//     this.element = document.createElement("div");
//     this.element.classList.add("box");
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
//     Object.entries(styles).forEach(([key, value]) => {
//       this.element.style[key] = value;
//     });
//   }

//   addElement(childElement) {
//     this.element.appendChild(childElement);
//   }

//   clear() {
//     this.element.innerHTML = "";
//   }

//   render() {
//     return this.element;
//   }
// }

// export default Box;

class Box extends Component {
  setDefaultProps() {
    this.props = {
      classList: []
      styles: {},
      children: [],
    };
  }

  template(props) {
    return (props) => {
      if (props) this.setProps(props);

      const { classList, styles, children } = this.props;
      const childrenArray = Array.isArray(children) ? children : [children];

      const sanitizedChildren = childrenArray
        .filter((child) => child != null)
        .map((child) => String(child));

      return `
      <div 
        class="box ${classList.join(" ")}"
        style="${Object.entries(styles || {})
          .map(([prop, value]) => `${prop}: ${value}`)
          .join(";")}"
      >
        ${sanitizedChildren.join("")}
      </div>
    `;
    };
  }
}

export default Box;
