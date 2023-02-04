import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCartRounded";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_ITEMDATA } from "../utils/queries";

export default function Products({ handleAddToCart }) {
  const auth = new Auth();

  if (!auth.getToken()) {
    window.location.assign("/login");
  }

  const { data, loading } = useQuery(QUERY_ITEMDATA);

  if (loading) {
    return (
      <div>
        <h1>loading</h1>
      </div>
    );
  }
  const itemData = data?.products;
  // console.log(itemData)
  const owners = data.profiles;
  return (
    <div className="sellItem">
      <ImageList sx={{ width: "50%", height: "50%" }}>
        {itemData.map((item) => (
          <ImageListItem key={item.url}>
            <img
              src={`${item.url}?w=248&fit=crop&auto=format`}
              srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.product_name}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.product_name + "\t $" + item.price}
              subtitle={owners.find((o) => o.email === item.email).name}
              actionIcon={
                <IconButton onClick={() => handleAddToCart(item)}>
                  <AddShoppingCartIcon
                    style={{ color: "whitesmoke", width: "60px" }}
                  />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
