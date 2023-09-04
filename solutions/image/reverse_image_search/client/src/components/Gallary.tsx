import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { baseColor } from "../utils/color";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const placeHolderImges = new Array(12).fill({});

// 这个是图集图片展示的类
const Gallary = (props: any) => {
  const isMobile = !useMediaQuery("(min-width:1000px)");
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        display: "flex",
        flexWrap: "wrap",
        alignContent:"flex-start"
      },
      boxContainer:{
        display: "flex",
        flexWrap: "wrap",
        width: "30%",
        margin: "5px",
        // backgroundColor: "gray",
        alignItems: "center",
        marginBottom: "10px"

      },

      imageContainer: {
        position: "relative",
        border: "solid 1px #60606F",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      child: {
        height: "315px",
        width: "100%",
      },

      descContainer:{
        // marginTop: "20px",
        color: "white",
        width: "50%",
        fontSize: "1vw",
        alignItems: "center",
      },
      distant: {
        fontSize: "1vw",
        zIndex: 1000,
        color: "#fafafa",
        backgroundColor: "#000",
        position: "absolute",
        bottom: "0px",
        left: "0px",
        width: "100%",
        height: "24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowX: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    })
  );
  // images是图片集合
  const { images = [], onClick } = props;
  const classes = useStyles({});
  const [hovered, setHovered]: any = useState();
  const onMouseOver = (e: any) => {
    const src = e.currentTarget.dataset.src;
    setHovered(src);
  };
  const onMouseLeave = () => {
    setHovered(null);
  };

  return (
    <div className={classes.root}>
      {images.length > 0
        ? images.map((img: any, index: number) => {
            const { src, distance, goodsId, imgUrl, imgColor, goodsName, goodsUrl } = img;
            const isHovered = hovered === src;
            return (
                <div className={classes.boxContainer} key={index}>
                  <div
                      className={classes.imageContainer}
                      onClick={() => {
                        onClick(index);
                      }}
                      onMouseOver={onMouseOver}
                      onMouseLeave={onMouseLeave}
                      key={src}
                      data-src={src}
                      style={{
                        border: `solid 2px ${isHovered ? baseColor : "transparent"}`,
                      }}
                  >
                    <img src={src} className={classes.child} />
                    {isHovered && (
                        <p className={classes.distant}>{distance.toFixed(6)}</p>
                    )}
                  </div>


                  <div className={classes.descContainer}>
                    <div><span style={{color:"lightgray"}}>similarity:</span> {distance.toFixed(5)}</div>
                    <div><span style={{color:"lightgray"}}>goodsId:</span> {goodsId}</div>
                    <div><span style={{color:"lightgray"}}>color:</span> {imgColor}</div>
                    <div><span style={{color:"lightgray"}}>goodsName:</span> {goodsName}</div>
                    <div><a href={goodsUrl} style={{"color":"white"}} target="_blank">redirect to detail page</a></div>
                  </div>
                </div>
            );
          })
        : <div style={{"color":"white"}}>no original image specified</div>
      }
    </div>
  );
};

export default Gallary;
