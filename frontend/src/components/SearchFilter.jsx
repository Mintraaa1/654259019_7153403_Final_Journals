import React from "react";

const SearchFilter = ({
  titleQuery,
  setTitleQuery,
  categoryFilter,
  setCategoryFilter,
  onReset,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex-1 w-full">
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
          ค้นหาจากชื่อวารสาร
        </label>
        <input
          type="text"
          placeholder="พิมพ์คำค้นหา..."
          value={titleQuery}
          onChange={(e) => setTitleQuery(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="w-full md:w-64">
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
          กรองตามหมวดหมู่
        </label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">ทั้งหมดทุกหมวดหมู่</option>
          <option value="วิชาการ">วิชาการ</option>
          <option value="วิจัย">วิจัย</option>
          <option value="ทั่วไป">ทั่วไป</option>
        </select>
      </div>

      <div className="w-full md:w-auto self-end">
        <button
          onClick={onReset}
          className="w-full md:w-auto px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md transition"
        >
          ล้างเงื่อนไข
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
