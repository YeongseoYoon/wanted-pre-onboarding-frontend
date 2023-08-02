import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      <Header />
      <Outlet />
    </Layout>
  );
}

export default App;
