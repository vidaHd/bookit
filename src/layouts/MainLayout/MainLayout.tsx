import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import "./MainLayout.scss";
import Header from "../Header/Header";

const MainLayout = () => {
  return (
    <div className={`app-layout`}>
      <Header />
      <main className="app-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
