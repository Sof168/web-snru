import React, { useState, useEffect, useMemo } from 'react';
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { font } from './THSarabunNew-normal';

// 🔧 Input component
const Input = React.memo(({ label, type = "text", value, name, onChange, readOnly = false }) => (
    <div>
        <label className="block text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            value={value}
            name={name}
            onChange={onChange}
            readOnly={readOnly}
            className={`w-full px-3 py-2 border rounded shadow-sm ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
    </div>
));

// 🔧 Select component
const Select = ({ label, options, value, name, onChange, disabled = false }) => (
    <div>
        <label className="block text-gray-700 mb-1">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full px-3 py-2 border rounded shadow-sm ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        >
            <option value="">-- เลือก --</option>
            {options.map((option, i) => (
                <option key={i} value={option}>{option}</option>
            ))}
        </select>
    </div>
);

// 🔧 Section wrapper
const Section = ({ children }) => (
    <div className="col-span-1 space-y-4">
        {children}
    </div>
);

const ViewEquipmentRepair = () => {
    const [lastRepairNumber, setLastRepairNumber] = useState(1);
    const [formData, setFormData] = useState({});

    const repairCode = useMemo(() => `CRP-${lastRepairNumber.toString().padStart(3, '0')}`, [lastRepairNumber]);

    useEffect(() => {
        setFormData({
            repairerName: 'นางสาวนิภาพร ใจดี',
            position: 'เจ้าหน้าที่ซ่อมบำรุง',
            mainDepartment: 'งานพัสดุ',
            subDepartment: 'ฝ่ายซ่อมบำรุง',
            equipmentCode: 'EQ-00123',
            equipmentName: 'เครื่องพิมพ์เลเซอร์',
            brand: 'HP',
            serialNo: 'SN123456',
            equipmentType: 'เครื่องใช้สำนักงาน',
            repairType: 'ซ่อมบำรุงรักษา',
            repairItem: 'เปลี่ยนหมึกพิมพ์',
            repairReason: 'พิมพ์ไม่ออก',
            estimateNumber: 'EST-4567',
            signer: 'นายอำนวย อนุมัติ',
            priceCompany: 'บริษัทเทคโนโลยีซ่อมดี',
            estimatedPrice: '3500',
            priceDate: '2568-04-08',
            recordDate: '04-04-2568',
            budgetType: 'งบประมาณองค์กร',
        });
    }, []);


    const handleDownloadPDF = (type) => {
        console.log(formData);
        const doc = new jsPDF({ unit: "mm", format: "a4" });
        doc.addFileToVFS("MyFont.ttf", font);
        doc.addFont("MyFont.ttf", "MyFont", "normal");
        doc.setFont("MyFont", "normal");


        // 🧾 หัวกระดาษ
        doc.setFontSize(35);
        doc.setFont("MyFont");
        doc.text("แบบฟอร์มแจ้งซ่อมครุภัณฑ์", 105, 20, { align: "center" });

        doc.setFontSize(16);
        doc.setFont("MyFont", "normal");
        doc.text(`เลขที่ใบแจ้งซ่อม: ${repairCode}`, 105, 28, { align: "center" });

        let body = [];

        if (type === "approval") {
            body = [
                
            ];
        } else if (type === 'history') {
            body = [
                ['ชื่อผู้แจ้ง', formData.repairerName],
                ['ตำแหน่ง', formData.position],
                ['รายการซ่อม', formData.repairItem],
                ['เหตุผล', formData.repairReason],
                ['เลขที่ใบประเมิน', formData.estimateNumber],
                ['ผู้ลงนาม', formData.signer],
                ['ชื่อครุภัณฑ์', formData.equipmentName],
                ['รหัสครุภัณฑ์', formData.equipmentCode],
                ['Serial No.', formData.serialNo],
                ['หน่วยงาน', formData.subDepartment],
                ['วันที่จดบันทึก', formData.recordDate],
                ['รายการที่ต้องการซ่อม', formData.repairItem],
                ['ราคาประเมิน', `${formData.estimatedPrice} บาท`],
                ['บริษัทที่ประเมิน', formData.priceCompany],
                ['วันที่ประเมินราคา', formData.priceDate],
                ['ประเภทงบ', formData.budgetType],
            ];
        } else if (type === 'attachment') {
            const unitPrice = 200.00;
            const quantity = 2;
            const subtotal = unitPrice * quantity; // 400
            const vat = subtotal * 0.07; // 28
            const total = subtotal + vat; // 428

            body = [
                ['รายละเอียดรายการ', 'ค่าบริการเปลี่ยนหมึก 2 ขวด'],
                ['ราคาต่อหน่วย', `${unitPrice.toFixed(2)} บาท`],
                ['จำนวน', `${quantity} ขวด`],
                ['รวมเป็นเงิน', `${subtotal.toFixed(2)} บาท`],
                ['ภาษีมูลค่าเพิ่ม 7%', `${vat.toFixed(2)} บาท`],
                ['รวมทั้งสิ้น', `${total.toFixed(2)} บาท`],
            ];
        }


        autoTable(doc, {
            startY: 45,
            head: [['หัวข้อ', 'รายละเอียด']],
            body: body,
            theme: 'grid',
            styles: {
                font: 'MyFont',
                fontSize: 18,
            },
            headStyles: {
                font: 'MyFont',
                fontStyle: 'normal',
                fillColor: [34, 139, 34],
                textColor: 255,
            },
        });

        const fileNameMap = {
            approval: 'บันทึกขออนุมัติ',
            history: 'ประวัติการซ่อมบำรุง',
            attachment: 'รายละเอียดแนบท้าย',
        };

        doc.save(`${fileNameMap[type] || 'report'}.pdf`);
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-green-200 px-4 py-2 text-sm text-gray-700">
                <Link to="/"><span className="text-purple-700 font-bold">หน้าหลัก</span></Link>
                <span className="mx-2">/</span>
                <span className='text-purple-700 font-bold'>รายการแจ้งซ่อมครุภัณฑ์</span>
                <span className="mx-2">/</span>
                <span>ดูข้อมูลแจ้งซ่อมครุภัณฑ์</span>
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
                            <Input label="ชื่อผู้แจ้ง" value={formData.repairerName} readOnly />
                            <Input label="ตำแหน่ง" value={formData.position} readOnly />
                            <Input label="หน่วยงานหลัก" value={formData.mainDepartment} readOnly />
                            <Input label="หน่วยงานย่อย" value={formData.subDepartment} readOnly />
                        </Section>

                        <Section>
                            <Input label="รหัสครุภัณฑ์" value={formData.equipmentCode} readOnly />
                            <Input label="ชื่อครุภัณฑ์" value={formData.equipmentName} readOnly />
                            <Input label="ยี่ห้อ" value={formData.brand} readOnly />
                            <Input label="หมายเลขครุภัณฑ์ (Serial No.)" value={formData.serialNo} readOnly />
                            <Input label="ประเภทครุภัณฑ์" value={formData.equipmentType} readOnly />
                        </Section>

                        <Section>
                            <Select label="ประเภทการซ่อม" options={["ซ่อมบำรุงรักษา", "ซ่อมด่วน", "เปลี่ยนอะไหล่", "อื่น ๆ"]} value={formData.repairType} disabled />
                            <Input label="รายการที่ต้องการซ่อม" value={formData.repairItem} readOnly />
                            <Input label="เหตุผลในการแจ้งซ่อม" value={formData.repairReason} readOnly />
                            <Input label="เลขที่ใบประเมิน" value={formData.estimateNumber} readOnly />
                            <Input label="ผู้ลงนาม" value={formData.signer} readOnly />
                        </Section>

                        <Section>
                            <Input label="บริษัทที่ประเมินราคา" value={formData.priceCompany} readOnly />
                            <Input label="ราคาประเมิน" value={formData.estimatedPrice} readOnly />
                            <Input label="วันที่ประเมินราคา" type="date" value={formData.priceDate} readOnly />
                            <Input label="วันที่จดบันทึก" value={formData.recordDate} readOnly />
                            <Input label="ประเภทงบ" value={formData.budgetType} readOnly />
                        </Section>

                        <div className="col-span-2">
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

                        <div className="col-span-full">
                            <table className="min-w-full border-[0.5px] border-black text-sm text-black">
                                <thead>
                                    <tr className="bg-black text-green-400 text-center text-sm font-semibold">
                                        <th className="border border-white py-2" colSpan={2}>รวมทั้งหมด 1 รายการ</th>
                                        <th className="border border-white py-2" colSpan={2}>ภาษีมูลค่าเพิ่ม 7% เป็นเงิน 28.00  บาท</th>
                                        <th className="border border-white py-2">รวม<br />400.00 บาท</th>
                                        <th className="border border-white py-2 text-green-500">รวมทั้งสิ้น<br />428.00 บาท</th>
                                    </tr>
                                    <tr className="bg-gray-100 text-center text-black">
                                        <th className="border py-2 px-2">ลำดับ</th>
                                        <th className="border py-2 px-2">รายการ</th>
                                        <th className="border py-2 px-2">จำนวน</th>
                                        <th className="border py-2 px-2">ราคาต่อหน่วย</th>
                                        <th className="border py-2 px-2">รวม</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-center">
                                        <td className="border py-2 px-2">1</td>
                                        <td className="border py-2 px-2 ">ค่าบริการเปลื่ยนหมึก</td>
                                        <td className="border py-2 px-2">2 ขวด</td>
                                        <td className="border py-2 px-2 text-right">200.00</td>
                                        <td className="border py-2 px-2 text-right">400.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>



                        <div className="col-span-2 flex justify-end gap-4 mt-8">
                            <button
                                type="button"
                                onClick={() => handleDownloadPDF('approval')}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
                            >
                                พิมพ์บันทึกขออนุมัติ
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDownloadPDF('history')}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
                            >
                                พิมพ์ประวัติการซ่อมบำรุง
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDownloadPDF('attachment')}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
                            >
                                พิมพ์รายละเอียดแนบท้ายขอซื้อขอจ้าง
                            </button>
                            <button className='px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700'>
                                อนุมัติ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ViewEquipmentRepair;
