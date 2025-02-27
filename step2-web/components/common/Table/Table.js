class Table {
  constructor({ headers, data, styles = {} }) {
    this.headers = headers;
    this.data = data;
    this.styles = styles;
    this.element = document.createElement("table");

    Object.entries(this.styles).forEach(([property, value]) => {
      this.element.style[property] = value;
    });

    this.init();
  }

  init() {
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    this.headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.classList.add("cell");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    this.element.appendChild(thead);

    const tbody = document.createElement("tbody");

    this.data.forEach((rowData) => {
      const row = document.createElement("tr");
      rowData.forEach((cellData) => {
        const cell = document.createElement("td");
        cell.classList.add("cell");
        cell.textContent = cellData;
        row.appendChild(cell);
      });

      tbody.appendChild(row);
    });

    this.element.appendChild(tbody);
  }

  render() {
    return this.element;
  }
}

export default Table;
