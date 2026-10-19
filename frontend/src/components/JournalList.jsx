import React from "react";

const JournalList = ({ journals, onEdit, onDelete, onViewDetail }) => {
  if (journals.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
        ไม่พบข้อมูลวารสารในระบบ
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b text-xs font-semibold text-gray-600 uppercase">
              <th className="p-3">รหัส</th>
              <th className="p-3">ชื่อวารสาร</th>
              <th className="p-3">ผู้รับผิดชอบ/ผู้จัดพิมพ์</th>
              <th className="p-3">หมวดหมู่</th>
              <th className="p-3">วันที่</th>
              <th className="p-3">สถานะ</th>
              <th className="p-3 text-center">การจัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {journals.map((journal) => (
              <tr key={journal.id} className="hover:bg-gray-50 transition">
                <td className="p-3 font-medium text-gray-900">#{journal.id}</td>
                <td
                  className="p-3 font-semibold text-blue-600 hover:underline cursor-pointer"
                  onClick={() => onViewDetail(journal)}
                >
                  {journal.title}
                </td>
                <td className="p-3">{journal.publisher}</td>
                <td className="p-3">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    {journal.category}
                  </span>
                </td>
                <td className="p-3 whitespace-nowrap">
                  {journal.publishedDate}
                </td>
                <td className="p-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${journal.status ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                  >
                    {journal.status ? "เผยแพร่" : "ฉบับร่าง"}
                  </span>
                </td>
                <td className="p-3 text-center whitespace-nowrap space-x-2">
                  <button
                    onClick={() => onViewDetail(journal)}
                    className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-medium transition"
                  >
                    ดู
                  </button>
                  <button
                    onClick={() => onEdit(journal)}
                    className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-xs font-medium transition"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => onDelete(journal)}
                    className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-medium transition"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JournalList;
