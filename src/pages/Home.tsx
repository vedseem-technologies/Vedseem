import Hero from '../components/Hero';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div>
      <Hero onNavigate={onNavigate} />
    </div>
  );
}
