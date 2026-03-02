import dynamic from "next/dynamic";

import Breakline from "@/common/components/elements/Breakline";
import Introduction from "./Introduction";
import SkillList from "./SkillList";
// import BentoGrid from "./Bento/BentoGrid";

const NetworkMonitor = dynamic(() => import("./NetworkMonitor"), {
  ssr: false,
});

const Home = () => {
  return (
    <>
      <Introduction />
      <Breakline className="my-8" />
      <SkillList />
      <Breakline className="my-8" />
      <NetworkMonitor />
      {/* <Breakline className="my-8" /> */}
      {/* <BentoGrid /> */}
    </>
  );
};

export default Home;
