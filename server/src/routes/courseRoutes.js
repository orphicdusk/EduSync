const express = require('express');
const { 
  createCourse, 
  getCourses, 
  getCourseById, 
  updateCourse, 
  deleteCourse 
} = require('../controllers/courseController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/v1/courses:
 *   get:
 *     summary: Get all courses
 *     description: Retrieve a list of all published courses
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter courses by category
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search courses by title or description
 *     responses:
 *       200:
 *         description: List of courses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   category:
 *                     type: string
 *                   price:
 *                     type: number
 *                   thumbnail:
 *                     type: string
 *                   isPublished:
 *                     type: boolean
 *                   instructor:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Server error
 */
router.get('/', getCourses);

/**
 * @swagger
 * /api/v1/courses:
 *   post:
 *     summary: Create a new course
 *     description: Create a new course (instructor/admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: Introduction to React
 *               description:
 *                 type: string
 *                 example: Learn the fundamentals of React development
 *               category:
 *                 type: string
 *                 example: Web Development
 *               price:
 *                 type: number
 *                 example: 49.99
 *               thumbnail:
 *                 type: string
 *                 example: https://example.com/thumbnail.jpg
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 course:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     category:
 *                       type: string
 *                     price:
 *                       type: number
 *                     thumbnail:
 *                       type: string
 *                     isPublished:
 *                       type: boolean
 *                     instructor:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Access token required
 *       403:
 *         description: Only instructors can create courses
 *       500:
 *         description: Server error
 */
router.post('/', authenticateToken, authorizeRole('instructor', 'admin'), createCourse);

/**
 * @swagger
 * /api/v1/courses/{id}:
 *   get:
 *     summary: Get a specific course
 *     description: Retrieve details of a specific course by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 category:
 *                   type: string
 *                 price:
 *                   type: number
 *                 thumbnail:
 *                   type: string
 *                 isPublished:
 *                   type: boolean
 *                 instructor:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                 modules:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       lessons:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             title:
 *                               type: string
 *                             content:
 *                               type: string
 *                             contentType:
 *                               type: string
 *                             duration:
 *                               type: number
 *                             order:
 *                               type: number
 *                       order:
 *                         type: number
 *                 prerequisites:
 *                   type: array
 *                   items:
 *                     type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getCourseById);

/**
 * @swagger
 * /api/v1/courses/{id}:
 *   put:
 *     summary: Update a course
 *     description: Update an existing course (instructor/admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Advanced React Patterns
 *               description:
 *                 type: string
 *                 example: Learn advanced patterns and techniques in React
 *               category:
 *                 type: string
 *                 example: Web Development
 *               price:
 *                 type: number
 *                 example: 79.99
 *               thumbnail:
 *                 type: string
 *                 example: https://example.com/thumbnail.jpg
 *               isPublished:
 *                 type: boolean
 *                 example: true
 *               modules:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 course:
 *                   type: object
 *       401:
 *         description: Access token required
 *       403:
 *         description: Not authorized to update this course
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authenticateToken, authorizeRole('instructor', 'admin'), updateCourse);

/**
 * @swagger
 * /api/v1/courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     description: Delete an existing course (instructor/admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Access token required
 *       403:
 *         description: Not authorized to delete this course
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authenticateToken, authorizeRole('instructor', 'admin'), deleteCourse);

module.exports = router;