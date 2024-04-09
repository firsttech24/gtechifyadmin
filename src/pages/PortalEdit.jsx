/**
 * eslint-disable react/prop-types
 *
 * @format
 */

/** @format */

import React, { useEffect, useState } from "react";
import styles from "./portaledit.module.css";
import { store } from "../../../global-techify-frontend/src/config/firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const PortalEdit = ({
  editable,
  setEditable,
  portalData,
  setPortalData,
  editMember,
}) => {
  const [teamMember, setTeamMember] = useState({
    name: "",
    position: "",
    email: "",
    linkedin: "",
    instagram: "",
    twitter: "",
    photo: "",
  });

  useEffect(() => {
    if (editMember) {
      setTeamMember({
        name: editMember.name,
        position: editMember.position,
        photo: editMember.photo,
        email: editMember.socials.email,
        linkedin: editMember.socials.linkedin,
        twitter: editMember.socials.twitter,
        instagram: editMember.socials.instagram,
      });
    } else {
      setTeamMember({
        name: "",
        position: "",
        email: "",
        linkedin: "",
        instagram: "",
        twitter: "",
        photo: "",
      });
    }
  }, [editMember]);

  const [socials, setSocials] = useState({
    email: "",
    linkedin: "",
    instagram: "",
    twitter: "",
    phone: "",
  });

  useEffect(() => {
    setSocials({
      email: portalData?.techifySocials?.email,
      linkedin: portalData?.techifySocials?.linkedin,
      instagram: portalData?.techifySocials?.instagram,
      twitter: portalData?.techifySocials?.twitter,
      phone: portalData?.techifySocials?.phone,
    });
  }, [portalData]);

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSocials({
      ...socials,
      [name]: value,
    });
  };

  const handleSocialSubmit = (e) => {
    e.preventDefault();
    // console.log(socials);
    portalData.techifySocials = socials;
    console.log(portalData);
    fetch(`${import.meta.env.VITE_HOST_API}/portal/set/${portalData._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(portalData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPortalData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleTeamChange = (e) => {
    const { name, value } = e.target;
    setTeamMember({
      ...teamMember,
      [name]: value,
    });
  };

  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    console.log(teamMember);
    const { name, photo, position, linkedin, instagram, email, twitter } =
      teamMember;
    const newMember = {
      name,
      photo,
      position,
      socials: { linkedin, instagram, email, twitter },
    };
    if (editMember === null) portalData.team = [...portalData.team, newMember];
    else {
      // console.log(
      //   "portalData:",
      //   portalData.team.map((item) => item.socials.email)
      // );
      // console.log("teamMember.email:", teamMember.email);

      const index = portalData.team.findIndex((member) => {
        console.log("member.email:", member.email);
        return member.socials.email === teamMember.email;
      });

      if (index !== -1) {
        portalData.team[index] = newMember;
      } else {
        console.log("Member not found!");
      }
    }
    fetch(`${import.meta.env.VITE_HOST_API}/portal/set/${portalData._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(portalData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setPortalData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleImageInput = async (e) => {
    let imageRef = ref(store, `team/members/${v4()}`);
    await uploadBytes(imageRef, e.target.files[0]);
    const imageUrl = await getDownloadURL(imageRef);
    console.log(imageUrl);
    setTeamMember({
      ...teamMember,
      photo: imageUrl,
    });
  };

  return (
    <div className={editable == "none" ? styles.none : styles.block}>
      <button
        className={styles.submitButton}
        onClick={() => setEditable("none")}>
        Cancel
      </button>
      {editable === "socials" && (
        <div className={styles.socialsEditContainer}>
          <label
            htmlFor=""
            className={styles.socialEditLabels}>
            {" "}
            LinkedIn :
            <input
              type="text"
              placeholder="Linkedin"
              name="linkedin"
              value={socials.linkedin}
              onChange={handleSocialChange}
              className={styles.socialEditInputs}
            />
          </label>
          <label
            htmlFor=""
            className={styles.socialEditLabels}>
            {" "}
            Instagram :
            <input
              type="text"
              placeholder="Instagram"
              name="instagram"
              value={socials.instagram}
              onChange={handleSocialChange}
              className={styles.socialEditInputs}
            />
          </label>
          <label
            htmlFor=""
            className={styles.socialEditLabels}>
            {" "}
            Email :
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={socials.email}
              onChange={handleSocialChange}
              className={styles.socialEditInputs}
            />
          </label>
          <label
            htmlFor=""
            className={styles.socialEditLabels}>
            {" "}
            Twitter :
            <input
              type="text"
              placeholder="twitter"
              name="twitter"
              value={socials.twitter}
              onChange={handleSocialChange}
              className={styles.socialEditInputs}
            />
          </label>
          <label
            htmlFor=""
            className={styles.socialEditLabels}>
            {" "}
            Phone :
            <input
              type="text"
              placeholder="phone"
              name="phone"
              value={socials.phone}
              onChange={handleSocialChange}
              className={styles.socialEditInputs}
            />
          </label>
          <button
            className={styles.submitButton}
            onClick={handleSocialSubmit}>
            Update
          </button>
        </div>
      )}
      {editable === "team" && (
        <form className={styles.teamEditContainer}>
          <label
            htmlFor="photo"
            className={styles.teamEditLabel}>
            Photo URL:
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            className={styles.teamEditInput}
            onChange={handleImageInput}
          />

          <label
            htmlFor="teamName"
            className={styles.teamEditLabel}>
            Name:
          </label>
          <input
            type="text"
            id="teamName"
            name="name"
            value={teamMember.name}
            onChange={handleTeamChange}
            className={styles.teamEditInput}
          />
          <label
            htmlFor="position"
            className={styles.teamEditLabel}>
            Position:
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={teamMember.position}
            onChange={handleTeamChange}
            className={styles.teamEditInput}
          />
          <label
            htmlFor="email"
            className={styles.teamEditLabel}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={teamMember.email}
            onChange={handleTeamChange}
            className={styles.teamEditInput}
          />

          <label
            htmlFor="linkedin"
            className={styles.teamEditLabel}>
            LinkedIn:
          </label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            value={teamMember.linkedin}
            onChange={handleTeamChange}
            className={styles.teamEditInput}
          />

          <label
            htmlFor="instagram"
            className={styles.teamEditLabel}>
            Instagram:
          </label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            value={teamMember.instagram}
            onChange={handleTeamChange}
            className={styles.teamEditInput}
          />

          <label
            htmlFor="twitter"
            className={styles.teamEditLabel}>
            Twitter:
          </label>
          <input
            type="text"
            id="twitter"
            value={teamMember.twitter}
            onChange={handleTeamChange}
            className={styles.teamEditInput}
            name="twitter"
          />

          <button
            type="submit"
            value="Submit"
            onClick={handleMemberSubmit}
            className={styles.submitButton}>
            {" "}
            {editMember ? "UPDATE" : "ADD"}
          </button>
        </form>
      )}
    </div>
  );
};

export default PortalEdit;
