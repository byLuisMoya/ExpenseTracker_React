import './App.css';
import Tracker from './components/Tracker';

const rootStyle = {
  height: '100vh', // Esto hará que el div ocupe toda la altura visible
};

function App() {
  return (
    <div className="App bg-secondary" style={rootStyle}>
        <Tracker/>
    </div>
  );
}

export default App;
