// import React from 'react';
// import { AppBar, Toolbar, Typography, Button } from '@mui/material';

// function Navbar() {
//     return (
//         <AppBar position="sticky">
//             <Toolbar>
//                 <Typography variant="h6" style={{ flexGrow: 1 }}>Employee Management</Typography>
//                 <Button color="inherit">Home</Button>
//                 <Button color="inherit">Employees</Button>
//             </Toolbar>
//         </AppBar>
//     );
// }

// export default Navbar;




import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';

function Navbar() {
    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#3f51b5' }}>
            <Toolbar>
                {/* Logo or Branding */}
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                    Employee Management
                </Typography>

                {/* Navigation Buttons with Icons */}
                <Button
                    color="inherit"
                    startIcon={<HomeIcon />}
                    sx={{ marginRight: 2 }}
                >
                    Home
                </Button>
                <Button
                    color="inherit"
                    startIcon={<GroupIcon />}
                    sx={{ marginRight: 2 }}
                >
                    Employees
                </Button>

                {/* Add Additional Buttons if Needed */}
                <Button variant="contained" color="secondary">
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
