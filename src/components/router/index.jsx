import {  DemoTabel, FormControl, } from "pages";

const MenuRoutes = [
 
  {
    path: "/form-control",
    exact: true,
    title: "Form",
    component: () => <FormControl />
  },
  {
    path: "/demo-tabel",
    exact: true,
    title: "Demo Tabel",
    component: () => <DemoTabel />
  }
 
];

export default MenuRoutes;
