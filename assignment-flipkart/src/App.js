import logo from './logo.svg';
import './App.css';
import EmailListItem from './components/email-list-item/email-list-item-component';

function App() {
  return (
    <div>
     <h1>My Emails</h1>
      <EmailListItem
        sender="John Doe"
        fromEmail="john.doe@example.com"
        subject="Regarding the upcoming event"
        snippet="Looking forward to seeing you there!"
        timestamp="2 days ago"
      />
    </div>
  );
}

export default App;
