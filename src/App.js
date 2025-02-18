import './App.css';
import Form from "./components/Form";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Results from "./components/Results";
import Home from "./components/Home";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element:   <Home />,
        },
        {
            path: "/form",
            element:   <Form />,
        },
        {
            path: "/results",
            element:   <Results />,
        },
    ]);


  return (
    <div className="App">

        <RouterProvider router={router} />
    </div>
  );
}

export default App;
