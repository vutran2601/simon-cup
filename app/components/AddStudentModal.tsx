"use client";
import { useState } from "react";
import { createStudent } from "@/services/students";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
}

export default function AddStudentModal({ isOpen, onClose, onAdd }: AddStudentModalProps) {
  const [formData, setFormData] = useState({
    saint_name: '',
    name: '',
    gender: '',
    class: '',
    team_name: '',
    points: 0,
  });
  const [loading, setLoading] = useState(false);

  const teams = ['Đội 0', 'Đội 1', 'Đội 2', 'Đội 3', 'Đội 4'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "points" ? Number(value) : value,
    }));
  };

  const handlePointsChange = (delta: number) => {
    setFormData(prev => ({
      ...prev,
      points: Math.max(0, (prev.points ?? 0) + delta),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createStudent(formData);
      onAdd();
      onClose();
      // Reset form
      setFormData({
        saint_name: '',
        name: '',
        gender: '',
        class: '',
        team_name: '',
        points: 0,
      });
    } catch (error) {
      alert('Có lỗi xảy ra khi thêm cá nhân mới!');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <div className="edit-modal-header">
          <h2>Thêm cá nhân mới</h2>
          <button className="edit-modal-close" onClick={onClose} title="Đóng">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="edit-modal-body">
            <div className="edit-form-group">
              <label>Tên Thánh</label>
              <input
                type="text"
                name="saint_name"
                value={formData.saint_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="edit-form-group">
              <label>Tên</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="edit-form-group">
              <label>Giới tính</label>
              <div className="edit-radio-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Nam"
                    checked={formData.gender === 'Nam'}
                    onChange={handleChange}
                  /> Nam
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Nữ"
                    checked={formData.gender === 'Nữ'}
                    onChange={handleChange}
                  /> Nữ
                </label>
              </div>
            </div>
            <div className="edit-form-group">
              <label>Lớp</label>
              <input
                type="text"
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
              />
            </div>
            <div className="edit-form-group">
              <label>Đội</label>
              <select
                name="team_name"
                value={formData.team_name}
                onChange={handleChange}
                required
              >
                <option value="">Chọn đội</option>
                {teams.map((team) => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>
            <div className="edit-form-group">
              <label>Điểm</label>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  type="button"
                  className="btn btn-edit"
                  style={{ minWidth: 32, padding: "4px 10px" }}
                  onClick={() => handlePointsChange(-1)}
                  tabIndex={-1}
                >–</button>
                <input
                  type="number"
                  name="points"
                  value={formData.points}
                  onChange={handleChange}
                  min={0}
                  style={{ width: 70, textAlign: "center" }}
                  required
                />
                <button
                  type="button"
                  className="btn btn-edit"
                  style={{ minWidth: 32, padding: "4px 10px" }}
                  onClick={() => handlePointsChange(1)}
                  tabIndex={-1}
                >+</button>
              </div>
            </div>
          </div>
          <div className="edit-modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Đang thêm...' : 'Thêm cá nhân'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
