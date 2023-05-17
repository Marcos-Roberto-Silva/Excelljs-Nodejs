const express = require("express");
const ExcelJs = require("exceljs");
const {faker} = require('@faker-js/faker');

const workbook = new ExcelJs.Workbook();

const sheet = workbook.addWorksheet('sheet-1');

sheet.columns = [
   {header: 'imei', key: 'imei' },
   {header: 'company', key: 'company' }
];

for (let i = 0; i < 5000; i++) {
   sheet.addRow({
      imei: faker.phone.imei(),
      company: faker.company.name()
   });
}

sheet.getRow(1).font = {
   bold: true,
   color: {argb: 'FFCCCCCC'}
}

sheet.getRow(1).fill = {
   type: 'pattern',
   pattern: 'solid',
   bgColor: {argb: 'FF000000'}
}

sheet.workbook.xlsx.writeFile('test.xlsx').then(r => {})


const port = 2000;
const app = express();

app.get('/', (req, res) => {
   res.status(200).send('ok');
});

app.listen(port, () => console.log(`App listening on port ${port}`));

