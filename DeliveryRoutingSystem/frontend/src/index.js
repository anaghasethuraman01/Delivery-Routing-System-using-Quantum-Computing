import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
//render App component on the root element
//ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
