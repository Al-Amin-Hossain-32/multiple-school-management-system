import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseApi } from "../../../environment.js";
import {
  Card, CardContent, Typography, Button, Table,
  TableHead, TableRow, TableCell, TableBody, Select, MenuItem
} from "@mui/material";
import AddFeeForm from "./AddFeeForm";

const FeeDashboard = () => {
  const [fees, setFees] = useState([]);

  const fetchFees = async () => {
    try {
      const res = await axios.get(`${baseApi}/fee/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setFees(res.data.fees);
    } catch (error) {
      console.error("Error fetching fees", error);
    }
  };

  const updateStatus = async (feeId, newStatus) => {
    try {
      await axios.patch(`${baseApi}/fee/update/${feeId}`, {
        status: newStatus
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchFees();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  return (
    <div>
        <AddFeeForm/>
      <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>Fee Management Dashboard</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Month</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fees.map((fee) => (
              <TableRow key={fee._id}>
                <TableCell>{fee.student?.name}</TableCell>
                <TableCell>{fee.month} {fee.year}</TableCell>
                <TableCell>৳ {fee.amount}</TableCell>
                <TableCell>{fee.status}</TableCell>
                <TableCell>
                  <Select
                    value={fee.status}
                    onChange={(e) => updateStatus(fee._id, e.target.value)}
                    size="small"
                  >
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="unpaid">Unpaid</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      </Card>
    </div>
  );
};

export default FeeDashboard;
