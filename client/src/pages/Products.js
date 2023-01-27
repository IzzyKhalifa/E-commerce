import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_ITEMDATA } from "../utils/queries";

export default function Home() {
  const auth = new Auth();

  if (!auth.getToken()) {
    window.location.assign('/login');
  }

  const {data ,loading} = useQuery(QUERY_ITEMDATA);
  

  if(loading){
    return <div><h1>loading</h1></div>
  }
const itemData = data?.products
const owners = data.profiles
  console.log(data.products)
  console.log(data.profiles)


  return (
    
    <div className="sellItem">
      <ImageList sx={{ width: "80%", height: "80%" }}>
        
        {itemData.map((item) => (
          <ImageListItem key={item.url}>
            <img
              src={`${item.url}?w=248&fit=crop&auto=format`}
              srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.product_name}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.product_name}
              subtitle={owners.find((o)=>o.email === item.email).name}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.title}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}