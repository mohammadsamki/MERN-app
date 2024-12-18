import * as React from 'react';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
// import { HighlightedCode } from '@mui/docs/HighlightedCode';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { experimentalStyled as styled } from '@mui/material/styles';

export default function DashBoard() {
    const [spacing, setSpacing] = React.useState(2);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
          backgroundColor: '#1A2027',
        }),
      }));
      const dashData = [
        {
            title: 'All User',
            description: 'View all users',
            url: '/user',
            number:200
        },
        {
            title: 'All orders',
            description: 'View all orders',
            url: '/orders',
            number:100
        },
        {
            title: 'Profits Report',
            description: 'View all profits',
            url: '/profit',
            number:1000
        },

      ]



    const jsx = `
  <Grid container spacing={${spacing}}>
  `;
    return(
        <>
       <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
  {Array.from(dashData).map((data, index) => (
    <Grid item xs={2} sm={4} md={4} key={index}>
      <Item>{data.title}</Item>
      <Item>{data.number}</Item>
    </Grid>
  ))}
</Grid>
        </>
    )
}
