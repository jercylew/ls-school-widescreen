import './App.css';
import './style/common.css'

import Background from './view/Background'
import LoadingView from './view/LoadingView';
import HeadView from './view/HeadView'
import MainView from './view/MainView'
import FootView from './view/FootView'

function App() {

  return (
    <div>
      <LoadingView />
      <HeadView />
      <MainView />
      <FootView />
    </div>
  );
}

export default App;
