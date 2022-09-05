import React from "react";

/**
Takes in:

init - function declaring initial option in parent component,

onChange - function changing state,

value - current selected option Id,

list - list of options [{name: name, id: id}]

Returns:

DropdownList of objects.
*/

export default class DropdownListSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: this.props.list || [{}]
    }
  }

  componentDidMount() {
    if (!this.props.value) {
      this.props.init(this.props.list[0].value)
    }
  }
  componentDidUpdate() {
    // console.log(this.props)
  }

  render() {
    var value = this.props.value || this.state.list[0].value
    // console.log(value)
      return (
        <>
          <select defaultValue={value} onChange={this.props.onChange}>
            {this.props.list.map((element) => {
              return <option key={element.name} value={element.value}>{element.name}</option>
            })}
          </select>
        </>
      );
    }
  }
