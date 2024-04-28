import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import './App.css'

function App() {
  return (
    <>
      <div className="App">
         <Nav />
        <h2>oi</h2>
          <Outlet />
      </div>
    </>
  )
}
export default App
