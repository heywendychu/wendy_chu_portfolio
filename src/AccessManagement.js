import React from "react";
import styled from "styled-components";
import ProjectHeader from "./UserInterface/ProjectHeader";
import Section from "./UserInterface/Section";
import ImageGroup from "./UserInterface/ImageGroup";
import ProjectLink from "./UserInterface/ProjectLink";

import SpanLink from "./UserInterface/SpanLink";
import Company from "./UserInterface/Company";

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

const Ol = styled.ul`
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

const Spacer = styled.div`
  height: ${(props) => (props.height ? props.height : "16")}px;
`;

const CompanyWrapper = styled.div`
  width: 80vw;
  max-width: 840px;

  display: flex;

  flex-direction: column;
`;

const CompanyContainer = styled.div`
  display: flex;

  flex-wrap: wrap;

  justify-content: center;

  width: 100%;

  margin: 64px 0 0 0;

  @media (max-width: 768px) {
    margin: 40px 0 0 0;
    flex-direction: column;
    flex-wrap: no-wrap;
  }
`;

const Footer = styled.div`
  width: 100%;
  border-top: 1px solid rgba(33, 53, 113, 0.15);

  padding-top: 24px;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding-top: 40px;
  }
`;

export const AccessManagement = (
  <Container>
    <ProjectHeader
      company="VTS"
      date="2024"
      title="Access Management Case Study"
      responsibilities="UX Research, Information Architecture, Interaction Design, Visual Design"
      roleSummary="Managed 1 product manager, 10 engineers, and 2 QAs."
      pictureFile="PrimaryNav/laptop-mockup.png"
      alt=""
      caption=""
    />
    <Section
      id="about-the-company"
      title="About the company"
      spaceAbove={40}
      indent={true}
    >
      <P>
        VTS (View The Space) is a company that develops SaaS products for
        commercial real estate. At the time I worked on this project, VTS had
        recently expanded into property management software with VTS Activate, a
        platform that allows commercial building managers to publish content and
        engage with their tenants.
      </P>
    </Section>
    <Section
      id="about-the-project"
      title="About the project"
      spaceAbove={40}
      indent={true}
    >
      <P>
        My team was responsible for adding access management functionality to
        the existing Activate platform. The team comprised of 1 product manager,
        10 engineers, 2 QAs, 1 designer (me!).
      </P>
      <Section
        title="What is access management?"
        spaceAbove={40}
        indent={true}
        id="what-is-access-management-"
      ></Section>
      <P>
        Access management is the ability to manage who can access different
        parts of a building.
      </P>
      <P>
        <a href="https://www.notion.so" />
      </P>
      <P>
        For example, if you are an employee who works in an office building, you
        would need access to the lobby, the floor containing your company’s
        office, and the office itself, but perhaps you shouldn’t have access to
        other floors or restricted areas like a security office.
      </P>
      <P>
        Buildings that want this level of access control typically use keycards
        to manage access, and the keycards themselves are managed with access
        management software. Access credentials can also be stored digitally on
        a mobile device, adding greater convenience to tenants and easier
        management for security personnel.
      </P>
      <P>
        <B>The scope I worked on:</B>
      </P>
      <Ul>
        <Li>
          Admins can digitally grant and remove access and set access groups
          (locations) for each user
        </Li>
        <Li>Admins can grant access management permissions to other users</Li>
        <Li>Employees (end users) can use their phone as a keycard</Li>
      </Ul>
      <P>
        Due to complexity, I’ll be focusing on just the admin portion for this
        case study.
      </P>
    </Section>
    <Section
      title="The business case for access management"
      indent={true}
      spaceAbove={40}
      id="the-business-case-for-access-management"
    >
      <P>
        Access management helped the business by gaining incremental revenue
        from both new and existing customers.
      </P>
      <P>
        <a href="https://www.notion.so" />
      </P>
      <P>
        <B>New customers:</B> It was common knowledge in the industry that
        access control was dominated by a few companies with old technology and
        clunky interfaces. By digitizing keycards and creating an intuitive
        interface to manage them, we attracted new customers to the Activate
        platform on the strength of the access management product.
      </P>
      <P>
        <B>Existing customers:</B> Access control was a paid add-on feature that
        worked within the Activate platform. Managing access through Activate
        would allow building managers to reduce the number of tools they use,
        streamline their operations, and potentially reduce their costs. Because
        most buildings that used Activate’s content publishing tools were larger
        ones with access control systems, it was a good fit for the existing
        customer base.
      </P>
      <P>
        <B>Potential network effects</B>
      </P>
      <P>
        Access management presented a huge acquisition opportunity for VTS, as
        property managers could upsell their tenants on the ability to manage
        their own employees’ access. To do that, tenants would also need an
        Activate subscription. Because most of the buildings we served had
        dozens of businesses within, it was a huge potential opportunity for
        growth.
      </P>
      <P>
        Better yet, such an arrangement would benefit both parties. Property
        personnel wouldn’t need to manually manage access for those building
        employees, and companies would no longer need to go through an
        intermediary to modify their employees’ access.
      </P>
    </Section>
    <Section
      id="competitive-research-user-interviews"
      indent={true}
      spaceAbove={80}
      title="Competitive research &amp; user interviews"
    >
      <P>
        Before embarking on design, I interviewed several existing and
        prospective clients with my PM and available squad engineers.
      </P>
      <P>
        💡
        <em>
          Sidenote: It’s important to me that everyone on the squad can listen
          to and observe our users firsthand so that they can better understand
          our average, less tech-savvy users. The experience is much more
          memorable than if I were to share clips or a report, and gets us all
          on the same page.
        </em>
      </P>
      <P>
        I asked users to demonstrate how they performed common tasks: setting up
        access for a new user, changing access, and removing access from a user.
        To prepare for these interviews, I first wrote down what I hoped to
        learn, and then wrote out a set of questions I wanted to ask. However, I
        kept these interviews conversational, and asked impromptu questions on
        relevant topics that came up.
      </P>
      <P>
        A selection of screenshots from our main competitive reference, HID, are
        shown below. Note: sensitive PII data has been blurred.
      </P>
      <P>
        <ImageGroup
          desktop="VTSAccess/HID_Mobile_IDs_-_blur.png"
          mobile=""
          alt=""
          caption="HID’s table does the job, but could benefit from better visual hierarchy and more specific inline actions for efficiency. "
        />
      </P>
      <P>
        HID’s table does the job, but could benefit from better visual hierarchy
        and more specific inline actions for efficiency.
      </P>
      <P>
        <ImageGroup
          desktop="VTSAccess/image.png"
          mobile=""
          alt=""
          caption="HID’s user details page is very long, with many different sections (2 screen heights’ worth of content can be seen above). This page would benefit from more efficient use of space and anchor links, which would to allow users to find what they need more quickly. "
        />
      </P>
      <P>
        HID’s user details page is very long, with many different sections (2
        screen heights’ worth of content can be seen above). This page would
        benefit from more efficient use of space and anchor links, which would
        to allow users to find what they need more quickly.
      </P>
    </Section>
    <Section
      title="Pain points"
      indent={true}
      spaceAbove={40}
      id="-pain-points-"
    >
      <Ul>
        <Li>
          <B>Existing workflows required many steps.</B> Though expert users
          stated that these workflows were easy, the time it took to perform the
          tasks for a single user was more than <B>1 minute.</B> It may not
          sound like much time, but considering how frequently our users would
          need to perform these tasks, it added up.
        </Li>
        <Li>
          <B>Interfaces had weak information hierarchy</B> — Many pages are long
          and contain a great deal of information, but there is no navigation
          (tabs, anchor links, etc.) when users land on these pages.
        </Li>
        <Li>
          <B>Layout made inefficient use of screen real estate —</B> Information
          could have been displayed more compactly without sacrificing usability
          or aesthetics. Though white space is important to include in a design,
          much of the white space in these interfaces looked unintentional.
        </Li>
        <Li>
          <B>User data intake was very manual</B> — most users copied names and
          emails from a spreadsheet or paper to input the names and emails of
          each user.
        </Li>
      </Ul>
      <P>
        After discussing with my PM and engineering lead, we agreed that it was
        feasible to address the above issues in the product we were building, as
        we did not yet have an existing product.
      </P>
    </Section>
    <Section title="User roles" indent={true} spaceAbove={40} id="user-roles">
      <P>
        The user interviews also gave me a deeper understanding of the user
        roles we would serve and what they would be doing in the access
        management product.
      </P>
      <Section
        indent={true}
        spaceAbove={40}
        title="Property manager"
        id="-property-manager-"
      ></Section>
      <Ul>
        <Li>
          The general manager of a particular building. Manages security
          personnel.
        </Li>
        <Li>Expert at managing access control systems.</Li>
        <Li>Can grant and remove access for all users in the building.</Li>
        <Li>
          Can grant and remove admin rights for all users in the building.
        </Li>
      </Ul>
      <Section
        indent={true}
        spaceAbove={40}
        title="Security personnel"
        id="-security-personnel-"
      ></Section>
      <Ul>
        <Li>
          Responsible for managing day-to-day access for tenants and visitors of
          the building. Typically located in a front desk area.
        </Li>
        <Li>Proficient at managing access control systems.</Li>
        <Li>Can grant and remove access for tenants of the building.</Li>
      </Ul>
      <Section
        indent={true}
        spaceAbove={40}
        title="Company access admin"
        id="-company-access-admin-"
      ></Section>
      <Ul>
        <Li>
          Works for a tenant company as a general admin or receptionist.
          Responsible for coordinating employee access with the building
          security team, among other admin tasks.
        </Li>
        <Li>Little to no experience managing access control systems.</Li>
        <Li>Can grant and remove access for their company’s employees.</Li>
      </Ul>
      <Section
        indent={true}
        spaceAbove={40}
        title="Employee"
        id="-employee-"
      ></Section>
      <Ul>
        <Li>Works for a tenant company in the building</Li>
        <Li>No experience managing access control systems.</Li>
        <Li>Doesn’t need to use the admin side of access at all</Li>
      </Ul>
      <P>
        Identifying and splitting these roles out helped my team think
        critically about how each role would experience the product instead of
        thinking about everything as a jumble of features. Defining the user
        roles contextualized what we were building and why, and gave us a common
        language to talk about the different user roles
      </P>
    </Section>
    <Section
      id="design-testing"
      title="Design &amp; testing"
      indent={true}
      spaceAbove={80}
    >
      <P>
        Design and testing for this project happened on a rolling basis over the
        course of ~ 9 months. I designed and worked iteratively with my squad to
        deliver multiple bundles of value to our users and stakeholders. I
        worked with my squad to ensure that each user-facing release made sense
        as a whole. Some of those bundles are detailed below.
      </P>
    </Section>
    <Section
      id="phase-1-polish-existing-functionality"
      indent={true}
      spaceAbove={80}
      title="Phase 1: Polish existing functionality"
    >
      <P>
        One of my favorite parts of joining a new team is examining what exists
        with my fresh pair of eyes. One of the first things I do is to sit down
        with my PM and/or EM and take a tour of the product, asking questions as
        they occur to me to understand the decisions that had already been made.
        Though I also seek out qualitative and quantitative user data at this
        time, I find that my heuristic analysis of a product is often pretty
        closely aligned with user feedback.
      </P>
      <P>
        Below is the user access table design that existed when I first joined
        the team.
      </P>
      <P>
        <ImageGroup
          desktop="VTSAccess/image%201.png"
          mobile=""
          alt=""
          caption="The existing design before I joined the team."
        />
      </P>
      <P>The existing design before I joined the team.</P>
      <P>
        The customer success team had already started to hold training sessions
        with actual users on this version of the table. These training sessions
        worked well as covert usability tests, as I could observe how users
        interacted with the product, what they struggled to do, and where they
        had questions. Some of the biggest issues I noticed:
      </P>
      <Ul>
        <Li>
          The actions dropdown at the end of each row was hidden behind a
          horizontal scroll due to the number of columns.
        </Li>
        <Li>
          Users had difficulty understanding the toggle as relating to mobile
          access status, because the table header was not always visible.
        </Li>
        <Li>
          Users were startled by the modal that appeared after clicking on the
          toggle. It felt abrupt and did not match their interaction
          expectations.
          <ImageGroup
            desktop="VTSAccess/image%202.png"
            mobile=""
            alt=""
            caption=" Modal that appeared when users click on the toggle to enable mobile access."
          />
          Modal that appeared when users click on the toggle to enable mobile
          access.
        </Li>
        <Li>
          Users had difficulty trtacking the change in status, and thought the
          system wasn’t working or that they had done something wrong.
        </Li>
      </Ul>
    </Section>
    <Section
      title="My design changes"
      spaceAbove={40}
      indent={true}
      id="my-design-changes"
    >
      <P>
        Based on the information I gathered from user interviews and these
        training sessions, I changed several parts of the experience.
      </P>
      <P>
        <ImageGroup
          desktop="VTSAccess/image%203.png"
          mobile=""
          alt=""
          caption="image.png"
        />
      </P>
      <Ol>
        <Li>
          <B>More efficient use of space:</B> Space efficiency is important
          because 1280px is our user base’s third most common screen resolution.
          The previous design required so much truncation at that screen width,
          that it was barely usable. After checking with my team I was able to
          hide and group information to make a more compact and usable
          interface. I grouped the name and primary email into one column, hid
          the company column if it was all the same company, and hid the source
          and sync status columns, as this was only relevant to our internal
          team. These changes allowed our users to focus on only the most
          relevant information, and made the table less daunting for company
          access admins.
        </Li>
        <Li>
          <B>Replaced toggle with status chip:</B> Enabling and disabling access
          required communication to an external access integration. This meant
          that we could only display the status change optimistically, or not
          display the change until after a table refresh. We also didn’t have a
          pattern for a toggle loading state, and I hadn’t seen anything like
          that in the wild. As a solution, I replaced the toggle with a status
          chip with a dropdown to change the mobile access status for each user.
          Though a dropdown is slightly less efficient than a toggle, I wasn’t
          too worried about it since a user’s access was unlikely to be enabled
          or disabled frequently, as a user’s access would most often be enabled
          when they’re hired or disabled when they leave the company. Also, a
          status chip has the benefit of being able to display multiple states
          (see below), which made it easier to see each user’s mobile access
          status, and would allow us to communicate other, more complex statuses
          in the future.
        </Li>
        <Li>
          <B>Additional status feedback:</B> Because enabling and disabling
          mobile access was asynchronous, it was important for users to be
          informed that their request was received. I added a processing state
          (with an animated spinner) to the status chip as well as toasts to
          confirm the intended action.
          <ImageGroup
            desktop="VTSAccess/image%204.png"
            mobile=""
            alt=""
            caption="image.png"
          />
          Ideally, I would have had a toast come up when the action had been
          completed, but my engineering lead told me that wasn’t feasible. After
          some brainstorming, we landed on an idea that was both user-friendly
          and technically simple: refresh the table after a few seconds so that
          the status chip would (hopefully) have changed from processing to
          another status, communicating the same information to users. Though
          these are small interaction details, they made users feel confident
          that things were working — even if the status didn’t change
          immediately.
        </Li>
      </Ol>
      <Section title="Results" spaceAbove={40} indent={true} id="results">
        <P>
          After these changes were implemented in code, I saw a sizable increase
          in qualitative usability during onboarding sessions with company
          access admins:
        </P>
        <Ul>
          <Li>
            Users were able to accomplish their tasks quicker than before, and
            had fewer questions.
          </Li>
          <Li>
            Furthermore, users were able to figure out how to do the tasks by
            themselves, making the training sessions practically unnecessary.
          </Li>
          <Li>
            We received unprompted comments about how “simple” and “easy to use”
            the product was, from users who were pleasantly surprised — which to
            me is the ultimate sign of a job well done.
          </Li>
        </Ul>
      </Section>
    </Section>
    <Section
      id="phase-2-scaling"
      title="Phase 2: Scaling"
      indent={true}
      spaceAbove={80}
    >
      <P>
        Revenue for access management was tied to the number of access-enabled
        users, so we decided to focus next on functionality that would increase
        the rate at which access-enabled users could be added. Although we had a
        usable product for controlling access, key tasks like adding and
        importing users were still being handled by our internal team. In order
        to scale up, we would need to build workflows that would allow users to
        do these tasks.
      </P>
      <P>
        To solve this, we decided to do two tracks of work in parallel: bulk
        user invitation with access enablement and admin role assignment. We
        arrived at this approach after holding a quick-and-dirty brainstorm
        session in which the we looked at the existing interfaces, discussed
        desired functionality and potential design solutions, and estimated
        sizing for both engineering and design. After discussing options and
        taking our aggressive timeline into account, These two areas were fairly
        separate in the codebase and the product, so working on them in parallel
        wouldn’t be counterproductive. Though I knew that this would result in a
        lot of work falling on me at once, I felt confident about the approaches
        we’d just discussed. Worst case, I could deliver a subset of the design
        to get engineers going while I finished the rest, or I could renegotiate
        timelines.
      </P>
    </Section>
    <Section
      title="Access-enabled invitation"
      spaceAbove={40}
      indent={true}
      id="access-enabled-invitation"
    >
      <P>
        I decided to tackle the invitation flow first, as user invitation flows
        already existed, so I wouldn’t need to start from scratch. However, the
        existing interfaces were outdated and contained solely within modals,
        and they ended up being a bit of work to revamp.
      </P>
      <P>
        <ImageGroup
          desktop="VTSAccess/image%205.png"
          mobile=""
          alt=""
          caption="Existing single invitation modal"
        />
      </P>
      <P>Existing single invitation modal</P>
      <P>
        <ImageGroup
          desktop="VTSAccess/image%206.png"
          mobile=""
          alt=""
          caption="Existing bulk invitation modal "
        />
      </P>
      <P>Existing bulk invitation modal</P>
      <Section
        indent={true}
        spaceAbove={40}
        title="Option 1: Minimal UI changes"
        id="option-1-minimal-ui-changes"
      ></Section>
      <P>
        As a designer, it pained me to see such crude interfaces, but I needed
        to take the timeline into account as well. In an effort to minimize
        scope, I initially proposed cleaning up the modal interfaces by
        replacing old components with design system components, moving around
        some buttons to add add clarity, and adding the new functionality on top
        of those updates. Below are the designs I came up with.
      </P>
      <P>
        <ImageGroup
          desktop="VTSAccess/image%207.png"
          mobile=""
          alt=""
          caption="Single invitation modal with minimal UI updates and added functionality"
        />
      </P>
      <P>
        Single invitation modal with minimal UI updates and added functionality
      </P>
      <P>
        <ImageGroup
          desktop="VTSAccess/image%208.png"
          mobile=""
          alt=""
          caption="Bulk invitation modal with minimal UI updates and new functionality"
        />
      </P>
      <P>Bulk invitation modal with minimal UI updates and new functionality</P>
      <P>
        I didn’t like the idea of the complex bulk invite functionality being
        contained in a modal, especially because checking the “Enable mobile
        access…” option would require users to select access groups, which would
        potentially require a second modal. But given the desire to ship this
        functionality quickly, I wanted to provide the squad with a minimal
        option, as there would be opportunities to refine the experience later.
        Besides, just making the UI updates would already be an improvement, so
        it would still be a win.
      </P>
      <Section
        indent={true}
        spaceAbove={40}
        title="Option 2: Full page ahead!"
        id="option-2-full-page-ahead-"
      ></Section>
      <P>
        Time permitting, I often mock up and show a version that may be a bit
        larger in scope, but offers a significantly better user experience in
        exchange. In this case, I mocked up a full-page version of the form
        because the additional space made it easier to view the list of invited
        users and to display the access group selection on the same page, rather
        than in a second step. Plus, it aligned with the latest Activate design
        language.
      </P>
      <P>
        , we ended up implementing this version. When I presented this to my
        squad at our weekly design refinement session, the team preferred this
        version because the modal component was challenging to work with and
        moving that functionality to a page would be easy. To help cut scope, we
        also decided to retire the single user invitation modal because it
        didn’t make sense to build and maintain two different workflows. A win
        all around!
      </P>
      <P>
        <ImageGroup
          desktop="VTSAccess/image%209.png"
          mobile=""
          alt=""
          caption="The full page version of the bulk invite form, which my squad preferred."
        />
      </P>
      <P>
        The full page version of the bulk invite form, which my squad preferred.
      </P>
      <Section
        indent={true}
        spaceAbove={40}
        title="Enable mobile access on top or at the bottom?"
        id="enable-mobile-access-on-top-or-at-the-bottom-"
      ></Section>
      <P>
        Though we were all aligned on implementing the full page form, we
        debated whether the “Enable mobile access” checkbox should be located
        above or below the user invitation fields. I had thought was that it
        would make the most sense below, because it was a secondary setting —
        users entering a form to invite users would be primed to enter names and
        emails, so putting mobile access first could feel strange, and users
        could miss it if they skipped to the other form fields and hit the “Send
        invites” button. However, my PM made the fair point that because the
        same settings would apply to all of the invited users in a batch (i.e.
        they couldn’t be set per user), it would make more sense to lead with
        the option to enable mobile access.
      </P>
      <P>
        <ImageGroup
          desktop="VTSAccess/image%2010.png"
          mobile=""
          alt=""
          caption="Users would only see the access group selection fields if they check to enable mobile access. "
        />
      </P>
      <P>
        Users would only see the access group selection fields if they check to
        enable mobile access.
      </P>
      <P>
        We ultimately put the checkbox above the invite fields to give mobile
        access more priority on the page. When I asked the design team and other
        stakeholders for their opinions, there was a slight preference towards
        putting it on top. Both options seemed reasonable to me, and this was a
        case where we just needed to make a decision, as changing the position
        after the fact would be easy. (Note: Mobile access enablement was not
        the only bulk action. There could be more depending on the specific
        “channel” a user was inviting people to.)
      </P>
      <Section
        indent={true}
        spaceAbove={40}
        id="result"
        title="Result"
        indent={true}
        spaceAbove={40}
      ></Section>
      <P>
        I didn’t have a chance to see users interact with it at scale after
        implementation (wider rollout was delayed because another business unit
        was also planning to make changes to this form), so I still wonder which
        one would have worked better in practice. However, watched a few users
        interact with it during our training sessions, and they had no issues
        with it, though it’s worth noting that they were being guided. Still,
        considering the before and after, I am confident that we improved the
        usability, appearance, and functionality of this page.
      </P>
    </Section>
    <Section
      title="Access-enabled invitation"
      spaceAbove={40}
      indent={true}
      id="access-enabled-invitation"
    >
      <P>
        <a href="https://www.notion.so/Scratch-224a83b969a0802bbc1ec6eeaf365b40?pvs=21">
          Scratch
        </a>
      </P>
    </Section>
  </Container>
);
