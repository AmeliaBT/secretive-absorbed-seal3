/* actions */

module.exports = {
 
  UPVOTE: 'UPVOTE',
  
  DOWNVOTE: 'DOWNVOTE',
  


  downvote: function() {
    return {
      type: this.DOWNVOTE
    }
  }
}


/* //const ADD = 'ADD';
  ADD: 'ADD',
  upvote: function() {
    return {
      type: this.UPVOTE
    }
  },
  
  
  ,
  
    addMessage: function(message) {
    return {
      type: this.ADD,
      message: message
    }
  }
*/

