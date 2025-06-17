import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import NewsList from "@components/NewsList";
import Sidebar from "@components/Sidebar";
import React, { useCallback, useEffect, useState } from "react";

function App() {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", open);
  }, [open]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar onHamburgerClick={toggle} />
      <Sidebar open={open} onClose={toggle} />
      <main className="flex-1 overflow-y-auto">
        <NewsList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
