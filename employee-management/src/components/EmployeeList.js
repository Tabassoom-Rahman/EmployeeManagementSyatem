import React, { useEffect, useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import axios from 'axios';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedPosition, setUpdatedPosition] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedPhone, setUpdatedPhone] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const countries = [
        { name: 'Australia', code: '+61', length: 9 },
        { name: 'Bangladesh', code: '+880', length: 10 },
        { name: 'Brazil', code: '+55', length: 11 },
        { name: 'China', code: '+86', length: 11 },
        { name: 'France', code: '+33', length: 9 },
        { name: 'Germany', code: '+49', length: 10 },
        { name: 'India', code: '+91', length: 10 },
        { name: 'Italy', code: '+39', length: 10 },
        { name: 'Japan', code: '+81', length: 10 },
        { name: 'Netherlands', code: '+31', length: 9 },
        { name: 'New Zealand', code: '+64', length: 8 },
        { name: 'Norway', code: '+47', length: 8 },
        { name: 'Russia', code: '+7', length: 10 },
        { name: 'South Africa', code: '+27', length: 9 },
        { name: 'South Korea', code: '+82', length: 10 },
        { name: 'Spain', code: '+34', length: 9 },
        { name: 'Sweden', code: '+46', length: 10 },
        { name: 'Turkey', code: '+90', length: 10 },
        { name: 'United Kingdom', code: '+44', length: 10 },
        { name: 'United States', code: '+1', length: 10 },
    ];

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
        const interval = setInterval(() => {
            fetchEmployees();
        }, 5000); // Fetch every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const handleEditClick = (employee) => {
        setSelectedEmployee(employee);
        setUpdatedName(employee.name);
        setUpdatedPosition(employee.position);
        setUpdatedEmail(employee.email);
        setUpdatedPhone(employee.phone);
        setCountryCode(employee.countryCode || '');
        setEditDialogOpen(true);
    };

    const handleDeleteClick = (employee) => {
        setSelectedEmployee(employee);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/employees/${selectedEmployee._id}`);
            setEmployees((prevEmployees) =>
                prevEmployees.filter((employee) => employee._id !== selectedEmployee._id)
            );
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleEditSave = async () => {
        const sanitizedPhone = updatedPhone.replace(/\D/g, ''); // Remove non-digit characters
        
        if (!isValidEmail(updatedEmail)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        if (!validatePhone(sanitizedPhone, countryCode)) {
            setPhoneError('Please enter a valid phone number');
            return;
        }

        try {
            await axios.put(`http://localhost:5000/api/employees/${selectedEmployee._id}`, {
                name: updatedName,
                position: updatedPosition,
                email: updatedEmail,
                phone: sanitizedPhone,
                countryCode: countryCode,
            });
            setEmployees((prevEmployees) =>
                prevEmployees.map((employee) =>
                    employee._id === selectedEmployee._id
                        ? { ...employee, name: updatedName, position: updatedPosition, email: updatedEmail, phone: sanitizedPhone, countryCode: countryCode }
                        : employee
                )
            );
            setEditDialogOpen(false);
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    const validatePhone = (phone, countryCode) => {
        if (!/^[0-9]+$/.test(phone)) return false;

        const country = countries.find((c) => c.code === countryCode);
        return country ? phone.length === country.length : false;
    };

    const isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const handleCountryCodeChange = (e) => {
        const selectedCode = e.target.value;
        setCountryCode(selectedCode);
        setUpdatedPhone(''); // Reset the phone number when the country code is changed
        setPhoneError(''); // Clear phone error
    };

    const handlePhoneChange = (e) => {
        const selectedCountry = countries.find((country) => country.code === countryCode);
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters

        if (selectedCountry && value.length > selectedCountry.length) {
            // Limit input to the max length for the selected country
            value = value.slice(0, selectedCountry.length);
        }
        setUpdatedPhone(value);
        setPhoneError(''); // Clear error as user is typing
    };

    return (
        <Container sx={{ marginTop: '50px' }}>
            <h2>Employee List</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Position</strong></TableCell>
                            <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>Phone</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee._id}>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.position}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.phone}</TableCell>
                                <TableCell>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        style={{ marginRight: '10px' }}
                                        onClick={() => handleEditClick(employee)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        color="error"
                                        variant="contained"
                                        onClick={() => handleDeleteClick(employee)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                <DialogTitle>Edit Employee</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        fullWidth
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        style={{ marginTop: '5px' }}
                    />
                    <TextField
                        label="Position"
                        fullWidth
                        value={updatedPosition}
                        onChange={(e) => setUpdatedPosition(e.target.value)}
                        style={{ marginTop: '15px' }}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        value={updatedEmail}
                        onChange={(e) => {
                            setUpdatedEmail(e.target.value);
                            setEmailError('');
                        }}
                        error={!!emailError}
                        helperText={emailError}
                        style={{ marginTop: '15px' }}
                    />
                    <Grid container spacing={1} style={{ marginTop: '2px' }}>
                        <Grid item xs={4}>
                            <FormControl fullWidth error={!!phoneError}>
                                <InputLabel>Country Code</InputLabel>
                                <Select
                                    value={countryCode}
                                    onChange={handleCountryCodeChange}
                                    label="Country Code"
                                >
                                    {countries.map((country) => (
                                        <MenuItem key={country.code} value={country.code}>
                                            {country.name} ({country.code})
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{phoneError ? 'Select a valid country code' : ''}</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item xs={8}>
                            <TextField
                                label="Phone"
                                fullWidth
                                value={updatedPhone}
                                onChange={handlePhoneChange}
                                error={!!phoneError}
                                helperText={phoneError}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this employee?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default EmployeeList;
