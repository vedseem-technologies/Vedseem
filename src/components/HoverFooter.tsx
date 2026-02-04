import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Dribbble,
  Globe,
} from "lucide-react";
import { FooterBackgroundGradient } from "@/components/ui/hover-footer";
import { TextHoverEffect } from "@/components/ui/hover-footer";

interface HoverFooterProps {
  onNavigate?: (page: string) => void;
}

function HoverFooter({ onNavigate }: HoverFooterProps) {
  // Footer link data
  const footerLinks = [
    {
      title: "About Us",
      links: [
        { label: "Company History", href: "#", onClick: () => onNavigate?.("about") },
        { label: "Meet the Team", href: "#", onClick: () => onNavigate?.("about") },
        { label: "Our Services", href: "#", onClick: () => onNavigate?.("services") },
        { label: "Careers", href: "#" },
      ],
    },
    {
      title: "Helpful Links",
      links: [
        { label: "FAQs", href: "#" },
        { label: "Support", href: "#" },
        {
          label: "Live Chat",
          href: "#",
          pulse: true,
        },
      ],
    },
  ];

  // Contact info data
  const contactInfo = [
    {
      icon: <Mail size={18} className="text-[#3b82f6]" />,
      text: "hello@vedseem.com",
      href: "mailto:hello@vedseem.com",
    },
    {
      icon: <Phone size={18} className="text-[#3b82f6]" />,
      text: "+91 86373 73116",
      href: "tel:+918637373116",
    },
    {
      icon: <MapPin size={18} className="text-[#3b82f6]" />,
      text: "India",
    },
  ];

  // Social media icons
  const socialLinks = [
    { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    { icon: <Dribbble size={20} />, label: "Dribbble", href: "#" },
    { icon: <Globe size={20} />, label: "Globe", href: "#" },
  ];

  return (
    <footer className="bg-[#0F0F11]/10 relative h-fit rounded-3xl overflow-hidden m-2 mt-16 md:m-4 md:mt-16 lg:m-8 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)] z-30">
      <div className="max-w-7xl mx-auto p-6 lg:p-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-[#3b82f6] text-3xl font-extrabold">
                &hearts;
              </span>
              <span className="text-white text-3xl font-bold">VEDSEEM</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Transforming ideas into future-ready IT solutions.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-lg font-semibold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    {'onClick' in link && link.onClick ? (
                      <button
                        onClick={link.onClick}
                        className="text-gray-400 hover:text-[#3b82f6] transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-[#3b82f6] transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                    {/* {'pulse' in link && link.pulse && (
                      <span className="absolute top-0 right-[-10px] w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse"></span>
                    )} */}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-[#3b82f6] transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-gray-400 hover:text-[#3b82f6] transition-colors">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-gray-700/50 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          {/* Social icons */}
          <div className="flex space-x-6 text-gray-400">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-[#3b82f6] transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center md:text-left text-gray-400">
            &copy; {new Date().getFullYear()} VEDSEEM. All rights reserved.
          </p>
        </div>
      </div>

      {/* Text hover effect */}
      <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36 overflow-visible relative z-20">
        <TextHoverEffect text="VEDSEEM" className="relative z-20" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

export default HoverFooter;
