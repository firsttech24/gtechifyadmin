/** @format */

import { Filter, Filter1, Search, Tune } from "@mui/icons-material";
import styles from "./../../pages/Mentors.module.css";

import { useState } from "react";

// Arrays for non-core and core profiles
const nonCoreProfiles = [
  "Data Science",
  "Software",
  "Banking and Finance",
  "Consulting",
  "Analytics",
  "Product Management",
  "Operations",
  "Supply Chain",
  "FMCG",
  "Operations Research",
  "Sales",
  "Inventory Management",
  "Logistics",
];

const coreProfiles = [
  "Aerospace Engineering",
  "Biomedical Engineering",
  "Bioscience and Bioengineering",
  "Biotechnology",
  "Chemical Engineering",
  "Civil Engineering",
  "Computer Science and Engineering",
  "Electrical Engineering",
  "Electrical and Electronics Engineering",
  "Electronics and Communication Engineering",
  "Electric Vehicles (EV)",
  "Mechanical Engineering",
  "Metallurgical and Materials Engineering",
  "Mining Engineering",
  "Ocean Engineering",
];
const Sidebar = () => {
  const [filters, setFilters] = useState([]);

  return (
    <div>
      <div className={styles.searchBox}>
        <span className={styles.searchHeading}>
          <Search />
          Search
        </span>

        <input
          type="text"
          className={styles.searchInput}
          placeholder="Write here..."
        />
      </div>
      <div className={styles.filterBox}>
        <div className={styles.formGroupSelect}>
          <span>
            {" "}
            <Tune /> Filters :{" "}
          </span>
          <label>
            <span>Non-Core Profiles</span>
            <select
              name="nonCoreAreasOfInterest"
              value={""}
              onChange={(event) =>
                {
                    if(filters.findIndex(item => event.target.value == item) == -1)
                    setFilters([...filters, event.target.value])
                }
              }>
              <option value="">Choose Profiles</option>
              {nonCoreProfiles.map((profile) => (
                <option
                  key={profile}
                  value={profile}>
                  {profile}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span> Core Profiles </span>
            <select
              name="coreAreasOfInterest"
              value={""}
              placeholder="choose one"
              onChange={(event) =>
               {if(filters.findIndex(item => event.target.value == item) == -1) setFilters([...filters, event.target.value])}
              }>
              <option value="">Choose Profiles</option>
              {coreProfiles.map((profile) => (
                <option
                  key={profile}
                  value={profile}>
                  {profile}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles.filteredItemsBox}>
          {filters.map((item, key) => (
            <span key={key} className={styles.filteredItems}>
              <input
                type="checkbox"
                checked
                value={item}
                onChange={
                    ()=>{
                       setFilters(filters.filter(ite => ite != item))
                    }
                }
              />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
