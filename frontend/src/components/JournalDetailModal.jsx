import React from "react";

const JournalDetailModal = ({ journal, onClose }) => {
  if (!journal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl relative">
        <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
          รายละเอียดวารสาร #{journal.id}
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <span className="font-semibold text-gray-900">ชื่อวารสาร:</span>{" "}
            {journal.title}
          </p>
          <p>
            <span className="font-semibold text-gray-900">ผู้จัดพิมพ์:</span>{" "}
            {journal.publisher}
          </p>
          <p>
            <span className="font-semibold text-gray-900">หมวดหมู่:</span>{" "}
            {journal.category}
          </p>
          <p>
            <span className="font-semibold text-gray-900">วันที่เผยแพร่:</span>{" "}
            {journal.publishedDate}
          </p>
          <p>
            <span className="font-semibold text-gray-900">สถานะ:</span>{" "}
            <span
              className={`px-2 py-0.5 rounded text-xs ${journal.status ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
            >
              {journal.status ? "เผยแพร่" : "ฉบับร่าง"}
            </span>
          </p>
          <div>
            <span className="font-semibold text-gray-900 block mb-1">
              รายละเอียด:
            </span>
            <p className="bg-gray-50 p-3 rounded border text-gray-600 whitespace-pre-wrap">
              {journal.description}
            </p>
          </div>
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalDetailModal;
