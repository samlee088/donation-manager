import { BrowserRouter, Route, Routes } from "react-router-dom";
import DonationsSummary from "screens/DonationsSummary";
import DonationsTransactions from "screens/DonationsTransactions";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DonationsTransactions />} />
          <Route path="/donationSummary" element={<DonationsSummary />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
