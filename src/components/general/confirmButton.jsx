import React from "react";


export default class ConfirmButton extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        clicked: false,
      }
      this.handleClick=this.handleClick.bind(this);
    }

    componentDidUpdate() {
      console.log(this.state)
      console.log(this.props.children)
    }

    handleClick() {
      this.setState(prevState => ({
          clicked: !prevState.clicked
        }));
    }

    render() {
        return (
          <>
          {this.state.clicked ?
            <div>
              <button onClick={this.props.onClickFunction}>Potwierdź</button>
              <button onClick={this.handleClick}>Anuluj</button>
            </div>
            :
            <div onClick={this.handleClick}>
              {this.props.children}
            </div>
          }
          </>
        );
      }
    }