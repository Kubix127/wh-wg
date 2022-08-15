import React from "react";

export default class DropdownListSelect extends React.Component {
  constructor(props) {
    super(props)
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
    var value = this.props.value || this.props.list[0].value
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
