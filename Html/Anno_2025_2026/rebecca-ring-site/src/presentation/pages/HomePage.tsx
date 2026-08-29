import { motion } from "framer-motion";
import homeContent from "../../store/content/home.json";
import nicknames from "../../store/content/nicknames.json";
import { RomanticButton } from "../components/RomanticButton";
import type { AppRoute } from "../../logic/types";

type HomePageProps = {
  navigate: (route: AppRoute) => void;
};

export function HomePage({ navigate }: HomePageProps) {
  return (
    <section className="page home-page">
      <motion.div
        className="hero-card glass"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="eyebrow">Un mese. Un link. Una follia verde acqua.</p>
        <h1>{homeContent.heroTitle}</h1>
        <p className="hero-subtitle">{homeContent.heroSubtitle}</p>

        <div className="ring-orbit" aria-hidden="true">
          <div className="ring-core">GR</div>
          <span className="orbit-dot dot-a">🍦</span>
          <span className="orbit-dot dot-b">💚</span>
          <span className="orbit-dot dot-c">✨</span>
        </div>

        <p className="ring-line">{homeContent.ringLine}</p>

        <div className="hero-actions">
          <RomanticButton onClick={() => navigate("/giochi")}>
            {homeContent.cta}
          </RomanticButton>
          <RomanticButton variant="ghost" onClick={() => navigate("/finale")}>
            Guarda il finale
          </RomanticButton>
        </div>
      </motion.div>

      <div className="home-grid">
        {homeContent.cards.map((card, index) => (
          <motion.article
            className="info-card glass"
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 * index, duration: 0.55 }}
          >
            <h2>{card.title}</h2>
            <p>{card.text}</p>
          </motion.article>
        ))}
      </div>

      <section className="nickname-ribbon glass">
        <h2>Qualche titolo ufficiale di Rebecca</h2>
        <div className="chips">
          {[...nicknames.romantic, ...nicknames.genshin, ...nicknames.food]
            .slice(0, 12)
            .map((nickname) => (
              <span key={nickname}>{nickname}</span>
            ))}
        </div>
      </section>
    </section>
  );
}
