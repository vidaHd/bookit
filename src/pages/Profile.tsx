import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "../styles/profile.scss";
import useProfileData from "../helper/profile";

const ProfileForm = () => {
  const [preview, setPreview] = useState<string | null>(null);

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
    }
  }, [profileQuery.data]);
  

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, avatar: file });
      setPreview(URL.createObjectURL(file));
    }
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
        <h2 className="form-title">Edit Your Profile</h2>

        <div className="form-group">
          <label>Avatar</label>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
          {preview && (
            <img
              src={preview}
              alt="Avatar Preview"
              className="avatar-preview"
            />
          )}
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            placeholder="Enter your age"
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>About You</label>
          <textarea
            style={{ padding: 10 }}
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="about yourself.."
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="submit-btn"
        >
          Save Profile
        </motion.button>
      </motion.form>
    </div>
  );
};

export default ProfileForm;
