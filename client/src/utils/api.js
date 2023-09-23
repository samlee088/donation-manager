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

export const getCurrentInventory = () => {
  return fetch(`${BASE_URL}/api/donations/getAll`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getAllDonations = () => {
  return fetch(`${BASE_URL}/api/donations/getAllDonations`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getAllDonationTransactions = () => {
  return fetch(`${BASE_URL}/api/donations/getAllDonationTransactions`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getAllDistributionTransactions = () => {
  return fetch(`${BASE_URL}/api/distributions/getAllDistributionTransactions`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getAllDonatorsList = () => {
  return fetch(`${BASE_URL}/api/donations/getAllDonatorsList`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getAllDonatorsListByCategory = (categorySelection) => {
  return fetch(
    `${BASE_URL}/api/donations/getAllDonatorsListByCategory/${categorySelection}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categorySelection }),
    }
  );
};

export const getDonatorInformationCall = (donatorName) => {
  return fetch(
    `${BASE_URL}/api/donations/getDonatorInformation/${donatorName}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ donatorName }),
    }
  );
};

export const getAllDonationsByCategory = (categorySelection) => {
  return fetch(
    `${BASE_URL}/api/donations/getAllDonationsByCategory/${categorySelection}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categorySelection }),
    }
  );
};

export const getAllCategoriesList = () => {
  return fetch(`${BASE_URL}/api/donations/getAllCategoriesList`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
