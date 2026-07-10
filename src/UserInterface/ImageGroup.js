import React from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";

import styled from "styled-components";

// Two images: one desktop, one mobile. Both full width, auto height. Optional caption.

const Container = styled.div`
  width: 100%;
`;

const Picture = styled.img`
  width: 100%;
  height: auto;

  margin: 40px 0 0 0;

  display: ${(props) => (props.toggle === "mobile" ? "none" : "block")} @media
    (max-width: 768px) {
    display: ${(props) => (props.toggle === "desktop" ? "none" : "block")};
  }

  cursor: zoom-in;
`;

const Caption = styled.div`
  margin: 16px 0 24px 0;

  font-family: "Roboto Mono", monospace;
  font-size: 12px;
  line-height: 1.67;
  text-align: center;
  color: #1b2c63;
`;

const ImageGroup = (props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Container>
      <Picture
        toggle={props.mobile ? "desktop" : null}
        src={`/images/${props.desktop}`}
        alt={props.alt}
        onClick={() => setOpen(true)}
      />
      {props.mobile ? (
        <Picture
          toggle={"mobile"}
          src={`/images/${props.mobile}`}
          alt={props.alt}
        />
      ) : null}
      <Caption>{props.caption}</Caption>
      <Lightbox
        open={open}
        carousel={{ finite: true }}
        close={() => setOpen(false)}
        slides={[{ src: `/images/${props.desktop}` }]}
        plugins={[Fullscreen, Zoom]}
      />
    </Container>
  );
};

export default ImageGroup;
