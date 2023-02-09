// create CSV of employee data for a given location
// data is passed in as an array of objects

const data = [
  {
    emp_id: 1,
    first_name: 'test1',
    last_name: 'test',
    hourly_wage: '20.00',
    hours_worked: '28',
  },
  {
    emp_id: 2,
    first_name: 'test2',
    last_name: 'test',
    hourly_wage: '10.00',
    hours_worked: '24',
  },
  {
    emp_id: 14,
    first_name: 'yousuf',
    last_name: 'elkhoga',
    hourly_wage: '20.00',
    hours_worked: '0',
  },
];

const makeCSV = (data, filename) => {
  const csv = [];
  const rows = [];
  // get row titles from the keys of the objects in the array
  for (let header in data[0]) rows.push(header);
  csv.push(rows.join(','));
  // for each object in the array, push its value to a new row in the csv
  for (let row of data) {
    const newRow = [];
    for (let col in row) {
      newRow.push(row[col]);
    }
    csv.push(newRow.join(','));
  }
  return csv.join('\n');
};

console.log(makeCSV(data));
