"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import CheckboxRenderer from "./CheckboxRenderer.jsx";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "athlete" },
        {
          headerName: "Registered - Checkbox",
          field: "registered",
          cellRenderer: "checkboxRenderer"
        },
        {
          headerName: "Registered - Boolean",
          field: "registered"
        }
      ],
      defaultColDef: {
        flex: 1
      },
      frameworkComponents: {
        checkboxRenderer: CheckboxRenderer
      },
      rowData: []
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      this.setState({ rowData: data });
    };

    httpRequest.open(
      "GET",
      "https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json"
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        let data = JSON.parse(httpRequest.responseText).map(d => ({
          ...d,
          registered: Math.random() < 0.5
        }));
        updateData(data);
      }
    };
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <div
          id="myGrid"
          style={{
            height: "100%",
            width: "100%"
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            frameworkComponents={this.state.frameworkComponents}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample />, document.querySelector("#root"));
