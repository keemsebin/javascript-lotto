// class Modal {
//   constructor({ title, content, onClose }) {
//     this.container = document.createElement("div");
//     this.container.classList.add(
//       "modal-container",
//       "flex",
//       "justify-center",
//       "items-center"
//     );

//     const modal = document.createElement("div");
//     modal.classList.add("modal");

//     const modalTitle = new Text(title, {
//       classList: [
//         "flex",
//         "items-center",
//         "justify-center",
//         "text-xl",
//         "font-semibold",
//       ],
//       styles: {
//         padding: "20px 0px",
//         position: "relative",
//       },
//     });

//     modal.appendChild(modalTitle.render());

//     const modalContent = document.createElement("div");
//     modalContent.classList.add("modal-content");
//     modalContent.appendChild(content.render());

//     modal.appendChild(modalContent);

//     const closeButton = new Text("X", {
//       classList: ["close-button"],
//     }).render();

//     closeButton.addEventListener("click", () => {
//       this.close();
//       onClose?.();
//     });

//     modal.appendChild(closeButton);
//     this.container.appendChild(modal);
//     document.body.appendChild(this.container);
//   }

//   open() {
//     this.container.style.display = "flex";
//     this.container.classList.add("active");
//     document.body.style.overflow = "hidden";
//   }

//   close() {
//     this.container.classList.remove("active");
//     this.container.style.display = "none";
//     document.body.style.overflow = "";
//   }
// }

// export default Modal;
import Component from "../../../core/component";
import Text from "../Text/Text";

class Modal extends Component {
  setDefaultProps() {
    this.props = {
      title: "",
      content: null,
      onClose: null,
      width: 500,
      padding: 20,
      isModalShow: true,
      key: "modal",
    };
  }

  template() {
    const titleText = this.addChild(Text);

    return (props) => {
      if (props) this.setProps(props);

      const {
        title,
        content,
        width,
        padding,
        isModalShow,

        key,
      } = this.props;

      const modalStyle = {
        display: isModalShow ? "flex" : "none",
      };

      const modalBodyStyle = {
        width: `${width}px`,
        padding: `${padding}px`,
      };

      const titleTextProps = {
        content: title,
        classList: [
          "flex",
          "items-center",
          "justify-center",
          "text-xl",
          "font-semibold",
        ],
        styles: {
          padding: "20px 0px",
          position: "relative",
        },
      };

      const renderedTitleText = titleText.render(titleTextProps);

      // content가 Component 인스턴스인 경우 렌더링
      let contentHtml = "";
      if (content && typeof content.render === "function") {
        contentHtml = content.render();
      } else if (typeof content === "string") {
        contentHtml = content;
      }

      return `
        <div class="modal-container ${key}" style="${this.getStyleString(
        modalStyle
      )}">
          <div class="modal" style="${this.getStyleString(modalBodyStyle)}">
            ${renderedTitleText}
            <div class="modal-content">
              ${contentHtml}
            </div>
            <div class="close-button">X</div>
          </div>
        </div>
      `;
    };
  }

  getStyleString(styles) {
    return Object.entries(styles)
      .map(([key, value]) => `${key}: ${value}`)
      .join("; ");
  }

  setEvent() {
    const { onClose } = this.props;

    this.addEvent("click", ".modal__close-btn", () => {
      this.close();
      if (onClose) onClose();
    });

    this.addEvent(
      "click",
      ".modal-container",
      (e) => {
        if (e.target.classList.contains("modal-container")) {
          this.close();
          if (onClose) onClose();
        }
      },
      true
    );
  }

  open() {
    this.setState({ isModalShow: true });
    document.body.style.overflow = "hidden";

    // 이미 렌더링된 모달이 있으면 표시
    const modalContainer = document.querySelector(`.modal_${this.props.key}`);
    if (modalContainer) {
      modalContainer.style.display = "flex";
      modalContainer.classList.add("active");
    } else {
      // 없으면 body에 직접 추가
      const modalDiv = document.createElement("div");
      modalDiv.innerHTML = this.render();
      document.body.appendChild(modalDiv.firstChild);
      this.setEvent();
    }
  }

  close() {
    this.setState({ isModalShow: false });
    document.body.style.overflow = "";

    const modalContainer = document.querySelector(`.modal_${this.props.key}`);
    if (modalContainer) {
      modalContainer.classList.remove("active");
      modalContainer.style.display = "none";
    }
  }
}

export default Modal;
