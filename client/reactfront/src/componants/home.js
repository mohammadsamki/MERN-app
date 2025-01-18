import * as React from 'react';

import { extendTheme, styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import { AppProvider } from '@toolpad/core/AppProvider';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashBoard from './dashBoard';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import DescriptionIcon from '@mui/icons-material/Description';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FullFeaturedCrudGrid from './user';
import Grid from '@mui/material/Grid2';
import LayersIcon from '@mui/icons-material/Layers';
import Orders from './orders';
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
  if(pathname =='/LogOut'){
    console.log('logging out')
    sessionStorage.removeItem('jwt')
    window.location.href = "/login"
  }

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
  const allPages  = [{
    path:'/dashboard',
    componant:<DashBoard />,
  },
  {
    path:'/orders',
    componant:<Orders />,
  },
  {
    path:'/users',
    componant:<FullFeaturedCrudGrid />,
  },
];
const [CurrentComponant,setCurrentComponant] = useState(allPages[0].componant);
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
      segment: 'orders',
      title: 'Orders',
      icon: <ShoppingCartIcon />,
    },
    {
      segment: 'LogOut',
      title: 'LogOut',
      icon: <ExitToAppIcon onClick={()=>{
        console.log('logout');
      }} />,
    },



  ]);
  const handelLogOut = ()=>{
    sessionStorage.removeItem('jwt');
    navigate('/login')
  }
  const router = useDemoRouter('/dashboard');

  useEffect(()=>{
    // alert('fetching users');
    // if (!sessionStorage.getItem('jwt')){
    //     navigate('/login')
    // }
    const token = sessionStorage.getItem('jwt');
    // axios.defaults.headers.common['Auth'] = `Bearer ${token}`;

    const validateToken = async ()=>{
        try{
            const res = await axios.get('https://mern-app-4mhj.onrender.com/api/home',{
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
                          segment: 'users',
                          title: 'Users',
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
                        {
                          segment: 'LogOut',
                          title: 'LogOut',
                          onClick:handelLogOut,
                          icon: <div onClick={()=>{console.log('logOut')}}>
                            <ExitToAppIcon />
                          </div>,


                        },
                      ],

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

    validateToken()
    console.log(router)
    setCurrentComponant(allPages.find((page) => page.path === router.pathname)?.componant)

   },[router])


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
          {CurrentComponant}
        </PageContainer>


      </DashboardLayout>
    </AppProvider>
  );
}

