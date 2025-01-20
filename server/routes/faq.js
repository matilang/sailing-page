const express = require("express");
const FAQ = require("../models/faqModel");
const { ensureAuthenticated } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: FAQ
 *   description: CRUD operations for FAQ
 */

/**
 * @swagger
 * /faq:
 *   get:
 *     summary: Get all FAQs
 *     description: Retrieve a list of all frequently asked questions and their answers.
 *     tags: [FAQ]
 *     responses:
 *       200:
 *         description: A list of FAQs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                   _id:
 *                     type: string
 *                   question:
 *                     type: string
 *                   answer:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /faq:
 *   post:
 *     summary: Add a new FAQ
 *     description: Add a new frequently asked question and its answer. Only accessible to admins.
 *     tags: [FAQ]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *     responses:
 *       201:
 *         description: FAQ created successfully
 *       403:
 *         description: Access denied
 *       500:
 *         description: Server error
 */
router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }
    const { question, answer } = req.body;
    const faq = new FAQ({ question, answer, createdBy: req.user._id });
    await faq.save();
    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /faq/{id}:
 *   put:
 *     summary: Update an FAQ
 *     description: Update a frequently asked question and its answer by ID. Only accessible to admins.
 *     tags: [FAQ]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *     responses:
 *       200:
 *         description: FAQ updated successfully
 *       403:
 *         description: Access denied
 *       404:
 *         description: FAQ not found
 *       500:
 *         description: Server error
 */
router.put("/:id", ensureAuthenticated, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }
    const { question, answer } = req.body;
    const faq = await FAQ.findByIdAndUpdate(
      req.params.id,
      { question, answer },
      { new: true }
    );
    res.json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /faq/{id}:
 *   delete:
 *     summary: Delete an FAQ
 *     description: Remove a frequently asked question and its answer by ID. Only accessible to admins.
 *     tags: [FAQ]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: FAQ deleted successfully
 *       403:
 *         description: Access denied
 *       404:
 *         description: FAQ not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", ensureAuthenticated, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
