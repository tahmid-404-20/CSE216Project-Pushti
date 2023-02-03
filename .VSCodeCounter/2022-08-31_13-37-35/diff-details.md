# Diff Details

Date : 2022-08-31 13:37:35

Directory d:\\Documents\\2-2\\CSE216\\Pushti

Total : 64 files,  6189 codes, 197 comments, 276 blanks, all 6662 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [controller/adminController/addLoan.js](/controller/adminController/addLoan.js) | JavaScript | 59 | 1 | 5 | 65 |
| [controller/adminController/addProduct.js](/controller/adminController/addProduct.js) | JavaScript | 49 | 0 | 7 | 56 |
| [controller/adminController/getAgentFeedback.js](/controller/adminController/getAgentFeedback.js) | JavaScript | 42 | 0 | 1 | 43 |
| [controller/adminController/getFarmerFeedback.js](/controller/adminController/getFarmerFeedback.js) | JavaScript | 42 | 0 | 1 | 43 |
| [controller/adminController/getFarmerInfo.js](/controller/adminController/getFarmerInfo.js) | JavaScript | 136 | 0 | 9 | 145 |
| [controller/adminController/getReports.js](/controller/adminController/getReports.js) | JavaScript | 5 | 0 | 0 | 5 |
| [controller/adminController/getReportsPost.js](/controller/adminController/getReportsPost.js) | JavaScript | 8 | 0 | 0 | 8 |
| [controller/adminController/upReport.js](/controller/adminController/upReport.js) | JavaScript | 46 | 1 | 7 | 54 |
| [controller/adminController/upReportPage.js](/controller/adminController/upReportPage.js) | JavaScript | 11 | 0 | 4 | 15 |
| [controller/adminController/updateAgent.js](/controller/adminController/updateAgent.js) | JavaScript | 99 | 0 | 5 | 104 |
| [controller/adminController/updateBudget.js](/controller/adminController/updateBudget.js) | JavaScript | 89 | 2 | 7 | 98 |
| [controller/adminController/updatePrice.js](/controller/adminController/updatePrice.js) | JavaScript | 126 | 3 | 8 | 137 |
| [controller/adminController/updateTax.js](/controller/adminController/updateTax.js) | JavaScript | 99 | 0 | 6 | 105 |
| [controller/agentTransaction/agentSellController.js](/controller/agentTransaction/agentSellController.js) | JavaScript | 2 | 0 | 0 | 2 |
| [controller/agentTransaction/agentUpdatePhoto.js](/controller/agentTransaction/agentUpdatePhoto.js) | JavaScript | 90 | 3 | 8 | 101 |
| [controller/agentTransaction/getBuyerInteractiveSell.js](/controller/agentTransaction/getBuyerInteractiveSell.js) | JavaScript | 47 | 0 | 7 | 54 |
| [controller/agentTransaction/getFarmerTypeProducts.js](/controller/agentTransaction/getFarmerTypeProducts.js) | JavaScript | 6 | 0 | 0 | 6 |
| [controller/buyerInserter.js](/controller/buyerInserter.js) | JavaScript | 1 | 58 | 6 | 65 |
| [controller/buyerRegisterController.js](/controller/buyerRegisterController.js) | JavaScript | 3 | 1 | 2 | 6 |
| [controller/farmer/farmerUpdateInfo.js](/controller/farmer/farmerUpdateInfo.js) | JavaScript | 78 | 60 | 16 | 154 |
| [controller/farmer/farmerUpdatePhoto.js](/controller/farmer/farmerUpdatePhoto.js) | JavaScript | 86 | 3 | 8 | 97 |
| [controller/gatherAgentInfo.js](/controller/gatherAgentInfo.js) | JavaScript | 1 | 0 | 0 | 1 |
| [controller/gatherFarmerInfo.js](/controller/gatherFarmerInfo.js) | JavaScript | 1 | 0 | 0 | 1 |
| [controller/registerController.js](/controller/registerController.js) | JavaScript | 3 | 1 | 1 | 5 |
| [controller/registerIsPendingRequest.js](/controller/registerIsPendingRequest.js) | JavaScript | 61 | 0 | 9 | 70 |
| [controller/requestInserter.js](/controller/requestInserter.js) | JavaScript | 2 | 72 | 8 | 82 |
| [index.js](/index.js) | JavaScript | 12 | 0 | 1 | 13 |
| [middlewares/buyerRegisterInputValidator.js](/middlewares/buyerRegisterInputValidator.js) | JavaScript | 39 | 15 | 6 | 60 |
| [middlewares/farmerChangePasswordValidator.js](/middlewares/farmerChangePasswordValidator.js) | JavaScript | 27 | 1 | 4 | 32 |
| [middlewares/isBuyerValid.js](/middlewares/isBuyerValid.js) | JavaScript | 4 | 0 | 0 | 4 |
| [middlewares/registerInputValidator.js](/middlewares/registerInputValidator.js) | JavaScript | 46 | 15 | 6 | 67 |
| [package-lock.json](/package-lock.json) | JSON | 612 | 0 | 0 | 612 |
| [package.json](/package.json) | JSON | 4 | 0 | 0 | 4 |
| [routes/adminRoute.js](/routes/adminRoute.js) | JavaScript | 16 | 0 | 0 | 16 |
| [routes/agentRoute.js](/routes/agentRoute.js) | JavaScript | 2 | 0 | 0 | 2 |
| [routes/farmerRoute.js](/routes/farmerRoute.js) | JavaScript | 4 | 0 | 0 | 4 |
| [views/adminAddLoan.ejs](/views/adminAddLoan.ejs) | HTML | 256 | 1 | 6 | 263 |
| [views/adminAddProduct.ejs](/views/adminAddProduct.ejs) | HTML | 239 | 1 | 6 | 246 |
| [views/adminCombinedReports.ejs](/views/adminCombinedReports.ejs) | HTML | 377 | 0 | 14 | 391 |
| [views/adminDashboard.ejs](/views/adminDashboard.ejs) | HTML | 41 | 0 | 0 | 41 |
| [views/adminFarmerInfo.ejs](/views/adminFarmerInfo.ejs) | HTML | 423 | 1 | 18 | 442 |
| [views/adminUpReport.ejs](/views/adminUpReport.ejs) | HTML | 335 | 1 | 13 | 349 |
| [views/adminUpdateAgent.ejs](/views/adminUpdateAgent.ejs) | HTML | 450 | 1 | 16 | 467 |
| [views/adminUpdateBudget.ejs](/views/adminUpdateBudget.ejs) | HTML | 383 | 1 | 14 | 398 |
| [views/adminUpdatePrice.ejs](/views/adminUpdatePrice.ejs) | HTML | 279 | 1 | 6 | 286 |
| [views/adminUpdateTax.ejs](/views/adminUpdateTax.ejs) | HTML | 299 | 1 | 8 | 308 |
| [views/agentBuyPage.ejs](/views/agentBuyPage.ejs) | HTML | 88 | 0 | 3 | 91 |
| [views/agentDashboard.ejs](/views/agentDashboard.ejs) | HTML | 140 | 0 | 3 | 143 |
| [views/agentSellPage.ejs](/views/agentSellPage.ejs) | HTML | 78 | 0 | 3 | 81 |
| [views/farmerDashboard.ejs](/views/farmerDashboard.ejs) | HTML | 75 | 0 | 5 | 80 |
| [views/farmerUpdateInfo.ejs](/views/farmerUpdateInfo.ejs) | HTML | 208 | 1 | 6 | 215 |
| [views/inventoryStatus.ejs](/views/inventoryStatus.ejs) | HTML | 1 | 0 | 0 | 1 |
| [views/layout.ejs](/views/layout.ejs) | HTML | 1 | 0 | 0 | 1 |
| [views/register.ejs](/views/register.ejs) | HTML | 129 | -50 | 3 | 82 |
| [views/registerBuyer.ejs](/views/registerBuyer.ejs) | HTML | 53 | 0 | 0 | 53 |
| [views/request.ejs](/views/request.ejs) | HTML | 1 | 0 | 0 | 1 |
| [views/sendFeedbackAgent.ejs](/views/sendFeedbackAgent.ejs) | HTML | 1 | 0 | 0 | 1 |
| [views/sendFeedbackFarmer.ejs](/views/sendFeedbackFarmer.ejs) | HTML | -24 | 0 | 0 | -24 |
| [views/showAgentFeedback.ejs](/views/showAgentFeedback.ejs) | HTML | 209 | 1 | 5 | 215 |
| [views/showBuyHistory.ejs](/views/showBuyHistory.ejs) | HTML | 1 | 0 | 0 | 1 |
| [views/showFarmerFeedback.ejs](/views/showFarmerFeedback.ejs) | HTML | 210 | 1 | 5 | 216 |
| [views/showFarmerTransactions.ejs](/views/showFarmerTransactions.ejs) | HTML | -24 | 0 | 0 | -24 |
| [views/showSellHistory.ejs](/views/showSellHistory.ejs) | HTML | 1 | 0 | 0 | 1 |
| [views/temp.ejs](/views/temp.ejs) | HTML | 1 | 0 | 0 | 1 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details