import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Slide,
  Tabs,
  Tab,
  Button,
  makeStyles
} from "@material-ui/core";
import header_logo from "../../assets/LogoCHWLHorisontal.svg";
import AppData from "../../modules/AppData";
import { HashLink } from "react-router-hash-link";
import Functions from "../../modules/Functions";
import AdaptiveHelper from "../../modules/AdaptiveHelper";

const useStyles = makeStyles({
  logoButton: {
    position: "absolute",
    padding: 0,
    height: "100%",
    width: "250px",
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
})

const ApplicationHeader = () => {
  const classes = useStyles()
  const trigger = useScrollTrigger();
  const [activeMainTab, setActiveMainTab] = useState(0);
  const [activeSecondaryTab, setActiveSecondaryTab] = useState(0);
  let currentUrl = useLocation().pathname;
  const [parent, setParent] = useState("/home");
  const landingPage = useRouteMatch("/home");
  const { appData, appDataFetched } = useSelector((state) => state);
  const { main_tabs, secondary_tabs } = appData.navigation;
  let currentUrl = useLocation()

  useEffect(() => {
    const fetchApplicationData = async () => {
      if (!appDataFetched) {
        await AppData.read();
      }
    };
    fetchApplicationData();
    AdaptiveHelper.muiActiveTabSelect(
      currentUrl,
      setActiveMainTab,
      setActiveSecondaryTab
    );
  }, [
    appDataFetched,
    currentUrl,
    setActiveMainTab,
    setActiveSecondaryTab,
    main_tabs,
    secondary_tabs,
  ]);

  const handleChangeSecondary = (event, newValue) => {
    setActiveSecondaryTab(newValue);
  };

  const mainTabs = main_tabs.map((tab, index) => (  
    <Tab
      key={`main-tab-${index}`}
      style={styles.tabText}
      data-cy={`${Functions.toKebabCase(tab.label)}-tab`}
      label={tab.label}
      component={Link}
      to={tab.link}
      onClick={() => setParent(`${tab.label}`)}
    />
  ));

  const secondaryTabs = secondary_tabs
    .filter((tab) => tab.parent === parent)
    .map((tab, index) => (
      <Tab
        key={`secondary-tab-${index}`}
        style={styles.secondaryTabText}
        data-cy={`${Functions.toKebabCase(tab.label)}-sub-tab`}
        label={tab.label}
        component={tab.ref ? HashLink : Link}
        smooth={tab.ref ? true : undefined}
        to={tab.ref ? `${tab.link}#${tab.ref}` : tab.link}
      />
    ));

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar data-cy="application-header" elevation={0}>
          <Toolbar>
            {!landingPage && (
              <Button
                disableRipple
                className={classes.logoButton}
                component={Link}
                to="/home"
              >
                <img
                  src={header_logo}
                  data-cy="header-logo"
                  style={styles.headerLogo}
                  alt="Community Health West London"
                  onClick={window.scrollTo({ top: 0, behavior: "smooth" })}
                />
              </Button>
            )}
            <Tabs value={activeMainTab} style={styles.navTabs} centered>
              {mainTabs}
            </Tabs>
          </Toolbar>
          {(secondaryTabs.length !== 0  && currentUrl.pathname !== '/services/search') && (
            <Toolbar data-cy="secondary-nav-bar" style={styles.secondaryNavBar}>
              <Tabs
                style={styles.navTabs}
                value={activeSecondaryTab}
                onChange={handleChangeSecondary}
                centered
              >
                {secondaryTabs}
              </Tabs>
            </Toolbar>
          )}
        </AppBar>
      </Slide>
    </>
  );
};

export default ApplicationHeader;

const styles = {
  navTabs: {
    width: "100%",
  },
  headerLogo: {
    zIndex: 10,
    height: "30px",
  },
  tabText: {
    color: "#000",
    fontSize: "1.1rem",
    minWidth: 140,
  },
  secondaryNavBar: {
    backgroundColor: "#eee",
    borderTop: "1px solid #ccc",
    borderBottom: "1px solid #ccc",
    left: "0",
    width: "100%",
  },
  secondaryTabText: {
    color: "#000",
    fontSize: "1rem",
    width: "50px",
  },
};
