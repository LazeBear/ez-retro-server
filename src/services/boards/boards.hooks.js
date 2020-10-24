const { authenticate } = require('@feathersjs/authentication').hooks;

// async function autoSetIdFromUserId(fieldName) {
//   return async (context) => {
//     const { _id } = context.params.user;
//     console.log(_id);
//     context.data[fieldName] = _id;
//     return context;
//   };
// }

// async function restrictToOwner(context) {

// }
const { setField } = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [
      setField({
        from: 'params.user._id',
        as: 'params.query.ownerId',
      }),
    ],
    get: [],
    create: [
      setField({
        from: 'params.user._id',
        as: 'data.ownerId',
      }),
    ],
    update: [
      setField({
        from: 'params.user._id',
        as: 'params.query.ownerId',
      }),
    ],
    patch: [
      setField({
        from: 'params.user._id',
        as: 'params.query.ownerId',
      }),
    ],
    remove: [
      setField({
        from: 'params.user._id',
        as: 'params.query.ownerId',
      }),
    ],
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [
      async (context) => {
        const { id } = context;
        await context.app
          .service('lists')
          .remove(null, { query: { boardId: id } });
        await context.app
          .service('cards')
          .remove(null, { query: { boardId: id } });
        return context;
      },
    ],
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
