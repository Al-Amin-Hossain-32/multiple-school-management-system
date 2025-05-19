import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, InputLabel, Box, CircularProgress } from '@mui/material';
import axios from 'axios';

export default function AttendanceStudent() {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);
  
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedUpazila, setSelectedUpazila] = useState('');
  const [selectedUnion, setSelectedUnion] = useState('');

  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingUpazilas, setLoadingUpazilas] = useState(false);
  const [loadingUnions, setLoadingUnions] = useState(false);

  useEffect(() => {
    fetchDistricts();
  }, []);

  const fetchDistricts = async () => {
    setLoadingDistricts(true);
    try {
      const response = await axios.get('https://bdapis.com/api/v1.1/district');
      setDistricts(response.data.data);
    } catch (error) {
      console.error('জেলা আনতে সমস্যা:', error);
    }
    setLoadingDistricts(false);
  };

  const fetchUpazilas = async (district) => {
    setLoadingUpazilas(true);
    try {
      const response = await axios.get(`https://bdapis.com/api/v1.1/upazilla/${district}`);
      setUpazilas(response.data.data);
    } catch (error) {
      console.error('থানা আনতে সমস্যা:', error);
    }
    setLoadingUpazilas(false);
  };

  const fetchUnions = async (upazila) => {
    setLoadingUnions(true);
    try {
      const response = await axios.get(`https://bdapis.com/api/v1.1/union/${upazila}`);
      setUnions(response.data.data);
    } catch (error) {
      console.error('ইউনিয়ন আনতে সমস্যা:', error);
    }
    setLoadingUnions(false);
  };

  const handleDistrictChange = (event) => {
    const districtName = event.target.value;
    setSelectedDistrict(districtName);
    setSelectedUpazila('');
    setSelectedUnion('');
    setUpazilas([]);
    setUnions([]);
    fetchUpazilas(districtName);
  };

  const handleUpazilaChange = (event) => {
    const upazilaName = event.target.value;
    setSelectedUpazila(upazilaName);
    setSelectedUnion('');
    setUnions([]);
    fetchUnions(upazilaName);
  };

  const handleUnionChange = (event) => {
    setSelectedUnion(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}>
      
      {/* District */}
      <FormControl fullWidth>
        <InputLabel id="district-label">জেলা</InputLabel>
        <Select
          labelId="district-label"
          value={selectedDistrict}
          label="জেলা"
          onChange={handleDistrictChange}
        >
          {loadingDistricts ? (
            <MenuItem value="">
              <CircularProgress size={20} /> লোড হচ্ছে...
            </MenuItem>
          ) : (
            districts.map((district) => (
              <MenuItem key={district._id} value={district.district}>
                {district.district}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      {/* Upazila */}
      <FormControl fullWidth disabled={!selectedDistrict}>
        <InputLabel id="upazila-label">থানা</InputLabel>
        <Select
          labelId="upazila-label"
          value={selectedUpazila}
          label="থানা"
          onChange={handleUpazilaChange}
        >
          {loadingUpazilas ? (
            <MenuItem value="">
              <CircularProgress size={20} /> লোড হচ্ছে...
            </MenuItem>
          ) : (
            upazilas.map((upazila) => (
              <MenuItem key={upazila._id} value={upazila.upazilla}>
                {upazila.upazilla}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      {/* Union */}
      <FormControl fullWidth disabled={!selectedUpazila}>
        <InputLabel id="union-label">ইউনিয়ন</InputLabel>
        <Select
          labelId="union-label"
          value={selectedUnion}
          label="ইউনিয়ন"
          onChange={handleUnionChange}
        >
          {loadingUnions ? (
            <MenuItem value="">
              <CircularProgress size={20} /> লোড হচ্ছে...
            </MenuItem>
          ) : (
            unions.map((union) => (
              <MenuItem key={union._id} value={union.union}>
                {union.union}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

    </Box>
  );
}
