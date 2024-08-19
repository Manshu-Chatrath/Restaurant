import { Box } from "@mui/material";
import Main from "../components/Main";
import OurStory from "../components/ourstory";
import About from "../components/about";
import Footer from "../components/footer";
import Animate from "../components/animates";
import { imageAnimation } from "../utils";
const Home = () => {
  return (
    <Box style={{ minHeight: "100vh", width: "100vw", overFlowX: "hidden" }}>
      <Main activeNav={"Home"} />
      <OurStory />
      <About />
      <Animate variants={imageAnimation}>
        <Footer />
      </Animate>
    </Box>
  );
};

export default Home;
