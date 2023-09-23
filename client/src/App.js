import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigationBar from "components/Navbar";
import CategorySummaryPage from "screens/CategorySummaryPage";
import DonationsRegistrations from "screens/DonationsRegistrations";
import DonationsDistributions from "screens/DonationsDistributions";
import DonatorSummaryPage from "screens/DonatorSummaryPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <NavigationBar />
        <Routes>
          {/* 4 main routes, 2 of them to log data, and 2 of them to display data history */}

          {/* Data Entry Pages */}
          <Route path="/" element={<DonationsRegistrations />} />
          <Route
            path="/donationDistribution"
            element={<DonationsDistributions />}
          />

          {/* Data View Pages */}
          <Route
            path="/categorySummaryPage"
            element={<CategorySummaryPage />}
          />
          <Route path="/donatorSummaryPage" element={<DonatorSummaryPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
