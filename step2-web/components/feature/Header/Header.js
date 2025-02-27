// class Header {
//   constructor(title) {
//     this.title = title;
//     this.render();
//   }

import Component from "../../../core/component";

//   render() {
//     const header = document.createElement("header");
//     header.classList.add(
//       "header",
//       "flex",
//       "justify-start",
//       "items-center",
//       "primary"
//     );

//     const titleElement = document.createElement("span");
//     titleElement.classList.add("text-2xl", "font-extrabold", "white");
//     titleElement.textContent = this.title;

//     header.appendChild(titleElement);
//     document.body.prepend(header);
//   }
// }

// export default Header;

export default class Header extends Component {
  initState() {
    this.state = {
      title: "🎱 행운의 로또",
    };
  }

  setDefaultProps() {
    this.props = {
      containerId: "header-container",
      title: null,
    };
  }

  template() {
    return (props) => {
      if (props) this.setProps({ title: props.title });

      const title = props && props.title ? props.title : this.state.title;

      return `
        <header class="header flex justify-start items-center primary">
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
      this.componentDidMount();
    }
    return html;
  }
}
