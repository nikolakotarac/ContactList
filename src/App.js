import React from "react";
import ContactList from "./components/ContactList";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="container bg-transparent  mx-auto px-10 py-10 my-auto font-space">
      <Router>
        <Navbar />
        <ContactList />
      </Router>
    </div>
  );
}
export default App;
