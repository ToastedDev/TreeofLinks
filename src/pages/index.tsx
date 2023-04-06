import { type NextPage } from "next";
import Balancer from "react-wrap-balancer";
import { Navbar } from "~/components/navbar";

const Home: NextPage = () => {
  return (
    <>
      <main>
        <Navbar />
        <div className="flex flex-col items-center justify-center px-4 pt-4 text-center sm:px-0">
          <Balancer as="h1" className="pb-3 text-5xl font-bold">
            Helping people <span className="text-green-500">describe</span>{" "}
            themselves.
          </Balancer>
          <Balancer as="p">
            TreeofLinks can help you describe yourself through a custom page
            that you can link in your about me on Discord, Twitter, and many
            more.
          </Balancer>
        </div>
      </main>
    </>
  );
};

export default Home;
