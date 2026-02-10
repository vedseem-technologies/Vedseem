import { useState } from "react";

import ProjectsHeader from "../components/projects/ProjectsHeader";
import ProjectsGrid from "../components/projects/ProjectsGrid";
import ProjectModal from "../components/projects/ProjectModal";

interface Project {
  title: string;
  clientName?: string;
  category: string;
  description: string;
  image: string;
  images?: string[];
  tags: string[];
  status: "completed" | "in-progress";
  progress: number;
  caseStudyLink: string;
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("Web Development");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: "Where's The Fork",
      category: "Web Development",
      description:
        "A food truck franchise platform designed to manage multiple vendors, locations, and menus while enabling customers to discover nearby trucks and place orders easily.",
      image: "/projects/wtf.jpg.jpeg",
      tags: [
        "Next Js",
        "Node Js",
        "Javascript",
        "Tailwind CSS",
        "MongoDB",
        "Express",
      ],
      caseStudyLink: "https://www.wtffoods.in/",
      status: "completed" as const,
      progress: 100,
    },
    {
      title: "Knect Hotel",
      category: "Web Development",
      description:
        "A hotel management and booking solution that streamlines reservations, room availability, guest management, and day-to-day hotel operations.",
      image: "/projects/knect.jpg.jpeg",
      tags: [
        "Next Js",
        "Node Js",
        "Javascript",
        "Tailwind CSS",
        "MongoDB",
        "Express",
      ],
      caseStudyLink: "https://www.knecthotel.com/",
      status: "completed" as const,
      progress: 100,
    },
    {
      title: "Book My Party",
      category: "Web Development",
      description:
        "An all-in-one event management and venue booking platform that allows users to discover, compare, and book party venues and services seamlessly.",
      image: "/projects/bmp.jpg.jpeg",
      tags: ["Wordpress", "React", "PHP", "Tailwind CSS", "MongoDB"],
      caseStudyLink: "https://www.bookmyparty.co.in/",
      status: "completed" as const,
      progress: 100,
    },
    {
      title: "Makeover by Reet",
      category: "Web Development",
      description:
        "A premium portfolio website for a professional makeup artist, featuring a stunning gallery of work, service listings, and an integrated booking system.",
      image: "/projects/makeover.jpg.jpeg",
      tags: ["HTML", "CSS", "Javascript"],
      caseStudyLink: "https://makeoverbyreet.com/",
      status: "completed" as const,
      progress: 100,
    },
    {
      title: "Bundelkhand Chamber of Commerce",
      category: "Web Development",
      description:
        "An official digital gateway for regional businesses, facilitating networking, membership management, and providing resources for economic growth.",
      image: "/projects/bcci.jpg.jpeg",
      tags: ["Next Js", "Express", "Node Js", "MongoDB", "Tailwind CSS"],
      caseStudyLink: "https://bundelkhandchamberofcommerce.com/",
      status: "completed" as const,
      progress: 100,
    },
    // Graphics Designing (Horizontal/Square)
    {
      title: "Social Media Campaign",
      category: "Graphics Designing",
      description:
        "Visual assets for a multi-platform social media marketing strategy.",
      image: "/graphics/ee.jpg",
      images: ["/graphics/ee.jpg"],
      tags: ["Photoshop", "Illustrator"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Enterprise Branding",
      category: "Graphics Designing",
      description: "Comprehensive corporate brand identity and visual system.",
      image: "/graphics/IMG-20251015-WA0031.jpg",
      images: ["/graphics/IMG-20251015-WA0031.jpg"],
      tags: ["Photoshop", "Figma"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Digital Marketing Assets",
      category: "Graphics Designing",
      description:
        "High-impact visual content for digital advertising campaigns.",
      image: "/graphics/IMG-20251015-WA0036.jpg",
      images: ["/graphics/IMG-20251015-WA0036.jpg"],
      tags: ["Photoshop", "Illustrator"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Vector Illustration Pack",
      category: "Graphics Designing",
      description: "Custom vector illustrations for various digital platforms.",
      image: "/graphics/IMG-20251015-WA0037.jpg",
      images: ["/graphics/IMG-20251015-WA0037.jpg"],
      tags: ["Illustrator"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Creative Banner Design",
      category: "Graphics Designing",
      description: "Stunning web banner designs to boost user engagement.",
      image: "/graphics/IMG-20251015-WA0039.jpg",
      images: ["/graphics/IMG-20251015-WA0039.jpg"],
      tags: ["Photoshop", "Figma"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "UI/UX Visual Language",
      category: "Graphics Designing",
      description:
        "Developing a cohesive visual language for digital interfaces.",
      image: "/graphics/IMG-20251015-WA0040.jpg",
      images: ["/graphics/IMG-20251015-WA0040.jpg"],
      tags: ["Figma", "Photoshop"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Product Showcase Graphics",
      category: "Graphics Designing",
      description: "Premium product presentation and promotional graphics.",
      image: "/graphics/IMG-20251015-WA0041.jpg",
      images: ["/graphics/IMG-20251015-WA0041.jpg"],
      tags: ["Photoshop"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Marketing Layout Design",
      category: "Graphics Designing",
      description: "Strategic layouts for marketing materials and brochures.",
      image: "/graphics/IMG-20251015-WA0043.jpg",
      images: ["/graphics/IMG-20251015-WA0043.jpg"],
      tags: ["InDesign", "Photoshop"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Visual Brand Storytelling",
      category: "Graphics Designing",
      description:
        "Crafting a brand's narrative through powerful visual content.",
      image: "/graphics/IMG-20251015-WA0044.jpg",
      images: ["/graphics/IMG-20251015-WA0044.jpg"],
      tags: ["Photoshop", "Illustrator"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Digital Art Concept",
      category: "Graphics Designing",
      description:
        "Conceptual digital artworks exploring modern design trends.",
      image: "/graphics/IMG-20251015-WA0045.jpg",
      images: ["/graphics/IMG-20251015-WA0045.jpg"],
      tags: ["Photoshop"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Social Post Template",
      category: "Graphics Designing",
      description: "Reusable social media templates for consistent branding.",
      image: "/graphics/IMG-20251015-WA0046.jpg",
      images: ["/graphics/IMG-20251015-WA0046.jpg"],
      tags: ["Figma", "Photoshop"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Visual Identity System",
      category: "Graphics Designing",
      description: "Comprehensive visual systems for diverse business sectors.",
      image: "/graphics/IMG-20251015-WA0055.jpg",
      images: ["/graphics/IMG-20251015-WA0055.jpg"],
      tags: ["Illustrator", "Figma"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Creative Flyer Design",
      category: "Graphics Designing",
      description:
        "Attention-grabbing flyer designs for events and promotions.",
      image: "/graphics/IMG-20251015-WA0056.jpg",
      images: ["/graphics/IMG-20251015-WA0056.jpg"],
      tags: ["Photoshop", "InDesign"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Corporate Visual Assets",
      category: "Graphics Designing",
      description:
        "Professional graphics for corporate presentations and reports.",
      image: "/graphics/IMG-20251015-WA0077.jpg",
      images: ["/graphics/IMG-20251015-WA0077.jpg"],
      tags: ["Photoshop", "PowerPoint"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Digital Branding Suite",
      category: "Graphics Designing",
      description: "A complete suite of digital branding assets for startups.",
      image: "/graphics/IMG-20251015-WA0078.jpg",
      images: ["/graphics/IMG-20251015-WA0078.jpg"],
      tags: ["Photoshop", "Illustrator"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Social Media Kit",
      category: "Graphics Designing",
      description:
        "Essential visual assets for maintaining social media presence.",
      image: "/graphics/IMG-20251015-WA0079.jpg",
      images: ["/graphics/IMG-20251015-WA0079.jpg"],
      tags: ["Figma", "Photoshop"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },

    // Thumbnail Designing (Vertical)
    {
      title: "Gaming Thumbnail Art",
      category: "Graphics Designing",
      description: "High-CTR gaming channel thumbnails for maximum engagement.",
      image: "/graphics/IMG-20251015-WA0030.jpg",
      images: ["/graphics/IMG-20251015-WA0030.jpg"],
      tags: ["Photoshop"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Tech Review Overlay",
      category: "Graphics Designing",
      description: "Clean and informative thumbnail overlays for tech content.",
      image: "/graphics/IMG-20251015-WA0032.jpg",
      images: ["/graphics/IMG-20251015-WA0032.jpg"],
      tags: ["Photoshop"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Vlog Storyboard Intro",
      category: "Graphics Designing",
      description:
        "Engaging vlog thumbnails that tell a visual story at a glance.",
      image: "/graphics/IMG-20251015-WA0033.jpg",
      images: ["/graphics/IMG-20251015-WA0033.jpg"],
      tags: ["Photoshop", "Lightroom"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Educational Content Cover",
      category: "Graphics Designing",
      description: "Professional covers for educational and tutorial videos.",
      image: "/graphics/IMG-20251015-WA0034.jpg",
      images: ["/graphics/IMG-20251015-WA0034.jpg"],
      tags: ["Photoshop", "Illustrator"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Tutorial Visual Guide",
      category: "Graphics Designing",
      description:
        "Step-by-step tutorial thumbnails for quick learning identification.",
      image: "/graphics/IMG-20251015-WA0035.jpg",
      images: ["/graphics/IMG-20251015-WA0035.jpg"],
      tags: ["Photoshop"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Esports Tournament Art",
      category: "Graphics Designing",
      description:
        "Dynamic and intense tournament thumbnails for esports channels.",
      image: "/graphics/IMG-20251015-WA0038.jpg",
      images: ["/graphics/IMG-20251015-WA0038.jpg"],
      tags: ["Photoshop", "Blender"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Travel Vlog Highlight",
      category: "Graphics Designing",
      description:
        "Breathtaking travel highlights captured in a single thumbnail.",
      image: "/graphics/IMG-20251015-WA0042.jpg",
      images: ["/graphics/IMG-20251015-WA0042.jpg"],
      tags: ["Photoshop", "Lightroom"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Cooking Channel Feature",
      category: "Graphics Designing",
      description:
        "Mouth-watering food highlights for cooking channel viewers.",
      image: "/graphics/IMG-20251015-WA0047.jpg",
      images: ["/graphics/IMG-20251015-WA0047.jpg"],
      tags: ["Photoshop"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Finance Advice Cover",
      category: "Graphics Designing",
      description:
        "Clean and trustworthy thumbnails for financial advisory content.",
      image: "/graphics/IMG-20251015-WA0048.jpg",
      images: ["/graphics/IMG-20251015-WA0048.jpg"],
      tags: ["Photoshop"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Digital Art Speedrun",
      category: "Graphics Designing",
      description:
        "Showcasing the artistic process through engaging thumbnails.",
      image: "/graphics/IMG-20251015-WA0049.jpg",
      images: ["/graphics/IMG-20251015-WA0049.jpg"],
      tags: ["Photoshop"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Motivation Session Cover",
      category: "Graphics Designing",
      description:
        "Powerful and inspiring thumbnails for motivational content.",
      image: "/graphics/IMG-20251015-WA0050.jpg",
      images: ["/graphics/IMG-20251015-WA0050.jpg"],
      tags: ["Photoshop"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Music Video Promo",
      category: "Graphics Designing",
      description:
        "Cinematic promotional thumbnails for music channel releases.",
      image: "/graphics/IMG-20251015-WA0051.jpg",
      images: ["/graphics/IMG-20251015-WA0051.jpg"],
      tags: ["Photoshop", "Lightroom"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Tech Gadget Unboxing",
      category: "Graphics Designing",
      description: "Sleek and enticing gadget unboxing thumbnails for techies.",
      image: "/graphics/IMG-20251015-WA0052.jpg",
      images: ["/graphics/IMG-20251015-WA0052.jpg"],
      tags: ["Photoshop"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Interview Series Cover",
      category: "Graphics Designing",
      description: "Professional interview covers with clear subject focus.",
      image: "/graphics/IMG-20251015-WA0053.jpg",
      images: ["/graphics/IMG-20251015-WA0053.jpg"],
      tags: ["Photoshop"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Movie Review Spotlight",
      category: "Graphics Designing",
      description: "Theatrical and bold thumbnails for movie analysis content.",
      image: "/graphics/IMG-20251015-WA0054.jpg",
      images: ["/graphics/IMG-20251015-WA0054.jpg"],
      tags: ["Photoshop"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
    {
      title: "Fitness Goal Progress",
      category: "Graphics Designing",
      description:
        "Energetic and motivational thumbnails for fitness journeys.",
      image: "/graphics/IMG-20251015-WA0057.jpg",
      images: ["/graphics/IMG-20251015-WA0057.jpg"],
      tags: ["Photoshop"],
      caseStudyLink: "#",
      status: "completed",
      progress: 100,
    },
  ];

  const filteredProjects = projects.filter(
    (project) => project.category === activeCategory,
  );

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-900/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ProjectsHeader
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <ProjectsGrid
          projects={filteredProjects}
          onProjectSelect={setSelectedProject}
        />
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
