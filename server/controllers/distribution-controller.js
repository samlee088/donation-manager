import { Distribution, Inventory } from "../models/index.js";

export const addDistribution = async (req, res) => {
  const newDistributionCategory = req.body.distributionCategory;
  const newDistributionQuantity = req.body.distributionQuantity;

  try {
    const distribution = await Distribution.create({
      distributionCategory: newDistributionCategory,
      distributionQuantity: newDistributionQuantity,
      distributionDate: req.body.distributionDate,
    });

    let categoryInventory = await Inventory.findOne({
      inventoryCategory: newDistributionCategory,
    });

    categoryInventory.inventoryValue -= newDistributionQuantity;
    await categoryInventory.save();

    return res.status(200).json(distribution);
  } catch (error) {
    console.error(error);
    console.log("Error with adding distribution");
    res.status(500).json(error);
  }
};

export const getAllDistributionTransactions = async (req, res) => {
  try {
    const distributions = await Distribution.find();

    return res.status(200).json(distributions);
  } catch (error) {
    console.error(error);
    console.log("Error with getting all distribution transactions");
    res.status(500).json(error);
  }
};
