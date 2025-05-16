import React from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDown, Power } from "lucide-react";
import logo from "./img/snru-logo-n.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="w-full mx-auto px-4 py-3 flex justify-between items-center bg-green-900">
        <div className="flex items-center">
          <Link to = "/"><img src={logo} className="w-16 h-auto" alt="SNRU Logo" /></Link>
          <div className="grid pl-2 text-white">
            <span className="text-xl">ระบบแจ้งซ่อมครุภัณฑ์</span>
            <span className="text-sm">มหาวิทยาลัยราชภัฏสกลนคร</span>
          </div>
        </div>
        <div className="flex space-x-4 items-center">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-green-900 px-3 py-2 text-sm font-semibold text-white">
                ข้อมูลการซ่อมบำรุง
                <ChevronDown className="size-5 text-white" aria-hidden="true" />
              </MenuButton>
            </div>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-in"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-20">
                <div className="py-1">
                  <MenuItem>
                    {({ active }) => (
                        <Link
                          to = "mintenancetypepage"
                          className={`block px-4 py-2 text-sm ${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          ประเภทการซ่อมบำรุง
                        </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="maintenancelistpage"
                        className={`block px-4 py-2 text-sm ${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }`}
                      >
                        รายการซ่อมบำรุง
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="assetpage"
                        className={`block px-4 py-2 text-sm ${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }`}
                      >
                        ข้อมูลครุภัณฑ์
                      </Link>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Transition>
          </Menu>

          <a href="/" className="text-white">
            ชื่อผู้ใช้
          </a>
          <button className="text-white bg-red-500 p-2 rounded hover:bg-red-600">
            <Power size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
