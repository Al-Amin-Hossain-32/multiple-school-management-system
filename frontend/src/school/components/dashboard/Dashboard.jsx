import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseApi } from "../../../environment.js";
import { Box } from "@mui/system";
import {
  Button,
  Typography,
  Modal,
  CardMedia,
  TextField,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";

// 🔵 Message Component
const MessageBox = ({ message, type = "success" }) => {
  const bgColor = type === "success" ? "#4CAF50" : "#F44336";
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: bgColor,
        color: "#fff",
        px: 3,
        py: 1.5,
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        zIndex: 1500,
        textAlign: "center",
        width: "fit-content",
        maxWidth: "90vw",
      }}
    >
      {message}
    </Box>
  );
};

const Dashboard = () => {
  const [school, setSchool] = useState(null);
  const [schoolName, setSchoolName] = useState(null);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fileInputRef = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFile(null);
    setImageUrl(null);
    setSchoolName(school?.school_name || "");
  };

  const addImage = (event) => {
    const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    setFile(file);
  };

  const handleClearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile(null);
    setImageUrl(null);
  };

  const handleEditSchool = () => {
    const fd = new FormData();
    fd.append("school_name", schoolName);

    if (file) {
      fd.append("image", file, file.name);
    } else if (school?.school_image) {
      fd.append("image", school.school_image);
    }

    axios
      .patch(`${baseApi}/school/update`, fd, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setMessageText("স্কুল তথ্য সফলভাবে আপডেট হয়েছে!");
        setShowMessage(true);
        setOpen(false);
        fetchSchool();
        setTimeout(() => setShowMessage(false), 3000);
      })
      .catch((e) => {
        setMessageText("আপডেট ব্যর্থ হয়েছে!");
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      });
  };

  const cancelEditSchool = () => {
    setOpen(false);
    handleClearFile();
  };

  const fetchSchool = () => {
    axios
      .get(`${baseApi}/school/fetch-single`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setSchool(res.data.school);
        setSchoolName(res.data.school.school_name);
      })
      .catch((err) => {
        console.error("Error fetching school:", err);
      });
  };

  useEffect(() => {
    fetchSchool();
  }, []);

  if (!school) return <CircularProgress color="secondary" />;

  return (
    <>
      <h1>Dashboard</h1>

      <Modal open={open} onClose={handleClose}>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#00FFFFFF",
            ...{
              background: "rgba(75, 149, 218, 0.64)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              borderRadius: 2,
              padding: 4,
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.01)",
              maxWidth: 600,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: isMobile ? "90vw" : "60vw",
            },
          }}
        >
          <Typography variant="h4" sx={{ textAlign: "center", color: "#fff", mb: 2 }}>
            School Data Update Form
          </Typography>

          <Typography sx={{ color: "#fff" }}>Add School Photo</Typography>
          <TextField
            type="file"
            onChange={addImage}
            inputRef={fileInputRef}
            sx={{ my: 1 }}
          />

          {imageUrl && (
            <CardMedia
              component="img"
              sx={{
                height: 200,
                overflow: "hidden",
                border: "1px solid #ccc",
                borderRadius: 2,
              }}
              image={imageUrl}
            />
          )}

          <TextField
            name="school_name"
            label="School Name"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            sx={{
              my: 2,
              input: { color: "#fff" },
              "& .MuiInputLabel-root": { color: "#ccc" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#aaa" },
                "&:hover fieldset": { borderColor: "#fff" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="contained" color="success" onClick={handleEditSchool}>
              Update
            </Button>
            <Button variant="outlined" color="error" onClick={cancelEditSchool}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      <Box
        sx={{
          position: "relative",
          height: isMobile ? "200px" : "400px",
          width: "100%",
          background: `url(/images/uploaded/school/${school.school_image})`,
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h3"}
          sx={{
            color: "#343434",
            textShadow: "-2px -1px 3px rgba(167,241,69,0.85)",
            textAlign: "center",
          }}
        >
          {schoolName}
        </Typography>
        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
          }}
        >
          <Button
            variant="outlined"
            title="Edit"
            sx={{
              background: "#fff",
              borderRadius: "50%",
              color: "black",
              height: "60px",
              minWidth: "60px",
            }}
            onClick={handleOpen}
          >
            <EditIcon />
          </Button>
        </Box>
      </Box>

      {/* ✅ Message Component Injected Here */}
      {showMessage && <MessageBox message={messageText} />}
    </>
  );
};

export default Dashboard;
