import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useProfileData from "../../utils/profile";
import ResetPasswordModal from "../../components/ResetPassword/ResetPassword";
import './Profile.scss'

const ProfileForm = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    description: "",
    age: "",
    gender: "",
    avatar: null as File | null,
  });

  const { mutation, profileQuery } = useProfileData();

  useEffect(() => {
    if (profileQuery.data) {
      setFormData({
        description: profileQuery.data.profile.description || "",
        age: profileQuery.data.profile.age || "",
        avatar: profileQuery.data.profile.avatar || null,
        gender: profileQuery.data.profile.gender || "",
      });
      setPreview(profileQuery.data.profile.avatar || null);
    }
  }, [profileQuery.data]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, avatar: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="profile-wrapper">
      <motion.form
        className="profile-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="form-title">ویرایش پروفایل</h2>


        <div className="form-group avatar-group">
          <label>عکس پروفایل</label>
          <div className="avatar-upload" onClick={openFileDialog}>
            {preview ? (
              <img src={preview} alt="پیش‌نمایش آواتار" className="avatar-img" />
            ) : (
              <div className="avatar-placeholder">+</div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
        </div>

        <div className="form-group">
          <label>سن</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            placeholder="سن خود را وارد کنید"
          />
        </div>

        <div className="form-group">
          <label>جنسیت</label>
          <select
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          >
            <option value="">انتخاب کنید</option>
            <option value="male">مرد</option>
            <option value="female">زن</option>
            <option value="other">سایر</option>
          </select>
        </div>

        <div className="form-group">
          <label>درباره من</label>
          <input
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="چند خط درباره خودتان بنویسید..."
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="submit-btn"
        >
          ذخیره پروفایل
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className="submit-btn-password"
          onClick={() => setShowResetModal(true)}
        >
          تغییر رمز عبور
        </motion.button>

        {showResetModal && (
          <ResetPasswordModal
            isOpen={showResetModal}
            onClose={() => setShowResetModal(false)}
          />
        )}
      </motion.form>
    </div>
  );
};

export default ProfileForm;
