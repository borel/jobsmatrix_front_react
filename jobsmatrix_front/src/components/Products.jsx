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
        value: "Google"
      }, {
        id: 3,
        value: "Allocab"
      }
    ]

    this.state.criterias = [
      {
        id: "1",
        value: 'Technos'
      }
      // , {
      //   id: "2",
      //   value: 'Lieux',
      // }, {
      //   id: "3",
      //   value: 'Ambiance',
      // }, {
      //   id: "4",
      //   value: 'Salaire',
      // }
    ];
  }


  handleDelCriteria(criteria) {
    console.log("handleDelCriteria")
    var index = this.state.criterias.indexOf(criteria);
    this.state.criterias.splice(index, 1);
    this.setState(this.state.criterias);
  };

  handleAddCriteria(evt) {
    console.log("handleAddCriteria")
    console.log(this.state.criterias);
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var criteria = {
      id: id,
      value: "New Criteria"
    }
    this.state.criterias.push(criteria);


    console.log(this.state.criterias);
    this.setState(this.state.criterias);
  }

  handleAddFirm(evt) {
    console.log("handleAddFirm")
    console.log(this.state.firms);
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var firm = {
      id: id,
      value: "New Firm"
    }
    this.state.firms.push(firm);

    console.log(this.state.firms);
    this.setState(this.state.firms);
  }

  handleCriteriaUpdate(evt) {
    console.log("handleCriteriaUpdate")
    console.log(this.state.criterias)
    var item = {
      id: evt.target.id,
      value: evt.target.value
    };

    let element = this.state.criterias.find(element => element.id === evt.target.id)
    if (element) {
      element.value = item.value
    }

    console.log(this.state.criterias)
    this.setState(this.state.criterias);
  }

  handleFirmsUpdate(evt) {
    console.log("handleFirmUpdate")
    console.log(this.state.firms)
    var item = {
      id: evt.target.id,
      value: evt.target.value
    };

    let element = this.state.firms.find(element => element.id === evt.target.id)
    if (element) {
      element.value = item.value
    }

    console.log(this.state.firms)
    this.setState(this.state.firms);
  }

  handleValuesUpdate(evt) {
    console.log("handleValuesUpdate")
    console.log(this.state.values)
    var item = {
      id: evt.target.id,
      value: evt.target.value
    };

    let element = this.state.values.find(element => element.id === evt.target.id)
    if (element) {
      element.value = item.value
    }

    console.log(this.state.values)
    this.setState(this.state.values);
  };
  render() {

    return (
      <div>
        <GenericTable onValuesUpdate={this.handleValuesUpdate.bind(this)} onFirmsUpdate={this.handleFirmsUpdate.bind(this)} onCriteriaUpdate={this.handleCriteriaUpdate.bind(this)} onFirmAdd={this.handleAddFirm.bind(this)} onCriteriaAdd={this.handleAddCriteria.bind(this)} onCriteriaDel={this.handleDelCriteria.bind(this)} criterias={this.state.criterias} firms={this.state.firms} filterText={this.state.filterText} values={this.state.values} />
      </div>
    );

  }

}



class GenericTable extends React.Component {
  render() {
    var onValuesUpdate = this.props.onValuesUpdate;
    var onCriteriaUpdate = this.props.onCriteriaUpdate;
    var onFirmsUpdate = this.props.onFirmsUpdate;
    var criteriaDel = this.props.onCriteriaDel;

    var firms = this.props.firms
    var values = this.props.values
    var rows = this.props.criterias.map(function (criteria) {
      return (<Row onValuesUpdate={onValuesUpdate} onCriteriaUpdate={onCriteriaUpdate} criteria={criteria} firms={firms} values={values} onDelEvent={criteriaDel.bind(this)} key={criteria.id} />)
    });

    var firm = this.props.firms.map(function (firm) {
      return (<FirmColumn onFirmsUpdate={onFirmsUpdate} firm={firm} key={firm.id} />)
    });


    return (
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Criterias/Firms</th>
              {firm}
              <th><button type="button" onClick={this.props.onFirmAdd} className="btn btn-success pull-right">+</button></th>
            </tr>
          </thead>

          <tbody>
            {rows}
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
      <th className="eachRow">
        <EditableCell onUpdate={this.props.onFirmsUpdate} cellData={{
          value: this.props.firm.value,
          id: this.props.firm.id
        }} />
      </th>
    );
  }
}

class Row extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.criteria);
  }
  render() {
    // Update action
    var onValuesUpdate = this.props.onValuesUpdate;
    var onCriteriaUpdate = this.props.onCriteriaUpdate;

    // List
    var values = this.props.values
    var criteria = this.props.criteria

    var criterias = this.props.firms.map(function (firm) {
      return (<ValueRow onValuesUpdate={onValuesUpdate} firm={firm} criteria={criteria} key={firm.id} values={values} />)
    });

    return (
      <tr className="eachRow">
        <EditableCell onUpdate={this.props.onCriteriaUpdate} cellData={{
          value: this.props.criteria.value,
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

class ValueRow extends React.Component {
  render() {
    var firm = this.props.firm
    var criteria = this.props.criteria
    var onValuesUpdate = this.props.onValuesUpdate;
    var values = this.props.values
    let idToFind = firm.id + "/" + criteria.id
    let value = { id: idToFind };

    if (!values.find(element => element.id === idToFind)) {
      values.push(value);
    }

    return (
      <EditableCell onUpdate={this.props.onValuesUpdate} cellData={value} />
    );
  }
}


class EditableCell extends React.Component {

  render() {
    return (
      <td>
        <input type='text' id={this.props.cellData.id} onChange={this.props.onUpdate} value={this.props.cellData.value} />
      </td>
    );

  }

}
export default Criterias;