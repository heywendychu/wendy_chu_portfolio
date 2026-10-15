import React from "react";
import styled from "styled-components";
import ProjectHeader from "./UserInterface/ProjectHeader";
import Section from "./UserInterface/Section";
import ImageGroup from "./UserInterface/ImageGroup";
import Heading from "./UserInterface/Heading";

const Container = styled.div`
  margin: 0 70px;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    margin: 0 24px;
  }
`;

const P = styled.p`
  text-align: left;
  font-size: 16px;
  line-height: 2;
  letter-spacing: 0.2px;
  color: #1b2c63;

  margin: 24px 104px 0 104px;

  align-self: left;

  font-family: "Noto Sans", sans-serif;

  @media (max-width: 768px) {
    margin: 24px 0 0 0;
    width: 100%;
    max-width: none;
    font-size: 15px;
    letter-spacing: 0.19px;
  }
`;

const Ul = styled.ul`
  margin: ${(props) => (props.noMargin ? "0" : "0 104px")};
  list-style: none;

  @media (max-width: 768px) {
    margin: 0;
    width: calc(100%-40px);
    max-width: none;
  }
`;

const Li = styled.li`
  font-family: "Noto Sans", sans-serif;

  font-size: 16px;
  line-height: 2;
  color: #1b2c63;

  margin: 8px 0 0 0;

  @media (max-width: 768px) {
    font-size: 15px;
    letter-spacing: 0.19px;
  }

  ::before {
    content: "•";
    font-size: 1.2em;
    color: #de3c2c;

    display: inline-block;

    width: 1em;
    margin-left: -1em;
  }
`;

const B = styled.span`
  font-weight: 700;
`;

const TwoCol = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;

  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

const Col = styled.div`
  flex: 1;
  min-width: 0;
`;

// Key result metric shown under a section eyebrow. Not a heading — it's a
// value/deck, so it renders as a <p>. Styling kept minimal (no color) pending
// a later decision on treatment.
const StatCallout = styled.p`
  margin: 24px 104px 0 104px;

  font-family: CanelaWeb;
  font-size: 32px;
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0.5px;
  color: #1b2c63;

  @media (max-width: 768px) {
    margin: 24px 0 0 0;
    font-size: 26px;
  }
`;

export const AllbirdsPDP = (
  <Container>
    <ProjectHeader
      company="Allbirds"
      date=""
      title="Product Detail Page Enhancements"
      responsibilities="UX Research, UX/UI Design, A/B Testing, Prototyping"
      roleSummary="As the sole product designer at Allbirds, I focused on growth and nearly doubled the conversion rate over 6 months through 10 sets of A/B tested PDP enhancements."
      pictureFile="AllbirdsPDP/new-size-selection.png"
      alt="Updated Allbirds product detail page size selection"
      caption="My updated size selection design displayed sizes as tiles and grouped gender with size."
    />

    <Section title="" spaceAbove={40} indent={true}>
      <P>
        Over the course of <B>6 months</B> at Allbirds, I nearly{" "}
        <B>doubled the conversion rate</B> with my design improvements.
      </P>
      <P>
        As the only product designer at Allbirds, my primary responsibility was
        growth, and conversion rate was my KPI. I had free reign to pursue my
        goal, and most of my attention was focused on the product detail pages.
        I designed and <B>A/B tested 10 sets of PDP enhancements</B> during my
        time there. Individual test results varied from wildly positive
        (+170.7% in one case!) to neutral, and my designs yielded positive
        results overall. A few of the most notable examples are detailed below.
      </P>
    </Section>

    <Section
      id="improved-size-selection"
      title="Improved size selection"
      spaceAbove={80}
      indent={true}
    >
      <StatCallout>+181% Uplift in Conversion</StatCallout>
      <P>
        The first and most impactful change I made was to size selection.
        Because selecting a size is a prerequisite to adding an item to cart,
        and adding to cart is a prerequisite to making a purchase, it is
        critical for businesses to make this process as easy as possible.
      </P>
      <P>
        <B>The previous size selection had several issues (see image below):</B>
      </P>
      <Ul>
        <Li>
          It was housed in a dropdown, which made it difficult for users to view
          and select in-stock sizes.
        </Li>
        <Li>
          The dropdown was positioned below the page “fold,” meaning most users
          would need to scroll to even see it.
        </Li>
        <Li>
          Sold out sizes were not clearly communicated. The only indication was
          the “Add to Cart” button text changing to “Notify Me.”
        </Li>
        <Li>
          Links between men’s and women’s versions of the same product were
          located above the product name, which did not match common patterns.
        </Li>
      </Ul>
      <ImageGroup
        desktop="AllbirdsPDP/old-size-selection.png"
        mobile=""
        alt="Previous Allbirds size selection dropdown"
        caption="The previous size selection lived in a dropdown, was located below the “fold” for many users, and was divorced from gender selection. Can you tell that the currently selected size/color combination is out of stock?"
      />
      <P>
        <B>I addressed the issues with the design below:</B>
      </P>
      <Ul>
        <Li>
          The product name, color, size, and CTA were lined up horizontally to
          create a logical progression. This also enabled the CTA to live above
          the fold and be immediately visible when users visit the page.
        </Li>
        <Li>
          Sizes were displayed as individual tiles directly on the page, making
          it easy to see which sizes were in stock.
        </Li>
        <Li>
          Links to the other gender’s version of the same product were moved
          above the size selection tiles and below the product name, as these
          were the most common placements on other shopping sites.
        </Li>
      </Ul>
      <ImageGroup
        desktop="AllbirdsPDP/new-size-selection.png"
        mobile=""
        alt="Updated Allbirds size selection with tiles"
        caption="My updated size selection design displayed size selection using tiles and grouped gender with size. The updated layout made it more efficient to select options, and allowed the CTA to be immediately available above the page fold."
      />
      <Heading level={3}>Other considerations:</Heading>
      <P>
        It may seem like the layout change was more drastic than necessary,
        since the original goal was to display size in a more efficient way.
        However, the existing layout could not elegantly accommodate all of the
        size tiles across our most common desktop screen sizes, so the layout
        would need to change regardless. I presented the minimal set of changes
        as “the most expedient option” (see below), and discussed it with
        product managers. We agreed that we would prefer to put our efforts
        toward a more holistic solution that addressed more of the desired
        changes.
      </P>
      <ImageGroup
        desktop="AllbirdsPDP/expedient-option.png"
        mobile=""
        alt="The most expedient size selection option"
        caption="I presented this as the most expedient option. Though this would have worked to test the idea of displaying size tiles, it would have been a stopgap at best, and was rejected in favor of a more holistic solution."
      />
      <Heading level={3}>Results:</Heading>
      <P>
        We A/B tested this layout against the previous layout on a few of our
        most popular products, and the results were staggeringly positive (and
        statistically significant). Though overall conversion on non-promo
        products during the test week was lower vs. the prior 2 weeks, all of
        the tested products showed at least a <B>+30%</B> improvement in
        conversion. For the Men’s Cruiser, the improvement was an astounding{" "}
        <B>+181%</B> — numbers that are typically unheard of in this context!
      </P>
      <ImageGroup
        desktop="AllbirdsPDP/size-selection-results.png"
        mobile=""
        alt="Size selection A/B test results"
        caption=""
      />
      <P>
        Given this version’s strong performance, after the test concluded, we
        rolled this version out to the rest of the site.
      </P>
    </Section>

    <Section
      id="product-details-revamp"
      title="Product Details Revamp"
      spaceAbove={80}
      indent={true}
    >
      <StatCallout>+23.5% Uplift in Conversion</StatCallout>
      <Heading level={3}>Why I wanted to revamp product details:</Heading>
      <P>
        Redesigning the product details text yielded another surprisingly
        impactful change to conversion. I chose to tackle this portion of the
        PDP because, compared to other e-commerce sites I’ve worked on, the
        Allbirds PDPs had fewer product details. We were trying to position
        ourselves as an eco-friendly premium brand, but we weren’t doing a good
        job of communicating that story to our customers. I had a hunch that
        this lack of key information was hurting our conversion rate.
      </P>
      <ImageGroup
        desktop="AllbirdsPDP/old-product-details.png"
        mobile=""
        alt="Initial Allbirds product details layout"
        caption="The initial state of the product details. This did not provide users with information they expected, such as design features and material composition. It was also difficult to skim this information quickly."
      />
      <Heading level={3}>Competitive Analysis Validation:</Heading>
      <P>
        I worked with Product Management to validate my thinking. We identified
        our key competitors, and I conducted a competitive analysis of their
        product details. Across the board, our competitors’ product details were
        more detailed than my own, with key details displayed as bullet points.
        I then identified examples relevant to what we wanted our details to look
        like. Rothy’s and Lululemon stood out as competitors with similar values
        and customer demographics.
      </P>
      <P>
        I liked Rothy’s focus on materials and sustainability in their product
        details section. The bullet points make the information easy to digest,
        and the writing is concise while also being editorial enough to feel
        premium. (See below left)
      </P>
      <P>
        Additionally, I liked the way Lululemon included use cases for their
        products to help contextualize the design features. Additionally, the
        “why we made this” statement made each product feel thoughtful and
        intentional. (See below right)
      </P>
      <TwoCol>
        <Col>
          <ImageGroup
            desktop="AllbirdsPDP/rothys.png"
            mobile=""
            alt="Rothy’s product details"
            caption="Rothy’s product details (click to enlarge)"
          />
        </Col>
        <Col>
          <ImageGroup
            desktop="AllbirdsPDP/lululemon.png"
            mobile=""
            alt="Lululemon product details"
            caption="Lululemon’s product details (click to enlarge)"
          />
        </Col>
      </TwoCol>
      <Heading level={3}>Design:</Heading>
      <P>
        With my idea validated by the competitive landscape, and armed with
        examples I considered best-in-class, I iterated through some versions of
        what we envisioned for product details, and ultimately landed on the
        design below.
      </P>
      <ImageGroup
        desktop="AllbirdsPDP/final-product-details.png"
        mobile=""
        alt="Final Allbirds product details design"
        caption="The final product details design."
      />
      <Ul>
        <Li>
          “Why we made this” gives us an opportunity to tell the product’s intro
          story. This reinforces our sustainability value prop by communicating
          purposefulness.
        </Li>
        <Li>
          “Best for” gives customers an idea of how a product might fit into
          their lifestyle. This information helps distinguish whether a shoe is
          athletic vs. athleisure.
        </Li>
        <Li>
          “Thoughtfully designed” elevates the products by giving details that
          may not be visible from the product images. The bullet points make it
          easy to digest the information quickly.
        </Li>
        <Li>
          “Materials & Sustainability” are grouped because the two are very
          intertwined for the brand. Natural and recycled materials are a key
          piece of the brand, and that story was not communicated as clearly in
          the previous layout.
        </Li>
      </Ul>
      <Heading level={3}>Other considerations:</Heading>
      <ImageGroup
        desktop="AllbirdsPDP/accordions-vs-tabs.png"
        mobile=""
        alt="Tabs versus accordions exploration"
        caption=""
      />
      <P>
        I had initially wanted to use tabs instead of accordions, as the tab
        titles would be visible closer to the top, and give stronger information
        scent to users. However, we ultimately decided to use accordions for
        several reasons:
      </P>
      <Ul>
        <Li>
          Accordions would allow us to display multiple pieces of information
          simultaneously. In the same vein, we would also be able to test
          different configurations of open/closed accordions.
        </Li>
        <Li>
          We already planned to use accordions on mobile, and having the same
          pattern on desktop would be slightly easier to execute.
        </Li>
        <Li>
          Accordions were more common than tabs on our competitors’ sites.
        </Li>
      </Ul>
      <Heading level={3}>Testing & Results:</Heading>
      <P>
        We A/B tested the new product details design on 9 of our most popular
        products because the new layout required new copywriting, and we wanted
        to see whether there was a positive impact before investing in the work.
      </P>
      <P>
        We also tested 2 different variations of the product details: One
        version that included the “material hero” module and one that did not.
      </P>
      <ImageGroup
        desktop="AllbirdsPDP/product-details-results.png"
        mobile=""
        alt="Product details test variants and results"
        caption="Test variants and their associated results."
      />
      <P>
        It’s even more interesting to me when an A/B test doesn’t perform as
        expected. After running the test for a week, the version showing both the
        new product details and the materials hero{" "}
        <B>increased conversion by 23.5%</B> with 99.6% confidence, while results
        were essentially flat when the materials hero was removed.
      </P>
      <P>
        This was a very positive and directional result, but we were flummoxed as
        to why the winning version performed so well. The new product details
        cards were meant to cover the information in both the 3-column layout and
        the “materials hero,” and continuing to display the materials hero seemed
        redundant to me. Perhaps the materials hero was flashy and made the
        product feel elevated, or the fabric close-up image was an important
        piece of information that was otherwise missing from the page. Regardless
        of the actual reasoning, results like these elicit even more ideas for
        experimentation!
      </P>
    </Section>
  </Container>
);
