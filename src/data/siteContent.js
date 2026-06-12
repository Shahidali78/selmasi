// ─────────────────────────────────────────────────────────────
// Central site configuration — edit all content here.
// Payments are intentionally excluded (Phase 2). All CTAs are
// enquiry-based: WhatsApp, contact form, or consultation booking.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Selmasi',
  tagline: 'Smart Business Automation',
  email: 'Info@selmasi.africa',
  phone: '061 134 0644',
  landline: '012 004 8510',
  whatsapp: '27611340644',
  whatsappUrl: 'https://wa.me/27611340644',
}

/** Build a WhatsApp link with a prefilled message. */
export function waLink(message) {
  return `${site.whatsappUrl}?text=${encodeURIComponent(message)}`
}

// Prefilled WhatsApp messages used across the site
export const waMessages = {
  general: 'Hi Selmasi, I would like to find out more about your business automation services.',
  consultation: 'Hi Selmasi, I would like to book a consultation to discuss automation for my business or school.',
  service: (serviceName) =>
    `Hi Selmasi, I am interested in your ${serviceName} service. Please send me more information.`,
  packageEnquiry: (packageName) =>
    `Hi Selmasi, I am interested in the ${packageName} school automation package. Please send me more details.`,
  packageDetails: (packageName) =>
    `Hi Selmasi, please send me the full details and feature list for the ${packageName} school automation package.`,
  calculator: (packageName, learners) =>
    `Hi, I am interested in the ${packageName} school automation package. Number of learners: ${learners}. Please send me the next steps.`,
  mountain: (people, total) =>
    `Hi Selmasi, I would like to book Mountain Climbing for ${people} ${people === 1 ? 'person' : 'people'} (estimated R${total}). Please confirm availability and next steps.`,
  contactForm: ({ name, business, phone, email, service, message }) =>
    [
      'Hi Selmasi, new enquiry from the website:',
      `Name: ${name}`,
      business && `Business/School: ${business}`,
      phone && `Phone: ${phone}`,
      email && `Email: ${email}`,
      service && `Interested in: ${service}`,
      message && `Message: ${message}`,
    ].filter(Boolean).join('\n'),
}

export const nav = {
  links: [
    { label: 'Home',            href: '#home'              },
    { label: 'Services',        href: '#services'          },
    { label: 'School Packages', href: '#packages'          },
    { label: 'Calculator',      href: '#calculator'        },
    { label: 'Mountain Climbing', href: '#mountain-climbing' },
    { label: 'Contact',         href: '#contact'           },
  ],
}

export const hero = {
  heading:    'Smart Business Automation for Growing Companies',
  subheading: 'Automate customer responses, bookings, school communication, follow-ups, and daily business processes with simple digital systems built for real businesses.',
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
    {
      title: 'Lead Response Automation',
      desc: 'Automatically respond to new leads quickly and professionally so businesses do not lose customers.',
    },
    {
      title: 'Appointment Booking & Follow-Up',
      desc: 'Help customers book appointments and receive reminders or follow-up messages.',
    },
    {
      title: 'Business Process Automation',
      desc: 'Simplify repetitive admin tasks, customer updates, and internal workflows.',
    },
    {
      title: 'WhatsApp & Chat Support',
      desc: 'Create simple WhatsApp and contact flows so customers can reach the business easily.',
    },
    {
      title: 'School Communication Automation',
      desc: 'Support schools with parent communication, learner-based packages, reminders, and automation systems.',
    },
  ],
}

export const value = {
  label: 'Why Automation',
  title: 'How Automation Helps Your Business',
  subtitle: 'Practical benefits that show up in your day-to-day operations from week one.',
  items: [
    { title: 'Faster Lead Response',       desc: 'New enquiries get an instant, professional reply — even after hours.' },
    { title: 'Fewer Missed Enquiries',     desc: 'Every WhatsApp message and form submission is captured and tracked.' },
    { title: 'Better Customer Follow-Up',  desc: 'Automatic reminders and follow-ups keep prospects engaged.' },
    { title: 'More Organised Processes',   desc: 'Enquiries, bookings, and customer details in one organised flow.' },
    { title: 'WhatsApp-Based Communication', desc: 'Meet customers where they already are — on WhatsApp.' },
    { title: 'Less Manual Admin Work',     desc: 'Repetitive admin tasks run on autopilot so your team can focus.' },
  ],
}

export const pricing = {
  label: 'School Packages',
  title: 'School Automation Packages',
  subtitle: 'Streamline enrollment, reduce admin work, connect with parents. Final pricing is confirmed after a consultation.',
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
      featured: true,
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
  enquireBtn: 'Enquire on WhatsApp',
  detailsBtn: 'Request Details',
}

export const calculator = {
  label: 'Learner Calculator',
  title: 'Estimate Your Package',
  text: 'Select your package and enter the number of learners to see the setup fee and an estimated monthly amount.',
  fieldLabel: 'Number of Learners',
  btnText: 'Enquire on WhatsApp',
  disclaimer: 'Final pricing will be confirmed after consultation.',
  rateUnconfirmed: 'Monthly learner-based pricing to be confirmed.',
}

export const contact = {
  label: 'Get In Touch',
  title: 'Contact Us',
  text: 'Ready to improve your business with practical automation? Send us your details and we will get in touch.',
  btnText: 'Send Message',
  successMsg: "Thank you! We've received your message and will be in touch shortly.",
  whatsappFallbackMsg: 'Opening WhatsApp with your enquiry — just press send to reach us instantly.',
  serviceOptions: [
    'Lead Response Automation',
    'Appointment Booking & Follow-Up',
    'Business Process Automation',
    'WhatsApp & Chat Support',
    'School Communication Automation',
    'School Package – Entry Level',
    'School Package – Premium',
    'Mountain Climbing',
    'Other / Not sure yet',
  ],
}

export const booking = {
  label: 'Schedule a Call',
  title: 'Book a Consultation',
  text: 'Book a time to discuss your school or business needs and how automation can help improve your workflow.',
  btnText: 'Book a Consultation',
}

export const whatsapp = {
  text: 'Prefer WhatsApp? Chat with us directly for quick support and enquiries.',
  btnText: 'Chat on WhatsApp',
}

export const faqs = [
  { q: 'What does Selmasi do?', a: 'Selmasi helps businesses and schools improve operations with practical automation solutions.' },
  { q: 'How do I get started?', a: 'Send us a message through the contact form or WhatsApp and we will guide you through the next steps.' },
  { q: 'Can I request a custom setup?', a: 'Yes, custom solutions can be discussed based on your needs.' },
  { q: 'How does pricing work?', a: 'Each package has a once-off setup fee plus a monthly amount based on learners. Final pricing is confirmed after a consultation.' },
  { q: 'Can this system grow later?', a: 'Yes, this starter version can be expanded in later phases.' },
]

export const mountainClimbing = {
  label: 'Outdoor Activity',
  title: 'Mountain Climbing',
  text: 'Select the number of people and contact us to book your spot before arrival.',
  priceNote: 'R60 per person',
  fieldLabel: 'Number of People',
  totalLabel: 'Estimated Total',
  btnText: 'Contact to Book',
  note: 'Booking is confirmed via WhatsApp or the contact form — no online payment required.',
  pricePerPerson: 60,
}

export const footer = {
  description: 'Practical automation for schools and businesses. We help you save time, respond faster, and reduce manual admin work.',
  quickLinks: [
    { label: 'Home',            href: '#home'       },
    { label: 'Services',        href: '#services'   },
    { label: 'School Packages', href: '#packages'   },
    { label: 'Calculator',      href: '#calculator' },
    { label: 'Mountain Climbing', href: '#mountain-climbing' },
    { label: 'Contact',         href: '#contact'    },
  ],
  copy: `© ${new Date().getFullYear()} Selmasi. All rights reserved.`,
  tagline: 'Made in South Africa',
}
