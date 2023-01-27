import React from "react";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import { Navbar } from "./components/Navbar";
function App() {
  return (
    <div className="bg-transparent flex flex-col mx-auto p-6 my-auto">
      <Navbar />
      <ContactList />
      <AddContact />
    </div>
  );
}
export default App;
