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
    find: [
      (context) => {
        // boardId must exist when find cards
        const {
          params: {
            query: { boardId },
          },
        } = context;
        if (!boardId) {
          throw new Error('Board Id must exist when find cards');
        }
        return context;
      },
    ],
    get: [],
    create: [
      (context) => {
        // user id should always exist because the authenticate in all hook
        context.data.userId = context.params.user._id;
        return context;
      },
    ],
    update: [],
    patch: [],
    // allow multi remove
    remove: [
      (context) => {
        // boardId must exist when remove cards
        const {
          params: {
            query: { boardId },
          },
          id,
        } = context;
        if (!boardId && !id) {
          throw new Error('Card Id or Board Id must exist when delete cards');
        }
        return context;
      },
    ],
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
