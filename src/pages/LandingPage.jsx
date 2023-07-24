import React, { useState } from "react";
import Settings, { DefaultSettingsT } from "./Settings.jsx";
import Carousel from "react-material-ui-carousel";
import "../style/Example.scss";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { Link } from "react-router-dom";
import "../style/Example.scss"

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
} from "@mui/material";



export default function LandingPage() {
  const { data, loading } = useQuery(QUERY_ME);
  const [settings, setSettings] = useState(DefaultSettingsT);
  console.log(data)

  if (loading) {
    return (
      <div>
        <h1>loading</h1>
      </div>
    );
  }

  if (!data) {
    window.location.assign("/login");
  }

  return (
    <div style={{ marginTop: "50px", color: "#494949" }}>
      <Typography className="userName" variant="h4">
        Welcome {data.me.name}
      </Typography>
      <br />
      <Carousel
        className="Example"
        {...settings}
        // next={(now: any, previous:any) => console.log(`Next User Callback: Now displaying child ${now}. Previously displayed child ${previous}`)}
        // prev={(now, previous) => console.log(`Prev User Callback: Now displaying child ${now}. Previously displayed child ${previous}`)}
        // onChange={(now, previous) => console.log(`OnChange User Callback: Now displaying child ${now}. Previously displayed child ${previous}`)}

        // navButtonsProps={{style: {backgroundColor: 'cornflowerblue', borderRadius: 0}}}
        // navButtonsWrapperProps={{style: {bottom: '0', top: 'unset', }}}
        // indicatorContainerProps={{style: {margin: "20px"}}}
        // NextIcon='next'
      >
        {items.map((item, index) => {
          return (
            <Banner
              item={item}
              key={index}
              contentPosition={item.contentPosition}
            />
          );
        })}
      </Carousel>
      <br />
      <Settings settings={settings} setSettings={setSettings} />
      <Bio />
    </div>
  );
}

const Banner = (props) => {
  const contentPosition = props.contentPosition
    ? props.contentPosition
    : "left";
  const totalItems = props.length ? props.length : 3;
  const mediaLength = totalItems - 1;

  let items = [];
  const content = (
    <Grid item xs={4} key="content">
      <CardContent className="Content">
        <Typography className="Title">{props.item.Name}</Typography>

        <Typography className="Caption">{props.item.Caption}</Typography>

        <Button variant="outlined" className="ViewButton">
          <Link to="/products" >View Now</Link>
        </Button>
      </CardContent>
    </Grid>
  );

  for (let i = 0; i < mediaLength; i++) {
    const item = props.item.Items[i];

    const media = (
      <Grid item xs={4} key={item.Name}>
        <CardMedia className="Media" image={item.Image} title={item.Name}>
          <Typography className="MediaCaption">{item.Name}</Typography>
        </CardMedia>
      </Grid>
    );

    items.push(media);
  }

  if (contentPosition === "left") {
    items.unshift(content);
  } else if (contentPosition === "right") {
    items.push(content);
  } else if (contentPosition === "middle") {
    items.splice(items.length / 2, 0, content);
  }

  return (
    <>
      <Card raised className="Banner">
        <Grid container spacing={0} className="BannerGrid">
          {items}
        </Grid>
      </Card>
    </>
  );
};

const Bio = () => {
  return (
    <div className="Bio">
      We are a dynamic e-commerce company offering a wide range of products to
      enhance your daily life. With a focus on quality and customer
      satisfaction, we strive to bring you the latest and greatest products at
      affordable prices. Our team of experts works tirelessly to curate a
      diverse selection of items to meet all your needs. Shop with us today and
      experience the convenience and excitement of online shopping.
    </div>
  );
};

const items = [
  {
    Name: "Work",
    Caption: "Increase your productivity!",
    contentPosition: "left",
    Items: [
      {
        Name: "Work Monitor",
        Image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?ixlib",
      },
      {
        Name: "Productivity Mouse",
        Image: "https://images.unsplash.com/photo-1625750319971-ee4b61e68df8?ixlib",
      },
    ],
  },
  {
    Name: "Must haves",
    Caption: "Have fun!",
    contentPosition: "middle",
    Items: [
      {
        Name: "Gaming Keyboard",
        Image: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?ixlib",
      },
      {
        Name: "Gaming Mouse",
        Image: "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib",
      },
    ],
  },
  {
    Name: "Luxury",
    Caption: "Best quality!",
    contentPosition: "right",
    Items: [
      {
        Name: "Apple Keyboard",
        Image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib",
      },
      {
        Name: "Cannon Camera",
        Image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib",
      },
    ],
  },
];
