'use client'
import { useReveal } from '@/hooks/useReveal'
import { caseStudies } from '@/data/siteContent'

export default function CaseStudies() {
  const ref = useReveal()
  return (
    <section ref={ref} id="case-studies" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <div className="reveal">
          <p className="section-label">{caseStudies.label}</p>
          <h2 className="section-title">{caseStudies.title}</h2>
        </div>
        <div className="reveal mt-10 bg-beige border-2 border-dashed border-beige-md rounded-2xl p-14 text-center">
          <div className="w-12 h-12 rounded-full bg-beige-md mx-auto flex items-center justify-center text-muted/40 mb-4">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
            </svg>
          </div>
          <h4 className="font-display text-xl text-muted mb-2">Coming Soon</h4>
          <p className="text-sm text-muted/60">{caseStudies.placeholder}</p>
        </div>
      </div>
    </section>
  )
}
