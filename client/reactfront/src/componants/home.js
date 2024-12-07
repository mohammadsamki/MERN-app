import * as React from 'react';

import { extendTheme, styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import { AppProvider } from '@toolpad/core/AppProvider';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import DescriptionIcon from '@mui/icons-material/Description';
import Grid from '@mui/material/Grid2';
import LayersIcon from '@mui/icons-material/Layers';
import { PageContainer } from '@toolpad/core/PageContainer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import { useNavigate } from'react-router-dom';

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function Home(props) {
  const { window } = props;
  const [user, setUsers] = useState([]);
  const navigate = useNavigate();
  const [navigationDash, setNavigationDash] = useState([
    {
      kind: 'header',
      title: 'Main items',
    },
    {
      segment: 'dashboard',
      title: 'Dashboard',
      icon: <DashboardIcon />,
    },
    {
      segment: 'orders',
      title: 'Orders',
      icon: <ShoppingCartIcon />,
    },
    {
      kind: 'divider',
    },

  ]);
  useEffect(()=>{
    // alert('fetching users');
    // if (!sessionStorage.getItem('jwt')){
    //     navigate('/login')
    // }
    const token = sessionStorage.getItem('jwt');
    // axios.defaults.headers.common['Auth'] = `Bearer ${token}`;

    const validateToken = async ()=>{
        try{
            const res = await axios.get('http://127.0.0.1:5001/api/home',{
                headers: {
                    'Auth': 'Bearer '+token
                }
            })
            console.log("token",res.data);
            setUsers(res.data.user)
            if (res.data.user.roul==='admin'){
                console.log('admin')
                setNavigationDash(
                    [
                        {
                          kind: 'header',
                          title: 'Main items',
                        },
                        {
                          segment: 'dashboard',
                          title: 'Dashboard',
                          icon: <DashboardIcon />,
                        },
                        {
                          segment: 'orders',
                          title: 'Orders',
                          icon: <ShoppingCartIcon />,
                        },
                        {
                          kind: 'divider',
                        },
                        {
                          kind: 'header',
                          title: 'Analytics',
                        },
                        {
                          segment: 'reports',
                          title: 'Reports',
                          icon: <BarChartIcon />,
                          children: [
                            {
                              segment: 'sales',
                              title: 'Sales',
                              icon: <DescriptionIcon />,
                            },
                            {
                              segment: 'traffic',
                              title: 'Traffic',
                              icon: <DescriptionIcon />,
                            },
                          ],
                        },
                        {
                          segment: 'integrations',
                          title: 'Integrations',
                          icon: <LayersIcon />,
                        },
                      ]
                )
            }
        }
        catch(err){
            console.log(err);
            if (err.response.status === 401){
                navigate('/login')
            }
        }
    }
    // console.log(token);

    validateToken()

   },[user])
//    const NAVIGATION = [
//     {
//       kind: 'header',
//       title: 'Main items',
//     },
//     {
//       segment: 'dashboard',
//       title: 'Dashboard',
//       icon: <DashboardIcon />,
//     },
//     {
//       segment: 'orders',
//       title: 'Orders',
//       icon: <ShoppingCartIcon />,
//     },
//     {
//       kind: 'divider',
//     },
//     {
//       kind: 'header',
//       title: 'Analytics',
//     },
//     {
//       segment: 'reports',
//       title: 'Reports',
//       icon: <BarChartIcon />,
//       children: [
//         {
//           segment: 'sales',
//           title: 'Sales',
//           icon: <DescriptionIcon />,
//         },
//         {
//           segment: 'traffic',
//           title: 'Traffic',
//           icon: <DescriptionIcon />,
//         },
//       ],
//     },
//     {
//       segment: 'integrations',
//       title: 'Integrations',
//       icon: <LayersIcon />,
//     },
//   ];

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={navigationDash}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
          <Grid container spacing={1}>
            <h1>{user.roul} </h1>
            <Grid size={5} />
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>
            <Grid size={4}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={8}>
              <Skeleton height={100} />
            </Grid>

            <Grid size={12}>
              <Skeleton height={150} />
            </Grid>
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>

            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}

