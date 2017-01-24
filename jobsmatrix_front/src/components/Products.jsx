import React from 'react'
class Criterias extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.state.filterText = "";

    this.state.values = [];

    this.state.firms = [
      {
        id: 1,
        name: "Google"
      }
      // }, {
      //   id: 3,
      //   name: "Allocab"
      // }
    ]

    this.state.criterias = [
      {
        id: 1,
        name: 'Technos'
      }
      // }, {
      //   id: 2,
      //   name: 'Lieux',
      // }, {
      //   id: 3,
      //   name: 'Ambiance',
      // }, {
      //   id: 4,
      //   name: 'Salaire',
      // }
    ];
  }

  handleUserInput(filterText) {
    this.setState({ filterText: filterText });
  };

  handleDelCriteria(criteria) {
    var index = this.state.criterias.indexOf(criteria);
    this.state.criterias.splice(index, 1);
    this.setState(this.state.criterias);
  };

  handleAddCriteria(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var criteria = {
      id: id,
      name: "Nrw Criteria",
    }
    this.state.criterias.push(criteria);
    this.setState(this.state.criterias);
  }


  handleAddFirm(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var firm = {
      id: id,
      name: "New Firm",
    }
    this.state.firms.push(firm);
    this.setState(this.state.firms);
  }

  handleCriteriaTable(evt) {
    var item = {
      id: evt.target.id,
      value: evt.target.value
    };

    var values = this.state.values;
    console.log(values);
    console.log(item);

    var newValues = values.map(function (value) {
      if (value.id == item.id) {
        value.value = item.value;
      }
      return value;
    });

    this.setState(newValues);
  };
  render() {

    return (
      <div>
        <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)} />
        <CriteriaTable onCriteriaTableUpdate={this.handleCriteriaTable.bind(this)} onFirmAdd={this.handleAddFirm.bind(this)} onCriteriaAdd={this.handleAddCriteria.bind(this)} onCriteriaDel={this.handleDelCriteria.bind(this)} criterias={this.state.criterias} firms={this.state.firms} filterText={this.state.filterText} values={this.state.values} />
      </div>
    );

  }

}

class SearchBar extends React.Component {
  handleChange() {
    this.props.onUserInput(this.refs.filterTextInput.value);
  }
  render() {
    return (
      <div>
        <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)} />
      </div>
    );
  }

}

class CriteriaTable extends React.Component {
  render() {
    var onCriteriaTableUpdate = this.props.onCriteriaTableUpdate;
    var criteriaDel = this.props.onCriteriaDel;
    var filterText = this.props.filterText;
    var firms = this.props.firms
    var values = this.props.values
    var criteriaTableRow = this.props.criterias.map(function (criteria) {
      if (criteria.name.indexOf(filterText) === -1) {
        return;
      }
      return (<CriteriaTableRow onCriteriaTableUpdate={onCriteriaTableUpdate} criteria={criteria} firms={firms} values={values} onDelEvent={criteriaDel.bind(this)} key={criteria.id} />)
    });

    var firm = this.props.firms.map(function (firm) {
      return (<FirmColumn onCriteriaTableUpdate={onCriteriaTableUpdate} firm={firm} key={firm.id} />)
    });


    return (
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Criterias</th>
              {firm}
              <th><button type="button" onClick={this.props.onFirmAdd} className="btn btn-success pull-right">+</button></th>
            </tr>
          </thead>

          <tbody>
            {criteriaTableRow}
            <button type="button" onClick={this.props.onCriteriaAdd} className="btn btn-success pull-right">+</button>
          </tbody>

        </table>
      </div>
    );
  }
}

class FirmColumn extends React.Component {
  render() {
    return (
      <th className="eachRow" > {this.props.firm.name}</th>
    );
  }
}

class CriteriaTableRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.criteria);
  }
  render() {
    var onCriteriaTableUpdate = this.props.onCriteriaTableUpdate;
    var values = this.props.values
    var criteria = this.props.criteria
    var criterias = this.props.firms.map(function (firm) {
      return (<CriteriaRow onCriteriaTableUpdate={onCriteriaTableUpdate} firm={firm} criteria={criteria} key={firm.id} values={values} />)
    });

    return (
      <tr className="eachRow">
        <EditableCell onCriteriaTableUpdate={this.props.onCriteriaTableUpdate} cellData={{
          "type": "name",
          value: this.props.criteria.name,
          id: this.props.criteria.id
        }} />
        {criterias}
        <td className="del-cell">
          <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn" />
        </td>
      </tr>
    );
  }
}

class CriteriaRow extends React.Component {
  render() {

    function findElement(element,idToFind) {
      return element.id === idToFind;
    }

    var firm = this.props.firm
    var criteria = this.props.criteria
  
    var values = this.props.values
    let value = { id: firm.id + "/" + criteria.id, value: '12' };
    if (!values.find(findElement)){
      values.push(value);
    }
    return (
      <EditableCell onCriteriaTableUpdate={this.props.onCriteriaTableUpdate} cellData={value} />
    );
  }
}


class EditableCell extends React.Component {
  render() {
    return (
      <td>
        <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onCriteriaTableUpdate} />
      </td>
    );

  }

}
export default Criterias;