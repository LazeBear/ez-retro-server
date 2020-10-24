const { authenticate } = require('@feathersjs/authentication').hooks;
const { shallowPopulate } = require('feathers-shallow-populate');
const options = {
  include: {
    service: 'users',
    nameAs: 'user',
    keyHere: 'userId',
    keyThere: '_id',
    asArray: false, // by default
    params: {}, // by default
  },
};
module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [
      (context) => {
        context.data.userId = context.params.user._id;
        return context;
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [shallowPopulate(options)],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
