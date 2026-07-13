import React from "react";

import styled from "styled-components";

// Reusable heading scale for case-study body content.
//
// Two heading styles already exist elsewhere and are intentionally not
// duplicated here:
//   - ProjectHeader title -> the page's H1 (CanelaWeb, 56px)
//   - Section title       -> the red-line + uppercase mono "eyebrow" that
//                            labels each top-level section (acts as the H2)
//
// Use <Heading> for headings that sit *inside* a Section, above paragraphs.
// The `level` prop maps onto Notion's heading blocks so future ports are 1:1:
//   level={2} -> Notion "Heading 1" (header)        — serif, largest
//   level={3} -> Notion "Heading 2" (sub_header)    — sans, prominent
//   level={4} -> Notion "Heading 3" (sub_sub_header)— sans, bold (matches the
//                                                     existing <P><B> label)
//
// Side margins mirror the body <P> (0 104px, collapsing to 0 on mobile) so
// headings line up with the paragraphs they introduce.

const sideMargins = `
  margin-left: 104px;
  margin-right: 104px;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
  }
`;

const H2 = styled.h2`
  ${sideMargins}
  margin-top: 48px;
  margin-bottom: 0;

  font-family: CanelaWeb;
  font-size: 32px;
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0.5px;
  color: #1b2c63;

  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

const H3 = styled.h3`
  ${sideMargins}
  margin-top: 32px;
  margin-bottom: 0;

  font-family: "Noto Sans", sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: 0.2px;
  color: #1b2c63;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const H4 = styled.h4`
  ${sideMargins}
  margin-top: 24px;
  margin-bottom: 0;

  font-family: "Noto Sans", sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 2;
  letter-spacing: 0.2px;
  color: #1b2c63;

  @media (max-width: 768px) {
    font-size: 15px;
    letter-spacing: 0.19px;
  }
`;

const tags = { 2: H2, 3: H3, 4: H4 };

const Heading = (props) => {
  const Tag = tags[props.level] || H3;
  return (
    <Tag id={props.id}>{props.children}</Tag>
  );
};

export default Heading;
