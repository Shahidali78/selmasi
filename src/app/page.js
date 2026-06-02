import Navbar            from '@/components/Navbar'
import Hero              from '@/components/Hero'
import About             from '@/components/About'
import Services          from '@/components/Services'
import Pricing           from '@/components/Pricing'
import CalculatorPayment  from '@/components/CalculatorPayment'
import MountainClimbing   from '@/components/MountainClimbing'
import ContactForm        from '@/components/ContactForm'
import Booking           from '@/components/Booking'
import WhatsAppCTA       from '@/components/WhatsAppCTA'
import Testimonials      from '@/components/Testimonials'
import CaseStudies       from '@/components/CaseStudies'
import ChatbotFAQ        from '@/components/ChatbotFAQ'
import Footer            from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Pricing />
        <CalculatorPayment />
        <MountainClimbing />
        <ContactForm />
        <Booking />
        <WhatsAppCTA />
        <Testimonials />
        <CaseStudies />
      </main>
      <Footer />
      <ChatbotFAQ />
    </>
  )
}
