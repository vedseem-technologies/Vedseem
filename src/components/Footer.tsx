import HoverFooter from './HoverFooter';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return <HoverFooter onNavigate={onNavigate} />;
}
