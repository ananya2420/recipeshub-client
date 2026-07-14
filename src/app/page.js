

import Banner from "@/components/Banner";
import FeaturedSection from "@/components/FeaturedSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import PopularSection from "@/components/PopularSection";
import RecipeCard from "@/components/RecipeCard";
import StatsSection from "@/components/StatsSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import Image from "next/image";


export default function Home() {


  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
  
     
      <Banner />
      <StatsSection />
      <FeaturedSection />
      <PopularSection />
     

      <WhyChooseUsSection />
      <NewsletterSection />
    </div>
  );
}
