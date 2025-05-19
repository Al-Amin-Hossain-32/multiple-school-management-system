import React, { useState, useEffect } from "react";
import { Button, TextField, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import schoolLogo from "../../../../public/images/schoolLogo.jpg" ;  // তোমার স্কুল লোগো

const Student = () => {
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(true);

  // এখানে তোমার backend থেকে স্টুডেন্ট ডেটা fetch হবে
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get("API_URL_TO_GET_STUDENT");
        setStudentData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student data", error);
      }
    };

    fetchStudentData();
  }, []);

  // Update student info (উদাহরণস্বরূপ)
  const handleUpdateStudent = async () => {
    try {
      const updatedData = {
        name: studentData.name,
        student_class: studentData.student_class,
        guardian: studentData.guardian,
        guardian_phone: studentData.guardian_phone,
      };
      const response = await axios.patch("API_URL_TO_UPDATE_STUDENT", updatedData);
      alert("Student updated successfully!");
    } catch (error) {
      alert("Error updating student data");
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Left side - Image and School Info */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src={schoolLogo} alt="School Logo" style={{ width: "100px", height: "100px" }} />
            <Typography variant="h6" sx={{ marginTop: "10px" }}>Dream House Academy</Typography>
            <Typography variant="body2">Mirpur-1, Dhaka-1216</Typography>
            <Typography variant="body2">Phone: 01234-567890</Typography>
          </Paper>
        </Grid>

        {/* Right side - Student Details */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: "20px" }}>
            <Typography variant="h5">Student Details</Typography>

            <TextField
              label="Name"
              value={studentData.name}
              onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
              fullWidth
              sx={{ marginTop: "10px" }}
            />
            <TextField
              label="Class"
              value={studentData.student_class}
              onChange={(e) => setStudentData({ ...studentData, student_class: e.target.value })}
              fullWidth
              sx={{ marginTop: "10px" }}
            />
            <TextField
              label="Guardian"
              value={studentData.guardian}
              onChange={(e) => setStudentData({ ...studentData, guardian: e.target.value })}
              fullWidth
              sx={{ marginTop: "10px" }}
            />
            <TextField
              label="Guardian Phone"
              value={studentData.guardian_phone}
              onChange={(e) => setStudentData({ ...studentData, guardian_phone: e.target.value })}
              fullWidth
              sx={{ marginTop: "10px" }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateStudent}
              sx={{ marginTop: "20px" }}
            >
              Update Information
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Student;
