import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const StyledUploadButton = styled.button`
  cursor: pointer;
  background-color: #fff;
  display: flex;
  align-items: center;
  font-size: 16px;
  outline: none;
  border: none;
  padding: 8px 35px;
  border-radius: 25px;
  margin-right: 45px;

  color: #000;

  &:hover {
    background-color: #0073b1;
    color: #fff;
  }
`;

const UploadWidget = (props) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dxgtfcez8",
        uploadPreset: "veadh5cq",
      },
      function (error, result) {
        if (result.event === "success") props.onTest(result.info);
        console.log(result.secure_url);
      }
    );
  }, []);

  return (
    <StyledUploadButton onClick={() => widgetRef.current.open()}>
      <FontAwesomeIcon icon={faImage} className="media-type-icon" />
      Upload
    </StyledUploadButton>
  );
};

export default UploadWidget;
