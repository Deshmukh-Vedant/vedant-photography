const { query } = require('../config/db');

async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded.' });
    }

    const { title, category } = req.body;
    // Base URL or relative path
    const fileUrl = `/uploads/${req.file.filename}`;

    await query(
      'INSERT INTO images (title, category, url, public_id) VALUES (?, ?, ?, ?)',
      [title || req.file.originalname, category || 'Portfolio', fileUrl, req.file.filename]
    );

    return res.status(201).json({
      success: true,
      message: 'Image uploaded successfully!',
      file: {
        filename: req.file.filename,
        url: fileUrl,
        size: req.file.size
      }
    });
  } catch (error) {
    console.error('Image upload error:', error);
    return res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
}

async function getGalleryImages(req, res) {
  try {
    const { category } = req.query;
    let sql = 'SELECT * FROM images';
    const params = [];
    if (category && category !== 'all') {
      sql += ' WHERE category = ?';
      params.push(category);
    }
    sql += ' ORDER BY id DESC';
    const images = await query(sql, params);
    return res.json({ success: true, count: images.length, data: images });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
}

module.exports = {
  uploadImage,
  getGalleryImages
};
