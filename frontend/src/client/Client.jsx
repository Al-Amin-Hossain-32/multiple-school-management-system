import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./utilityComponents/navbar/Navbar";
import Footer from "./utilityComponents/footer/Footer";
import { Box } from "@mui/material";

function Client() {
  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          // minHeight: "80vh",
          // backgroundColor: "#80CBBF",
          alignItems: "center",
          justifyContent: "center",
        }}
        component={"div"}
      >
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
}

export default Client;
