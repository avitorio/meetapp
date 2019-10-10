import produce from 'immer';

const INITIAL_STATE = {
  meetup: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.meetup = action.payload.profile;
        break;
      }
      default:
    }
  });
}
