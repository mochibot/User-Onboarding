import React from 'react';
import UseForm from './components/UserForm';
import image from './images/login.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className='App-left'>
        <UseForm />
      </div>
      <div className='App-right'>
        <img src={image} alt='login page'/>
      </div>
    </div>
  );
}

export default App;
