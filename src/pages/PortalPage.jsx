/** @format */

// PortalPage.js
import React, { useState, useEffect } from "react";
import styles from "./portalpage.module.css"; // Import the styles
import { Edit } from "@mui/icons-material";
import { AddReaction } from "@mui/icons-material";
import Navbar from "../components/Navbar";
import PortalEdit from "./PortalEdit";

const PortalPage = () => {
  const [portalData, setPortalData] = useState([]);
  let [editable, setEditable] = useState("none");
  const [editMember, setEditMember] = useState(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/portal/get`
      )
        .then((response) => response.json())
        .then((data) => setPortalData(data[0]));
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  const handleEdit = (member) => {
    setEditMember(member);
    setEditable("team");
  };
  const handleDelete = (member) => {
    const newTeamList = portalData.team.filter((mem) => {
      return mem.socials.email !== member.socials.email;
    });
    portalData.team = newTeamList;
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

  // console.log(portalData.team?.map((mem) => mem.photo));
  const handleButton = (value) => {
    setEditMember(null);
    setEditable(value);
  };


  return (
    <div>
      <Navbar />
      <div className={styles.portalPage}>
        <div className={styles.portalContainer}>
          <h1>Portal Page</h1>
          <div className={styles.socialsContainer}>
            <div className={styles.firstRow}>
              <span>Socials</span>{" "}
              <span
                className={styles.shadow}
                onClick={() => handleButton("socials")}>
                <Edit />
              </span>{" "}
            </div>
            <div className={styles.secondRow}>
              <div className={styles.socialDiv}>
                <span className={styles.name}>LinkedIN</span>
                <span className={styles.value}>
                  {portalData?.techifySocials?.linkedin}
                </span>
              </div>
              <div className={styles.socialDiv}>
                <span className={styles.name}>InstaGram</span>
                <span className={styles.value}>
                  {" "}
                  {portalData?.techifySocials?.instagram}
                </span>
              </div>
              <div className={styles.socialDiv}>
                <span className={styles.name}>Twitter</span>
                <span className={styles.value}>
                  {" "}
                  {portalData?.techifySocials?.twitter}
                </span>
              </div>
              <div className={styles.socialDiv}>
                <span className={styles.name}>Email</span>
                <span className={styles.value}>
                  {" "}
                  {portalData?.techifySocials?.email}
                </span>
              </div>
              <div className={styles.socialDiv}>
                <span className={styles.name}>Phone</span>
                <span className={styles.value}>
                  {" "}
                  {portalData?.techifySocials?.phone}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.teamContainer}>
            <div className={styles.firstRow}>
              <span>Team </span>
              <span className={styles.shadow}>
                <AddReaction onClick={() => handleButton("team")}></AddReaction>
              </span>
            </div>
            <div className={styles.secondRow}>
              {portalData?.team?.map((member) => (
                <div
                  key={member._id}
                  className={styles.memberCard}>
                  <h2 className={styles.memberName}>{member.name}</h2>
                  <p className={styles.memberPosition}>{member.position}</p>
                  <img
                    src={member.photo}
                    alt={member.name}
                    className={styles.memberPhoto}
                  />
                  <p className={styles.memberEmail}>{member.socials.email}</p>
                  <div className={styles.socialLinks}>
                    {" "}
                    <a
                      href={member.socials.linkedin}
                      className={styles.socialLink}>
                      LinkedIn
                    </a>
                    <a
                      href={member.socials.instagram}
                      className={styles.socialLink}>
                      Instagram
                    </a>
                    <a
                      href={member.socials.twitter}
                      className={styles.socialLink}>
                      Twitter
                    </a>
                  </div>
                  <div>
                    <button
                      className={styles.submitButton}
                      onClick={() => handleEdit(member)}>
                      Edit
                    </button>
                    <button
                      className={styles.submitButton}
                      onClick={() => handleDelete(member)}>
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <PortalEdit
          editable={editable}
          setEditable={setEditable}
          portalData={portalData}
          setPortalData={setPortalData}
          editMember={editMember}
        />
      </div>
    </div>
  );
};

export default PortalPage;
