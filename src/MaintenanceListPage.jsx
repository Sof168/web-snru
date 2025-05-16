import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ChevronDown, Power, CirclePlus } from 'lucide-react';
import logo from './img/snru-logo-n.png';
import { Link } from "react-router-dom";

const MaintenanceListPage = () => {
  const [repairData, setRepairData] = useState([
    {
      id: 'R001',
      assetId: 'A001',
      description: 'เปลี่ยนแอร์',
      repairDate: '2023-06-15',
      status: 'เสร็จสิ้น',
    },
    {
      id: 'R002',
      assetId: 'A002',
      description: 'ซ่อมเมนบอร์ด',
      repairDate: '2023-07-20',
      status: 'รอดำเนินการ',
    },
  ]);

  const [formData, setFormData] = useState({
    id: '',
    assetId: '',
    description: '',
    repairDate: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateNewRepairId = () => {
    const lastRepair = repairData[repairData.length - 1];
    if (lastRepair) {
      const lastId = lastRepair.id;
      const lastNumber = parseInt(lastId.replace('R', ''));
      return `R${(lastNumber + 1).toString().padStart(3, '0')}`;
    }
    return 'R001';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedData = repairData.map(item =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setRepairData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.id &&
      formData.assetId &&
      formData.description &&
      formData.repairDate
    ) {
      const newRepair = {
        ...formData,
        status: 'รอดำเนินการ',
      };
      setRepairData(prev => [...prev, newRepair]);
      setFormData({
        id: '',
        assetId: '',
        description: '',
        repairDate: '',
      });
      setIsModalOpen(false);
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  };

  const filteredData = repairData.filter(item =>
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.assetId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      

      <div className="bg-green-100 px-4 py-2 text-sm text-gray-700">
      <Link to="/"><span className="text-purple-700 font-bold">หน้าหลัก</span></Link>
        <span className="mx-2">/</span>
        <span className="text-purple-700 font-bold">ข้อมูลการซ่อมบำรุง</span>
      </div>

      <div className="bg-[#e7fff8] py-5 px-4 min-h-screen">
        <main className="bg-white w-full px-4 pb-10 pt-1">
          <h1 className="text-2xl font-bold mb-4">ข้อมูลการซ่อมบำรุง</h1>

          <div className="flex mb-4 items-center gap-2">
            <input
              type="text"
              placeholder="ค้นหา..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded px-3 py-2 w-1/3"
            />
            <button
              onClick={() => {
                setFormData(prev => ({ ...prev, id: generateNewRepairId() }));
                setIsModalOpen(true);
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex "
            >
              <CirclePlus className='mr-1'/> 
              เพิ่มรายการซ่อมบำรุง
            </button>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
                <h2 className="text-xl font-bold mb-4">เพิ่มรายการซ่อมบำรุงใหม่</h2>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="id"
                    placeholder="รหัสการซ่อมบำรุง"
                    value={formData.id}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                    readOnly
                  />
                  <input
                    type="text"
                    name="assetId"
                    placeholder="รหัสครุภัณฑ์"
                    value={formData.assetId}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="description"
                    placeholder="คำอธิบายการซ่อมบำรุง"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="date"
                    name="repairDate"
                    value={formData.repairDate}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    >
                      บันทึก
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-blue-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">ลำดับ</th>
                  <th className="px-4 py-2 border">รหัสการซ่อมบำรุง</th>
                  <th className="px-4 py-2 border">รหัสครุภัณฑ์</th>
                  <th className="px-4 py-2 border">คำอธิบาย</th>
                  <th className="px-4 py-2 border">วันที่ซ่อมบำรุง</th>
                  <th className="px-4 py-2 border">สถานะ</th>
                  <th className="px-4 py-2 border">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border text-center">{index + 1}</td>
                    <td className="px-4 py-2 border text-center">{item.id}</td>
                    <td className="px-4 py-2 border text-center">{item.assetId}</td>
                    <td className="px-4 py-2 border text-center">{item.description}</td>
                    <td className="px-4 py-2 border text-center">{item.repairDate}</td>
                    <td className={`px-4 py-2 border text-center font-medium border-black ${item.status === "เสร็จสิ้น" ? "text-green-800" : "text-red-600"}`}>
                      {item.status}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <div className="flex justify-center gap-2 flex-wrap">
                        <button
                          className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
                          onClick={() => handleStatusChange(item.id, "เสร็จสิ้น")}
                        >
                          เสร็จสิ้น
                        </button>
                        <button
                          className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600"
                          onClick={() => handleStatusChange(item.id, "รอดำเนินการ")}
                        >
                          รอดำเนินการ
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
                          onClick={() => handleStatusChange(item.id, "ยกเลิก")}
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

export default MaintenanceListPage;
