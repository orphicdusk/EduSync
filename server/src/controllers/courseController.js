const Course = require('../models/Course');

// Create a new course
const createCourse = async (req, res) => {
  try {
    const { title, description, category, price, thumbnail } = req.body;
    
    // Only instructors can create courses
    if (req.user.role !== 'instructor' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only instructors can create courses' });
    }
    
    const course = new Course({
      title,
      description,
      category,
      price: price || 0,
      thumbnail,
      instructor: req.user.userId
    });
    
    await course.save();
    
    res.status(201).json({
      message: 'Course created successfully',
      course
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all courses
const getCourses = async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = { isPublished: true };
    
    if (category) {
      filter.category = category;
    }
    
    if (search) {
      filter.$text = { $search: search };
    }
    
    const courses = await Course.find(filter)
      .populate('instructor', 'firstName lastName')
      .sort({ createdAt: -1 });
    
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a specific course
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'firstName lastName');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Only published courses are accessible to students
    if (!course.isPublished && req.user.role !== 'instructor' && req.user.role !== 'admin' && course.instructor.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Course not published' });
    }
    
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a course
const updateCourse = async (req, res) => {
  try {
    const { title, description, category, price, thumbnail, isPublished, modules } = req.body;
    
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Only the instructor who created the course or admin can update it
    if (course.instructor.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }
    
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (category !== undefined) updates.category = category;
    if (price !== undefined) updates.price = price;
    if (thumbnail !== undefined) updates.thumbnail = thumbnail;
    if (isPublished !== undefined) updates.isPublished = isPublished;
    if (modules !== undefined) updates.modules = modules;
    
    Object.assign(course, updates);
    await course.save();
    
    res.json({
      message: 'Course updated successfully',
      course
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Only the instructor who created the course or admin can delete it
    if (course.instructor.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this course' });
    }
    
    await Course.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};