import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Main from './component/Main';
import AccountProvider from './context/AccountProvider';

function App() { 
  const clientId = '723443491910-0j9363haec5mcbtlfnjhrn7abn8j46a4.apps.googleusercontent.com';
  return (
    <div className="App">
      <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
      <Main/>
      </AccountProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
