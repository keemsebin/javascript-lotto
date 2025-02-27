// class Footer {
//   constructor(content) {
//     this.content = content;
//     this.render();
//   }

//   render() {
//     const footer = document.createElement("footer");
//     footer.classList.add("footer", "Flex", "justify-center", "items-center");

//     const contentElement = document.createElement("p");
//     contentElement.classList.add(
//       "flex",
//       "justify-center",
//       "items-center",
//       "text-md",
//       "font-bold",
//       "primary"
//     );
//     contentElement.textContent = this.content;

//     footer.appendChild(contentElement);
//     document.body.appendChild(footer);
//   }
// }

// export default Footer;

import Component from "../../../core/component";

export default class Footer extends Component {
  initState() {
    this.state = {
      content: "Copyright 2023. woowacourse",
    };
  }

  setDefaultProps() {
    this.props = {
      containerId: "footer-container",
      content: null,
    };
  }

  template() {
    return (props) => {
      if (props) {
        this.setProps({ content: props.content });
      }

      return `
        <footer class="footer flex justify-center items-center">
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
