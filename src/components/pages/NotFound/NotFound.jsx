import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";

function NotFound() {
  return (
    <>
      <Header />
      <div className="App">
        <header className="App-header">
          <p>Nie znaleziono strony</p>
        </header>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
