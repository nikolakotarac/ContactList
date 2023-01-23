import React from "react";
import { Navbar } from "./components/Navbar";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";

function App() {
  return (
    <div className="bg-transparent flex flex-col mx-auto p-6 my-auto">
      <Navbar />
      <AddContact />
      <ContactList />
    </div>
  );
}
export default App;
