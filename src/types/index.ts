export interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  caseStudyLink: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
}

export interface Tech {
  name: string;
  icon: string;
}
