import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

const PropertyInvestmentDashboard = () => {
  // Initial values based on example
  const [propertyValue, setPropertyValue] = useState(150000);
  const [rentalIncomePerMonth, setRentalIncomePerMonth] = useState(1200);
  const [ownershipPercentage, setOwnershipPercentage] = useState(10);
  const [appreciationRate, setAppreciationRate] = useState(3.4);
  const [years, setYears] = useState(10);
  const [chartData, setChartData] = useState([]);
  const [activeTab, setActiveTab] = useState('chart'); // 'chart' or 'table'

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
    <div className="p-6 max-w-5xl mx-auto bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800">
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white text-center">Property Investment Calculator</h1>
      
      {/* Input Controls */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="space-y-5">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Property Value (€)
            </label>
            <input
              type="number"
              min="10000"
              step="10000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Monthly Rental Income (€)
            </label>
            <input
              type="number"
              min="100"
              step="50"
              value={rentalIncomePerMonth}
              onChange={(e) => setRentalIncomePerMonth(Number(e.target.value))}
              className="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Your Ownership (%)
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={ownershipPercentage}
              onChange={(e) => setOwnershipPercentage(Number(e.target.value))}
              className="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>
        
        <div className="space-y-5">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Expected Property Appreciation (%/year)
            </label>
            <input
              type="number"
              min="0"
              max="20"
              step="0.1"
              value={appreciationRate}
              onChange={(e) => setAppreciationRate(Number(e.target.value))}
              className="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Projection Years
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>
      
      {/* Key Metrics Panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-xl shadow-md text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)]" style={{ backgroundSize: '10px 10px' }}></div>
          <span className="block text-sm font-medium text-blue-100 mb-1">Your Investment</span>
          <span className="text-2xl font-bold">€{formatNumber(yourInvestment)}</span>
        </div>
        
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-5 rounded-xl shadow-md text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)]" style={{ backgroundSize: '10px 10px' }}></div>
          <span className="block text-sm font-medium text-amber-100 mb-1">Monthly Rental</span>
          <span className="text-2xl font-bold">€{formatNumber(yourRentalIncomePerMonth, 2)}</span>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-5 rounded-xl shadow-md text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)]" style={{ backgroundSize: '10px 10px' }}></div>
          <span className="block text-sm font-medium text-emerald-100 mb-1">Annual ROI</span>
          <span className="text-2xl font-bold">{formatNumber(roi, 2)}%</span>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-5 rounded-xl shadow-md text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)]" style={{ backgroundSize: '10px 10px' }}></div>
          <span className="block text-sm font-medium text-purple-100 mb-1">10-Year Return</span>
          <span className="text-2xl font-bold">{formatNumber(chartData[years]?.totalReturnPercentage || 0, 2)}%</span>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex mb-6 border-b border-slate-200 dark:border-slate-700">
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'chart' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`}
          onClick={() => setActiveTab('chart')}
        >
          Chart View
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'table' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`}
          onClick={() => setActiveTab('table')}
        >
          Table View
        </button>
      </div>
      
      {/* Charts & Table Container */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Return Projections Over Time</h2>
        
        {activeTab === 'chart' ? (
          <div className="h-96 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
              >
                <defs>
                  <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorRental" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorReturn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="year" 
                  label={{ value: 'Year', position: 'insideBottomRight', offset: -5 }}
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis 
                  yAxisId="left"
                  label={{ value: 'Value (€)', angle: -90, position: 'insideLeft' }}
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  domain={[0, 'dataMax + 10']}
                  label={{ value: 'Return (%)', angle: 90, position: 'insideRight' }}
                  tick={{ fill: '#6b7280' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  formatter={(value, name) => {
                    if (name === 'Your Equity Value') {
                      return [`€${formatNumber(value, 2)}`, name];
                    }
                    if (name === 'Cumulative Rental Income') {
                      return [`€${formatNumber(value, 2)}`, name];
                    }
                    if (name === 'Total Return (€)') {
                      return [`€${formatNumber(value, 2)}`, name];
                    }
                    if (name === 'Total Return (%)') {
                      return [`${formatNumber(value, 2)}%`, name];
                    }
                    return [`€${formatNumber(value, 2)}`, name];
                  }}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="yourEquityValue" 
                  name="Your Equity Value"
                  stroke="#8884d8" 
                  fill="url(#colorEquity)" 
                  activeDot={{ r: 8 }} 
                />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="cumulativeRentalIncome" 
                  name="Cumulative Rental Income"
                  stroke="#82ca9d" 
                  fill="url(#colorRental)"
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="totalReturn" 
                  name="Total Return (€)"
                  stroke="#f59e0b" 
                  strokeWidth={3}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="totalReturnPercentage" 
                  name="Total Return (%)"
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ r: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Year</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700 dark:text-slate-200">Property Value</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700 dark:text-slate-200">Your Equity</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700 dark:text-slate-200">Cumulative Rental</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700 dark:text-slate-200">Total Return</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700 dark:text-slate-200">Return %</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                {chartData.map((data) => (
                  <tr key={data.year} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-200">{data.year}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-slate-600 dark:text-slate-300">€{formatNumber(data.propertyValue)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-slate-600 dark:text-slate-300">€{formatNumber(data.yourEquityValue)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-slate-600 dark:text-slate-300">€{formatNumber(data.cumulativeRentalIncome)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-blue-600 dark:text-blue-400">€{formatNumber(data.totalReturn)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-amber-600 dark:text-amber-400">{formatNumber(data.totalReturnPercentage, 2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyInvestmentDashboard; 