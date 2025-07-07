import React from "react";

export const primaryNavigationRedesignContent = (
  <Container>
    <ProjectHeader
      company="Primary.com"
      date="May 2019"
      title="Navigation Redesign"
      responsibilities="UX Research, Information Architecture, Interaction Design, Visual Design"
      roleSummary="Managed one freelance UX researcher. Worked closely with internal stakeholders and engineers."
      pictureFile="PrimaryNav/laptop-mockup.png"
      alt="Desktop Navigation Flyout"
      caption="Desktop Navigation Flyout"
    />
    <Section title="" spaceAbove={40} indent={true}>
      <ImageGroup
        desktop="PrimaryNav/mobile-navigation-d.png"
        mobile="PrimaryNav/mobile-navigation-m.png"
        alt="Mobile Navigation"
        caption="Mobile Navigation"
      />
    </Section>

    <Section title="OBJECTIVES" spaceAbove={80} indent={true}>
      <P>The project was meant to accomplish the following things:</P>

      <Ul>
        <Li>
          Create a scalable and adminable navigation system that enables Primary
          to do more product storytelling.{" "}
        </Li>
        <Li>
          Drive desktop users to PLPs rather than PDPs without negatively
          impacting the key metric: Add to Bag rate.{" "}
        </Li>
        <Li>
          Address user-facing experience, accessibility information
          architecture, and product naming issues present in the existing
          navigation.
        </Li>
        <Li>Align with established interaction patterns and best practices.</Li>
        <Li>
          Update visual design to be consistent with refreshed brand style
          guide.
        </Li>
      </Ul>
    </Section>
    <Section title="BACKGROUND" spaceAbove={80} indent={true}>
      <P>
        Many factors motivated this navigation/landing page redesign project:
      </P>
      <ImageGroup
        desktop="PrimaryNav/old-desktop-nav-d@2x.jpg"
        mobile=""
        alt=""
        caption="Old Desktop Navigation"
      />
      <br />
      <Ul>
        <Li>
          <B>Product assortment growth: </B> Primary’s navigation had been the
          same since they launched in 2015 with just a few dozen products. By
          early 2019, the product assortment had grown to 300+, and it had
          become more and more challenging to communicate the the assortment
          within the existing navigation without breaking it.
        </Li>

        <Li>
          <B>Desire for more product storytelling: </B> The creative and
          merchandising teams wanted to do more editorial storytelling and to
          communicate seasonality. Editorial emails had historically been high
          performers, but there was no way to leverage that content in the site
          experience, which seemed like a significant missed opportunity.
        </Li>

        <Li>
          <B>Quantitative & qualitative data:</B> Analytics data and usability
          testing observations showed significant UX issues, especially in the
          desktop experience:
        </Li>

        <Ul noMargin={true}>
          <Li>
            In testing, desktop users (who make up ~70% of purchases) struggled
            with flyouts because small hover areas required precise mouse
            movements.{" "}
          </Li>
          <Li>
            Within the desktop flyouts, products were shown as small thumbnails
            that were difficult for users to see. This wasn’t a good way to
            showcase our products.
          </Li>
          <Li>
            Analytics showed that most desktop users wouldn’t reach a product
            landing page (PLP) and would instead go directly to product detail
            pages (PDPs). Once there, it was difficult for users to view more
            products because they would need to go through the navigation again,
            amplifying the usability issues.
          </Li>
          <Li>
            Analytics also showed that the default “top 10” category flyout was
            by far the most interacted-with, which suggests that users might
            have missed the ability to view other categories for products more
            specific to their interests.{" "}
          </Li>
        </Ul>

        <Li>
          <B>Non-standard product naming:</B> Primary had been using some
          unconventional terms to refer to its product categories, (e.g.
          “babysuits” instead of “bodysuits” and “Per4orm” instead of “active”).{" "}
        </Li>

        <Li>
          <B>Rethinking the product taxonomy:</B> There were also plans in the
          works to reorganize products according to internally understood
          attributes like cut and fabric. But I was skeptical and wanted to see
          how users would naturally categorize our products.
        </Li>
      </Ul>
    </Section>

    <Section
      title="DESIGN & IMPLEMENTATION PROCESS"
      spaceAbove={80}
      indent={true}
    >
      <P>
        The design process was done in a very collaborative agile way, with
        twice-weekly in-person check-ins between design and engineering and
        daily written standups. I was heavily involved in all parts of the
        process, which is detailed below.
      </P>
      <P>
        <B>1. Research</B>
      </P>
      <Ul>
        <Li>
          Compiled existing user research & data and conducted stakeholder
          interviews.
        </Li>
        <Li>
          Conducted visual cardsorting of kids & baby products using
          Optimalsort.
          <Spacer />
          <B>Results:</B>
          <br />
          <Ul noMargin={true}>
            <Li>
              Most users talked about how they would organize their children’s
              closets by seasonality. Instead of arranging things by cut or
              fabric as merchandising had originally planned, they tended to
              arrange things by category, and then by seasonal attributes like
              sleeve length.
            </Li>
            <Li>
              This is important, because most other retailers’ product
              assortments would naturally reflect seasonality as they phase
              products in and out of stock, but Primary’s assortment had always
              been intended to be evergreen, so this was a critical piece of
              insight for the business.
            </Li>
          </Ul>{" "}
        </Li>
        <Li>
          Conducted competitive analysis and competitive user testing with help
          from our UX researcher to quickly validate general directions for
          desktop and mobile. We were trying to decide between a few different
          interaction models on desktop and mobile, as shown below. <Spacer />
          <B>Results:</B>
          <Ul noMargin={true}>
            <Li>
              I narrowed the options down to a traditional hamburger menu on
              mobile and simple text-based flyouts on desktop, with space for
              some editorial content.
            </Li>
            <Li>
              These were both the most common patterns in our competitive
              analysis and the ones that users preferred, likely because of
              their familiarity.{" "}
            </Li>
          </Ul>
        </Li>
      </Ul>

      <ImageGroup
        desktop="PrimaryNav/comp-analysis@2x.png"
        mobile=""
        alt=""
        caption="Competitive Examples Gathered"
      />
      <Spacer />

      <P>
        <B>2. Design</B>
      </P>
      <Ul>
        <Li>
          Sketched multiple desktop and mobile concepts based on research to
          quickly run by engineers and stakeholders.
        </Li>
        <ImageGroup
          desktop="PrimaryNav/sketches-m@2x.png"
          mobile=""
          alt=""
          caption="Navigation Sketches"
        />
      </Ul>

      <Ul>
        <br />
        <Li>
          Created low fidelity designs in Sketch, which I used to gather
          feedback from engineers and stakeholders. Made revisions based on
          their feedback.
        </Li>
        <Li>
          Tested medium-fidelity desktop & mobile InVision prototypes with help
          from our UX researcher and made minor visual revisions. <Spacer />
          <SpanLink href="https://invis.io/7GUCJ9RRM3K">
            Desktop Prototype
          </SpanLink>
          <Spacer />
          <SpanLink href="https://invis.io/XBUCJBHJYN6#/360602640_Navigation_-320--_Main">
            Mobile Prototype
          </SpanLink>
        </Li>
      </Ul>
      <ImageGroup
        desktop="PrimaryNav/invision-desktop-nav@2x.jpg"
        mobile=""
        alt=""
        caption="Invision Desktop Navigation Prototype"
      />
      <ImageGroup
        desktop="PrimaryNav/invision-mobile-nav@2x.jpg"
        mobile=""
        alt=""
        caption="Invision Mobile Navigation Prototype"
      />
      <Ul>
        <Li>
          Created pixel-perfect production-ready designs to communicate with
          engineers in Zeplin.
        </Li>
      </Ul>
      <P>
        <B>3. Build</B>
      </P>
      <Ul>
        <Li>
          Collaborated with engineers and stakeholders on design & interaction
          details and reasonable content limits for the CMS
        </Li>
        <Li>
          Lead extensive QA of the design to ensure that it aligned with the
          design system, and worked with engineers to refine final visual design
          and animations
        </Li>
        <Li>
          This navigation is currently live at{" "}
          <SpanLink href="http://www.primary.com">Primary.com</SpanLink>!
        </Li>
        <Spacer height="40" />
      </Ul>

      <iframe
        src="https://player.vimeo.com/video/365849063"
        width="100%"
        height="400"
        frameborder="0"
        allow="autoplay; fullscreen"
        allowfullscreen
        title="Desktop navigation animation"
      ></iframe>
      <Spacer height="" />
      <iframe
        src="https://player.vimeo.com/video/365849339"
        width="100%"
        height="600px"
        title="Mobile navigation animation"
        frameborder="0"
      ></iframe>
      <br />

      <P>
        <B>4. Test</B>
      </P>
      <Ul>
        <Li>
          After implementation, we conducted internal usability testing of the
          final product before releasing it to the public as a 50/50 A/B test
          for one month.
        </Li>
        <Li>
          We also conducted post-launch usability testing with external users
          experience to validate that the final product worked as expected for
          users.
        </Li>
      </Ul>
    </Section>
    <Section title="RESULTS" spaceAbove={80} indent={true}>
      <P>
        The project was considered a success, and after the A/B test validation,
        we <B>released it to 100% of users</B>.
      </P>

      <P>
        Metrics-wise, we <B>increased PLP view rate on desktop by 15%</B>, and
        decreased PDP view rate by only 4%. There were no changes to PDP/PLP
        view rate on mobile or to our lead metric, add-to-bag rate, on desktop
        or mobile. Given the unchanged add-to-bag rate, we concluded that it's a
        positive trade-off since{" "}
        <B>more users are progressing down the funnel</B> than before.
      </P>

      <P>
        In usability testing, users didn’t run into any of the previous
        usability issues, and were able to <B>navigate more quickly</B> to their
        desired categories. They also had an easier user flow going from
        Navigation to PLP to PDP and back to PLP.
      </P>

      <P>
        With the new design, we were able to{" "}
        <B>double the number of top-level categories</B> that could be shown
        from 4 to 8, allowing Primary’s navigation to be more seasonal and
        editorial. Internal stakeholders were thrilled with the new editorial
        content slots and the ease with which they could change the navigation.
      </P>
    </Section>
    {/*
<Section title="TEAM" spaceAbove={80} indent={true}>

    <P>
    <B>Research & Design:</B> Wendy Chu (me!)<br/>
    <B>Engineering:</B> Mathieu Lue, Justin Sheckler
    </P>

</Section> */}
  </Container>
);
