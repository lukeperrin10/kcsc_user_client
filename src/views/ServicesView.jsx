import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Grid } from "@material-ui/core";
import Section from "../components/servicesView/Section";

const ServicesView = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchPageData = async () => {
      let response = await axios.get("/services", {
        headers: { API_KEY: process.env.REACT_APP_API_KEY },
      });
      setSections(response.data.sections);
    };
    fetchPageData();
  }, []);

  const sectionList = sections.map((section) => {
    const { id, header, description, image, buttons } = section;
    return (
      <Grid item>
        <Section
          id={id}
          header={header}
          description={description}
          image={image}
          buttons={buttons}
        />
      </Grid>
    );
  });

  return (
    <>
      <Helmet>
        <title>Self Care Services</title>
      </Helmet>
      <Grid
        container
        spacing={0}
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
      >
        {sectionList}
      </Grid>
    </>
  );
};

export default ServicesView;
