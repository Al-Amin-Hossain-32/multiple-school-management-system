import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Select,
  InputLabel,
  FormControl
} from "@mui/material";
import axios from "axios";
import FeeInvoice from "./FeeInvoice";

const AddFeeForm = () => {
  const [formData, setFormData] = useState({
    student: "",
    amount: "",
    month: "",
    year: new Date().getFullYear(),
  });

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/student/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setStudents(res.data.students);
      } catch (err) {
        console.error("Failed to load students", err);
      }
    };

    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/fee/add", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Fee added successfully!");
      setFormData({ student: "", amount: "", month: "", year: new Date().getFullYear() });
    } catch (err) {
      console.error("Error adding fee", err);
      alert("Failed to add fee");
    }
  };

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Add New Fee
        </Typography>
        <FeeInvoice
  student={{
    name: "Abdullah Hasan",
    student_class: "Class 7",
    guardian: "Anwara Begum",
  }}
  fee={{
    amount: 1200,
    month: "April",
    year: 2025,
  }}
/>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Student</InputLabel>
                <Select
                  name="student"
                  value={formData.student}
                  label="Select Student"
                  onChange={handleChange}
                  required
                >
                  {students.map((student) => (
                    <MenuItem key={student._id} value={student._id}>
                      {student.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField
                name="amount"
                label="Amount (৳)"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                name="month"
                label="Month"
                select
                value={formData.month}
                onChange={handleChange}
                fullWidth
                required
              >
                {["January", "February", "March", "April", "May", "June", "July", "August",
                  "September", "October", "November", "December"].map((month) => (
                    <MenuItem key={month} value={month}>{month}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                name="year"
                label="Year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Add Fee
              </Button>
            </Grid>

          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddFeeForm;
