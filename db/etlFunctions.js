const csv = require('csv-parse');
const fs = require('fs');
const db = require('./index');
const ReviewList = require('./reviews')

fs.createReadStream(__dirname + '/reviewsTest.csv')
  .pipe(csv({columns: true, relax_column_count: true}))
  .on('data', (row) => {
    if (Object.keys(row).length === 12) {
      ReviewList.create({
        review_id: row.id,
        product_id: row.product_id,
        rating: parseInt(row.rating),
        summary: row.summary,
        recommend: (row.recommend === true),
        response: row.response,
        body: row.body,
        date: row.date,
        reviewer_name: row.reviewer_name,
        helpfulness: parseInt(row.helpfulness),
        reported: row.reported === 'true',
        photos: [],
      })
  })
  .on('end', () => {
    console.log('Reviews CSV file successfully processed');
  });

