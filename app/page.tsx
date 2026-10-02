import type { Metadata } from 'next';
import { ExperienceHero } from '@/components/site/immersive';
import { FAQs } from '@/components/site/experience';
import { Action } from '@/components/site/ui';
import copy from '@/content/homepage.json';
import { siteOrigin } from '@/content/site';
import './homepage.css';

export const metadata: Metadata = {
  title: { absolute: copy.metadata.title },
  description: copy.metadata.description,
  openGraph: { ...copy.metadata, siteName: 'Cleezo Class', type: 'website', locale: 'en_IN', url: siteOrigin },
  twitter: { ...copy.metadata, card: 'summary' },
};

const sectionIds = ['how-it-works', 'modules', 'automation', 'schools', 'workspaces', 'operations', 'school-setup', 'faqs', 'request-demo'];

function CallToAction({ label }: { label: string }) {
  const href = label === 'See the core modules' ? '#modules' : label === 'Log In' ? 'https://cleezoclass.com/CRM' : '/book-demo';
  return <Action href={href} secondary={label === 'Log In'}>{label}</Action>;
}

export default function Home() {
  return (
    <main id="main" className="connected-home public-home">
      <ExperienceHero />
      {copy.sections.map((section, index) => (
        <section key={section.title} id={sectionIds[index]} className={`public-section public-${sectionIds[index]}`} aria-labelledby={`${sectionIds[index]}-title`}>
          <div className="wrap">
            <h2 id={`${sectionIds[index]}-title`}>{section.title}</h2>
            {section.paragraphs.map(text => <p className="public-intro" key={text}>{text}</p>)}
            {section.cards.length > 0 && (sectionIds[index] === 'faqs' ? (
              <FAQs items={section.cards.map(card => [card.title, card.paragraphs.join('\n\n')])} />
            ) : (
              <div className="public-cards">
                {section.cards.map((card, cardIndex) => (
                  <article className="public-card" key={card.title}>
                    <span className="public-number" aria-hidden="true">{String(cardIndex + 1).padStart(2, '0')}</span>
                    <h3>{card.title}</h3>
                    {card.paragraphs.map(text => <p key={text}>{text}</p>)}
                  </article>
                ))}
              </div>
            ))}
            {section.rows.length > 0 && (
              <table className="public-roles">
                <thead><tr>{section.rows[0].map(cell => <th scope="col" key={cell}>{cell}</th>)}</tr></thead>
                <tbody>{section.rows.slice(1).map(([team, responsibilities]) => <tr key={team}><th scope="row">{team}</th><td>{responsibilities}</td></tr>)}</tbody>
              </table>
            )}
            {section.items.length > 0 && <ul className="public-list">{section.items.map(text => <li key={text}>{text}</li>)}</ul>}
            {section.ctas.length > 0 && <div className="public-actions">{section.ctas.map(label => <CallToAction key={label} label={label} />)}</div>}
          </div>
        </section>
      ))}
    </main>
  );
}
