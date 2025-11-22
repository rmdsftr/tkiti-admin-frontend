import { useState, useRef } from 'react';
import { IoClose, IoAdd, IoImageOutline } from 'react-icons/io5';
import '../styles/write.css';

export default function WriteArticlePage() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleCancel = () => {
    if (window.confirm('Yakin ingin membatalkan? Semua perubahan akan hilang.')) {
      setTitle('');
      setContent('');
      setTags([]);
      setImagePreview(null);
    }
  };

  const handleSaveDraft = () => {
    alert('Artikel berhasil disimpan ke draft!');
  };

  const handlePublish = () => {
    if (!title || !content) {
      alert('Judul dan konten harus diisi!');
      return;
    }
    alert('Artikel berhasil dipublikasikan!');
  };

  return (
    <div className="write-page">
      <div className="write-wrapper">
        {/* Header */}
        <div className="page-header">
          <h1>Tulis Artikel Baru</h1>
        </div>

        {/* Main Form Card */}
        <div className="form-card">
          {/* Image Upload Section */}
          <div className="image-upload-section">
            {imagePreview ? (
              <div className="image-preview-container">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="preview-image"
                />
                <button
                  onClick={() => setImagePreview(null)}
                  className="remove-image-btn"
                >
                  <IoClose size={20} />
                </button>
              </div>
            ) : (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="image-upload-placeholder"
              >
                <div className="upload-icon-wrapper">
                  <IoImageOutline size={40} />
                </div>
                <p className="upload-text-main">Klik untuk upload gambar header</p>
                <p className="upload-text-sub">PNG, JPG hingga 10MB</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input-hidden"
            />
          </div>

          {/* Form Content */}
          <div className="form-content">
            {/* Title Input */}
            <div className="form-group">
              <label className="form-label">Judul Artikel</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul artikel yang menarik..."
                className="title-input"
              />
            </div>

            {/* Content Textarea */}
            <div className="form-group">
              <label className="form-label">Konten Artikel</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tulis konten artikel Anda di sini... Jelaskan ide dan pemikiran Anda secara detail."
                rows={12}
                className="content-textarea"
              />
              <div className="character-count">
                <span>{content.length} karakter</span>
              </div>
            </div>

            {/* Tags Section */}
            <div className="form-group">
              <label className="form-label">Tag Artikel</label>
              <div className="tag-input-row">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tambahkan tag..."
                  className="tag-input"
                />
                <button
                  onClick={handleAddTag}
                  className="add-tag-btn"
                >
                  <IoAdd size={18} />
                  Tambah
                </button>
              </div>
              
              {/* Tags Display */}
              {tags.length > 0 && (
                <div className="tags-container">
                  {tags.map((tag, index) => (
                    <div key={index} className="tag-item">
                      <span>{tag}</span>
                      <button
                        onClick={() => handleRemoveTag(index)}
                        className="remove-tag-btn"
                      >
                        <IoClose size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button onClick={handleCancel} className="btn-cancel">
              Batal
            </button>
            <button onClick={handleSaveDraft} className="btn-draft">
              Simpan ke Draft
            </button>
            <button onClick={handlePublish} className="btn-publish">
              Publikasikan
            </button>
          </div>
        </div>

        {/* Tips Card */}
        <div className="tips-card">
          <h3 className="tips-title">
            <span className="tips-icon">💡</span>
            Tips Menulis Artikel
          </h3>
          <ul className="tips-list">
            <li>
              <span className="bullet">•</span>
              <span>Gunakan judul yang menarik dan deskriptif</span>
            </li>
            <li>
              <span className="bullet">•</span>
              <span>Tambahkan gambar header yang relevan dengan topik</span>
            </li>
            <li>
              <span className="bullet">•</span>
              <span>Gunakan tag yang sesuai untuk memudahkan pencarian</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}