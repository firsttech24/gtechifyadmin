/** @format */

import React, { useState } from "react";
import styles from "./mentorProfile.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileMentor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    name,
    email,
    wnumber,
    bio,
    education,
    experience,
    currentCompany,
    socials,
    areasOfInterest,
    pmt,
    approved,
  } = location.state;
  const [approval, setApproval] = useState(location.state.approved);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateMentor()
      .then((data) => {
        console.log("mentor updated successfully:", data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to update student:", error);
      });
  };

  const updateMentor = async () => {
    const updatedata = {
      ...location.state,
      approved: approval,
    };
    console.log(updatedata);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/mentor/update/${location.state._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedata),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register student");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating mentor:", error);
      throw error;
    }
  };

  return (
    <div className={styles.container}>
      <h1>User Profile</h1>

      <div className={styles.section}>
        <h2>Profile Information</h2>
        <p>
          <span className={styles.bold}>Name:</span> {name}
        </p>
        <p>
          <span className={styles.bold}>Email:</span>{" "}
          <a
            href={email}
            className={styles.link}>
            {email}
          </a>
        </p>
        <p>
          <span className={styles.bold}>WhatsApp Number:</span>
          {wnumber}
        </p>
        <p>
          <span className={styles.bold}>Bio/Description:</span>
          {bio}
        </p>
      </div>

      <div className={styles.section}>
        <h2>Areas Of Interest</h2>
        <p>{areasOfInterest.join(", ")}</p>
      </div>

      <div className={styles.section}>
        <h2>Current Company</h2>
        <p>
          <span className={styles.bold}>Company:</span> {currentCompany.company}
        </p>
        <p>
          <span className={styles.bold}>Position:</span>{" "}
          {currentCompany.position}
        </p>
      </div>

      <div className={styles.section}>
        <h2>Experience</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {experience.length &&
              experience.map((item, key) => (
                <tr key={key}>
                  <td>{item.company}</td>
                  <td>{item.position}</td>
                  <td>{item.startDate}</td>
                  <td>{item.endDate}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className={styles.section}>
        <h2>Education</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Institute</th>
              <th>Passing Year</th>
              <th>Degree</th>
              <th>Department</th>
              <th>Specialisation</th>
            </tr>
          </thead>
          <tbody>
            {education.length &&
              education.map((item, key) => (
                <tr key={key}>
                  <td>{item.institute}</td>
                  <td>{item.passingYear}</td>
                  <td>{item.degree}</td>
                  <td>{item.department}</td>
                  <td>{item.specialisation}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className={styles.section}>
        <h2>Socials</h2>
        <p>
          <span className={styles.bold}>Linkedin:</span>{" "}
          <a
            href="#"
            className={styles.link}>
            {socials.linkedin}
          </a>
        </p>
        <p>
          <span className={styles.bold}>Github:</span>{" "}
          <a
            href="#"
            className={styles.link}>
            {socials.github}
          </a>
        </p>
        <p>
          <span className={styles.bold}>Twitter:</span>{" "}
          <a
            href="#"
            className={styles.link}>
            {socials.twitter}
          </a>
        </p>
      </div>

      <div className={styles.section}>
        <h2>Payment Details</h2>
        <p>
          <span className={styles.bold}>Account Name:</span>
          {pmt.acn}
        </p>
        <p>
          <span className={styles.bold}>Account Number:</span>
          {pmt.acno}
        </p>
        <p>
          <span className={styles.bold}>IFSC Code:</span>
          {pmt.ic}
        </p>
        <p>
          <span className={styles.bold}>Branch Name:</span>
          {pmt.nb}
        </p>
        <p>
          <span className={styles.bold}>Branch Code:</span>
          {pmt.bc}
        </p>
        <p>
          <span className={styles.bold}>UPI:</span>
          {pmt.ui}
        </p>
      </div>

      <div className={styles.section}>
        <span>Approval Status : {approval ? "Approved" : "Not Approved"}</span>
        <button
          className={styles.approvalButton}
          onClick={() => setApproval((pre) => !pre)}>
          Change
        </button>
      </div>

      <div
        className={styles.submitButton}
        onClick={handleSubmit}>
        Submit
      </div>
    </div>
  );
};

export default ProfileMentor;
