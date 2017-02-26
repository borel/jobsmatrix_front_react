import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

class Criterias extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.state.filterText = "";

    this.state.rating = 1;

    this.state.values = [];

    this.state.results = [
      {
        firmId: "1",
        value: 0
      },
      {
        firmId: "2",
        value: 0
      },
      {
        firmId: "3",
        value: 0
      }
    ]

    this.state.firms = [
      {
        id: "1",
        value: "Google"
      }, {
        id: "2",
        value: "Mycs"
      }
      , {
        id: "3",
        value: "Allocab"
      }
    ]

    this.state.criterias = [
      {
        id: "1",
        value: 'Technos'
      }
      , {
        id: "2",
        value: 'Lieux',
      }, {
        id: "3",
        value: 'Ambiance',
      }, {
        id: "4",
        value: 'Salaire',
      }
    ];
  }


  handleDelCriteria(criteria) {
    console.log("handleDelCriteria")
    var index = this.state.criterias.indexOf(criteria);
    this.state.criterias.splice(index, 1);
    this.setState(this.state.criterias);

    // Update values tab , delete the values of the deleteed criteria
    this.state.values = this.state.values.filter(element => element.criteriaId !== criteria.id)
    this.setState(this.state.values);

    this.state.firms.map(element => {
      this.handleResultUpdate(element.id);

    })

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

    // Add result value 
    let result = {
      firmId: id,
      value: 0
    }
    this.state.results.push(result);

    console.log(this.state.criterias);
    this.setState(this.state.criterias);
    this.setState(this.state.results);
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

  handleResultUpdate(firmId) {
    //  find values for firm and take only the value
    let valuesForFirm = this.state.values.filter(element => element.firmId === firmId)
    let values = valuesForFirm.map(element => {
      if (element.value) {
        return parseInt(element.value);
      } else {
        return 0;
      }
    })
    let totValuesForFirm = values.reduce((a, b) => a + b, 0);
    let avgValue = totValuesForFirm / values.length

    let resultToFind = this.state.results.find(element => element.firmId === firmId)
    if (resultToFind) {
      resultToFind.value = avgValue
    }

    this.setState(this.state.results);
  }


  handleValuesUpdate(item) {
    console.log("handleValuesUpdate")

    let element = this.state.values.find(element => element.id === item.id)
    if (element) {
      element.value = item.value
    }

    // Update the Result , get all the result from this firm 
    let firmId = item.id.split("/")[0]

    this.handleResultUpdate(firmId);
    this.setState(this.state.values);
  };
  render() {

    return (
      <div>
        <GenericTable onValuesUpdate={this.handleValuesUpdate.bind(this)} onFirmsUpdate={this.handleFirmsUpdate.bind(this)} onCriteriaUpdate={this.handleCriteriaUpdate.bind(this)} onFirmAdd={this.handleAddFirm.bind(this)} onCriteriaAdd={this.handleAddCriteria.bind(this)} onCriteriaDel={this.handleDelCriteria.bind(this)} criterias={this.state.criterias} firms={this.state.firms} results={this.state.results} filterText={this.state.filterText} values={this.state.values} />
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
    var results = this.props.results

    var rows = this.props.criterias.map(function (criteria) {
      return (<Row onValuesUpdate={onValuesUpdate} onCriteriaUpdate={onCriteriaUpdate} criteria={criteria} firms={firms} values={values} onDelEvent={criteriaDel.bind(this)} key={criteria.id} />)
    });

    var firm = this.props.firms.map(function (firm) {
      return (<FirmColumn onFirmsUpdate={onFirmsUpdate} firm={firm} key={firm.id} />)
    });

    results = this.props.firms.map(function (firm, values) {
      return (<ResultRow firm={firm} key={firm.id} results={results} />)
    });

    return (
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th> <button type="button" onClick={this.props.onCriteriaAdd} className="btn btn-success pull-right">+</button>Criterias/Firms <button type="button" onClick={this.props.onFirmAdd} className="btn btn-success pull-right">+</button></th>
              {firm}
              <th></th>
            </tr>
          </thead>

          <tbody>
            {rows}
            <th>
              Average results =>
            </th>
            {results}

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

class ResultRow extends React.Component {

  render() {
    var firm = this.props.firm
    var results = this.props.results
    console.log(results);
    let resultFirm = results.find(element => element.firmId === firm.id)
    if (!resultFirm) {
      let init = {};
      init.value = 0;
      resultFirm = init;
    }
    return (

      <td className="eachRow">
        <StarRatingComponent
          name="firm"
          starCount={5}
          value={resultFirm.value}
          starColor='#FF0000'
          editing={false}
          />
      </td>
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
        }}
          />
        {criterias}
        <td className="del-cell">
          <button type="button" class="btn btn-danger" onClick={this.onDelEvent.bind(this)}>
            <i className="fa fa-trash-o fa-lg"  aria-hidden="true"> </i>
          </button>

        </td>
      </tr>
    );
  }
}

class ValueRow extends React.Component {
  onStarClick(nextValue, prevValue, name) {
    // Update the value
    var item = {
      id: name,
      value: nextValue
    };
    this.props.onValuesUpdate(item)

  }

  render() {
    var firm = this.props.firm
    var criteria = this.props.criteria
    var values = this.props.values
    let idToFind = firm.id + "/" + criteria.id
    let value = { id: idToFind, firmId: firm.id, criteriaId: criteria.id };

    if (!values.find(element => element.id === idToFind)) {
      values.push(value);
    }

    return (
      <td>
        <StarRatingComponent
          name={value.id}
          starCount={5}
          value={value.value}
          onStarClick={this.onStarClick.bind(this)}
          />
      </td>

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