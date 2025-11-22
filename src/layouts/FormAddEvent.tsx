import { useState } from 'react';
import Button from '../components/button';
import '../styles/form-add-event.css';

interface Props {
  onClose?: () => void;
  onSubmit?: (data: FormData) => void;
}

interface FormData {
  photo_url: File | null; // Ubah dari string ke File
  judul: string;
  deskripsi: string;
}

export default function FormAddEvent({ onClose, onSubmit }: Props) {
  const [formData, setFormData] = useState<FormData>({
    judul: '',
    deskripsi: '',
    photo_url: null // Ubah dari string ke null
  });

  const [imagePreview, setImagePreview] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // PERBAIKAN: Simpan File object, bukan nama file
      setFormData(prev => ({
        ...prev,
        photo_url: file // Simpan File object
      }));
    }
  };

  const handleSubmit = () => {
    // Validasi semua field termasuk gambar
    if (!formData.judul || !formData.deskripsi || !formData.photo_url) {
      alert('Mohon lengkapi semua field yang diperlukan termasuk gambar!');
      return;
    }
    
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const handleCancel = () => {
    setFormData({ judul: '', deskripsi: '', photo_url: null });
    setImagePreview('');
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Tambah Kegiatan Baru</h2>
          <button className="modal-close-btn" onClick={handleCancel}>
            ×
          </button>
        </div>

        <div className="add-event-container">
          <div className="image-section">
            <div className="image-upload-wrapper">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="image-preview" />
              ) : (
                <div className="image-placeholder">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <p className="placeholder-text">Upload Gambar</p>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="upload-button">
              Pilih Gambar
            </label>
            {formData.photo_url && (
              <p className="file-name" style={{ marginTop: '8px', fontSize: '14px', color: '#6b7280' }}>
                File terpilih: {formData.photo_url.name}
              </p>
            )}
          </div>

          <div className="form-section">
            <div className="form-group">
              <label htmlFor="judul" className="form-label">
                Judul Kegiatan <span className="required">*</span>
              </label>
              <input
                type="text"
                id="judul"
                name="judul"
                value={formData.judul}
                onChange={handleInputChange}
                placeholder="Masukkan judul kegiatan"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="deskripsi" className="form-label">
                Deskripsi <span className="required">*</span>
              </label>
              <textarea
                id="deskripsi"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleInputChange}
                placeholder="Masukkan deskripsi kegiatan"
                className="form-textarea"
                rows={5}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <Button
            type="button"
            variant="outline"
            size="large"
            text="Batal"
            onClick={handleCancel}
          />
          <Button
            type="button"
            variant="solid"
            size="large"
            text="Simpan"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}