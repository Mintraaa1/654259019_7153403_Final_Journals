import React, { useState, useEffect } from "react";

const JournalForm = ({ editingJournal, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    publisher: "",
    category: "วิชาการ",
    publishedDate: new Date().toISOString().split("T")[0],
    description: "",
    status: true,
  });

  useEffect(() => {
    if (editingJournal) {
      setFormData({
        title: editingJournal.title || "",
        publisher: editingJournal.publisher || "",
        category: editingJournal.category || "วิชาการ",
        publishedDate: editingJournal.publishedDate || "",
        description: editingJournal.description || "",
        status: editingJournal.status ?? true,
      });
    } else {
      setFormData({
        title: "",
        publisher: "",
        category: "วิชาการ",
        publishedDate: new Date().toISOString().split("T")[0],
        description: "",
        status: true,
      });
    }
  }, [editingJournal]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {editingJournal ? "✏️ แก้ไขข้อมูลวารสาร" : "➕ เพิ่มรายการวารสารใหม่"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อวารสาร (Title) *
            </label>
            <input
              type="text"
              name="title"
              maxLength={150}
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="กรอกชื่อวารสาร (สูงสุด 150 ตัวอักษร)"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ผู้จัดพิมพ์ (Publisher) *
            </label>
            <input
              type="text"
              name="publisher"
              maxLength={100}
              required
              value={formData.publisher}
              onChange={handleChange}
              placeholder="กรอกชื่อผู้จัดพิมพ์ (สูงสุด 100 ตัวอักษร)"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              หมวดหมู่ (Category) *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
            >
              <option value="วิชาการ">วิชาการ</option>
              <option value="วิจัย">วิจัย</option>
              <option value="ทั่วไป">ทั่วไป</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              วันที่เผยแพร่ (Published Date) *
            </label>
            <input
              type="date"
              name="publishedDate"
              required
              value={formData.publishedDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              สถานะ (Status) *
            </label>
            <select
              name="status"
              value={formData.status.toString()}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  status: e.target.value === "true",
                }))
              }
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
            >
              <option value="true">เผยแพร่</option>
              <option value="false">ฉบับร่าง</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            รายละเอียด (Description) *
          </label>
          <textarea
            name="description"
            rows="3"
            maxLength={2000}
            required
            value={formData.description}
            onChange={handleChange}
            placeholder="กรอกรายละเอียดวารสาร (สูงสุด 2,000 ตัวอักษร)"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          {editingJournal && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md font-medium transition"
            >
              ยกเลิกการแก้ไข
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-md transition"
          >
            {editingJournal ? "บันทึกการแก้ไข" : "เพิ่มรายการ"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JournalForm;
