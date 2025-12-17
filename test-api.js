const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api/v1';

async function testAPI() {
  try {
    // Test home endpoint
    console.log('Testing home endpoint...');
    const homeResponse = await axios.get('http://localhost:5000');
    console.log('Home:', homeResponse.data);
    
    // Test auth register endpoint
    console.log('\nTesting register endpoint...');
    const registerData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'student'
    };
    
    try {
      const registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, registerData);
      console.log('Register success:', registerResponse.data);
      
      // Save token for future requests
      const token = registerResponse.data.token;
      
      // Test login endpoint
      console.log('\nTesting login endpoint...');
      const loginData = {
        email: 'john.doe@example.com',
        password: 'password123'
      };
      
      const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
      console.log('Login success:', loginResponse.data);
      
      // Test get user profile
      console.log('\nTesting get user profile...');
      const profileResponse = await axios.get(`${API_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${loginResponse.data.token}`
        }
      });
      console.log('Profile:', profileResponse.data);
      
    } catch (error) {
      console.log('Register/Login error:', error.response?.data || error.message);
    }
    
    // Test get courses (should work without auth for published courses)
    console.log('\nTesting get courses endpoint...');
    const coursesResponse = await axios.get(`${API_BASE_URL}/courses`);
    console.log('Courses:', coursesResponse.data);
    
  } catch (error) {
    console.log('Error:', error.response?.data || error.message);
  }
}

testAPI();