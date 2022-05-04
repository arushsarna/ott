import React from "react";
import YouTube from "react-youtube";
import ReactPlayer from "react-player";
export default function Video() {
  return (
    <div className=" flex justify-center items-center bg-blue-500 w-full h-screen">
      {/* <video
        src="https://www.youtube.com/watch?v=Qah9sSIXJqk"
        width="500px"
        height="500px"
      /> */}

      {/* <video
        // className="rounded-3xl lg:w-[200]px lg:h-[500px] xl:w-[225px] xl:h-[560px] object-none 2xl:w-[250px] 2xl:h-[650px]  "
        muted
        // onMouseEnter={(event) => event.target.play()}
        //   onMouseOut={(event) => event.target.pause()}
        src="https://youtu.be/Qah9sSIXJqk"

        // autoPlay
        // muted
      /> */}
      {/* <YouTube
        videoId="https://youtu.be/Qah9sSIXJqk" // defaults -> '' */}
      {/* // id={string} // defaults -> ''
        // className={string} // defaults -> ''
        // iframeClassName={string} // defaults -> ''
        // style={object} // defaults -> {}
        // title={string} // defaults -> ''
        // loading={string} // defaults -> undefined
        // opts={obj} // defaults -> {}
        // onReady={func} // defaults -> noop
        // onPlay={func} // defaults -> noop
        // onPause={func} // defaults -> noop
        // onEnd={func} // defaults -> noop
        // onError={func} // defaults -> noop
        // onStateChange={func} // defaults -> noop
        // onPlaybackRateChange={func} // defaults -> noop
        // onPlaybackQualityChange={func} // defaults -> noop
      /> */}
      <ReactPlayer url="https://youtu.be/Qah9sSIXJqk" />
    </div>
  );
}
