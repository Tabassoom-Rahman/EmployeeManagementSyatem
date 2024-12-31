import React, { useState } from 'react';
import { Button, TextField, Container, MenuItem, Select, InputLabel, FormControl, FormHelperText, Grid } from '@mui/material';
import axios from 'axios';

function AddEmployeeForm() {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
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
        // Add other countries with respective lengths
    ];

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone, countryCode) => {
        const selectedCountry = countries.find((country) => country.code === countryCode);
        if (!selectedCountry) return false; // Invalid country code
        return phone.length === selectedCountry.length;
    };

    const handleCountryChange = (e) => {
        const selectedCode = e.target.value;
        setCountryCode(selectedCode);
        setPhone(''); // Clear phone number when the country is changed
        setPhoneError(''); // Clear any existing phone error
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        const selectedCountry = countries.find((country) => country.code === countryCode);

        if (selectedCountry && value.length > selectedCountry.length) {
            // Prevent input beyond the allowed length
            setPhone(value.slice(0, selectedCountry.length));
        } else {
            setPhone(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setEmailError('');
        setPhoneError('');

        const lowercasedEmail = email.toLowerCase();

        if (!validateEmail(lowercasedEmail)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        if (!validatePhone(phone, countryCode)) {
            setPhoneError('Please enter a valid phone number');
            return;
        }

        try {
            const newEmployee = { name, position, email: lowercasedEmail, phone, countryCode };
            await axios.post('http://localhost:5000/api/employees', newEmployee);
            setName('');
            setPosition('');
            setEmail('');
            setPhone('');
            setCountryCode('');
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    return (
        <Container>
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginTop: '10px' }}
                />
                <TextField
                    label="Position"
                    fullWidth
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    style={{ marginTop: '10px' }}
                />
                <TextField
                    label="Email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ marginTop: '10px' }}
                    error={!!emailError}
                    helperText={emailError}
                />

                <Grid container spacing={1} style={{ marginTop: '10px' }}>
                    <Grid item xs={4}>
                        <FormControl fullWidth error={!!phoneError}>
                            <InputLabel>Country Code</InputLabel>
                            <Select
                                value={countryCode}
                                onChange={handleCountryChange}
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
                            value={phone}
                            onChange={handlePhoneChange}
                            error={!!phoneError}
                            helperText={phoneError}
                        />
                    </Grid>
                </Grid>

                <div style={{ marginTop: '16px' }}>
                    <Button type="submit" variant="contained" color="primary">
                        Add Employee
                    </Button>
                </div>
            </form>
        </Container>
    );
}

export default AddEmployeeForm;
