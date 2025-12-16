import { PensionData } from "./pension-data";

export interface PensionRequestData {
  data: {
    collectedData: PensionData;
    calculatedData: {
      definedContributionTotal: number;
      totalIncome: number;
    };
  };
}