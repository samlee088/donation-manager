import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const pages = [
  { name: "Registrations", link: '/' },
  { name: "Distributions", link: 'donationDistribution' },
  { name: "Summary", link: 'donationSummary' }
];

const StyledAppBar = styled(AppBar)`
  background: linear-gradient(to right, #4b2e83, #e8e3d3);
`;


function NavigationBar() {

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page, index) => (
              <Button
                key={index}
                component={Link}
                to={page.link}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}
export default NavigationBar;