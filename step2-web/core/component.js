// import * as dom from "./dom";

export default class Component {
  props;
  state;
  children = [];

  constructor() {
    this.children = [];
    this.initState();
    this.setDefaultProps();
  }

  initState() {
    this.state = {};
  }

  componentDidMount() {}

  addChild(C, ...args) {
    const component = new C(...args);
    this.children.push(component);
    return component;
  }

  template() {
    return () => "";
  }

  setEvent() {}

  setDefaultProps() {
    this.props = {};
  }

  setProps(newProps) {
    this.props = {
      ...this.props,
      ...newProps,
    };
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };
    this.render();
  }

  render() {
    const templateFn = this.template();
    const html = templateFn(this.props);
    return html;
  }
}
