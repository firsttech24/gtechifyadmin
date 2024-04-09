/**
 * eslint-disable react/prop-types
 *
 * @format
 */

/** @format */

import styles from "./../../pages/Mentors.module.css";
import { useNavigate } from "react-router-dom";


const MentorReviewCard = (props) => {
  const { name, profile, areasOfInterest, currentCompany } = props.item;
const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/mentor", {state : props.item});
  }
  return (
    <div className={styles.MentorReviewCard} onClick={handleCardClick}>
      <h1 className={styles.name}>{name}</h1>
      <img
        src={
          profile ||
          "https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg"
        }
        alt=""
        className={styles.profilePic}
      />
      <h2 className={styles.company}>
        {currentCompany ? currentCompany.company : ""}
      </h2>
      <h3 className={styles.profileNames}>{areasOfInterest.join(", ")}</h3>
      <button className={styles.reviewButton}>Review Profile</button>
    </div>
  );
};

export default MentorReviewCard;
