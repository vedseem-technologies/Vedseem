"use client";

import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
  ReviewStars,
} from "./ui/animated-cards-stack";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const TESTIMONIALS = [
  {
    id: "testimonial-1",
    name: "Mr. Karan Mehta",
    profession: "Client",
    rating: 5,
    description:
      "Startups need partners who understand urgency and quality. Vedseem delivered our MVP in record time without cutting corners. Their technical guidance was invaluable.",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "testimonial-2",
    name: "Mr. Sanjoy Kaul",
    profession: "Client",
    rating: 5,
    description:
      "We approached them for a complex inventory management system. The team not only understood our requirements but suggested improvements that saved us cost and time.",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "testimonial-3",
    name: "Mr. Amit Singh",
    profession: "Director, Rise",
    rating: 5,
    description:
      "Competence, commitment, and clarity—that’s Vedseem for you. They have been instrumental in digitalizing our operations with robust software solutions.",
    avatarUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "testimonial-4",
    name: "Mr. Dheeraj Khullar",
    profession: "President, Bundelkhand Chamber of Commerce",
    rating: 5,
    description:
      "It is rare to find a technology partner who truly cares about your success. The Vedseem team went above and beyond to ensure our platform was user-friendly and scalable.",
    avatarUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop", // Placeholder professional image
  },
];

export default function Testimonials() {
  return (
    <ContainerScroll
      id="testimonials"
      className="relative bg-black h-[500vh] w-full"
    >
      <div className="sticky top-0 left-0 h-svh w-full flex flex-col items-center justify-center overflow-hidden py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex w-full flex-col items-center gap-8 sm:gap-16">
            <div className="text-center">
              <h2 className="mb-14 text-4xl font-black text-white md:text-6xl">
                What Our{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Clients Say
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-400 hidden sm:block">
                Trusted by global leaders, proven by results. We take pride in
                delivering exceptional digital experiences that drive growth.
              </p>
            </div>

            <div className="relative w-full flex justify-center h-[380px] md:h-[350px] lg:h-[400px] xl:h-[450px] mt-12">
              <CardsContainer className="w-full max-w-[300px] md:max-w-[350px] lg:max-w-[380px] xl:max-w-[420px] h-full relative">
                {TESTIMONIALS.map((testimonial, index) => (
                  <CardTransformed
                    arrayLength={TESTIMONIALS.length}
                    key={testimonial.id}
                    variant="dark"
                    index={index}
                    role="article"
                    aria-labelledby={`card-${testimonial.id}-title`}
                    aria-describedby={`card-${testimonial.id}-content`}
                    className="p-5 sm:p-8"
                  >
                    <div className="flex flex-1 flex-col items-center justify-center space-y-6 sm:space-y-8 text-center">
                      <ReviewStars
                        rating={testimonial.rating}
                        className="text-blue-500 scale-90 sm:scale-100"
                      />
                      <div
                        id={`card-${testimonial.id}-content`}
                        className="mx-auto w-full text-base sm:text-xl text-white/90 font-medium px-2"
                      >
                        <blockquote
                          cite="#"
                          className="leading-relaxed italic line-clamp-4 sm:line-clamp-none"
                        >
                          “{testimonial.description}”
                        </blockquote>
                      </div>
                    </div>
                    <div className="mt-auto flex items-center gap-3 sm:gap-4 w-full px-2 sm:px-4 border-t border-white/5 pt-4 sm:pt-6 pb-2">
                      <Avatar className="h-10 w-10 sm:h-14 sm:h-14 border-2 border-blue-500/50">
                        <AvatarImage
                          src={testimonial.avatarUrl}
                          alt={testimonial.name}
                        />
                        <AvatarFallback className="bg-blue-500/20 text-blue-400 font-bold text-xs sm:text-sm">
                          {testimonial.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <span
                          id={`card-${testimonial.id}-title`}
                          className="block text-base sm:text-xl font-bold text-white line-clamp-1"
                        >
                          {testimonial.name}
                        </span>
                        <span className="block text-xs sm:text-sm text-blue-400/80 font-medium tracking-tight">
                          {testimonial.profession}
                        </span>
                      </div>
                    </div>
                  </CardTransformed>
                ))}
              </CardsContainer>
            </div>
          </div>
        </div>
      </div>
    </ContainerScroll>
  );
}
