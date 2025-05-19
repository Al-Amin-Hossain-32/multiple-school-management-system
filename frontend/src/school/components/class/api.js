import axios from 'axios';

const API_URL = 'http://localhost:5000/api/classes'; 

// Create new class
export const createClass = (data) => axios.post(`${API_URL}/create`, data);

// Get all classes
export const getAllClasses = () => axios.get(`${API_URL}/list`);

// Get one class by ID
export const getClassById = (id) => axios.get(`${API_URL}/view/${id}`);

// Update class by ID
export const updateClass = (id, data) => axios.put(`${API_URL}/update/${id}`, data);

// Delete class by ID
export const deleteClass = (id) => axios.delete(`${API_URL}/delete/${id}`);
