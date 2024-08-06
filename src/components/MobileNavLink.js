import styles from "./mobileNavLink.module.css";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

const MobileNavLink = (props) => {
  return (
    <Box sx={{ marginLeft: "20px", marginTop: "10px" }}>
      <Link className={styles.subHeading} to={props.link}>
        {props.title}
      </Link>
    </Box>
  );
};

export default MobileNavLink;
