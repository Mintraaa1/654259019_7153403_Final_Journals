import { Journal } from "../model/journalModel.js";
import { Op } from "sequelize";

// ปิดการ Seed ข้อมูลเริ่มต้น เพื่อให้บันทึกข้อมูลเฉพาะจาก Postman หรือหน้าเว็บเท่านั้น
export const seedInitialData = async () => {
  return;
};

// 1. ดึงรายการวารสารทั้งหมด (พร้อมระบบค้นหาและกรองหมวดหมู่)
export const getJournals = async (req, res) => {
  try {
    const { title, category } = req.query;
    const whereCondition = {};

    if (title && title.trim() !== "") {
      whereCondition.title = { [Op.iLike]: `%${title.trim()}%` };
    }

    if (category && category.trim() !== "") {
      whereCondition.category = category.trim();
    }

    const journals = await Journal.findAll({
      where: whereCondition,
      order: [["id", "DESC"]],
    });

    return res.status(200).json(journals);
  } catch (error) {
    console.error("Get Journals Error:", error);
    return res.status(500).json({
      message: "เกิดข้อผิดพลาดภายในระบบ",
      error: error.message || String(error),
    });
  }
};

// 2. ดึงข้อมูลวารสารตาม ID
export const getJournalById = async (req, res) => {
  try {
    const { id } = req.params;
    const journalId = parseInt(id, 10);

    if (isNaN(journalId) || journalId <= 0) {
      return res.status(400).json({ message: "รหัส ID ไม่ถูกต้อง" });
    }

    const journal = await Journal.findByPk(journalId);
    if (!journal) {
      return res.status(404).json({ message: "ไม่พบรายการวารสาร" });
    }

    return res.status(200).json(journal);
  } catch (error) {
    console.error("Get Journal By ID Error:", error);
    return res.status(500).json({
      message: "เกิดข้อผิดพลาดภายในระบบ",
      error: error.message || String(error),
    });
  }
};

// 3. เพิ่มรายการวารสารใหม่
export const createJournal = async (req, res) => {
  try {
    const { title, publisher, category, publishedDate, description, status } =
      req.body;

    if (!title || !publisher || !category || !publishedDate || !description) {
      return res
        .status(400)
        .json({ message: "กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง" });
    }

    if (title.trim().length > 150) {
      return res
        .status(400)
        .json({ message: "ชื่อวารสารต้องไม่เกิน 150 ตัวอักษร" });
    }

    if (publisher.trim().length > 100) {
      return res
        .status(400)
        .json({ message: "ชื่อผู้จัดพิมพ์ต้องไม่เกิน 100 ตัวอักษร" });
    }

    if (!["วิชาการ", "วิจัย", "ทั่วไป"].includes(category)) {
      return res.status(400).json({ message: "หมวดหมู่ไม่ถูกต้อง" });
    }

    if (description.trim().length > 2000) {
      return res
        .status(400)
        .json({ message: "รายละเอียดต้องไม่เกิน 2,000 ตัวอักษร" });
    }

    // แปลงสถานะให้รองรับทั้ง Boolean และ String ("เผยแพร่" / "ร่าง")
    let isStatusTrue = true;
    if (typeof status === "boolean") {
      isStatusTrue = status;
    } else if (typeof status === "string") {
      isStatusTrue = status === "เผยแพร่" || status.toLowerCase() === "true";
    }

    const newJournal = await Journal.create({
      title: title.trim(),
      publisher: publisher.trim(),
      category,
      publishedDate,
      description: description.trim(),
      status: isStatusTrue,
    });

    return res.status(201).json(newJournal);
  } catch (error) {
    console.error("Create Journal Error:", error);
    return res.status(500).json({
      message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
      error: error.message || String(error),
    });
  }
};

// 4. แก้ไขข้อมูลวารสาร
export const updateJournal = async (req, res) => {
  try {
    const { id } = req.params;
    const journalId = parseInt(id, 10);

    if (isNaN(journalId) || journalId <= 0) {
      return res.status(400).json({ message: "รหัส ID ไม่ถูกต้อง" });
    }

    const { title, publisher, category, publishedDate, description, status } =
      req.body;

    if (!title || !publisher || !category || !publishedDate || !description) {
      return res
        .status(400)
        .json({ message: "กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง" });
    }

    const journal = await Journal.findByPk(journalId);
    if (!journal) {
      return res
        .status(404)
        .json({ message: "ไม่พบรายการวารสารที่ต้องการแก้ไข" });
    }

    let isStatusTrue = journal.status;
    if (typeof status === "boolean") {
      isStatusTrue = status;
    } else if (typeof status === "string") {
      isStatusTrue = status === "เผยแพร่" || status.toLowerCase() === "true";
    }

    await journal.update({
      title: title.trim(),
      publisher: publisher.trim(),
      category,
      publishedDate,
      description: description.trim(),
      status: isStatusTrue,
    });

    return res.status(200).json(journal);
  } catch (error) {
    console.error("Update Journal Error:", error);
    return res.status(500).json({
      message: "เกิดข้อผิดพลาดในการแก้ไขข้อมูล",
      error: error.message || String(error),
    });
  }
};

// 5. ลบรายการวารสาร
export const deleteJournal = async (req, res) => {
  try {
    const { id } = req.params;
    const journalId = parseInt(id, 10);

    if (isNaN(journalId) || journalId <= 0) {
      return res.status(400).json({ message: "รหัส ID ไม่ถูกต้อง" });
    }

    const journal = await Journal.findByPk(journalId);
    if (!journal) {
      return res.status(404).json({ message: "ไม่พบรายการวารสารที่ต้องการลบ" });
    }

    await journal.destroy();
    return res.status(200).json({ message: "ลบรายการวารสารเรียบร้อยแล้ว" });
  } catch (error) {
    console.error("Delete Journal Error:", error);
    return res.status(500).json({
      message: "เกิดข้อผิดพลาดในการลบข้อมูล",
      error: error.message || String(error),
    });
  }
};
