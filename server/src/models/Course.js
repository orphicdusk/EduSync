const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  thumbnail: {
    type: String // URL to thumbnail image
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  modules: [{
    title: {
      type: String,
      required: true
    },
    lessons: [{
      title: {
        type: String,
        required: true
      },
      content: {
        type: String // Could be HTML content, video URL, etc.
      },
      contentType: {
        type: String,
        enum: ['video', 'text', 'quiz', 'assignment'],
        default: 'text'
      },
      duration: {
        type: Number // Duration in minutes
      },
      order: {
        type: Number
      }
    }],
    order: {
      type: Number
    }
  }],
  prerequisites: [{
    type: String
  }],
  tags: [{
    type: String
  }]
}, {
  timestamps: true
});

// Indexes
courseSchema.index({ title: 'text', description: 'text' });
courseSchema.index({ category: 1 });
courseSchema.index({ instructor: 1 });

module.exports = mongoose.model('Course', courseSchema);