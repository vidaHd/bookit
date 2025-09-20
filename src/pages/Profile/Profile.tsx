import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next"; 
import useProfileData from "../../utils/profile";
import ResetPasswordModal from "../../components/ResetPassword/ResetPassword";
import "./Profile.scss";
import { ButtonUI } from "../../ui-kit";
import { buttonType, VariantType } from "../../ui-kit/button/button.type";

const ProfileForm = () => {
  const { t } = useTranslation(); 
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

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-left">
          <div className="avatar-group">
            <div className="avatar-upload" onClick={openFileDialog}>
              {preview ? (
                <img src={preview} alt={t("profile.avatarAlt")} />
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

          <ButtonUI
            type={buttonType.BUTTON}
            variant={VariantType.SECONDARY}
            onClick={() => setShowResetModal(true)}
          >
            {t("profile.changePassword")}
          </ButtonUI>
        </div>

        <div className="profile-right">
          <h2 className="form-title">{t("profile.editProfile")}</h2>

          <div className="form-group">
            <label>{t("profile.age")}</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              placeholder={t("profile.agePlaceholder")}
            />
          </div>

          <div className="form-group">
            <label>{t("profile.gender")}</label>
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option value="">{t("profile.selectOption")}</option>
              <option value="male">{t("profile.male")}</option>
              <option value="female">{t("profile.female")}</option>
              <option value="other">{t("profile.other")}</option>
            </select>
          </div>

          <div className="form-group">
            <label>{t("profile.aboutMe")}</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder={t("profile.aboutPlaceholder")}
            />
          </div>

          <ButtonUI
            type={buttonType.BUTTON}
            variant={VariantType.PRIMARY}
            onClick={handleSubmit}
          >
            {t("profile.saveProfile")}
          </ButtonUI>
        </div>
      </div>

      {showResetModal && (
        <ResetPasswordModal
          isOpen={showResetModal}
          onClose={() => setShowResetModal(false)}
        />
      )}
    </div>
  );
};

export default ProfileForm;
