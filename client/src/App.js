import { BrowserRouter, Route, Routes } from "react-router-dom";
import DonationsSummary from "screens/DonationsSummary";
import DonationsRegistrations from "screens/DonationsRegistrations";
import DonationsDistributions from "screens/DonationsDistributions";
import NavigationBar from "components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<DonationsRegistrations />} />
          <Route path="/donationSummary" element={<DonationsSummary />} />
          <Route
            path="/donationDistribution"
            element={<DonationsDistributions />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
