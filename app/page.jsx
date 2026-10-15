import Blocks from "@/components/Blocks";
import Figure from "@/components/Figure";
import RichText from "@/components/RichText";
import Section from "@/components/Section";
import WorkList from "@/components/WorkList";
import { getProjects } from "@/lib/content";
import { getHomeSections } from "@/lib/home";

// "About" section: the first sub-heading becomes the big headline, the first
// image becomes the portrait on the right, everything else is body copy.
function About({ blocks }) {
  const headline = blocks.find((b) => b.type.startsWith("heading_"));
  const portrait = blocks.find((b) => b.type === "image");
  const rest = blocks.filter((b) => b !== headline && b !== portrait);
  return (
    <div className="about">
      <div className="about__text">
        {headline ? (
          <h1 className="display">
            <RichText text={headline[headline.type].rich_text} />
          </h1>
        ) : null}
        {portrait ? (
          <Figure className="about__portrait about__portrait--mobile" src={portrait.image.src} width={portrait.image.width} height={portrait.image.height} alt="Portrait of Wendy" />
        ) : null}
        <Blocks blocks={rest} />
      </div>
      {portrait ? (
        <Figure className="about__portrait about__portrait--desktop" src={portrait.image.src} width={portrait.image.width} height={portrait.image.height} alt="Portrait of Wendy" priority />
      ) : null}
    </div>
  );
}

export default function Home() {
  const sections = getHomeSections();
  const projects = getProjects();
  return (
    <div className="home">
      {sections.map((s, i) => (
        <Section key={s.id || i} id={s.id} title={s.title} className="section--home">
          {s.kind === "work" ? (
            <>
              <Blocks blocks={s.blocks} />
              <WorkList projects={projects} />
            </>
          ) : i === 0 ? (
            <About blocks={s.blocks} />
          ) : (
            <div className="home__copy">
              <Blocks blocks={s.blocks} />
            </div>
          )}
        </Section>
      ))}
    </div>
  );
}
