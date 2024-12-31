import React from 'react';
import Navbar from './components/Navbar';
import AddEmployeeForm from './components/AddEmployeeForm';
import EmployeeList from './components/EmployeeList';
import { Container } from '@mui/material';

function App() {
    return (
        <div>
            <Navbar />
            <Container>
                <AddEmployeeForm />
                <EmployeeList />
            </Container>
        </div>
    );
}

export default App;
