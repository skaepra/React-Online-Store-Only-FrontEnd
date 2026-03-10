
import {   AppBar, Avatar,  Divider, Drawer,   IconButton, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import {   Home,  LocalActivity,  LocalMallSharp,    Logout,    Menu,    ShoppingCartSharp } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';






export function Mnav({mode}) {
  const drawerWidth = 200;

     const navitem = [
    { name: "Home", link: "/Home" },
    { name: "Add expenses", link: "/Addexpenses" },
    { name: "My expenses",link: "/Myexpenses " },
    { name: "Order",link: "/Order " },
  ];
 const location = useLocation();


 const [drop,setdrop] =useState("none")
 const [drawertype,setdrawertype] =useState("permanent")
  const dropmneu=()=>{
   setdrop("block")
   setdrawertype("temporary")
  }
  return (
    <>
    
      <AppBar position="absolute" sx={{ 
       width: {sm:`calc(100% - ${drawerWidth}px)`}, ml: {sm:`${drawerWidth}px`},height:57 
        }} >
        <Toolbar>
          
          <IconButton onClick={()=>{dropmneu()}}
            color="inherit"
           sx={{ml:-1, mr:`5px`,flex:true, width:37, height:37,  display:{sm:"none",xs:"block"}}}>
            <Menu sx={{ml:`-4px`,mt:`-20px`,fontSize:28 }} />
          </IconButton>
         
          <Typography  variant="h6" component="div" sx={{ flexGrow: 1 , mb:{sm:1,xs:0} }}>
            News
          </Typography>
          <Avatar className=" sm:mb-2 dark:bg-stone-300" ></Avatar>
        </Toolbar>
      </AppBar>
   

  <Drawer 
   
        sx={{
          
            // bgcolor:{sm:red},
        
          width: drawerWidth,         
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            
            display:{xs:drop,sm:"block"},
            
          },
        }}
        variant={drawertype}
        open={true}
        onClose={()=>{ setdrop("none") , setdrawertype("permanent")}}
        anchor="left"

>
          
        <Toolbar sx={{mt:{xs:-7,sm:-8}}}/>
        <div className=' flex  justify-evenly ' >
         <IconButton sx={{m:1 }} >
          <Menu />
         </IconButton> 
         </div>  
        <Divider/>
     


          {navitem.map((Item, index) => (
            <Link to={Item.link}  key={index}  >           
              <ListItemButton sx={{  
                // ...(location.pathname===Item.link && {
                //    bgcolor:"#91909046"
                // }) ,             
                bgcolor:location.pathname===Item.link?"#91909046":null
              }} >
                <ListItemIcon>
                  {index ==0  ? <Home /> :index==1? <ShoppingCartSharp/>:index==2?<LocalMallSharp />:
                  <LocalActivity/>}
                </ListItemIcon>
                <ListItemText primary={Item.name} />
              </ListItemButton>
            </Link>
          ))}

              <Link to="/">
              <ListItemButton >
                <ListItemIcon>
                <Logout/> 
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
          </Link>
   
        <Divider />
      </Drawer>
       
   

      
      </>
  );
}
