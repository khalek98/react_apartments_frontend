import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { Container, Tabs, Tab, Box, useMediaQuery } from '@mui/material';

import UserInfo from '../../components/UserInfo';
import UserAnnouncements from '../../components/UserAnnouncements';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      maxWidth={'lg'}
      sx={{ width: '100%' }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      height={'100%'}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, width: '100%' }}>{children}</Box>}
    </Box>
  );
}

const Profile = () => {
  const largeViewport = useMediaQuery('(max-width:899px)');

  const [activeTab, setActiveTab] = useState(0);

  const onChangeActiveTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (!window.localStorage.getItem('token')) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          paddingTop: 3,
          justifyContent: 'center',
          flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
          },
        }}
      >
        <Tabs
          orientation={largeViewport ? 'horizontal' : 'vertical'}
          // variant="scrollable"
          value={activeTab}
          onChange={onChangeActiveTab}
          aria-label="Vertical tabs"
          sx={{
            borderBottom: largeViewport && 1,
            borderRight: !largeViewport && 1,
            borderColor: 'divider',
            width: { sm: '100%', md: '15%', lg: '15%' },
          }}
        >
          <Tab label="Профіль" />
          <Tab label="Публікації" />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <UserInfo />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <UserAnnouncements />
        </TabPanel>
      </Box>
    </Container>
  );
};

export default Profile;
