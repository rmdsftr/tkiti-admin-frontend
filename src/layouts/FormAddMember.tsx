import { useState } from 'react';
import '../styles/form-add-member.css';
import Button from '../components/button';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MemberFormData) => Promise<void>;
}

export interface MemberFormData {
  nim: string;
  nama: string;
  no_aslab: string;
  pword: string;
  deskripsi: string | null;
}

export default function AddMemberModal({ isOpen, onClose, onSubmit }: AddMemberModalProps) {
  const [formData, setFormData] = useState<MemberFormData>({
    nim: '',
    nama: '',
    no_aslab: '',
    pword: '',
    deskripsi: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<MemberFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof MemberFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<MemberFormData> = {};

    if (!formData.nim.trim()) {
      newErrors.nim = 'NIM wajib diisi';
    } else if (!/^\d+$/.test(formData.nim)) {
      newErrors.nim = 'NIM harus berupa angka';
    }

    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama wajib diisi';
    }

    if (!formData.no_aslab.trim()) {
      newErrors.no_aslab = 'No Aslab wajib diisi';
    }

    if (!formData.pword) {
      newErrors.pword = 'Password wajib diisi';
    } else if (formData.pword.length < 6) {
      newErrors.pword = 'Password minimal 6 karakter';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
      
      setFormData({
        nim: '',
        nama: '',
        no_aslab: '',
        pword: '',
        deskripsi: ''
      });
      setErrors({});
      onClose();
    } catch (error) {
      
      console.error('Error submit form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        nim: '',
        nama: '',
        no_aslab: '',
        pword: '',
        deskripsi: ''
      });
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={handleClose}></div>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Tambah Anggota Baru</h2>
          <button 
            className="modal-close-btn" 
            onClick={handleClose}
            disabled={loading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div>
                <div className="form-group">
              <label htmlFor="nim" className="form-label">
                NIM <span className="required">*</span>
              </label>
              <input
                type="text"
                id="nim"
                name="nim"
                className={`form-input ${errors.nim ? 'form-input-error' : ''}`}
                value={formData.nim}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.nim && <span className="error-message">{errors.nim}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="nama" className="form-label">
                Nama Lengkap <span className="required">*</span>
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                className={`form-input ${errors.nama ? 'form-input-error' : ''}`}
                value={formData.nama}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.nama && <span className="error-message">{errors.nama}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="no_aslab" className="form-label">
                No Aslab <span className="required">*</span>
              </label>
              <input
                type="text"
                id="no_aslab"
                name="no_aslab"
                className={`form-input ${errors.no_aslab ? 'form-input-error' : ''}`}
                value={formData.no_aslab}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.no_aslab && <span className="error-message">{errors.no_aslab}</span>}
            </div>
            </div>

            <div>
                <div className="form-group">
              <label htmlFor="pword" className="form-label">
                Password <span className="required">*</span>
              </label>
              <input
                type="password"
                id="pword"
                name="pword"
                className={`form-input ${errors.pword ? 'form-input-error' : ''}`}
                value={formData.pword}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.pword && <span className="error-message">{errors.pword}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="deskripsi" className="form-label">
                Deskripsi 
              </label>
              <textarea
                id="deskripsi"
                name="deskripsi"
                className={`form-input form-textarea ${errors.deskripsi ? 'form-input-error' : ''}`}
                rows={3}
                value={formData.deskripsi!}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.deskripsi && <span className="error-message">{errors.deskripsi}</span>}
            </div>
          </div>
            </div>

          <div className="modal-footer">
            <Button
              type="button"
              variant='outline'
              size='large'
              text='Batal'
              onClick={handleClose}
              disabled={loading}
            />
            <Button
              type="submit"
              variant='solid'
              size='large'
              text={loading ? 'Menyimpan...' : 'Simpan'}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </>
  );
}