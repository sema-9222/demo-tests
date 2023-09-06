import "./App.css";
import { Navigaton } from "./components/Nav/Navigation";
import { Routes, Route } from "react-router-dom";
import { Memory } from "./components/Tests/Memory/memory";
import { Stroop } from "./components/Tests/Mini-stroop/stroop";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigaton />} />
        <Route path="/memory" element={<Memory />} />
        <Route path="/stroop" element={<Stroop />} />
      </Routes>
    </div>
  );
}

export default App;
