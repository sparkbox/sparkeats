const TABLE_NAME_PLACE = 'place';
const TABLE_NAME_PLACE_IMAGE = 'placeimage';
const TABLE_NAME_REVIEW = 'review';
const TABLE_NAME_REVIEW_IMAGE = 'reviewimage';

const maybeCreateTable = (knexInstance, tableName, callback) =>
  knexInstance.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      return knexInstance.schema.createTable(tableName, callback);
    }
    return knexInstance;
  });

const createPlaceSchema = table => {
  table.increments('id').primary();
  table.bigInteger('createdAt');
  table.bigInteger('updatedAt');
  table.string('placeName', 255);
  table.string('city', 255);
  table.string('state', 255);
  table.string('address', 255);
  table.string('phone', 255);
  table.string('placeImage', 255);
  table.string('placeImageAlt', 255);
  table.string('fd', 255);
  table.string('placeURL', 255);
  table.string('placeWebsiteDisplay', 255);
};

const createPlaceImageSchema = table => {
  table.increments('id').primary();
  table.bigInteger('createdAt');
  table.bigInteger('updatedAt');
  table.binary('file');
  table.string('fd', 255);
};

const createReviewSchema = table => {
  table.increments('id').primary();
  table.bigInteger('createdAt');
  table.bigInteger('updatedAt');
  table.text('reviewText');
  table.string('reviewerName', 255);
  table.double('numberOfStars');
  table.string('reviewImage', 255);
  table.string('reviewImageAlt', 255);
  table.integer('placeId');
};

const createReviewImageSchema = table => {
  table.increments('id').primary();
  table.bigInteger('createdAt');
  table.bigInteger('updatedAt');
  table.binary('file');
  table.string('fd', 255);
};

exports.up = knex =>
  maybeCreateTable(knex, TABLE_NAME_PLACE, createPlaceSchema)
    .then(
      maybeCreateTable(knex, TABLE_NAME_PLACE_IMAGE, createPlaceImageSchema)
    )
    .then(maybeCreateTable(knex, TABLE_NAME_REVIEW, createReviewSchema))
    .then(
      maybeCreateTable(knex, TABLE_NAME_REVIEW_IMAGE, createReviewImageSchema)
    );

exports.down = () => {};
