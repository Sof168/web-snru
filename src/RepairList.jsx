import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Power } from "lucide-react";
import logo from "./img/snru-logo-n.png";

const RepairList = () => {
  const [repairData, setRepairData] = useState([
    {
      id: "CRP001",
      requester: "นางสาวนิภาพร ใจดี",
      department: "งานพัสดุ",
      date: "04/04/2568",
      status: "รออนุมัติ",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // ฟังก์ชันกำหนดสีของสถานะ
  const getStatusStyle = (status) => {
    switch (status) {
      case "รออนุมัติ":
        return "bg-blue-200 text-blue-800";
      case "อนุมัติแล้ว":
        return "bg-green-200 text-green-800";
      case "คืนแก้ไข":
        return "bg-yellow-200 text-yellow-800";
      case "ยกเลิกแล้ว":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  // เปลี่ยนสถานะ
  const handleStatusChange = (id, newStatus) => {
    const updatedData = repairData.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setRepairData(updatedData);
  };

  // กรองคำค้น
  const filteredData = repairData.filter(
    (item) =>
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ไปหน้ารายละเอียด
  //const handleViewDetails = (id) => {
    //navigate(`/equipmentrepairform1/${id}`);
  //};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-100 px-4 py-2 text-sm text-gray-700">
        <Link to="/"><span className="text-purple-700 font-bold">หน้าหลัก</span></Link>
        <span className="mx-2">/</span>
        <span>รายการแจ้งซ่อมครุภัณฑ์</span>
      </div>

      <div className="bg-[#e7fff8] py-5 h-screen">
        <main className="bg-white w-full px-4 pb-10 pt-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              รายการแจ้งซ่อมครุภัณฑ์
            </h2>
            <input
              id="searchInput"
              type="text"
              placeholder="ค้นหา..."
              className="w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Link to="equipmentrepairform1">
            <button className="mb-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow">
              + แจ้งซ่อมครุภัณฑ์
            </button>
          </Link>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-blue-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">ลำดับ</th>
                  <th className="px-4 py-2 border">เลขที่ใบแจ้งซ่อม</th>
                  <th className="px-4 py-2 border">ผู้แจ้ง</th>
                  <th className="px-4 py-2 border">หน่วยงาน</th>
                  <th className="px-4 py-2 border">วันที่แจ้ง</th>
                  <th className="px-4 py-2 border">สถานะ</th>
                  <th className="px-4 py-2 border">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border text-center">{index + 1}</td>
                    <td className="px-4 py-2 border text-center">{item.id}</td>
                    <td className="px-4 py-2 border text-center">{item.requester}</td>
                    <td className="px-4 py-2 border text-center">{item.department}</td>
                    <td className="px-4 py-2 border text-center">{item.date}</td>
                    <td className="px-4 py-2 border text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <div className="flex justify-center gap-2 flex-wrap">
                        <Link to="viewequipmentrepair">
                        <button
                          className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
                          onClick={() => handleViewDetails(item.id)}
                        >
                          ดูข้อมูล
                        </button>
                        </Link>
                        <button
                          className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
                          onClick={() =>
                            handleStatusChange(item.id, "อนุมัติแล้ว")
                          }
                        >
                          อนุมัติ
                        </button>
                        <button
                          className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600"
                          onClick={() =>
                            handleStatusChange(item.id, "คืนแก้ไข")
                          }
                        >
                          คืนแก้ไข
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
                          onClick={() =>
                            handleStatusChange(item.id, "ยกเลิกแล้ว")
                          }
                        >
                          ยกเลิก
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RepairList;
