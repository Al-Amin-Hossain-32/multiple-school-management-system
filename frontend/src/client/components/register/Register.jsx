import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { registerSchema } from "../../../yupSchema/registerSchema";
import { Button, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
export default function Register() {
  const [file, setFile] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const addImage = (event) => {
    const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    setFile(file);
  };

  // RESETING IMAGE
  const fileInputRef = React.useRef(null);
  const handleClearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile(null);
    setImageUrl(null);
  };

  const initialValues = {
    school_name: "",
    email: "",
    owner_name: "",
    password: "",
    confirm_password: "",
  };
  const Formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      
      console.log("Register Submit values", values);
      if(file){     
      
      const fd = new FormData();
      fd.append("image", file, file.name);
      fd.append("school_name", values.school_name);
      fd.append("email", values.email);
      fd.append("owner_name", values.owner_name);
      fd.append("password", values.password);

      axios
        .post(`http://localhost:5000/api/school/register`, fd)
        .then((resp) => {
          console.log(resp);
          setMessage(resp.data.message)
          setMessageType("success")
        })
        .catch((error) => {
          console.log("Erroor", error);
          setMessage(error.response.data.message)
          setMessageType("error")
        });
        Formik.resetForm();
      handleClearFile();
      
      }else{
          setMessage("Please Add School Image")
          setMessageType("error")
        }
    }
  });

  const [message,setMessage]= React.useState("");
  const [messageType,setMessageType] = React.useState("success");
  const handleMessageClose =()=>{
    setMessage("")
  }


  const transparentColorForForm = {
    // background: "rgba(255, 255, 255, 0.08)",
        background: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderRadius: 2,
        padding: 4,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.01)",
        maxWidth: 600,
        // mx: "auto",
        // mt: 8,
  }

  const commonInputProps = {
    slotProps: {
      htmlInput: {
        style: {
          color: "#fff", // ইনপুটের লেখার রঙ
        },
      },
    },
    sx: {
      "& input::placeholder": {
        color: "#ffffff",
        opacity: 1,
      },
      "& .MuiInputLabel-root": {
        color: "#ccc", // লেবেল কালার
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#aaa",
        },
        "&:hover fieldset": {
          borderColor: "#fff",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#fff",
        },
      },
      input: {
        color: "#fff", // input text color
      },
    },
  };
  
  return (
   <Box component={"div"}sx={
    {
      background:"url(https://media.gettyimages.com/id/1458679872/photo/back-view-of-high-school-students-listening-to-their-teach-on-a-class.jpg?s=2048x2048&w=gi&k=20&c=_sWbFnmcEXZ39dnqb-QEkYe_p_tI9JzG4ESuHMyjARc=)",
      backgroundSize:"cover",
      backgroundRepeat:"no-repeat",
      // height:"100vh",
      width:"100vw",
      // paddingTop:"60px",
      paddingBottom:"60px",
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
    }
   }>
   
  {message && 
   <MessageSnackbar message={message} messageType={messageType} handleClose={handleMessageClose}/>
  }
   
      <Box
      component="form"
      sx={{
        "& > :not(style)": { m: .5,  },
        display: "flex",
        flexDirection: "column",
        marginTop: "40px",
        // minHeight:"60vh",
        backgroundColor: "#00FFFFFF",
        width: "60vw",
        // minWidth: "230px",
        ...transparentColorForForm
      }}
      noValidate
      autoComplete="off"
      onSubmit={Formik.handleSubmit}
    >
      <Typography variant="h2" sx={{textAlign:"center",color:"#fff"}} >Register</Typography>
      <Typography sx={{color:"#fff"}}>Add School Photo</Typography>
      <TextField
        type="file"
        onChange={(event) => {
          addImage(event);
        }}
      />
      {imageUrl && (
        <Box>
          <CardMedia component={"img"} sx={{ // তোমার নির্দিষ্ট প্রস্থ
    height: 200, // তোমার নির্দিষ্ট উচ্চতা
    overflow: "hidden",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    border: "1px solid #ccc",
    borderRadius: 2,}} image={imageUrl} />
        </Box>
      )}

      <TextField
        {...commonInputProps}
        name="school_name"
        label="School Name"
        value={Formik.values.school_name.toUpperCase()}
        onChange={Formik.handleChange}
        onBlur={Formik.handleBlur}
      />
      {Formik.touched.school_name && Formik.errors.school_name && (
        <p style={{ color: "red", textTransform: "capitalize" }}>
          {Formik.errors.school_name}
        </p>
      )}
      <TextField
      {...commonInputProps}
        name="email"
        label="E-mail"
        value={Formik.values.email}
        onChange={Formik.handleChange}
        onBlur={Formik.handleBlur}
      />
      {Formik.touched.email && Formik.errors.email && (
        <p style={{ color: "red", textTransform: "capitalize" }}>
          {Formik.errors.email}
        </p>
      )}
      <TextField
      {...commonInputProps}
        name="owner_name"
        label="School Owner Name"
        value={Formik.values.owner_name}
        onChange={Formik.handleChange}
        onBlur={Formik.handleBlur}
      />
      {Formik.touched.owner_name && Formik.errors.owner_name && (
        <p style={{ color: "red", textTransform: "capitalize" }}>
          {Formik.errors.owner_name}
        </p>
      )}
      <TextField
      {...commonInputProps}
        type="password"
        name="password"
        label="Password"
        value={Formik.values.password}
        onChange={Formik.handleChange}
        onBlur={Formik.handleBlur}
      />
      {Formik.touched.password && Formik.errors.password && (
        <p style={{ color: "red", textTransform: "capitalize" }}>
          {Formik.errors.password}
        </p>
      )}
      <TextField
      {...commonInputProps}
        type="password"
        name="confirm_password"
        label="Confirm Password"
        value={Formik.values.confirm_password}
        onChange={Formik.handleChange}
        onBlur={Formik.handleBlur}
      />
      {Formik.touched.confirm_password && Formik.errors.confirm_password && (
        <p style={{ color: "red", textTransform: "capitalize" }}>
          {Formik.errors.confirm_password}
        </p>
      )}

      <Button type="submit" variant="contained">
        Register{" "}
      </Button>
    </Box>
   </Box>
  );
}
