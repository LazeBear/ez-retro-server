// boards-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'boards';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      name: { type: String, required: true },
      description: { type: String, default: '' },
      ownerId: { type: Schema.Types.ObjectId, ref: 'users' },
      allowVote: { type: Boolean, default: true },
      blurCard: { type: Boolean, default: true },
      authorOnly: { type: Boolean, default: true },
      lastOpened: { type: Date, default: Date.now() }, // not used atm
      maxVote: { type: Number, default: 5 },
      countDown: { type: Number, default: 0 },
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
