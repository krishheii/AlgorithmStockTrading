/* 
  MIT License

  Copyright (c) 2021 Krishnanunny H

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
 */

const fetch = require("node-fetch");
const express = require("express");
const { strategyGenerator } = require("./StrategyMachine");
const {emailNotification} = require("./EmailNotification");

const app = express();
const port = 3000;
const token = "YOUR TOKEN HERE";
const getStockData = async () => {
  fetch(
    `https://cloud.iexapis.com/stable/stock/market/batch?symbols=aapl,fb&types=chart&range=1m&last=30&token=${token}`
  )
    .then(async (res) => res.json())
    .then(async (stockData) => {
      const selectedStocks = await strategyGenerator(stockData);
      await emailNotification(selectedStocks);
    });
};
const dayInMillseconds = 86400 * 1000;
setInterval(getStockData, dayInMillseconds);

app.listen(port, () => {
  console.log(`Algorithm Trading App listening at http://localhost:${port}`);
});
