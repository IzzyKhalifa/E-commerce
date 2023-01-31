import React, { useState } from "react";
import Settings, { DefaultSettingsT } from "./Settings.jsx";
import Carousel from "react-material-ui-carousel";
import "../style/Example.scss";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

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
          View Now
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
    Name: "Electronics",
    Caption: "Electrify your friends!",
    contentPosition: "left",
    Items: [
      {
        Name: "Macbook Pro",
        Image: "https://source.unsplash.com/featured/?macbook",
      },
      {
        Name: "iPhone",
        Image: "https://source.unsplash.com/featured/?iphone",
      },
    ],
  },
  {
    Name: "Home Appliances",
    Caption: "Say no to manual home labour!",
    contentPosition: "middle",
    Items: [
      {
        Name: "Washing Machine WX9102",
        Image: "https://source.unsplash.com/featured/?washingmachine",
      },
      {
        Name: "Learus Vacuum Cleaner",
        Image: "https://source.unsplash.com/featured/?vacuum,cleaner",
      },
    ],
  },
  {
    Name: "Decoratives",
    Caption: "Give style and color to your living room!",
    contentPosition: "right",
    Items: [
      {
        Name: "Living Room Lamp",
        Image: "https://source.unsplash.com/featured/?lamp",
      },
      {
        Name: "Floral Vase",
        Image: "https://source.unsplash.com/featured/?vase",
      },
    ],
  },
];
