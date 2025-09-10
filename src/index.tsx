import ReactDOM from "react-dom/client";

const App = () => {
  return <h1>سلام! این سایت نوبت‌دهی با React + TS + Webpack است!</h1>;
};

const root = ReactDOM.createRoot(document.getElementById("app")!);
root.render(<App />);
