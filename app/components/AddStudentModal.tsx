"use client";
import { useState } from "react";
import { createStudent } from "@/services/students";

interface AddStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: () => void;
}

const teams = ['Đội 0', 'Đội 1 - Damas', 'Đội 2 - Gierusalem', 'Đội 3 - Giodan', 'Đội 4 - Tiberia'];

export default function AddStudentModal({ isOpen, onClose, onAdd }: AddStudentModalProps) {
    const [formData, setFormData] = useState({
        saint_name: '', name: '', gender: '', class: '', team_name: '', points: 1,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(f => ({ ...f, [name]: name === "points" ? +value : value }));
    };

    const handlePointsChange = (delta: number) => {
        setFormData(f => ({ ...f, points: Math.max(0, (f.points ?? 0) + delta) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createStudent(formData);
            onAdd();
            onClose();
            setFormData({ saint_name: '', name: '', gender: '', class: '', team_name: '', points: 0 });
        } catch {
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
                    <h2>Thêm thiếu nhi mới</h2>
                    <button className="edit-modal-close" onClick={onClose} title="Đóng">&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="edit-modal-body">
                        {[
                            { label: "Tên Thánh", name: "saint_name", type: "text" },
                            { label: "Tên", name: "name", type: "text" },
                            { label: "Lớp", name: "class", type: "text" }
                        ].map(({ label, name, type }) => (
                            <div className="edit-form-group" key={name}>
                                <label>{label}</label>
                                <input type={type} name={name} value={formData[name as keyof typeof formData]} onChange={handleChange} required />
                            </div>
                        ))}
                        <div className="edit-form-group">
                            <label>Giới tính</label>
                            <div className="edit-radio-group">
                                {["Nam", "Nữ"].map(g => (
                                    <label key={g}>
                                        <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} /> {g}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="edit-form-group">
                            <label>Đội</label>
                            <select name="team_name" value={formData.team_name} onChange={handleChange} required>
                                <option value="">Chọn đội</option>
                                {teams.map(team => <option key={team} value={team}>{team}</option>)}
                            </select>
                        </div>
                        <div className="edit-form-group">
                            <label>Điểm</label>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <button type="button" className="btn btn-edit" style={{ width: 28, padding: "4px 10px" }} onClick={() => handlePointsChange(-1)} tabIndex={-1}>–</button>
                                <input type="number" name="points" value={formData.points} onChange={handleChange} min={0} style={{ width: 70, textAlign: "center" }} required />
                                <button type="button" className="btn btn-edit" style={{ width: 28, padding: "4px 10px" }} onClick={() => handlePointsChange(1)} tabIndex={-1}>+</button>
                            </div>
                        </div>
                    </div>
                    <div className="edit-modal-footer">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Đang lưu...' : 'Lưu'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}