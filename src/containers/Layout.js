
// components
import CallCenter from "../components/CallCenter";
import Footer from "../components/Footer";
import ModeToggle from "../components/ModeToggle";
import Navbar from "../components/Navbar";

const Layout = ({ children, topPadding }) => (
  <>
    <Navbar />
    <ModeToggle />
    <main className={`main ${topPadding ? "pt-medium" : ""}`}>{children}</main>
    <CallCenter />
    <Footer />
  </>
);

export default Layout;
