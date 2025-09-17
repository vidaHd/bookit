import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import './Layout.scss'

const MainLayout = () => {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
