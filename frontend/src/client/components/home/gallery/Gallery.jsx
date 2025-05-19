import * as React from "react";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Box,
  Typography,
  Modal,
  Card,
  CardMedia,
  CardContent,
  Button,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import axios from "axios";

export default function ResponsiveGallery() {
  const [open, setOpen] = React.useState(false);
  const [selectedSchool, setSelectedSchool] = React.useState(null);
  const [schools, setSchools] = React.useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleOpen = (school) => {
    setOpen(true);
    setSelectedSchool(school);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedSchool(null);
  };

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/school/all`)
      .then((res) => {
        setSchools(res.data.schools);
      })
      .catch((error) => {
        console.error("Error fetching schools:", error);
      });
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" sx={{textAlign:"center",marginBottom:"16px"}} >
        Registerd School 
      </Typography>
      {schools.length === 0 ? (
        <Skeleton variant="rectangular" width="100%" height={300} />
      ) : (
        <ImageList variant="standard" cols={isMobile ? 1 : 3} gap={10}>
          {schools.map((school, index) => (
            <Card
              key={index}
              sx={{
                borderRadius: 3,
                margin:"18px",
                transition: "transform 0.3s, box-shadow 0.3s",
                ".MuiCardMedia-root": {
                  cursor: "pointer",
                  
                },
                '&:hover': {
                  transform: "scale(1.02)",
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={`/images/uploaded/school/${school.school_image}`}
                alt={school.school_name}
                onClick={() => handleOpen(school)}
              />
              <CardContent>
                <Typography variant="h6" component="div" align="center">
                  {school.school_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {school.location || "অবস্থানঃ অজানা"}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </ImageList>
      )}

      {/* MODAL */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            width: isMobile ? "90vw" : 500,
            outline: "none",
          }}
        >
          {selectedSchool && (
            <>
              <Typography id="modal-title" variant="h6" component="h2">
                {selectedSchool.school_name}
              </Typography>
              <img
                src={`./images/uploaded/school/${selectedSchool.school_image}`}
                alt={selectedSchool.school_name}
                style={{ width: "100%", marginTop: 10, borderRadius: "8px" }}
              />
              <Typography id="modal-description" sx={{ mt: 2 }}>
                {selectedSchool.description || "স্কুলের বিস্তারিত তথ্য এখানে আসবে।"}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
