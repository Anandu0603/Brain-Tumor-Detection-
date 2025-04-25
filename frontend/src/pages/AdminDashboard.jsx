import { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { getUsers, getFeedbacks } from '../services/api';
import axios from 'axios';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, feedbacksData] = await Promise.all([
          getUsers(),
          getFeedbacks()
        ]);
        console.log('Users data received:', usersData); // Debug log
        if (usersData && usersData.users) {
          setUsers(usersData.users);
        } else {
          console.error('Invalid users data structure:', usersData);
          setUsers([]);
        }
        setFeedbacks(feedbacksData.feedbacks || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setUsers([]);
        setFeedbacks([]);
      }
    };

    fetchData();
  }, []);


  const handleApproval = async (userId, action) => {
    try {
      const token = localStorage.getItem('adminToken');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      await axios.post('/api/admin/users/approve', {
        user_id: userId,
        action: action
      }, config);

      // Update users list after approval/rejection
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          return { ...user, is_approved: action === 'approve' };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error updating user approval:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Registered Users
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Registration Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {user.is_approved ? (
                        <span style={{ color: 'green' }}>Approved</span>
                      ) : (
                        <span style={{ color: 'red' }}>Pending</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {!user.is_approved ? (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleApproval(user.id, 'approve')}
                            sx={{ mr: 1 }}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleApproval(user.id, 'reject')}
                          >
                            Reject
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleApproval(user.id, 'reject')}
                        >
                          Revoke
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom>
            User Feedbacks
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Comment</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {feedbacks.map((feedback) => (
                  <TableRow key={feedback.id}>
                    <TableCell>{feedback.user?.name || 'Anonymous'}</TableCell>
                    <TableCell>{feedback.rating}</TableCell>
                    <TableCell>{feedback.comment}</TableCell>
                    <TableCell>{new Date(feedback.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Container>
  );
}

export default AdminDashboard;
