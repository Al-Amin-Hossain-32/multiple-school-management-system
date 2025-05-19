
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { loginSchema } from "../../../yupSchema/loginSchema";
import { Button, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const {login} =React.useContext(AuthContext)
  const initialValues = {
    email: "",
    password: "",
  };
  const Formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      
      // console.log("Login Values", values);
  

      axios
        .post(`http://localhost:5000/api/school/login`,{...values})
        .then((resp) => {
          const token = resp.headers.get("authorization");
          if(token){
            localStorage.setItem("token",token)
          }
          const user = resp.data.user ;

          if(user){
            localStorage.setItem("user",JSON.stringify(user) )
            login({token,...user})
          }
          setMessage(resp.data.message)
          setMessageType("success")
          // Formik.resetForm();
          navigate("/school")

        })
        .catch((error) => {
          console.log("Erroor", error);
          setMessage(error.response.data.message)
          setMessageType("error")
        });
      
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
      minHeight:"80vh",
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
        "& > :not(style)": { m: 1,  },
        display: "flex",
        flexDirection: "column",
        marginTop: "40px",
        backgroundColor: "#00FFFFFF",
        width: "60vw",
        // minWidth: "230px",
        ...transparentColorForForm
      }}
      noValidate
      autoComplete="off"
      onSubmit={Formik.handleSubmit}
    >
        <Typography variant="h2" sx={{textAlign:"center",color:"#fff"}} >Log In</Typography>
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
      
      <Button type="submit" variant="contained">
        Login{" "}
      </Button>
    </Box>
   </Box>
  );
}
