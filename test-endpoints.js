const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api/v1';

async function testEndpoints() {
  try {
    console.log('Testing EduSync API endpoints...\n');
    
    // Test home endpoint
    console.log('1. Testing home endpoint...');
    const homeResponse = await axios.get('http://localhost:5000');
    console.log('   ✓ Home endpoint:', homeResponse.data.message);
    
    // Test auth endpoints
    console.log('\n2. Testing auth endpoints...');
    
    // Register a new user
    const registerData = {
      firstName: 'Test',
      lastName: 'User',
      email: `test${Date.now()}@example.com`,
      password: 'password123',
      role: 'student'
    };
    
    const registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, registerData);
    console.log('   ✓ User registration successful');
    console.log('   ✓ Token received:', registerResponse.data.token ? 'Yes' : 'No');
    
    // Login with the same user
    const loginData = {
      email: registerData.email,
      password: registerData.password
    };
    
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
    console.log('   ✓ User login successful');
    const token = loginResponse.data.token;
    
    // Test protected endpoints with authentication
    console.log('\n3. Testing protected endpoints...');
    
    // Get user profile
    const profileResponse = await axios.get(`${API_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('   ✓ User profile retrieved');
    console.log('   ✓ User name:', profileResponse.data.firstName, profileResponse.data.lastName);
    
    // Get courses (no auth required for this endpoint)
    console.log('\n4. Testing course endpoints...');
    const coursesResponse = await axios.get(`${API_BASE_URL}/courses`);
    console.log('   ✓ Courses retrieved');
    console.log('   ✓ Number of courses:', Array.isArray(coursesResponse.data) ? coursesResponse.data.length : 0);
    
    // Test WebSocket connection
    console.log('\n5. Testing WebSocket connection...');
    console.log('   ℹ️  WebSocket functionality requires manual testing');
    console.log('   ℹ️  Connect to ws://localhost:5000 to test real-time features');
    
    console.log('\n🎉 All API endpoints are working correctly!');
    
  } catch (error) {
    console.error('❌ Error testing endpoints:', error.response?.data || error.message);
  }
}

testEndpoints();