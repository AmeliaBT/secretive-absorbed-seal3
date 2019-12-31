/* actions */
const ADD = 'ADD';
module.exports = {
 
  UPVOTE: 'UPVOTE',
  
  DOWNVOTE: 'DOWNVOTE',

  upvote: function() {
    return {
      type: this.UPVOTE
    }
  },

  downvote: function() {
    return {
      type: this.DOWNVOTE
    }
  }
  
}




const addMessage = (message) => {
  return {
    type: ADD,
    message: message
  }
};