/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import Icon from "@mui/material/Icon";

// Images
import team2 from "assets/images/team-2.jpg";


function Users({ name }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      {/* <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox> */}
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        
      </SoftBox>
    </SoftBox>
  );
}

function Function({job}) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography>
    </SoftBox>
  );
}

const action = (
  <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
    more_vert
  </Icon>
);

const usersTableData = {
  columns: [
    { name: "userId", align: "center" },
    { name: "name", align: "left" },
    { name: "role", align: "left" },
    { name: "email", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      userId: 1,
      name: <Users image={team2} name="John Michael" />,
      role: <Function job="Staff" />,
      email: (
        <SoftTypography variant="button" fontWeight="medium">
          jonh@mail.com
        </SoftTypography>
      ),
      action,
    },
   
  ],
};

export default usersTableData;
