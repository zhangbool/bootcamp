import React, { useState, useEffect, useContext, useRef } from "react";
import { queryContext } from "../contexts/QueryContext";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Slider from "@material-ui/core/Slider";
import { DropzoneArea } from "material-ui-dropzone";
import SeperatLine from "../components/SeperatLine";
import { baseColor } from "../utils/color";
import Logo from "./Logo.svg";
import { delayRunFunc } from "../utils/Helper";

const Setting = (props: any) => {

  const isMobile = !useMediaQuery("(min-width:1000px)");

  const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
      setting: {
        display: "flex",
        flexDirection: "column",
        minWidth: isMobile ? "90%" : "250px",
        padding: "60px 20px",
        borderWidth: "1px",
        backgroundColor: "#1F2023",
        color: "#FFFFFF",
        overflowY: "auto",
      },
      header: {
        marginBottom: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      configHead: {
        marginBottom: "30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
      config: {
        fontSize: "24px",
        color: "#FAFAFA",
      },
      clear: {
        color: baseColor,
        fontSize: "18px",
        cursor: "pointer",
      },
      imageSet: {},
      counts: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        color: "#FAFAFA",
      },
      currTotal: {
        fontSize: "12px",
      },
      setPath: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        marginBottom: "30px",
      },
      customInput: {
        margin: "0 20px 0 0 !important",
        color: "blue !important",
        width: isMobile ? "80%" : "auto",
      },
      customFab: {
        color: "#fff",
        backgroundColor: baseColor,
        width: "36px",
        height: "36px",
        "&:hover": {
          backgroundColor: baseColor,
        },
      },
      customDeleteFab: {
        position: "absolute",
        top: "5px",
        right: "5px",
        color: "#fff",
        backgroundColor: "#666769",
        width: "24px",
        height: "24px",
        minHeight: "0px",
        "&:hover": {
          backgroundColor: "#666769",
        },
      },
      customDelete: {
        color: "#A7A7AF",
        width: "18px",
        height: "18px",
      },
      customIcon: {
        color: "#fff",
        backgroundColor: baseColor,
        width: "20px",
        height: "20px",
      },
      customSlider: {
        color: baseColor,
        marginBottom: "30px",
      },
      thumb: {
        width: "16px",
        height: "16px",
      },
      track: {
        height: "4px",
        borderRadius: "10px",
      },
      upload: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      benchImage: {
        // 图片尺寸好像都是一样的
        width: "228px",
        height: "316px",
        position: "relative",
      },
      dropzoneContainer: {
        backgroundColor: "transparent",
        width: "250px",
        height: "250px",
        borderRadius: "10px",
        border: "solid .5px #C8C8C8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      dropzoneText: {
        fontSize: "14px",
        color: "#B3B4B5",
        marginBottom: "30px",
      },
      notchedOutline: {
        borderWidth: ".5px",
        borderColor: "#838385 !important",
      },
      formLabel: {
        color: "#fff",
      },
      controlLabel: {
        color: "#838385",
      },
    });
  });

  const { process, train, count, search, clearAll, getImageConnectInfo } = useContext(queryContext);
  const { setImages, loading, setLoading } = props;
  const classes = useStyles({});
  const [inputs, setInputs]: any = useState("");
  const [topK, setTopK]: any = useState(6);
  const [totalNum, setTotalNum]: any = useState(0);
  const [[current, total], setProcessedNum]: any = useState([0, 0]);
  const [image, setImage]: any = useState();

  const benchImage = useRef<any>(null);
  const setText = loading
    ? "Loading..."
    : totalNum
    ? `${totalNum} images in this set`
    : "No image in this set";

  const reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      if (benchImage.current) {
        benchImage.current.src = reader.result;
      }
    },
    false
  );

  // 这里是search方法吗
  const _search = ({ topK, image }: any) => {
    const fd = new FormData();
    fd.set("topk", topK);
    fd.append("image", image);

    search(fd).then((res: any) => {
      const { status, data } = res || {};
      if (status === 200) {


        let requestStr = "";
        // 在这里发送请求通过图片名称获取相关的内容
        data.forEach((item: any, index: any) => {
          // console.log( index + " 搜索图片结果是: " + JSON.stringify(item))
          let name: string = item[0].split("/")[3].split(".")[0]
          console.log("name是: " + name)
          requestStr += name + ",";
        })

        let arr01 = data;
        const fd = new FormData();
        fd.set("imgNames", requestStr);
        // 这里是做http请求吗
        getImageConnectInfo(fd).then((res: any) => {
          const { status, data } = res || {};
          if (status === 200) {
            // 这里并不能直接一一拼接
            console.log("结果是: " + JSON.stringify(data));
            console.log("第一个数组是: " + JSON.stringify(arr01));
            console.log("第二个数组是: " + JSON.stringify(data));
            console.log(arr01.length);
            console.log(data.length);

            for (let i=0;i<arr01.length;i++){
              let find = false;
              for (let j = 0; j<data.length; j++) {
                if (arr01[i][0].split("/")[2].split(".")[0] == data[j].imgName) {
                  console.log("匹配上了:" + i + "----" + j);
                  arr01[i][2] = data[j]?data[j].goodsId:"-1";
                  arr01[i][3] = data[j]?data[j].imgUrl:"-1";
                  arr01[i][4] = data[j]?data[j].imgColor:"-1";
                  arr01[i][5] = data[j]?data[j].goodsName:"-1";
                  find = true;
                  continue;
                }
              }

              if (!find) {
                console.log("~~~~~没找到~~~~~~")
                // 如果走到这里, 说明没有找到
                arr01[i][2] = "-1";
                arr01[i][3] = "-1";
                arr01[i][4] = "-1";
                arr01[i][5] = "-1";
              }
            }
            console.log("组合后的结果是: " + JSON.stringify(arr01));
            setImages(arr01);
          } else{
            console.log("请求失败" + JSON.stringify(data));
            // 如果失败了, 就只是把图片显示出来, 其他信息不添加了
            setImages(data);
          }
        })
      }

      // setImages(data);
    });
  };

  // 上传原始图片后, 进行搜索
  const uploadImg = (file: any) => {
    console.log("开始上传图片-------")
    setImage(file);
    reader.readAsDataURL(file);
    _search({ topK, image: file });
  };

  const onInputChange = (e: any) => {
    const val = e.target.value;
    setInputs(val);
  };

  const onTopKChange = (e: any, val: any) => {
    setTopK(val);
    if (val && image) {
      delayRunFunc({ topK: val, image }, _search, 300);
    }
  };
  const _keepProcess = () => {
    process().then((res: any) => {
      const { data, status } = res;
      if (status === 200) {
        const [_current, _total] = data
          .split(",")
          .map((item: any) => Number.parseInt(item.split(":")[1]));
        setProcessedNum([_current, _total]);
        if (_current !== _total) {
          setTimeout(() => _keepProcess(), 1000);
        } else {
          setTimeout(() => {
            count().then((res: any) => {
              const { data, status } = res;
              if (status === 200) {
                setTotalNum(data);
                setLoading(false);
              }
            });
          }, 3000);
        }
      }
    });
  };
  const uploadImgPath = () => {
    train({ File: inputs }).then((res: any) => {
      if (res.status === 200) {
        setLoading(true);
        setTimeout(() => {
          setInputs("");
          _keepProcess();
        }, 1000);
      }
    });
  };

  const clear = () => {
    clearAll().then((res: any) => {
      if (res.status === 200) {
        setProcessedNum([0, 0]);
        setTotalNum(0);
        setImage();
        setImages([]);
      }
    });
  };

  useEffect(() => {
    count().then((res: any) => {
      const { data, status } = res || {};
      if (status === 200) {
        setTotalNum(data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 这里是页面的内容
  return (
    <div className={classes.setting}>

      <div className={classes.header}>
        <p>Azazie Image Search</p>
      </div>

      {/*图库图片数量展示*/}
      <SeperatLine title={`Dataset Info`} style={{ marginBottom: "20px" }} />
      <div className={classes.imageSet}>
        <div className={classes.counts}>
          <p style={{ color: loading ? baseColor : "#fff" }}>{setText}</p>
          <h3 className={classes.currTotal}>{`${current}/${total}`}</h3>
        </div>
      </div>

      {/*输出多少张图片滑动框*/}
      <SeperatLine title={`TOP K(1－30)`} style={{ marginBottom: "20px" }} />
      <div className={classes.counts}>
        <p>{`show top ${topK} results`}</p>
      </div>
      <Slider
          min={1}
          max={30}
          value={topK}
          onChange={onTopKChange}
          classes={{
            root: classes.customSlider,
            track: classes.track,
            rail: classes.track,
            thumb: classes.thumb,
          }}
      />

      {/*图片输入*/}
      <SeperatLine title={`ORIGINAL IMAGE`} style={{ marginBottom: "50px" }} />
      <div className={classes.upload}>
        {image ? (
          <div className={classes.benchImage}>
            <img
              ref={benchImage}
              className={classes.benchImage}
              src={image}
              alt="..."
            />
            <Fab
              color="primary"
              aria-label="add"
              size="small"
              classes={{ root: classes.customDeleteFab }}
            >
              <CloseIcon
                onClick={() => {
                  setImage();
                  setImages([]);
                }}
                classes={{ root: classes.customDelete }}
              />
            </Fab>
          </div>
        ) : (
          <DropzoneArea
            acceptedFiles={["image/*"]}
            filesLimit={1}
            dropzoneText={`click to upload / drag a image here`}
            onDrop={uploadImg}
            dropzoneClass={classes.dropzoneContainer}
            showPreviewsInDropzone={false}
            dropzoneParagraphClass={classes.dropzoneText}
            // maxFileSize={} bit
          />
        )}
      </div>
    </div>
  );
};

export default Setting;
