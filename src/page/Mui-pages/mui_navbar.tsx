import React, { useState } from 'react';
import { 
  AppBar, Avatar, Divider, Drawer, IconButton, 
  ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography 
} from '@mui/material';
import { 
  Home, LocalActivity, LocalMallSharp, Logout, Menu, ShoppingCartSharp 
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

// 1. تعريف واجهة برمجة للـ Props الخاصة بالمكون
interface MnavProps {
  mode?: 'light' | 'dark' | any; // جعله اختيارياً باستخدام علامة الاستفهام (?) لمنع الخطأ في ملف Layout
}

// 2. تعريف واجهة برمجة لعناصر القائمة الجانبية
interface NavItem {
  name: string;
  link: string;
}

export function Mnav({ mode }: MnavProps): React.JSX.Element {
  const drawerWidth = 200;

  // إزالة الفراغات الزائدة من الروابط لضمان عمل مقارنة المسارات بشكل صحيح
  const navitem: NavItem[] = [
    { name: "Home", link: "/Home" },
    { name: "Add expenses", link: "/Addexpenses" },
    { name: "My expenses", link: "/Myexpenses" }, 
    { name: "Order", link: "/Order" },
  ];
  
  const location = useLocation();

  // 3. تحديد أنواع الـ State بدقة بدلاً من الاستنتاج العشوائي
  const [drop, setdrop] = useState<"none" | "block">("none");
  const [drawertype, setdrawertype] = useState<"permanent" | "temporary">("permanent");

  const dropmneu = (): void => {
    setdrop("block");
    setdrawertype("temporary");
  };

  return (
    <>
      <AppBar 
        position="absolute" 
        sx={{ 
          width: { sm: `calc(100% - ${drawerWidth}px)` }, 
          ml: { sm: `${drawerWidth}px` }, 
          height: 57 
        }} 
      >
        <Toolbar>
          <IconButton 
            onClick={() => { dropmneu(); }}
            color="inherit"
            sx={{ 
              ml: -1, 
              mr: `5px`, 
              width: 37, 
              height: 37, 
              display: { sm: "none", xs: "block" } 
            }}
          >
            <Menu sx={{ ml: `-4px`, mt: `-20px`, fontSize: 28 }} />
          </IconButton>
         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, mb: { sm: 1, xs: 0 } }}>
            News
          </Typography>
          <Avatar className="sm:mb-2 dark:bg-stone-300" />
        </Toolbar>
      </AppBar>

      <Drawer 
        sx={{
          width: drawerWidth,         
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            display: { xs: drop, sm: "block" },
          },
        }}
        variant={drawertype}
        open={true}
        onClose={() => { 
          setdrop("none"); 
          setdrawertype("permanent"); 
        }}
        anchor="left"
      >
        <Toolbar sx={{ mt: { xs: -7, sm: -8 } }} />
        <div className='flex justify-evenly'>
          <IconButton sx={{ m: 1 }}>
            <Menu />
          </IconButton> 
        </div>  
        <Divider />

        {navitem.map((Item: NavItem, index: number) => (
          <Link to={Item.link} key={index}>          
            <ListItemButton 
              sx={{   
                bgcolor: location.pathname === Item.link ? "#91909046" : null
              }} 
            >
              <ListItemIcon>
                {index === 0 ? <Home /> : index === 1 ? <ShoppingCartSharp /> : index === 2 ? <LocalMallSharp /> : <LocalActivity />}
              </ListItemIcon>
              <ListItemText primary={Item.name} />
            </ListItemButton>
          </Link>
        ))}

        <Link to="/">
          <ListItemButton>
            <ListItemIcon>
              <Logout /> 
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </Link>
   
        <Divider />
      </Drawer>
    </>
  );
}