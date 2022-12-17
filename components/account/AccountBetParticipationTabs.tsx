import { TabContext, TabList, TabPanel } from "@mui/lab";
import { SxProps, Tab } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import AccountBetParticipationList from "./AccountBetParticipationList";

/**
 * A component with tabs with account bet participations.
 */
export default function AccountBetParticipationTabs(props: {
  address: string;
  sx?: SxProps;
}) {
  const [tabValue, setTabValue] = useState("1");

  function handleChange(_: any, newTabValue: any) {
    setTabValue(newTabValue);
  }

  return (
    <Box sx={{ width: 680, ...props.sx }}>
      <TabContext value={tabValue}>
        <TabList
          centered
          onChange={handleChange}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            mb: 1,
          }}
        >
          <Tab label="Made bets" value="1" />
          <Tab label="For success" value="2" />
          <Tab label="For failure" value="3" />
        </TabList>
        <TabPanel value="1" sx={{ px: 0 }}>
          <AccountBetParticipationList
            address={props.address}
            isCreator={true}
          />
        </TabPanel>
        <TabPanel value="2" sx={{ px: 0 }}>
          <AccountBetParticipationList
            address={props.address}
            isFeeForSuccess={true}
          />
        </TabPanel>
        <TabPanel value="3" sx={{ px: 0 }}>
          <AccountBetParticipationList
            address={props.address}
            isFeeForSuccess={false}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
