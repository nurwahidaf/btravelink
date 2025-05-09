import Hero from "../components/Hero";
import About from "../components/About";
import Recommendations from "../components/Recommendations";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Recommendations showButton title="Temukan Paket Perjalanan Terbaik Untukmu" />
    </>
  );
}

export default Home;