import React, { useState, useMemo } from 'react';
import { Link } from "react-router-dom";

const Input = React.memo(({ label, type = "text", value, name, onChange, readOnly = false }) => (
    <div>
        <label className="block text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            value={value}
            name={name}
            onChange={onChange}
            readOnly={readOnly}
            className={`w-full px-3 py-2 border rounded shadow-sm focus:ring focus:border-blue-400 ${readOnly ? 'bg-gray-100' : ''}`}
        />
    </div>
));

const Select = ({ label, options, value, name, onChange }) => (
    <div>
        <label className="block text-gray-700 mb-1">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:ring focus:border-blue-400"
        >
            {options.map((option, i) => (
                <option key={i} value={option}>{option}</option>
            ))}
        </select>
    </div>
);

const Radio = ({ name, label, checked }) => (
    <label className="flex items-center gap-2">
        <input type="radio" name={name} defaultChecked={checked} />
        {label}
    </label>
);

const Section = ({ children }) => (
    <div className="col-span-1 space-y-4">
        {children}
    </div>
);

const EquipmentRepairForm1 = () => {
    const [lastRepairNumber, setLastRepairNumber] = useState(1);
    const [formData, setFormData] = useState({
        repairerName: '', position: '', mainDepartment: '', subDepartment: '',
        equipmentCode: '', equipmentName: '', brand: '', serialNo: '',
        equipmentType: '', repairType: '', repairItem: '', repairReason: '',
        estimateNumber: '', signer: '', priceCompany: '', estimatedPrice: '',
        priceDate: '', recordDate: '', budgetType: ''
    });

    const [items, setItems] = useState([]);

    const [showPopup, setShowPopup] = useState(false);
    const [newItem, setNewItem] = useState({ name: "", qty: "", unitPrice: 0, total: 0 });

    const extractNumber = (str) => parseFloat(str.match(/\d+(\.\d+)?/)?.[0]) || 0;

    const handleItemChange = (e) => {
        const { name, value } = e.target;
        const updatedItem = { ...newItem, [name]: value };

        const quantity = extractNumber(name === "qty" ? value : updatedItem.qty);
        const price = parseFloat(name === "unitPrice" ? value : updatedItem.unitPrice) || 0;
        updatedItem.total = quantity * price;

        setNewItem(updatedItem);
    };

    const handleAddItem = () => {
        if (!newItem.name || !newItem.qty || !newItem.unitPrice) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }
        const nextNo = items.length + 1;
        setItems([...items, { no: nextNo, ...newItem }]);
        setNewItem({ name: "", qty: "", unitPrice: 0, total: 0 });
        setShowPopup(false);
    };

    const handleDeleteItem = (no) => {
        const updatedItems = items.filter((item) => item.no !== no).map((item, index) => ({
            ...item, no: index + 1
        }));
        setItems(updatedItems);
    };

    const subTotal = items.reduce((sum, item) => sum + item.total, 0);
    const vat = subTotal * 0.07;
    const total = subTotal + vat;

    const repairCode = useMemo(() => {
        const date = new Date();
        const yyyymmdd = date.toISOString().slice(0, 10).replace(/-/g, '');
        const formattedNumber = String(lastRepairNumber).padStart(3, '0');
        return `RP-${yyyymmdd}-${formattedNumber}`;
    }, [lastRepairNumber]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = () => {
        const nextNumber = lastRepairNumber + 1;
        setLastRepairNumber(nextNumber);

        const date = new Date();
        const yyyymmdd = date.toISOString().slice(0, 10).replace(/-/g, '');
        const formattedNumber = String(nextNumber).padStart(3, '0');
        const newRepairCode = `RP-${yyyymmdd}-${formattedNumber}`;

        console.log('หมายเลขใบแจ้งซ่อม:', newRepairCode);
        console.log('ข้อมูลฟอร์ม:', formData);
        console.log('รายการ:', items);

        setFormData({
            repairerName: '', position: '', mainDepartment: '', subDepartment: '',
            equipmentCode: '', equipmentName: '', brand: '', serialNo: '',
            equipmentType: '', repairType: '', repairItem: '', repairReason: '',
            estimateNumber: '', signer: '', priceCompany: '', estimatedPrice: '',
            priceDate: '', recordDate: '', budgetType: ''
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-[#e7fff8] px-4 py-2 text-sm text-gray-700">
                <Link to="/"><span className="text-purple-700 font-bold">หน้าหลัก</span></Link>
                <span className="mx-2">/</span>
                <span className='text-purple-700 font-bold'>รายการแจ้งซ่อมครุภัณฑ์</span>
                <span className="mx-2">/</span>
                <span>แจ้งซ่อมครุภัณฑ์</span>
            </div>

            <div className='bg-[#e7fff8] py-5 h-full'>
                <div className="max-w-5xl mx-auto bg-white border shadow rounded-md">
                    <div className="bg-blue-600 text-white px-6 py-4 rounded-t">
                        <h1 className="text-xl font-semibold">ใบแจ้งซ่อมครุภัณฑ์</h1>
                        <p className="text-sm mt-1">แบบฟอร์มแจ้งซ่อมสำหรับครุภัณฑ์ทั่วไปในหน่วยงาน</p>
                    </div>

                    <form className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Section>
                            <Input label="เลขที่ใบแจ้งซ่อม" value={repairCode} readOnly />
                            <Input label="ชื่อผู้แจ้ง" name="repairerName" value={formData.repairerName} onChange={handleChange} />
                            <Input label="ตำแหน่ง" name="position" value={formData.position} onChange={handleChange} />
                            <Input label="หน่วยงานหลัก" name="mainDepartment" value={formData.mainDepartment} onChange={handleChange} />
                            <Input label="หน่วยงานย่อย" name="subDepartment" value={formData.subDepartment} onChange={handleChange} />
                        </Section>
                        <Section>
                            <Input label="รหัสครุภัณฑ์" name="equipmentCode" value={formData.equipmentCode} onChange={handleChange} />
                            <Input label="ชื่อครุภัณฑ์" name="equipmentName" value={formData.equipmentName} onChange={handleChange} />
                            <Input label="ยี่ห้อ" name="brand" value={formData.brand} onChange={handleChange} />
                            <Input label="หมายเลขครุภัณฑ์ (Serial No.)" name="serialNo" value={formData.serialNo} onChange={handleChange} />
                            <Input label="ประเภทครุภัณฑ์" name="equipmentType" value={formData.equipmentType} onChange={handleChange} />
                        </Section>
                        <Section>
                            <Select label="ประเภทการซ่อม" name="repairType" options={["ซ่อมบำรุงรักษา", "ซ่อมด่วน", "เปลี่ยนอะไหล่", "อื่น ๆ"]} value={formData.repairType} onChange={handleChange} />
                            <Input label="รายการที่ต้องการซ่อม" name="repairItem" value={formData.repairItem} onChange={handleChange} />
                            <Input label="เหตุผลในการแจ้งซ่อม" name="repairReason" value={formData.repairReason} onChange={handleChange} />
                            <Input label="เลขที่ใบประเมิน" name="estimateNumber" value={formData.estimateNumber} onChange={handleChange} />
                            <Input label="ผู้ลงนาม" name="signer" value={formData.signer} onChange={handleChange} />
                        </Section>
                        <Section>
                            <Input label="บริษัทที่ประเมินราคา" name="priceCompany" value={formData.priceCompany} onChange={handleChange} />
                            <Input label="ราคาประเมิน" name="estimatedPrice" value={formData.estimatedPrice} onChange={handleChange} />
                            <Input label="วันที่ประเมินราคา" type="date" name="priceDate" value={formData.priceDate} onChange={handleChange} />
                            <Input label="วันที่จดบันทึก" name="recordDate" value={formData.recordDate} onChange={handleChange} />
                            <Input label="ประเภทงบ" name="budgetType" value={formData.budgetType} onChange={handleChange} />
                        </Section>

                        <div className="md:col-span-2 space-y-4">

                            <div>
                                <label htmlFor="fileUpload" className="block font-medium text-gray-700 mb-2">
                                    แนบไฟล์ภาพหรือเอกสาร
                                </label>
                                <input
                                    type="file"
                                    id="fileUpload"
                                    name="fileUpload"
                                    accept="image/*,.pdf,.doc,.docx"
                                    className="w-full px-3 py-2 border rounded shadow-sm text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>


                            <label className="block font-medium text-gray-700 mb-2">การรวมภาษี</label>
                            <div className="flex gap-6">
                                <Radio name="vat" label="คิดภาษีนอก" />
                                <Radio name="vat" label="เป็นรายการรวมภาษีมูลค่าเพิ่ม" checked />
                                <Radio name="vat" label="ไม่เป็นรายการรวมภาษีมูลค่าเพิ่ม" />
                            </div>
                        </div>

                        <div className="md:col-span-2 flex justify-end gap-4 mt-6">
                            <button type="button" onClick={() => setShowPopup(true)} className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
                                เพิ่มรายการ
                            </button>
                            <button type="button" onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                                บันทึก
                            </button>
                            <button type="button" className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
                                ยกเลิก
                            </button>
                        </div>

                        <div className="col-span-full">
                            <table className="w-full border mt-6 text-sm">
                                <thead className="bg-black text-green-500">
                                    <tr className="text-center bg-black">
                                        <th colSpan="2">รวม {items.length} รายการทั้งหมด</th>
                                        <th>ภาษีมูลค่าเพิ่ม7% เป็นเงิน: {vat.toFixed(2)} บาท</th>
                                        <th>รวม: {subTotal.toFixed(2)} บาท</th>
                                        <th className="text-green-400 font-bold">สุทธิ: {total.toFixed(2)} บาท</th>
                                        <th className='bg-black'></th>
                                    </tr>
                                    <tr className="bg-gray-100 text-gray-700">
                                        <th className="border px-3 py-2">ลำดับ</th>
                                        <th className="border px-3 py-2">รายการ</th>
                                        <th className="border px-3 py-2">จำนวน</th>
                                        <th className="border px-3 py-2">ราคาต่อหน่วย</th>
                                        <th className="border px-3 py-2">รวม</th>
                                        <th className="border px-3 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.no} className="text-center hover:bg-gray-50">
                                            <td className="border px-3 py-2">{item.no}</td>
                                            <td className="border px-3 py-2">{item.name}</td>
                                            <td className="border px-3 py-2">{item.qty}</td>
                                            <td className="border px-3 py-2">{item.unitPrice.toLocaleString()}</td>
                                            <td className="border px-3 py-2">{item.total.toLocaleString()}</td>
                                            <td className="border px-2 py-2">
                                                <button onClick={() => handleDeleteItem(item.no)} className="text-red-600 hover:text-red-800">ลบ</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </form>

                    {showPopup && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                                <h3 className="text-lg font-semibold mb-4 text-gray-700">เพิ่มรายการใหม่</h3>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="ชื่อรายการ"
                                        className="w-full border rounded-lg px-4 py-2"
                                        value={newItem.name}
                                        onChange={handleItemChange}
                                    />
                                    <input
                                        type="text"
                                        name="qty"
                                        placeholder="จำนวน (เช่น 2 ตัว)"
                                        className="w-full border rounded-lg px-4 py-2"
                                        value={newItem.qty}
                                        onChange={handleItemChange}
                                    />
                                    <input
                                        type="number"
                                        name="unitPrice"
                                        placeholder="ราคาต่อหน่วย"
                                        className="w-full border rounded-lg px-4 py-2"
                                        value={newItem.unitPrice}
                                        onChange={handleItemChange}
                                    />
                                    <div className="text-right text-gray-600 text-sm">
                                        รวม: <span className="font-semibold">{newItem.total.toLocaleString()}</span> บาท
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 mt-5">
                                    <button
                                        onClick={() => setShowPopup(false)}
                                        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    >ยกเลิก</button>
                                    <button
                                        onClick={handleAddItem}
                                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow"
                                    >เพิ่มรายการ</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EquipmentRepairForm1;
