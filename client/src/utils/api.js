const BASE_URL = process.env.REACT_APP_BASE_URL;

// Function for adding a donation without authentication
export const addDonation = (donationEntry) => {
  return fetch(`${BASE_URL}/api/donations/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(donationEntry),
  });
};

export const addDistribution = (distributionEntry) => {
  return fetch(`${BASE_URL}/api/distributions/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(distributionEntry),
  });
};
