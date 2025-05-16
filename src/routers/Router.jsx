import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layouts from '../layouts/Layouts.jsx';
import RepairList from '../RepairList';
import EquipmentRepairForm1 from '../EquipmentRepairForm1.jsx';
import MaintenanceTypePage from '../MaintenanceTypePage.jsx';
import MaintenanceListPage from '../MaintenanceListPage.jsx';
import AssetPage from '../AssetPage.jsx';
import ViewEquipmentRepair from '../ViewEquipmentRepair.jsx';

const router = createBrowserRouter([
    {
        path: "/", element: <Layouts />, children: [

            {path : "" , element: <RepairList />},
            {path : "equipmentrepairform1" , element: <EquipmentRepairForm1 />},
            {path : "mintenancetypepage" , element: <MaintenanceTypePage />},
            {path : "maintenancelistpage" , element: <MaintenanceListPage />},
            {path : "assetpage" , element: <AssetPage />},
            {path : "viewequipmentrepair" , element: <ViewEquipmentRepair />},
        ]
    }
])

const Router = () => {
  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default Router