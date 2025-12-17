const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/v1/users/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the profile information of the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 role:
 *                   type: string
 *                 avatar:
 *                   type: string
 *                 bio:
 *                   type: string
 *                 isActive:
 *                   type: boolean
 *                 emailVerified:
 *                   type: boolean
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Access token required
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/profile', authenticateToken, getUserProfile);

/**
 * @swagger
 * /api/v1/users/profile:
 *   put:
 *     summary: Update user profile
 *     description: Update the profile information of the authenticated user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               bio:
 *                 type: string
 *                 example: Software developer with 5 years of experience
 *               avatar:
 *                 type: string
 *                 example: https://example.com/avatar.jpg
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 *                     role:
 *                       type: string
 *                     avatar:
 *                       type: string
 *                     bio:
 *                       type: string
 *                     isActive:
 *                       type: boolean
 *                     emailVerified:
 *                       type: boolean
 *       401:
 *         description: Access token required
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/profile', authenticateToken, updateUserProfile);

module.exports = router;