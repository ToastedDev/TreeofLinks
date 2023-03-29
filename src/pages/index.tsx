import { type NextPage } from "next";
import { Navbar } from "~/components/navbar";

const Home: NextPage = () => {
  return (
    <>
      <main>
        <Navbar />
        <p>hello world</p>
      </main>
    </>
  );
};

export default Home;
