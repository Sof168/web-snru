import React, { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { Link } from "react-router-dom";

const RepairTypePage = () => {
  const [repairTypes, setRepairTypes] = useState([
    { id: 'T001', name: 'ซ่อมทั่วไป' },
    { id: 'T002', name: 'เปลี่ยนอะไหล่' },
  ]);

  const [formData, setFormData] = useState({ id: '', name: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateNewTypeId = () => {
    const last = repairTypes[repairTypes.length - 1];
    if (last) {
      const number = parseInt(last.id.replace('T', '')) + 1;
      return `T${number.toString().padStart(3, '0')}`;
    }
    return 'T001';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id && formData.name) {
      setRepairTypes(prev => [...prev, formData]);
      setFormData({ id: '', name: '' });
      setIsModalOpen(false);
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  };

  const filteredTypes = repairTypes.filter(t =>
    t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-100 px-4 py-2 text-sm text-gray-700">
        <Link to="/"><span className="text-purple-700 font-bold">หน้าหลัก</span></Link>
        <span className="mx-2">/</span>
        <span className="text-purple-700 font-bold">ประเภทการซ่อมบำรุง</span>
      </div>

      <div className="bg-[#e7fff8] py-5 px-4 min-h-screen">
        <main className="bg-white w-full px-4 pb-10 pt-1">
          <h1 className="text-2xl font-bold mb-4">ประเภทการซ่อมบำรุง</h1>

          <div className="flex mb-4 items-center gap-2">
            <input
              type="text"
              placeholder="ค้นหาประเภท..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded px-3 py-2 w-1/3"
            />
            <button
              onClick={() => {
                setFormData({ id: generateNewTypeId(), name: '' });
                setIsModalOpen(true);
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex"
            >
              <CirclePlus className='mr-1' />
              เพิ่มประเภทการซ่อมบำรุง
            </button>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
              <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
                <h2 className="text-xl font-bold mb-4">เพิ่มประเภทใหม่</h2>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    readOnly
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="ชื่อประเภท"
                    value={formData.name}
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

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-blue-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">ลำดับ</th>
                  <th className="px-4 py-2 border">รหัสประเภท</th>
                  <th className="px-4 py-2 border">ชื่อประเภท</th>
                </tr>
              </thead>
              <tbody>
                {filteredTypes.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border text-center">{index + 1}</td>
                    <td className="px-4 py-2 border text-center">{item.id}</td>
                    <td className="px-4 py-2 border text-center">{item.name}</td>
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

export default RepairTypePage;
