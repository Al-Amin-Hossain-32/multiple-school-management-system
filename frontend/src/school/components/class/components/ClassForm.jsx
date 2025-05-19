import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { createClass, updateClass } from '../api';

const ClassForm = ({ classData, onClose }) => {
  const [school, setSchool] = useState('');
  const [name, setName] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [sections, setSections] = useState([{ name: '', classTeacher: '' }]);

  useEffect(() => {
    if (classData) {
      setSchool(classData.school);
      setName(classData.name);
      setAcademicYear(classData.academicYear);
      setSections(classData.sections);
    }
  }, [classData]);

  const handleChange = (e, index) => {
    const updatedSections = [...sections];
    updatedSections[index][e.target.name] = e.target.value;
    setSections(updatedSections);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { school, name, academicYear, sections };

    if (classData) {
      await updateClass(classData._id, data);
    } else {
      await createClass(data);
    }
    onClose();
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          label="School"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Class Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Academic Year"
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
          fullWidth
          margin="normal"
        />
        {sections.map((section, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={6}>
              <TextField
                label="Section Name"
                name="name"
                value={section.name}
                onChange={(e) => handleChange(e, index)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth margin="normal">
                <InputLabel id="demo-simple-select-helper-label">Class Teacher</InputLabel>
                <Select
                  name="classTeacher"
                  value={section.classTeacher}
                  onChange={(e) => handleChange(e, index)}
                >
                  {/* Add teacher options here */}
                  <MenuItem value="" >Select Teacher</MenuItem>
                  <MenuItem value="teacher1">Teacher 1</MenuItem>
                  <MenuItem value="teacher2">Teacher 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        ))}
        <Button variant="contained" color="primary" type="submit" fullWidth>
          {classData ? 'Update Class' : 'Create Class'}
        </Button>
      </form>
    </Container>
  );
};

export default ClassForm;
