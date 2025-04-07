import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PropertyInvestmentDashboard = () => {
  // Initial values based on example
  const [propertyValue, setPropertyValue] = useState(150000);
  const [rentalIncomePerMonth, setRentalIncomePerMonth] = useState(1200);
  const [ownershipPercentage, setOwnershipPercentage] = useState(10);
  const [appreciationRate, setAppreciationRate] = useState(3.4);
  const [years, setYears] = useState(10);
  const [chartData, setChartData] = useState([]);

  // Calculate all values
  const yourInvestment = propertyValue * (ownershipPercentage / 100);
  const yourRentalIncomePerMonth = rentalIncomePerMonth * (ownershipPercentage / 100);
  const yourRentalIncomePerYear = yourRentalIncomePerMonth * 12;
  const roi = (yourRentalIncomePerYear / yourInvestment) * 100;

  // Generate chart data
  useEffect(() => {
    const data = [];
    let currentPropertyValue = propertyValue;
    let cumulativeRentalIncome = 0;

    for (let year = 0; year <= years; year++) {
      const yearPropertyValue = year === 0 ? propertyValue : currentPropertyValue;
      const yourEquityValue = yearPropertyValue * (ownershipPercentage / 100);
      const yearRentalIncome = year === 0 ? 0 : yourRentalIncomePerYear;
      
      cumulativeRentalIncome += yearRentalIncome;
      
      const totalReturn = yourEquityValue + cumulativeRentalIncome - yourInvestment;
      const totalReturnPercentage = (totalReturn / yourInvestment) * 100;

      data.push({
        year,
        propertyValue: yearPropertyValue,
        yourEquityValue,
        cumulativeRentalIncome,
        totalReturn,
        totalReturnPercentage
      });

      // Calculate next year's property value
      currentPropertyValue = currentPropertyValue * (1 + appreciationRate / 100);
    }
    
    setChartData(data);
  }, [propertyValue, rentalIncomePerMonth, ownershipPercentage, appreciationRate, years, yourRentalIncomePerYear, yourInvestment]);

  // Format numbers with thousand separators and decimal places
  const formatNumber = (num, decimals = 0) => {
    return num.toLocaleString('en-US', { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Property Investment Dashboard</h1>
      
      {/* Input Controls */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Value (€)
            </label>
            <input
              type="number"
              min="10000"
              step="10000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Rental Income (€)
            </label>
            <input
              type="number"
              min="100"
              step="50"
              value={rentalIncomePerMonth}
              onChange={(e) => setRentalIncomePerMonth(Number(e.target.value))}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Ownership (%)
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={ownershipPercentage}
              onChange={(e) => setOwnershipPercentage(Number(e.target.value))}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expected Property Appreciation (%/year)
            </label>
            <input
              type="number"
              min="0"
              max="20"
              step="0.1"
              value={appreciationRate}
              onChange={(e) => setAppreciationRate(Number(e.target.value))}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Projection Years
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      
      {/* Key Metrics Panel */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Key Metrics</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-500">Your Investment</span>
              <span className="text-xl font-bold">€{formatNumber(yourInvestment)}</span>
            </div>
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-500">Your Monthly Rental Income</span>
              <span className="text-xl font-bold">€{formatNumber(yourRentalIncomePerMonth, 2)}</span>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-500">Your Annual Rental Income</span>
              <span className="text-xl font-bold">€{formatNumber(yourRentalIncomePerYear, 2)}</span>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-500">Rental Return on Investment (ROI)</span>
              <span className="text-xl font-bold">{formatNumber(roi, 2)}% per year</span>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-500">Expected 10-Year Total Return</span>
              <span className="text-xl font-bold">
                €{formatNumber(chartData[years]?.totalReturn || 0, 2)} 
                ({formatNumber(chartData[years]?.totalReturnPercentage || 0, 2)}%)
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Return Projections Over Time</h2>
        
        <div className="h-64 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                label={{ value: 'Year', position: 'insideBottomRight', offset: -5 }} 
              />
              <YAxis 
                yAxisId="left"
                label={{ value: 'Value (€)', angle: -90, position: 'insideLeft' }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                domain={[0, 'dataMax + 10']}
                label={{ value: 'Return (%)', angle: 90, position: 'insideRight' }}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'totalReturnPercentage') {
                    return [`${formatNumber(value, 2)}%`, 'Total Return (%)'];
                  }
                  return [`€${formatNumber(value, 2)}`, name];
                }}
                labelFormatter={(label) => `Year ${label}`}
              />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="yourEquityValue" 
                name="Your Equity Value"
                stroke="#8884d8" 
                activeDot={{ r: 8 }} 
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="cumulativeRentalIncome" 
                name="Cumulative Rental Income"
                stroke="#82ca9d" 
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="totalReturn" 
                name="Total Return (€)"
                stroke="#ff7300" 
                strokeWidth={2}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="totalReturnPercentage" 
                name="Total Return (%)"
                stroke="#ff0000" 
                strokeDasharray="3 3"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Year</th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Property Value</th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Your Equity</th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Cumulative Rental</th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Total Return</th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Return %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {chartData.map((data) => (
                <tr key={data.year}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">{data.year}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-right">€{formatNumber(data.propertyValue)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-right">€{formatNumber(data.yourEquityValue)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-right">€{formatNumber(data.cumulativeRentalIncome)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-right">€{formatNumber(data.totalReturn)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-right">{formatNumber(data.totalReturnPercentage, 2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PropertyInvestmentDashboard; 