const csv = require('csv-parse');
const fs = require('fs');
const db = require('./index');
const ReviewList = require('./reviews')
// const ProductsMeta = require('./meta.js');
// const Characteristics = require('./characteristics.js');
// read reviews, and create a new record for each of them
// for each review, query to findOrCreate a new product record based on product id
// increment the correct rating prop in product record
// increment the correct recommended prop in product record
// fs.createReadStream(__dirname + '/reviewsTest.csv')
//   .pipe(csv({columns: true, relax_column_count: true}))
//   .on('data', (row) => {
//     if (Object.keys(row).length === 12) {
      // console.log({
      //   review_id: row.id,
      //   product_id: row.product_id,
      //   rating: parseInt(row.rating),
      //   summary: row.summary,
      //   recommend: (row.recommend === true),
      //   response: row.response,
      //   body: row.body,
      //   date: row.date,
      //   reviewer_name: row.reviewer_name,
      //   helpfulness: parseInt(row.helpfulness),
      //   reported: row.reported === 'true',
      //   photos: [],
      // });
      // ReviewList.create({
      //   review_id: row.id,
      //   product_id: row.product_id,
      //   rating: parseInt(row.rating),
      //   summary: row.summary,
      //   recommend: (row.recommend === true),
      //   response: row.response,
      //   body: row.body,
      //   date: row.date,
      //   reviewer_name: row.reviewer_name,
      //   helpfulness: parseInt(row.helpfulness),
      //   reported: row.reported === 'true',
      //   photos: [],
      // })
      // var newRating = 'rating_' + row.rating;
      // var recommended = 'recommend_' + row.recommend;
      // console.log({
      //   product_id: row.product_id,
      //   [newRating]: 1,
      //   [recommended]: 1
      // })
  // })
  // .on('end', () => {
  //   console.log('Reviews CSV file successfully processed');
  // });
  // read reviews photos, and find each reviewId
  // push {id, url} into photos prop of review
  // fs.createReadStream(__dirname + '/reviews_photos.csv')
  // .pipe(csv({columns: true, relax_column_count: true}))
  // .on('data', (row) => {
  //   if (Object.keys(row).length === 3) {
        // console.log({
        //   review_id: row.review_id,
        //   id: row.id,
        //   url: row.url
        // });
  //       var query = {review_id: row.review_id};
  //       var update = {$push: {photos: {id: row.id, url: row.url}}}
  //       ReviewList.findOneAndUpdate(query, update, {new: true, upsert: true}, (err, doc) => {
  //         if (err) {
  //           console.log(err);
  //           return;
  //         }
  //         console.log('doc: ', doc);
  //       })
  //     }

  //   })
  // .on('end', () => {
  //   console.log('Reviews Photos CSV file successfully processed');
  // });

 // read every line of characteristics,
//  push a new record into characteristics with {char_id:id, product_id, name}
  //  fs.createReadStream(__dirname + '/characteristics.csv')
  // .pipe(csv({columns: true, relax_column_count: true}))
  // .on('data', (row) => {
  //   if (Object.keys(row).length === 3) {
  //     console.log({
  //       char_id: row.id,
  //       product_id: row.product_id,
  //       name: row.name
  //     });
  //     Characteristics.create({
  //       char_id: row.id,
  //       product_id: row.product_id,
  //       name: row.name
  //     })
  //
  //   }
  // })
  // .on('end', () => {
  //   console.log('Characteristics CSV file successfully processed');
  // });
 // read characteristicReviews and for each, find a record where char_id === characteristic_id
 //  push into that record's reviews prop {review_id, val}
  //  fs.createReadStream(__dirname + '/characteristic_reviews.csv')
  // .pipe(csv({columns: true, relax_column_count: true}))
  // .on('data', (row) => {
  //   if (Object.keys(row).length === 4) {
  //     console.log({
  //       char_id: row.characteristic_id,
  //       review_id: row.review_id,
  //       val: row.value
  //     });
      //   Characteristics.findOneAndUpdate(
      //     {char_id: String: row.characteristic_id}
      //     {$push: {reviews: {review_id: row.review_id, val: row.value}}})
  //   }
  // })
  // .on('end', () => {
  //   console.log('Characteristics Reviews CSV file successfully processed');
  // });



  // db.Reviews_Photos.aggregate([
    // {$group: {
    // _id: { review_id: "$review_id"},
    // photos: {$push: {id:"$id", url: "$url"}}
    // }},
    // {
    //   $out: "aggregated_photos"
    // }
  // ], { allowDiskUse: true })

  // db.Characteristics_Reviews.aggregate([{$group: {
  //   _id: { characteristic_id: "$characteristic_id"},
  //   reviews: {$push: {id:"$id", review_id: "$review_id", value: "$value"}}
  // }},{$out: "aggregated_char_reviews"}], {allowDiskUse: true})
  // db.Characteristics.aggregate([{$group:
  //   {
  //     _id: { product_id: "$product_id"},
  //     characteristics: {$push: {name:"$name", id: "$id"}}
  //   }},
  //   {
  //     $out: "aggregated_chars"
  //   }
  // ], {allowDiskUse: true})
  // db.reviewlists.aggregate([
  //   {$lookup: {
  //     from: 'aggregated_photos',
  //     localField: 'review_id',
  //     foreignField: '_id.review_id',
  //     as: 'review_photos'
  //   }},
  //   {
  //     $out: 'official_reviews_list'
  //   }
  // ], {allowDiskUse: true})