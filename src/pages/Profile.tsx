import { motion } from "framer-motion";
import { useState } from "react";
import '../styles/profile.scss'

const ProfileForm=()=> {
  const [bio, setBio] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      bio,
      age,
      gender,
      avatar,
    });
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
          {preview && <img src={preview} alt="Avatar Preview" className="avatar-preview" />}
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>About You</label>
          <textarea
          style={{padding:10}}
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
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
}

export default ProfileForm