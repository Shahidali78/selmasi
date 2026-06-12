import Navbar           from '@/components/Navbar'
import Hero             from '@/components/Hero'
import About            from '@/components/About'
import Services         from '@/components/Services'
import Pricing          from '@/components/Pricing'
import Calculator       from '@/components/Calculator'
import Value            from '@/components/Value'
import MountainClimbing from '@/components/MountainClimbing'
import Testimonials     from '@/components/Testimonials'
import ContactForm      from '@/components/ContactForm'
import Booking          from '@/components/Booking'
import WhatsAppCTA      from '@/components/WhatsAppCTA'
import ChatbotFAQ       from '@/components/ChatbotFAQ'
import Footer           from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Pricing />
        <Calculator />
        <Value />
        <MountainClimbing />
        <WhatsAppCTA />
        <Testimonials />
        <ContactForm />
        <Booking />
      </main>
      <Footer />
      <ChatbotFAQ />
    </>
  )
}
