import React, { useState, useEffect } from "react";
import { getAllClasses, deleteClass } from "../api";
import { Button, Container, Grid, Typography } from "@mui/material";
import ClassForm from "./classForm";
// import ClassForm from "./ClassForm";

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await getAllClasses();
      setClasses(response.data.data);
    };
    fetchClasses();
  }, [openForm]);

  const handleDelete = async (id) => {
    await deleteClass(id);
  };

  const handleEdit = (classData) => {
    setSelectedClass(classData);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setSelectedClass(null);
    setOpenForm(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Classes
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenForm(true)}
      >
        Create New Class
      </Button>

      <Grid container spacing={2}>
        {classes.map((classItem) => (
          <Grid item xs={12} md={6} key={classItem._id}>
            <div
              style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8 }}
            >
              <Typography variant="h6">{classItem.name}</Typography>
              <Typography variant="body1">
                Academic Year: {classItem.academicYear}
              </Typography>
              <Button onClick={() => handleEdit(classItem)} color="primary">
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(classItem._id)}
                color="secondary"
              >
                Delete
              </Button>
            </div>
          </Grid>
        ))}
      </Grid>

      {openForm && (
        <ClassForm classData={selectedClass} onClose={handleCloseForm} />
      )}
    </Container>
  );
};

export default ClassList;
