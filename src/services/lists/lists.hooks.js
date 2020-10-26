const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [
      (context) => {
        // boardId must exist when find lists
        const {
          params: {
            query: { boardId },
          },
        } = context;
        if (!boardId) {
          throw new Error('Board Id must exist when find lists');
        }
        return context;
      },
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [
      (context) => {
        // boardId must exist when remove lists
        const {
          params: {
            query: { boardId },
          },
          id,
        } = context;
        if (!boardId && !id) {
          throw new Error('Card Id or Board Id must exist when delete lists');
        }
        return context;
      },
    ],
  },

  after: {
    all: [],
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
