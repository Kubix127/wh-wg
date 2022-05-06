import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      test: 'Fail',
    }

    this.testAxios = this.testAxios.bind(this)
  }

  componentDidMount(){
  }

  testAxios() {
    return axios
    .get("/api/users")
    .then(response =>{
      this.setState({test: response.data})
    })
    .catch(err => {
      console.log(err);
    })
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Szare szczury razić prądem. ({this.state.test})
          </p>
          <button onClick={this.testAxios}>Test</button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
