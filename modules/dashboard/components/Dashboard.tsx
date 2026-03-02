import Breakline from "@/common/components/elements/Breakline";
import PicoCTF from "./PicoCTF";
import TryHackMe from "./TryHackMe";
import HackTheBox from "./HackTheBox";
import CTFHistory from "./CTFHistory";

const Dashboard = () => {
  return (
    <>
      <PicoCTF />
      <Breakline className="my-8" />
      <TryHackMe />
      <Breakline className="my-8" />
      <HackTheBox />
      <Breakline className="my-8" />
      <CTFHistory />
    </>
  );
};

export default Dashboard;
