export const site = {
  name: 'Selmasi',
  email: 'Info@selmasi.africa',
  phone: '061 134 0644',
  landline: '012 004 8510',
  whatsapp: '27611340644',
  whatsappUrl: 'https://wa.me/27611340644',
}

export const nav = {
  links: [
    { label: 'Home',              href: '#home'              },
    { label: 'Services',          href: '#services'          },
    { label: 'Pricing',           href: '#pricing'           },
    { label: 'Mountain Climbing', href: '#mountain-climbing' },
    { label: 'Contact',           href: '#contact'           },
  ],
}

export const hero = {
  heading:    'Smart Business Automation for Growing Companies',
  subheading: 'We help businesses automate follow-ups, reduce delays, improve response time, and build practical systems that support real growth.',
  intro:      'Selmasi helps businesses save time and avoid missed opportunities by replacing manual follow-up and admin processes with practical automation solutions.',
  cta1: 'Get Started',
  cta2: 'Chat on WhatsApp',
}

export const about = {
  label: 'About Selmasi',
  text:  'Selmasi focuses on practical automation that helps businesses improve follow-up, reduce delays, and build lean systems for growth.',
  stats: [
    { value: '24/7', label: 'Automation' },
    { value: '3×',   label: 'Faster Response' },
    { value: 'ZA',   label: 'Proudly Local' },
  ],
}

export const services = {
  label: 'What We Do',
  title: 'Our Services',
  subtitle: 'Simple automation tools that help your business respond faster, follow up better, and reduce admin work.',
  items: [
    { title: 'Lead Response Automation', desc: 'Respond faster to new leads and reduce lost opportunities with simple automated follow-up systems.' },
    { title: 'Appointment Booking & Follow-Up', desc: 'Help prospects book easily and stay engaged with reminders and streamlined communication.' },
    { title: 'Business Process Automation', desc: 'Automate repetitive work and reduce admin so the business can run more efficiently.' },
    { title: 'WhatsApp & Chat Support', desc: 'Give customers a direct and easy way to ask questions and connect quickly.' },
    { title: 'Custom Automation Setup', desc: 'Practical automation solutions built around business needs and workflows.' },
  ],
}

export const pricing = {
  label: 'Pricing',
  title: 'School Automation Packages',
  subtitle: 'Streamline enrollment, reduce admin work, connect with parents.',
  learnerLimit: 300,
  extraPerLearner: 5,
  plans: [
    {
      name: 'Entry Level',
      setup: 8500,
      monthly: 1500,
      bestFor: 'Small to mid-sized schools looking to capture leads and reduce manual enrollment work.',
      includes: [
        'Online enrollment form (name, grades, contact)',
        'WhatsApp auto-reply for inquiries',
        'Basic admin dashboard',
        'Email follow-up templates',
        'Mobile-friendly design',
        'View & manage submissions',
      ],
    },
    {
      name: 'Premium',
      setup: 16500,
      monthly: 1500,
      bestFor: 'Schools ready to reduce admin load and improve parent communication with a complete digital ecosystem.',
      includes: [
        'Everything in Entry Level +',
        'Parent portal (view child progress & announcements)',
        'SMS & WhatsApp notifications',
        'Advanced reporting dashboard',
        'Content management system',
        'Priority email & WhatsApp support',
      ],
    },
  ],
  examples: [
    { kids: 200, monthly: 1500, extra: 0 },
    { kids: 300, monthly: 1500, extra: 0 },
    { kids: 350, monthly: 1750, extra: 250 },
    { kids: 500, monthly: 2500, extra: 1000 },
  ],
}

export const calculator = {
  label: 'Fee Calculator',
  title: 'Calculate Your Total',
  text: 'Select your package and enter the number of learners. We will calculate the setup fee and monthly total for you.',
  fieldLabel: 'Number of Learners',
  resultLabel: 'Total Amount',
  btnText: 'Proceed to Payment',
  pendingNotice: 'Online payment via PayGate will be activated once merchant setup is complete.',
}

export const contact = {
  label: 'Get In Touch',
  title: 'Contact Us',
  text: 'Ready to improve your business with practical automation? Send us your details and we will get in touch.',
  btnText: 'Send Message',
  successMsg: "Thank you! We've received your message and will be in touch shortly.",
}

export const booking = {
  label: 'Schedule a Call',
  title: 'Book a Consultation',
  text: 'Book a time to discuss your school or business needs and how automation can help improve your workflow.',
  btnText: 'Book Now',
}

export const whatsapp = {
  text: 'Prefer WhatsApp? Chat with us directly for quick support and enquiries.',
  btnText: 'Chat on WhatsApp',
}

export const testimonials = {
  label: 'Social Proof',
  title: 'Client Feedback',
  placeholder: 'Testimonials coming soon.',
}

export const caseStudies = {
  label: 'Our Work',
  title: 'Case Studies',
  placeholder: 'Project examples coming soon.',
}

export const faqs = [
  { q: 'What does Selmasi do?', a: 'Selmasi helps businesses and schools improve operations with practical automation solutions.' },
  { q: 'How do I get started?', a: 'Send us a message through the contact form or WhatsApp.' },
  { q: 'Can I request a custom setup?', a: 'Yes, custom solutions can be discussed based on your needs.' },
  { q: 'Can I pay online?', a: 'Yes, the website includes an online payment option. The live payment connection will be activated once the merchant account is approved.' },
  { q: 'Can this system grow later?', a: 'Yes, this starter version can be expanded in later phases.' },
]

export const mountainClimbing = {
  label: 'Mountain Climbing',
  title: 'Mountain Climbing',
  text: 'Select the number of people and pay online before arrival.',
  priceNote: 'R60 per person',
  fieldLabel: 'Number of People',
  totalLabel: 'Total Amount',
  btnText: 'Pay Now',
  pendingNotice: 'Online payment via PayGate will be activated once merchant setup is complete.',
  pricePerPerson: 60,
}

export const footer = {
  copy: `© ${new Date().getFullYear()} Selmasi. All rights reserved.`,
  tagline: 'Made in South Africa',
}
