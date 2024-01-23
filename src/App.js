import React, { Component } from 'react';

const liff = window.liff;
const liffid ='2001682725-4xEPQ6rl';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userLineID: '',
      name: '',      
      pictureUrl: '',
      statusMessage: '',
      language: '',
      message: '',
    };
  }

  componentDidMount = async () => {
    await liff.init({ liffId: `${liffid}` }).catch(err => { throw err });
    if (liff.isLoggedIn()) {
      let getProfile = await liff.getProfile();
      let getLanguage = await liff.getLanguage();
      console.log('getProfile=>',getProfile);
      this.setState({
        userLineID: getProfile.userId,
        name: getProfile.displayName,        
        pictureUrl: getProfile.pictureUrl,
        statusMessage: getProfile.statusMessage,
        language: getLanguage,
      });
    } else {
      liff.login();
    }
  }

  handleTextChange = (event) => {
    this.setState({ message: event.target.value });
  };

  
  
  handleSendClick = () => {
    const { userLineID, name, pictureUrl, statusMessage, language, message } = this.state;

    // Send the data to your backend API
    // You need to replace 'your-backend-api-endpoint' with the actual endpoint URL
    fetch('https://3d53-171-96-36-213.ngrok-free.app/api/v1/line/line-profile-from-liff', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userLineID,
        name,        
        pictureUrl,
        statusMessage,
        language,
        message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from your backend
        console.log('Backend response:', data);
      })
      .catch((error) => {
        console.error('Error sending data to backend:', error);
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="support">
            <p>Line ID: {this.state.userLineID}</p>
            <p>Name: {this.state.name}</p>
            <p>Status Message: {this.state.statusMessage}</p>
            <p>Language: {this.state.language}</p>
            <img alt='pic' src={this.state.pictureUrl} width="40%" height="40%"/>
            <center>
                <br/><br/>
                <input
                  type="text"
                  placeholder="Enter your basic id"
                  value={this.state.message}
                  onChange={this.handleTextChange}
                />
                <button onClick={this.handleSendClick}>Send</button>
            </center>
            
          </div>
        </header>
      </div>
    );
  }
}

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
