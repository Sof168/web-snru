import React, { useState } from "react";

const RepairTable = () => {
    const [items, setItems] = useState([
        { no: 1, name: "ค่าบริการล้างคอยล์เย็น พร้อมถอดเปลี่ยนโบเวอร์", qty: "1 งาน", unitPrice: 3000, total: 3000 },
    ]);

    const [showPopup, setShowPopup] = useState(false);
    const [newItem, setNewItem] = useState({ name: "", qty: "", unitPrice: 0, total: 0 });

    const extractNumber = (str) => parseFloat(str.match(/\d+(\.\d+)?/)?.[0]) || 0;

    const handleChange = (e) => {
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
            ...item,
            no: index + 1, 
        }));
        setItems(updatedItems);
    };

    const subTotal = items.reduce((sum, item) => sum + item.total, 0);
    const vat = subTotal * 0.07;
    const total = subTotal + vat;

    return (
        <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">ตารางรายการซ่อม</h2>
                <button
                    onClick={() => setShowPopup(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
                >
                    + เพิ่มรายการ
                </button>
            </div>

            <table className="w-full table-auto border border-gray-300 text-sm">
                <thead>
                    <tr className="bg-gray-800 text-green-400 text-center">
                        <th colSpan="2" className="py-2">รวม {items.length} รายการทั้งหมด</th>
                        <th className="py-2">ภาษีทูลค่าเพิ่ม7% เป็นเงิน: {vat.toFixed(2)} บาท</th>
                        <th className="py-2">รวม: {subTotal.toFixed(2)} บาท</th>
                        <th className="py-2 text-green-400 font-bold">สุทธิ: {total.toFixed(2)} บาท</th>
                        <th></th>
                    </tr>
                    <tr className="bg-gray-100 text-gray-700 text-center">
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
                            <td className="border px-3 py-2 text-left">{item.name}</td>
                            <td className="border px-3 py-2">{item.qty}</td>
                            <td className="border px-3 py-2">{item.unitPrice.toLocaleString()}</td>
                            <td className="border px-3 py-2">{item.total.toLocaleString()}</td>
                            <td className="border px-2 py-2">
                                <button
                                    onClick={() => handleDeleteItem(item.no)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    ลบ
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Popup Form */}
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
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="qty"
                                placeholder="จำนวน (เช่น 2 ตัว)"
                                className="w-full border rounded-lg px-4 py-2"
                                value={newItem.qty}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                name="unitPrice"
                                placeholder="ราคาต่อหน่วย"
                                className="w-full border rounded-lg px-4 py-2"
                                value={newItem.unitPrice}
                                onChange={handleChange}
                            />
                            <div className="text-right text-gray-600 text-sm">
                                รวม: <span className="font-semibold">{newItem.total.toLocaleString()}</span> บาท
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-5">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                            >
                                ยกเลิก
                            </button>
                            <button
                                onClick={handleAddItem}
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow"
                            >
                                เพิ่มรายการ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RepairTable;
