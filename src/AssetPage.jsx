import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ChevronDown, Power ,CirclePlus } from 'lucide-react';
import logo from './img/snru-logo-n.png';
import { Link } from "react-router-dom";

const AssetPage = () => {
  const [assetData, setAssetData] = useState([
    {
      id: 'A001',
      name: 'เครื่องปรับอากาศ',
      brand: 'Daikin Inverter',
      department: 'ฝ่ายอาคารสถานที่',
      acquiredDate: '2023-05-10',
      status: 'ใช้งานอยู่',
    },
    {
      id: 'A002',
      name: 'คอมพิวเตอร์ตั้งโต๊ะ',
      brand: 'Dell OptiPlex 7090',
      department: 'ฝ่ายเทคโนโลยีสารสนเทศ',
      acquiredDate: '2022-11-22',
      status: 'ชำรุด',
    },
  ]);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    brand: '',
    department: '',
    acquiredDate: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateNewAssetId = () => {
    const lastAsset = assetData[assetData.length - 1];
    if (lastAsset) {
      const lastId = lastAsset.id;
      const lastNumber = parseInt(lastId.replace('A', ''));
      return `A${(lastNumber + 1).toString().padStart(3, '0')}`;
    }
    return 'A001';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedData = assetData.map(item =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setAssetData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.id &&
      formData.name &&
      formData.brand &&
      formData.department &&
      formData.acquiredDate
    ) {
      const newAsset = {
        ...formData,
        status: 'ใช้งานอยู่',
      };
      setAssetData(prev => [...prev, newAsset]);
      setFormData({
        id: '',
        name: '',
        brand: '',
        department: '',
        acquiredDate: '',
      });
      setIsModalOpen(false);
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  };

  const filteredData = assetData.filter(item =>
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      

      <div className="bg-green-100 px-4 py-2 text-sm text-gray-700">
      <Link to="/"><span className="text-purple-700 font-bold">หน้าหลัก</span></Link>
        <span className="mx-2">/</span>
        <span className="text-purple-700 font-bold">ข้อมูลครุภัณฑ์</span>
      </div>

      <div className="bg-[#e7fff8] py-5 px-4 min-h-screen">
        <main className="bg-white w-full px-4 pb-10 pt-1">
          <h1 className="text-2xl font-bold mb-4">ข้อมูลครุภัณฑ์</h1>

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
                setFormData(prev => ({ ...prev, id: generateNewAssetId() }));
                setIsModalOpen(true);
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex "
            >
              <CirclePlus className='mr-1'/> 
              เพิ่มครุภัณฑ์
            </button>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
                <h2 className="text-xl font-bold mb-4">เพิ่มข้อมูลครุภัณฑ์ใหม่</h2>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="id"
                    placeholder="รหัสครุภัณฑ์"
                    value={formData.id}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                    readOnly
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="ชื่อครุภัณฑ์"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="brand"
                    placeholder="รุ่น/ยี่ห้อ"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="department"
                    placeholder="หน่วยงาน"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="date"
                    name="acquiredDate"
                    value={formData.acquiredDate}
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
                  <th className="px-4 py-2 border">หน่วยงาน</th>
                  <th className="px-4 py-2 border">รหัสครุภัณฑ์</th>
                  <th className="px-4 py-2 border">ชื่อครุภัณฑ์</th>
                  <th className="px-4 py-2 border">รุ่น/ยี่ห้อ</th>
                  <th className="px-4 py-2 border">วันที่ได้มา</th>
                  <th className="px-4 py-2 border">สถานะ</th>
                  <th className="px-4 py-2 border">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border text-center">{index + 1}</td>
                    <td className="px-4 py-2 border text-center">{item.department}</td>
                    <td className="px-4 py-2 border text-center">{item.id}</td>
                    <td className="px-4 py-2 border text-center">{item.name}</td>
                    <td className="px-4 py-2 border text-center">{item.brand}</td>
                    <td className="px-4 py-2 border text-center">{item.acquiredDate}</td>
                    <td className={`px-4 py-2 border text-center font-medium border-black ${item.status === "ใช้งานอยู่" ? "text-green-800" : "text-red-600"
                      }`}>
                      {item.status}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <div className="flex justify-center gap-2 flex-wrap">
                        <button
                          className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
                          onClick={() => handleStatusChange(item.id, "ใช้งานอยู่")}
                        >
                          ใช้งานอยู่
                        </button>
                        <button
                          className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600"
                          onClick={() => handleStatusChange(item.id, "ชำรุด")}
                        >
                          ชำรุด
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
                          onClick={() => handleStatusChange(item.id, "จำหน่ายแล้ว")}
                        >
                          จำหน่ายแล้ว
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

export default AssetPage;
