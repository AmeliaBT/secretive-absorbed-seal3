/* reducers */

const { UPVOTE, DOWNVOTE, ADD } = require('./actions');

function votes(state = [], action) {
  switch (action.type) {
    case UPVOTE: 
      return Object.assign({}, state, {
        voteScore: ( state.voteScore ) ? state.voteScore + 1 : 1,
        voteCount: ( state.voteCount ) ? state.voteCount + 1 : 1
      });
    case DOWNVOTE:
       return Object.assign({}, state, {
        voteScore: ( state.voteScore ) ? state.voteScore - 1 : -1,
        voteCount: ( state.voteCount ) ? state.voteCount + 1 : 1
      });
      
     case ADD:
      return Object.assign({}, state, {
        addMessage: ( state.message ) 
       
      });
     
    default:
      return state;
  }
}

module.exports = votes
/* 
addMessage: function(message) {
    return {
      type: this.ADD,
      message: message
    }

{messages: state}
const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};
*/