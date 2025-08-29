import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import AboutPage from "@/pages/about";
import PrivacyPage from "./pages/rules/privacy";
import TermsPage from "./pages/rules/termsPage";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<PrivacyPage />} path="/privacy" />
      <Route element={<TermsPage />} path="/terms" />
    </Routes>
  );
}

export default App;
