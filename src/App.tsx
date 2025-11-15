import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Products from "./components/products";

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <Products />
      </main>
      <Footer />
    </div>
  );
}

export default App;
