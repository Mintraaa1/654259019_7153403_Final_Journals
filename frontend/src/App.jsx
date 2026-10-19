import React, { useState, useEffect } from "react";
import {
  fetchJournals,
  createJournalAPI,
  updateJournalAPI,
  deleteJournalAPI,
} from "./services/journalService";

function App() {
  const [journals, setJournals] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    publisher: "",
    category: "วิชาการ",
    publishedDate: new Date().toISOString().split("T")[0],
    status: "เผยแพร่",
    description: "",
  });

  const fetchAllJournals = async () => {
    try {
      const data = await fetchJournals(searchTitle, searchCategory);
      setJournals(data);
    } catch (error) {
      console.error("Error fetching journals:", error);
    }
  };

  useEffect(() => {
    fetchAllJournals();
  }, [searchTitle, searchCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ตรวจสอบและคลีนค่า Payload ก่อนส่ง
      const payload = {
        title: formData.title.trim(),
        publisher: formData.publisher.trim(),
        category: formData.category,
        publishedDate:
          formData.publishedDate || new Date().toISOString().split("T")[0],
        status: formData.status,
        description: formData.description ? formData.description.trim() : "",
      };

      if (editingId) {
        await updateJournalAPI(editingId, payload);
        setEditingId(null);
      } else {
        await createJournalAPI(payload);
      }
      resetForm();
      fetchAllJournals();
    } catch (error) {
      console.error("Error saving journal:", error);
      alert(
        "เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง",
      );
    }
  };

  const handleEdit = (journal) => {
    setEditingId(journal.id);

    let formattedDate = new Date().toISOString().split("T")[0];
    if (journal.publishedDate) {
      const d = new Date(journal.publishedDate);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toISOString().split("T")[0];
      } else if (typeof journal.publishedDate === "string") {
        formattedDate = journal.publishedDate.split("T")[0];
      }
    }

    setFormData({
      title: journal.title || "",
      publisher: journal.publisher || "",
      category: journal.category || "วิชาการ",
      publishedDate: formattedDate,
      status: journal.status || "เผยแพร่",
      description: journal.description || "",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("คุณต้องการลบรายการวารสารนี้ใช่หรือไม่?")) {
      try {
        await deleteJournalAPI(id);
        fetchAllJournals();
      } catch (error) {
        console.error("Error deleting journal:", error);
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      publisher: "",
      category: "วิชาการ",
      publishedDate: new Date().toISOString().split("T")[0],
      status: "เผยแพร่",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-800 font-sans flex flex-col justify-between">
      <div>
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <svg
                  className="w-8 h-8 text-[#700028]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
                <div>
                  <span className="text-xl font-serif font-extrabold text-[#002B66] tracking-tight block leading-none">
                    Sage Journals
                  </span>
                  <span className="text-[10px] tracking-widest text-[#700028] font-bold uppercase">
                    The Papery • Flexi Premium Dotted
                  </span>
                </div>
              </div>
              <span className="hidden lg:inline text-xs text-slate-400 border-l border-slate-200 pl-3 ml-2">
                Academic Publishing Platform
              </span>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <input
                  type="text"
                  placeholder="Search this journal (Enter search terms...)"
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-2 border border-slate-300 rounded bg-slate-50 focus:outline-none focus:bg-white focus:border-[#002B66] transition"
                />
                <span className="absolute left-2.5 top-2 text-slate-400 text-xs">
                  🔍
                </span>
              </div>
              <div className="hidden sm:block text-[11px] text-slate-500 text-right leading-tight">
                <div>I have access via:</div>
                <div className="font-semibold text-slate-700">
                  RAJABHAT INST NAKHOM/PATHOM
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 bg-slate-50/60 text-xs text-slate-600 px-4 py-1.5">
            <div className="max-w-7xl mx-auto flex gap-6">
              <span className="hover:text-[#002B66] cursor-pointer font-medium">
                Browse by discipline ▾
              </span>
              <span className="hover:text-[#002B66] cursor-pointer font-medium">
                Information for ▾
              </span>
            </div>
          </div>
        </header>

        {/* Burgundy Hero Banner */}
        <section className="bg-[#700028] text-white py-10 px-4 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-xs tracking-widest uppercase text-rose-200 mb-1">
                Official Journal Repository
              </p>
              <h1 className="text-2xl md:text-4xl font-serif font-bold tracking-wide">
                Journal of Management
              </h1>
            </div>
            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded text-xs text-rose-100 border border-white/20">
              Flexi Premium Dotted A5 Edition
            </div>
          </div>
        </section>

        {/* Sub-bar Stats */}
        <div className="bg-white border-b border-slate-200 shadow-sm mb-8">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-xs text-slate-600">
              <div>
                <span className="font-bold text-slate-800">Impact Factor:</span>{" "}
                10.0
              </div>
              <div>
                <span className="font-bold text-slate-800">
                  5-Year Impact Factor:
                </span>{" "}
                17.0
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href="#form-section"
                className="text-xs px-4 py-2 bg-[#002B66] text-white font-semibold rounded hover:bg-[#001d47] transition shadow-sm"
              >
                Submission Guidelines
              </a>
            </div>
          </div>
        </div>

        {/* Main Body Grid */}
        <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-3 space-y-8">
            {/* Form Section */}
            <section
              id="form-section"
              className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm"
            >
              <h2 className="text-base font-bold text-[#700028] border-b border-slate-100 pb-3 mb-6 flex items-center justify-between">
                <span>
                  {editingId
                    ? "✏️ แก้ไขข้อมูลวารสาร"
                    : "➕ เพิ่มรายการวารสารใหม่"}
                </span>
                {editingId && (
                  <span className="text-xs font-normal text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                    กำลังแก้ไขรหัส #{editingId}
                  </span>
                )}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      ชื่อวารสาร (Title) *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="กรอกชื่อวารสาร (สูงสุด 150 ตัวอักษร)"
                      required
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#002B66]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      ผู้จัดพิมพ์ (Publisher) *
                    </label>
                    <input
                      type="text"
                      name="publisher"
                      value={formData.publisher}
                      onChange={handleChange}
                      placeholder="กรอกชื่อผู้จัดพิมพ์ (สูงสุด 100 ตัวอักษร)"
                      required
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#002B66]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      หมวดหมู่ (Category) *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#002B66]"
                    >
                      <option value="วิชาการ">วิชาการ</option>
                      <option value="วิจัย">วิจัย</option>
                      <option value="เทคโนโลยี">เทคโนโลยี</option>
                      <option value="ทั่วไป">ทั่วไป</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      วันที่เผยแพร่ (Published Date) *
                    </label>
                    <input
                      type="date"
                      name="publishedDate"
                      value={formData.publishedDate}
                      onChange={handleChange}
                      required
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#002B66]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      สถานะ (Status) *
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#002B66]"
                    >
                      <option value="เผยแพร่">เผยแพร่</option>
                      <option value="ฉบับร่าง">ฉบับร่าง</option>
                      <option value="ยกเลิก">ยกเลิก</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    รายละเอียด (Description)
                  </label>
                  <textarea
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="กรอกรายละเอียดวารสาร (สูงสุด 2,000 ตัวอักษร)"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#002B66]"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-200 rounded hover:bg-slate-300 transition"
                    >
                      ยกเลิก
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-6 py-2 text-xs font-medium text-white bg-[#002B66] hover:bg-[#001d47] rounded transition shadow-sm"
                  >
                    {editingId ? "บันทึกการแก้ไข" : "เพิ่มรายการ"}
                  </button>
                </div>
              </form>
            </section>

            {/* Filter Section */}
            <section className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="🔍 ค้นหาชื่อวารสาร..."
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#002B66]"
                />
              </div>
              <div className="w-full md:w-auto flex gap-2 items-center">
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="text-xs px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#002B66]"
                >
                  <option value="">ทั้งหมดทุกหมวดหมู่</option>
                  <option value="วิชาการ">วิชาการ</option>
                  <option value="วิจัย">วิจัย</option>
                  <option value="เทคโนโลยี">เทคโนโลยี</option>
                  <option value="ทั่วไป">ทั่วไป</option>
                </select>
                {(searchTitle || searchCategory) && (
                  <button
                    onClick={() => {
                      setSearchTitle("");
                      setSearchCategory("");
                    }}
                    className="text-xs px-3 py-2 text-slate-600 bg-slate-100 rounded hover:bg-slate-200"
                  >
                    ล้างเงื่อนไข
                  </button>
                )}
              </div>
            </section>

            {/* Table Section */}
            <section className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                <h3 className="font-serif font-bold text-slate-800 text-xs uppercase tracking-wider">
                  Articles published in this journal ({journals.length})
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
                      <th className="p-3">รหัส</th>
                      <th className="p-3">ชื่อวารสาร</th>
                      <th className="p-3">ผู้รับผิดชอบ/ผู้จัดพิมพ์</th>
                      <th className="p-3">หมวดหมู่</th>
                      <th className="p-3">วันที่</th>
                      <th className="p-3">สถานะ</th>
                      <th className="p-3 text-center">การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {journals.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="p-8 text-center text-slate-400"
                        >
                          ไม่พบข้อมูลวารสาร
                        </td>
                      </tr>
                    ) : (
                      journals.map((journal) => (
                        <tr
                          key={journal.id}
                          className="hover:bg-slate-50 transition"
                        >
                          <td className="p-3 font-mono text-slate-400">
                            #{journal.id}
                          </td>
                          <td className="p-3 font-semibold text-[#002B66]">
                            {journal.title}
                          </td>
                          <td className="p-3 text-slate-600">
                            {journal.publisher}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                              {journal.category}
                            </span>
                          </td>
                          <td className="p-3 text-slate-600">
                            {journal.publishedDate}
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded font-medium ${
                                journal.status === "เผยแพร่"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-amber-50 text-amber-700 border border-amber-200"
                              }`}
                            >
                              {journal.status}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex justify-center gap-1">
                              <button
                                onClick={() => handleEdit(journal)}
                                className="px-2 py-1 text-xs text-amber-700 bg-amber-50 rounded border border-amber-200 hover:bg-amber-100 transition"
                              >
                                แก้ไข
                              </button>
                              <button
                                onClick={() => handleDelete(journal.id)}
                                className="px-2 py-1 text-xs text-rose-700 bg-rose-50 rounded border border-rose-200 hover:bg-rose-100 transition"
                              >
                                ลบ
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
              <h3 className="font-serif font-bold text-slate-800 border-b border-slate-100 pb-2 mb-3 text-xs uppercase tracking-wider">
                Browse Journal
              </h3>
              <ul className="space-y-2.5 text-xs text-[#002B66]">
                <li className="hover:underline cursor-pointer">
                  Current issue
                </li>
                <li className="hover:underline cursor-pointer">OnlineFirst</li>
                <li className="hover:underline cursor-pointer">All issues</li>
                <li className="hover:underline cursor-pointer">Free sample</li>
                <li className="hover:underline cursor-pointer">
                  Special Collection Index
                </li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
              <h3 className="font-serif font-bold text-slate-800 border-b border-slate-100 pb-2 mb-3 text-xs uppercase tracking-wider">
                Journal Information
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="hover:text-[#002B66] cursor-pointer">
                  Journal overview and metrics
                </li>
                <li className="hover:text-[#002B66] cursor-pointer">
                  Editorial board
                </li>
                <li className="hover:text-[#002B66] cursor-pointer">
                  Submission guidelines
                </li>
                <li className="hover:text-[#002B66] cursor-pointer">
                  Reprints
                </li>
              </ul>
            </div>
          </aside>
        </main>
      </div>

      {/* Footer Section */}
      <footer className="bg-[#1e293b] text-slate-300 text-xs py-10 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-serif font-bold text-white text-sm mb-3">
              Sage Journals
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Academic publishing platform providing access to high quality
              research journals worldwide.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white text-xs mb-3 uppercase tracking-wider">
              Browse
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="hover:text-white cursor-pointer">Journals A-Z</li>
              <li className="hover:text-white cursor-pointer">
                Journals by Discipline
              </li>
              <li className="hover:text-white cursor-pointer">
                The Papery Collections
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white text-xs mb-3 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="hover:text-white cursor-pointer">
                Authors & Reviewers
              </li>
              <li className="hover:text-white cursor-pointer">Librarians</li>
              <li className="hover:text-white cursor-pointer">Societies</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white text-xs mb-3 uppercase tracking-wider">
              Product Info
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Flexi Premium Dotted A5 Journals Repository System. Designed for
              academic management.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-700/60 flex flex-col sm:flex-row justify-between items-center text-slate-500 gap-4">
          <div>© 2026 Sage Publications / The Papery. All rights reserved.</div>
          <div className="flex gap-4">
            <span className="hover:text-slate-300 cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-slate-300 cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-slate-300 cursor-pointer">
              Contact Us
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
