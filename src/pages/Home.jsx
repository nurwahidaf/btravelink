import Hero from "../components/Hero";
import Recommendations from "../components/Recommendations";
import About from "../components/About";

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