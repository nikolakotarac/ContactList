import React from "react";
import ContactList from "./components/ContactList";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="bg-transparent flex flex-col mx-auto p-6 my-auto w-4/6 font-space">
      <Router>
        <Navbar />
        <ContactList />
      </Router>
    </div>
  );
}
export default App;
