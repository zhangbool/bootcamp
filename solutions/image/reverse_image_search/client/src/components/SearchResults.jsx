import React, {useState, useCallback} from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Carousel, {Modal, ModalGateway} from "react-images";
import Gallery from "./Gallary";
import {baseColor} from "../utils/color";
import {GetImageUrl} from "../utils/Endpoints";


const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            flexGrow: 1,
            overflowX: "hidden",
            overflowY: "auto",
            padding: "80px 60px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#28292E"
        },
        title: {
            margin: "10px 0px 10px",
            fontSize: "20px",
            color: "#F5F5F5",
            // backgroundColor: "white"
        },
        subTitle: {
            fontSize: "15px",
            color: "#F1F1F1",
            marginBottom: "１0px !important"
        }
    })
);

const SearchResults = props => {
    const classes = useStyles({});
    const {images = []} = props;
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const photos = images.map(img => {
        // console.log("img是: " + JSON.stringify(img));
        return {
            src: `${GetImageUrl}?image_path=${img[0]}`,
            distance: img[1],
            goodsId: img[2],
            imgUrl: "https://cdn-1.azazie.com/upimg/h65/" + img[3],
            imgColor: img[4],
            goodsName: img[5],
            goodsUrl: "https://www.azazie.com/-g" + img[2]
        };
    });

    const openLightbox = useCallback(index => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    return (
        <div className={classes.root}>

            <div className={classes.title}>
                <h3 className={classes.title}>Search Results</h3>
                {photos.length !== 0 && (
                    <p className={classes.subTitle}>
                        hover on the image to see{" "}
                        <span style={{color: baseColor}}>distance</span>
                        (smaller value represents higher simlarity); click to see the full image
                    </p>
                )}
            </div>

            <Gallery images={photos} onClick={openLightbox}/>
            {/*这里是madal框, 即点击查看大图*/}
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={photos.map(x => ({
                                ...x,
                                srcset: x.srcSet,
                                caption: x.title
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
};

export default SearchResults;
