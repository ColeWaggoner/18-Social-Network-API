const { Schema, model } = require('mongoose');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
       get createdAt() {
        return this._createdAt;
       },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);


thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
