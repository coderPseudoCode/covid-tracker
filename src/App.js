import React, { Fragment } from "react";
import Cover from "./components/cover";
import Navbar from "./components/navbar";
import Main from "./components/main";
import Footer from "./components/footer";

export default function App() {
  return (
    <Fragment>
      <header>
        <Navbar />
      </header>
      <main className="position-relative">
        <Cover />
        <div className="container">
          <Main />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
}
