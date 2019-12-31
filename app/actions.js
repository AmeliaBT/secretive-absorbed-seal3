/* actions */
const ADD = 'ADD';
module.exports = {
 
  UPVOTE: 'UPVOTE',
  
  DOWNVOTE: 'DOWNVOTE',
  
  ADD: 'ADD',
  upvote: function() {
    return {
      type: this.UPVOTE
    }
  },

  downvote: function() {
    return {
      type: this.DOWNVOTE
    }
  },
  
    addMessage: function(message) {
    return {
      type: this.ADD,
      message: message
    }
  }
}




