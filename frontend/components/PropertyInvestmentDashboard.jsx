import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

const PropertyInvestmentDashboard = () => {
  // Predefined property options
  const propertyOptions = [
    {
      id: 'propertyA',
      name: 'Seaside Villa',
      location: 'Costa del Sol, Spain',
      value: 350000,
      rentalIncomePerMonth: 2800,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1074&auto=format&fit=crop',
      highlights: ['Beachfront', '4 bedrooms', '180m²']
    },
    {
      id: 'propertyB',
      name: 'City Apartment',
      location: 'Amsterdam, Netherlands',
      value: 220000,
      rentalIncomePerMonth: 1650,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1170&auto=format&fit=crop',
      highlights: ['Central location', '2 bedrooms', '75m²']
    },
    {
      id: 'propertyC',
      name: 'Mountain Chalet',
      location: 'Swiss Alps',
      value: 480000,
      rentalIncomePerMonth: 3500,
      image: 'https://images.unsplash.com/photo-1520984032042-162d526883e0?q=80&w=1170&auto=format&fit=crop',
      highlights: ['Ski-in/ski-out', '5 bedrooms', '210m²']
    }
  ];

  // Fixed values
  const FIXED_YEARS = 10;
  const FIXED_APPRECIATION_RATE = 3.4;

  // States
  const [selectedPropertyId, setSelectedPropertyId] = useState('propertyA');
  const [ownershipPercentage, setOwnershipPercentage] = useState(10);
  const [chartData, setChartData] = useState([]);
  const [activeTab, setActiveTab] = useState('chart');

  // Get the selected property
  const selectedProperty = propertyOptions.find(property => property.id === selectedPropertyId);

  // Calculate all values based on selected property
  const propertyValue = selectedProperty.value;
  const rentalIncomePerMonth = selectedProperty.rentalIncomePerMonth;
  const yourInvestment = propertyValue * (ownershipPercentage / 100);
  const yourRentalIncomePerMonth = rentalIncomePerMonth * (ownershipPercentage / 100);
  const yourRentalIncomePerYear = yourRentalIncomePerMonth * 12;
  const roi = (yourRentalIncomePerYear / yourInvestment) * 100;

  // Generate chart data
  useEffect(() => {
    const data = [];
    let currentPropertyValue = propertyValue;
    let cumulativeRentalIncome = 0;

    for (let year = 0; year <= FIXED_YEARS; year++) {
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
      currentPropertyValue = currentPropertyValue * (1 + FIXED_APPRECIATION_RATE / 100);
    }
    
    setChartData(data);
  }, [propertyValue, rentalIncomePerMonth, ownershipPercentage, yourRentalIncomePerYear, yourInvestment]);

  // Format numbers with thousand separators and decimal places
  const formatNumber = (num, decimals = 0) => {
    return num.toLocaleString('en-US', { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800">
      <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white text-center">Property Investment Calculator</h1>
      <p className="text-slate-600 dark:text-slate-400 text-center mb-8 max-w-3xl mx-auto">
        Select a property and choose your ownership percentage to see your potential returns over 10 years.
      </p>
      
      {/* Property Selection Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {propertyOptions.map((property) => (
          <div 
            key={property.id}
            onClick={() => setSelectedPropertyId(property.id)}
            className={`
              relative overflow-hidden group cursor-pointer transition-all duration-300 transform hover:-translate-y-1
              rounded-xl border-2 ${selectedPropertyId === property.id 
                ? 'border-blue-500 ring-2 ring-blue-500/50 shadow-lg' 
                : 'border-slate-200 dark:border-slate-700 shadow'
              }
            `}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/5 z-10"></div>
              <img 
                src={property.image} 
                alt={property.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-white text-xl font-bold">{property.name}</h3>
                <p className="text-white/90 text-sm">{property.location}</p>
              </div>
              
              {selectedPropertyId === property.id && (
                <div className="absolute top-3 right-3 bg-blue-500 text-white p-1 rounded-full z-20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-white dark:bg-slate-800">
              <div className="flex justify-between items-start mb-2">
                <div className="text-lg font-bold text-slate-900 dark:text-white">€{formatNumber(property.value)}</div>
                <div className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                  €{formatNumber(property.rentalIncomePerMonth)}/mo
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap mt-2">
                {property.highlights.map((highlight, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Ownership Percentage Slider */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 mb-10">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-base font-medium text-slate-700 dark:text-slate-300">
            Your Ownership (%)
          </label>
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{ownershipPercentage}%</span>
        </div>
        
        <input
          type="range"
          min="1"
          max="100"
          value={ownershipPercentage}
          onChange={(e) => setOwnershipPercentage(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        
        <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
          <span>1%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">Your Investment</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white">€{formatNumber(yourInvestment)}</span>
            </div>
            <div className="h-10 border-r border-blue-200 dark:border-blue-700/50 hidden md:block"></div>
            <div>
              <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">Monthly Rental Income</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white">€{formatNumber(yourRentalIncomePerMonth, 2)}</span>
            </div>
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
          <span className="block text-sm font-medium text-purple-100 mb-1">{FIXED_YEARS}-Year Return</span>
          <span className="text-2xl font-bold">{formatNumber(chartData[FIXED_YEARS]?.totalReturnPercentage || 0, 2)}%</span>
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
        <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">10-Year Return Projection</h2>
        
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