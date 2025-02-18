import './App.css';
import Form from "./components/Form";
import atchoumPhoto from './assets/atchoum.jpg'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Results from "./components/Results";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element:   <Form />,
        },
        {
            path: "/results",
            element:   <Results />,
        },
    ]);


  return (
    <div className="App">
      <h1>Bienvenue à Atchoum. Concours Géant !</h1>
      <img src={atchoumPhoto} alt="Profile Atchoum"/>
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
