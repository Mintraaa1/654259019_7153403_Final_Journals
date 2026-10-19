import React, { useState, useEffect } from "react";
import {
  fetchJournals,
  createJournalAPI,
  updateJournalAPI,
  deleteJournalAPI,
} from "../services/journalService";
import JournalForm from "../components/JournalForm";
import JournalList from "../components/JournalList";
import SearchFilter from "../components/SearchFilter";
import JournalDetailModal from "../components/JournalDetailModal";

const JournalPage = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingJournal, setEditingJournal] = useState(null);
  const [selectedJournal, setSelectedJournal] = useState(null);

  const [titleQuery, setTitleQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const loadJournals = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchJournals(titleQuery, categoryFilter);
      setJournals(data);
    } catch (err) {
      setError("ไม่สามารถดึงข้อมูลวารสารได้ กรุณาตรวจสอบการเชื่อมต่อ API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJournals();
  }, [titleQuery, categoryFilter]);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingJournal) {
        await updateJournalAPI(editingJournal.id, formData);
        alert("แก้ไขข้อมูลวารสารสำเร็จ!");
        setEditingJournal(null);
      } else {
        await createJournalAPI(formData);
        alert("เพิ่มวารสารใหม่สำเร็จ!");
      }
      loadJournals();
    } catch (err) {
      alert(err.response?.data?.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  const handleDelete = async (journal) => {
    const confirmDelete = window.confirm(
      `คุณต้องการลบวารสาร "${journal.title}" ใช่หรือไม่?`,
    );
    if (confirmDelete) {
      try {
        await deleteJournalAPI(journal.id);
        alert("ลบข้อมูลวารสารเรียบร้อยแล้ว");
        loadJournals();
      } catch (err) {
        alert(err.response?.data?.message || "เกิดข้อผิดพลาดในการลบข้อมูล");
      }
    }
  };

  const handleResetFilter = () => {
    setTitleQuery("");
    setCategoryFilter("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        📚 ระบบบริหารจัดการข้อมูลวารสาร (Journals Management)
      </h1>

      <JournalForm
        editingJournal={editingJournal}
        onSubmit={handleCreateOrUpdate}
        onCancel={() => setEditingJournal(null)}
      />

      <SearchFilter
        titleQuery={titleQuery}
        setTitleQuery={setTitleQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        onReset={handleResetFilter}
      />

      {loading && (
        <p className="text-center text-blue-600 font-medium py-4">
          ⏳ กำลังโหลดข้อมูล...
        </p>
      )}
      {error && (
        <p className="text-center text-red-600 font-medium py-4">{error}</p>
      )}

      {!loading && !error && (
        <JournalList
          journals={journals}
          onEdit={(journal) => setEditingJournal(journal)}
          onDelete={handleDelete}
          onViewDetail={(journal) => setSelectedJournal(journal)}
        />
      )}

      <JournalDetailModal
        journal={selectedJournal}
        onClose={() => setSelectedJournal(null)}
      />
    </div>
  );
};

export default JournalPage;
