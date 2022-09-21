import React, { useState, useEffect } from "react";
import { saveAs } from 'file-saver';
import logo from './Whatsapp_QR_Code.jpg';
import "./styles.css";
import { RWebShare } from "react-web-share";
const MobileDetect = require('mobile-detect');

function App() {
  const [shareData, setshareDataLoad] = useState({});
  useEffect(() => {
    const shareDataLoad = {
			title: 'Whatsapp QR-Code',
			text: 'Sharing Whatsapp QR-Code',
			url: `https://api.whatsapp.com/send?phone=917428396005&text=Hi`,
			files: []
		};
    fetch(logo).then(res => res.blob()).then(file => {
      const fileName = "logo" + ".jpg";
      const options = { type: "image/jpeg" };
      const newFile = new File([file], fileName, options);
      shareDataLoad.files.push(newFile);

      setshareDataLoad(shareDataLoad);

   }).catch((err) => console.log("Unable to fetch Whatsapp QR-code image",err));
  },[]);

  const handleShareButton = () => {
    // Check if navigator.share is supported by the browser
    if (navigator.share) {
      console.log("Congrats! Your browser supports Web Share API");
      navigator
        .share({
          url: `https://share.toogoodtogo.com/store/1006/milestones/meals-saved/`
        })
        .then(() => {
          console.log("Sharing successfull");
        })
        .catch(() => {
          console.log("Sharing failed");
        });
    } else {
      console.log("Sorry! Your browser does not support Web Share API");
    }
  };

  const saveFile = async() => {
    saveAs(logo);
  }

  const newShareMedia = () => {
    const file = new File([logo], "whatsapp.svg", {
      type: "image/svg+xml",
    });
    navigator.share({
      url: `https://share.toogoodtogo.com/store/1006/milestones/meals-saved/`,
      title: 'whatsapp QR code',
      text: 'whatsapp QR code sharing',
      files: [file]
    });
  }

  const shareMed = async() => {
    const input = document.getElementById('files');
    const output = document.getElementById('output');
    const files = input.files;
    const singleFile = new File([logo],"logo.svg",{
      type: "image/svg+xml",
    });
    const fileArray = [];
    fileArray.push(singleFile);
    if (navigator.canShare({ fileArray })) {
      try {
        await navigator.share({
          files: fileArray,
          title: 'Images',
          text: 'Beautiful images'
        })
        output.textContent = 'Shared!'
      } catch (error) {
        output.textContent = `Error: ${error.message}`
      }
    } else {
      output.textContent = `Your system doesn't support sharing these files.`
    }
  }

  const shareMed2 = async() => {
    let shareDataLoad = {files: []};

    const md = new MobileDetect(window.navigator.userAgent);
    if(!md.is('iPhone')) {
      shareDataLoad = {
        title: 'Whatsapp QR-Code',
        text: 'Sharing Whatsapp QR-Code',
        url: `https://api.whatsapp.com/send?phone=917428396005&text=Hi`,
        files: []
      };
    }

		fetch(logo).then(res => res.blob()).then(async (file) => {
      		const fileName = "logo" + ".jpg";
      		const options = { type: file.type }
      		const newFile = new File([file], fileName, options);
      		shareDataLoad.files.push(newFile);

      		if (navigator.canShare && navigator.canShare(shareDataLoad)) {
            try {
              await navigator.share(shareDataLoad)
            }catch(err) {
              console.log("Sharing failed",err)
            }
      		}
   		}).catch((err) => console.log("Unable to fetch Whatsapp QR-code image",err));
  }

  const detectMobile = () => {
    const md = new MobileDetect(window.navigator.userAgent);
    console.log(md.os())
    return md.is('iPhone').toString();
  }

  return (
    <div className="App">
      <button
        onClick={shareMed2}
      >
      Share
      </button>
      {/* <RWebShare
        data={shareData}
      >
        <button>Share 🔗</button>
      </RWebShare> */}
      <h4>is Your device iphone : {detectMobile()}</h4>
    </div>
  );
}

export default App;
