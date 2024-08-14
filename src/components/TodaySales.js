import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { fetchTodaySales } from '../utils/api';  // For TodaySales.js
// import { fetchSalesComparison } from '../utils/api';  // For SalesComparison.js
// import DatePicker from 'react-datepicker';  // For SalesComparison.js
 import 'react-datepicker/dist/react-datepicker.css';  // For SalesComparison.js

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
  
  function TodaySales() {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchTodaySales()
        .then(data => {
          setSalesData(data);
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to fetch sales data');
          setLoading(false);
        });
    }, []);
  
    const productChartData = {
      labels: salesData.map(item => item.product),
      datasets: [{
        label: 'Sales Amount',
        data: salesData.map(item => item.salesAmount),
        backgroundColor: 'rgb(750, 19, 193)',
      }]
    };
  
    const categoryChartData = {
      labels: [...new Set(salesData.map(item => item.category))],
      datasets: [{
        label: 'Total Sales by Category',
        data: [...new Set(salesData.map(item => item.category))].map(category =>
          salesData.filter(item => item.category === category).reduce((sum, item) => sum + item.salesAmount, 0)
        ),
        backgroundColor: '#FFF111',
      }]
    };
  
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'category',
        },
        y: {
          beginAtZero: true,
        },
      },
    };
  
    const columns = [
      { headerName: 'Product', field: 'product', sortable: true, filter: true },
      { headerName: 'Category', field: 'category', sortable: true, filter: true },
      { headerName: 'Quantity Sold', field: 'quantitySold', sortable: true },
      { headerName: 'Sales Amount', field: 'salesAmount', sortable: true }
    ];
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
  
    return (
      <div>
        <h1 style={{textAlign: 'center', }}>**** Today's Sales ****</h1>
        <div style={{ height: '300px', width: '100%',marginTop:"5px" ,border: '2px solid black'}}>
          <Bar data={productChartData} options={chartOptions} />
        </div>
        <div style={{ height: '300px', width: '100%' ,margin:"2px",border: '2px solid black' }}>
          <Bar data={categoryChartData} options={chartOptions} />
        </div>
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
          <AgGridReact
            columnDefs={columns}
            rowData={salesData}
            pagination={true}
            paginationPageSize={10}
          />
        </div>
      </div>
    );
  }
  
  export default TodaySales;