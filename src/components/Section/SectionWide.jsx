import React from "react";
import {
  Typography,
  Box,
  Grid,
  CardMedia,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  section: {
    [theme.breakpoints.up("xs")]: {
      display: "flex",
      flexDirection: "column",
      height: "550px",
      // width: "100%",
      // overFlow: "hidden",
      // marginBottom: "40px",
    },
  },
  image: {
    [theme.breakpoints.up("xs")]: {
      height: "300px",
      // width: "100%",
      objectFit: "cover",
    },
  },
  header: {
    [theme.breakpoints.up("xs")]: {
      marginTop: "10px",
    },
  },
  description: {
    [theme.breakpoints.up("xs")]: {
      marginLeft: "30px",
      marginRight: "30px",
    },
  },
  button: {
    [theme.breakpoints.up("xs")]: {
      marginTop: "30px",
      marginLeft: "20px",
      marginRight: "20px",
    },
  },
}));

const SectionWide = ({ header, description, image, buttons, buttonList }) => {
  const classes = useStyles();
  return (
    <Grid item className={classes.section}>
      <CardMedia
        component="img"
        image={image.url}
        data-cy="logo"
        className={classes.image}
        alt="Community Health West London"
      />
      <Grid
        item
        xs={12}
        // lg={6}
        // style={
        //   idEven
        //     ? styles.itemContainer
        //     : { ...styles.itemContainer, backgroundColor: "#0008" }
        // }
      >
        <Typography
          data-cy="header"
          variant="h3"
          component="h3"
          className={classes.header}
          // style={idEven ? { color: "#000" } : { color: "#fff" }}
          gutterBottom
        >
          {header}
        </Typography>
        <Typography
          data-cy="description"
          variant="body1"
          component="p"
          className={classes.description}
          // style={idEven ? { color: "#000" } : { color: "#fff" }}
          gutterBottom
        >
          {description}
        </Typography>
        <Box className={classes.button}>{buttons && buttonList}</Box>
      </Grid>
    </Grid>
  );
};

export default SectionWide;
