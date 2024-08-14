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
import { fetchTodaySales } from '../utils/api'; // For TodaySales.js
import { fetchSalesComparison } from '../utils/api';  // For SalesComparison.js
import DatePicker from 'react-datepicker';  // For SalesComparison.js
import 'react-datepicker/dist/react-datepicker.css';  // For SalesComparison.js

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SalesComparison() {
  const [salesData, setSalesData] = useState([]);
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchSalesComparison(date1, date2)
      .then(data => {
        setSalesData(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch comparison data');
        setLoading(false);
      });
  }, [date1, date2]);

  const productComparisonData = {
    labels: salesData.map(item => item.product),
    datasets: [
      {
        label: 'Date 1 Sales',
        data: salesData.map(item => item.date1Sales),
        backgroundColor: 'rgba(75, 192, 19, 1)',
      },
      {
        label: 'Date 2 Sales',
        data: salesData.map(item => item.date2Sales),
        backgroundColor: 'rgb(15, 10, 100, 1)',
      }
    ]
  };

  const categoryComparisonData = {
    labels: [...new Set(salesData.map(item => item.category))],
    datasets: [
      {
        label: 'Date 1 Total Sales',
        data: [...new Set(salesData.map(item => item.category))].map(category =>
          salesData.filter(item => item.category === category).reduce((sum, item) => sum + item.date1Sales, 0)
        ),
        backgroundColor: 'rgba(75, 192, 19, 1)',
      },
      {
        label: 'Date 2 Total Sales',
        data: [...new Set(salesData.map(item => item.category))].map(category =>
          salesData.filter(item => item.category === category).reduce((sum, item) => sum + item.date2Sales, 0)
        ),
        backgroundColor: 'rgb(15, 10, 100, 1)',
        // border:'5px solid black',
      }
    ]
  };

  const columns = [
    { headerName: 'Product', field: 'product', sortable: true, filter: true },
    { headerName: 'Category', field: 'category', sortable: true, filter: true },
    { headerName: 'Date 1 Sales', field: 'date1Sales', sortable: true },
    { headerName: 'Date 2 Sales', field: 'date2Sales', sortable: true },
    { 
      headerName: 'Difference', 
      field: 'difference',
      valueGetter: params => params.data.date2Sales - params.data.date1Sales,
      sortable: true 
    }
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 style={{textAlign: 'center',backgroundColor: 'red',width: "100%",}}> **  Sales Comparison  **</h1>
      <div className="dating">
       <DatePicker selected={date1} onChange={date => setDate1(date)} /> 
       <DatePicker selected={date2} onChange={date => setDate2(date)} />
      </div>
      <div style={{ height: '300px', width: '100%' ,border: '2px solid black'}}>
        <Bar data={productComparisonData} options={{ maintainAspectRatio: false }} />
      </div>
      <div style={{ height: '300px', width: '100%' ,margin:"2px",border: '2px solid black'}}>
        <Bar data={categoryComparisonData} options={{ maintainAspectRatio: false }} />
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

export default SalesComparison;