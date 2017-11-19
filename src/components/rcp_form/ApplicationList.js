import React, { PropTypes } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

const getCaret = direction => {
  if (direction === "asc") {
    return (
      <span>
        {" "}
        <i className="fa fa-sort-asc" aria-hidden="true" />
      </span>
    );
  }

  if (direction === "desc") {
    return (
      <span>
        {" "}
        <i className="fa fa-sort-desc" aria-hidden="true" />
      </span>
    );
  }

  return (
    <span>
      {" "}
      <i className="fa fa-sort" aria-hidden="true" />
    </span>
  );
};

const titleFormatter = (cell, row) => {
  return `<a href=${row.watchHref} target="_blank">${cell}</a>`;
};

class ApplicationList extends React.Component {
  constructor(props) {
    super(props);

    this.options = {
      sortIndicator: true,
      noDataText: "No data"
    };

    this.selectRowProp = {
      mode: "radio",
      bgColor: "#c1f291",
      onSelect: props.handleRowSelect,
      clickToSelect: true,
      hideSelectColumn: true
    };
  }

  render() {
    return (
      <BootstrapTable
        data={this.props.applications}
        selectRow={this.selectRowProp}
        options={this.options}
        bordered={false}
        striped
        hover
        condensed
      >
        <TableHeaderColumn dataField="id" isKey hidden>
          Id
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="name"
          // dataFormat={titleFormatter}
          dataSort={true}
          caretRender={getCaret}
          filter={{ type: "TextFilter", delay: 0 }}
          columnTitle
        >
          Name
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="position"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Position
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="mobile_number"
          dataSort={true}
          caretRender={getCaret}
        //   filter={{ type: "TextFilter", delay: 0 }}
          columnTitle
        >
          Mobile number
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="email"
          dataSort={true}
          caretRender={getCaret}
        //   filter={{ type: "TextFilter", delay: 0 }}
          columnTitle
        >
          Email
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

ApplicationList.propTypes = {
  applications: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired
};

export default ApplicationList;
