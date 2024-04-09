/** @format */

import * as React from "react";
import { useState, useEffect } from "react";

import styles from "./Mentors.module.css";
import Sidebar from "../components/mentors/Sidebar";
import MentorReviewCard from "../components/mentors/MentorReviewCard";
import Navbar from "../components/Navbar";

export default function Mentors() {
  const [mentors, setMentors] = useState([]);

  const fetchAllMentors = () => {
    fetch(`${import.meta.env.VITE_HOST_API}/mentor/get/all`)
      .then((response) => response.json())
      .then((data) => setMentors(data.all));
    console.log(mentors);
  };

  useEffect(() => {
    fetchAllMentors();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <div className={styles.sideBar}>
          <Sidebar />
        </div>
        <div className={styles.main}>
          <div className={styles.unapprovedContainer}>
            New Mentors:
            <div className={styles.unapprovedMentors}>
              {mentors.length &&
                mentors?.map((item, key) => {
                  if (item.approved == false) {
                    return (
                      <MentorReviewCard
                        key={key}
                        item={item}
                      />
                    );
                  }
                })}
            </div>
          </div>
          <div className={styles.allContainer}>
            {" "}
            All Mentors:
            <div className={styles.allMentors}>
              {mentors.length &&
                mentors?.map((item, key) => (
                  <MentorReviewCard
                    key={key}
                    item={item}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
