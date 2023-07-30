import logo from './logo.svg';
import './App.css';
import EmailDetails from './components/email-detail-component/email-detail-component';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <EmailDetails senderInitial={"F"} subject={"Lorem Ipsum"} date={"26/10/20 10:30am"}/>
  );
}

export default App;
