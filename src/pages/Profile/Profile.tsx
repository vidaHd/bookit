import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ResetPasswordModal from "../../components/ResetPassword/ResetPassword";
import "./Profile.scss";
import { ButtonUI } from "../../ui-kit";
import { buttonType, VariantType } from "../../ui-kit/button/button.type";
import { useApiMutation, useApiQuery } from "../../api/apiClient";

type ProfileFormData = {
  description: string;
  age: string;
  gender: string;
  avatar: File | string | null;
};
const ProfileForm = () => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [data, setData] = useState<ProfileFormData>({
    description: "",
    age: "",
    gender: "",
    avatar: null,
  });

  const { data: profile } = useApiQuery<{
    profile: {
      description: string;
      age: string;
      gender: string;
      avatar: string | null;
    };
  }>({
    key: "profile",
    url: "http://localhost:5000/profile",
  });
  console.log(profile);

  const updateProfile = useApiMutation<
    { success: boolean },
    { description: string; age: string; gender: string; avatar: File | null }
  >({
    url: "http://localhost:5000/profile",
    method: "POST",
  });

  useEffect(() => {
    if (profile) {
      setData((prev) => {
        if (
          prev.description === profile.profile.description &&
          prev.age === profile.profile.age &&
          prev.gender === profile.profile.gender &&
          prev.avatar === profile.profile.avatar
        ) {
          return prev;
        }
        return {
          description: profile.profile.description || "",
          age: profile.profile.age || "",
          gender: profile.profile.gender || "",
          avatar: profile.profile.avatar ?? null,
        };
      });

      setPreview(profile.profile.avatar ?? "");
    }
  }, [profile]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData({ ...data, avatar: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    const formData = new FormData();

    if (data.avatar && data.avatar !== profile?.profile.avatar) {
      formData.append("avatar", data.avatar as File);
    }
    if (data.description !== profile?.profile.description) {
      formData.append("description", data.description);
    }
    if (data.age !== profile?.profile.age) {
      formData.append("age", String(data.age));
    }
    if (data.gender !== profile?.profile.gender) {
      formData.append("gender", data.gender);
    }
    updateProfile.mutate(formData as any);
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
              value={data.age}
              onChange={(e) => setData({ ...data, age: e.target.value })}
              placeholder={t("profile.agePlaceholder")}
            />
          </div>

          <div className="form-group">
            <label>{t("profile.gender")}</label>
            <select
              value={data.gender}
              onChange={(e) => setData({ ...data, gender: e.target.value })}
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
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
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
