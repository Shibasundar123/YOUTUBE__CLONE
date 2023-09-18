
import { Provider } from 'react-redux';
import './App.css';
import Body from './components/Body';
import Header from './components/Header';


import MainContainer from './components/MainContainer';
import SideBar from './components/SideBar';
import store from './utils/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import WatchPage from './components/WatchPage';

import SearchVideoContainer from './components/SearchVideoContainer';
import ShortsContainer from './components/ShortsContainer';

function App() {
  const appRouter = createBrowserRouter([{ 
    path: '/',
    element: <Body/>,  
    children: [
      {
        path: '/',
        element :<MainContainer/>
      },
      {
        path: '/watch',
        element: <WatchPage/>
      },
      {
        path: '/results',
        element: <SearchVideoContainer/>
      },
      {
        path: '/shorts',
        element:<ShortsContainer/>
      }
    ]
  }])
  return (
    <Provider store={store}>
    <div className="App">
      
      
      <RouterProvider router={appRouter}/>
      </div> 
      </Provider>
       
   
  );
}

export default App;
