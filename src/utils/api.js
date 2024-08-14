const mockData = {
    todaySales: [
      { product: 'Product A', category: 'Category 1', quantitySold: 10, salesAmount: 1000 },
      { product: 'Product B', category: 'Category 2', quantitySold: 15, salesAmount: 1500 },
      // Add more mock data as needed
    ],
    salesByDate: (date1, date2) => [
      { product: 'Product A', category: 'Category 1', date1Sales: 1000, date2Sales: 1200 },
      { product: 'Product B', category: 'Category 2', date1Sales: 1500, date2Sales: 1700 },
      // Add more mock data as needed
    ]
  };
  
  export const fetchTodaySales = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData.todaySales), 500);
    });
  };
  
  export const fetchSalesComparison = (date1, date2) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData.salesByDate(date1, date2)), 500);
    });
  };