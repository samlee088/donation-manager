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
