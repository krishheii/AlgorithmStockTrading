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

exports.strategyGenerator = async (stockInfo) => {
  const selectedStocks = [];
  for (let stock in stockInfo) {
    const stockDetails = stockInfo[stock];
    const chart = stockDetails.chart;
    const stockPriceArray = [];
    for (let item of chart) {
      stockPriceArray.push(item.close);
    }
    const lowestPrice = Math.min(...stockPriceArray);
    const todayChart = chart[0];
    const todayPrice = todayChart.close;
    console.log(stock," Today price :",todayPrice," lowest price :",lowestPrice);
    if (todayPrice === lowestPrice) {
      selectedStocks.push(stock);
    }
  }
  return selectedStocks;
};
