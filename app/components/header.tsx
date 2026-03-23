'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Sobre mí',     href: '#about'            },
  { label: 'Skills',       href: '#skills'           },
  { label: 'Proyectos',    href: '#projects'         },
  { label: 'Azure',        href: '#certifications'   },
  { label: 'Contacto',     href: '#contact'          },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('')
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-6 py-4"
      style={{
        background:           scrolled ? 'rgba(9,9,11,0.82)' : 'transparent',
        backdropFilter:       scrolled ? 'blur(16px)'        : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)'        : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
        transition: 'background 0.3s, border-color 0.3s',
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <nav className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          className="gradient-text font-mono text-lg font-bold select-none"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          &lt;dev /&gt;
        </motion.a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const id = link.href.slice(1)
            const isActive = active === id
            return (
              <li key={id}>
                <a
                  href={link.href}
                  className="relative text-sm font-medium py-1 nav-link"
                  style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: 'var(--gradient)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-0.5 w-6 rounded"
              style={{ background: 'var(--text)' }}
              animate={
                open
                  ? i === 1
                    ? { opacity: 0 }
                    : i === 0
                    ? { rotate: 45, y: 8 }
                    : { rotate: -45, y: -8 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.2 }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <motion.div
          className="md:hidden mt-4 pb-4 border-t"
          style={{ borderColor: 'var(--border)' }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1,  y: 0  }}
          transition={{ duration: 0.2 }}
        >
          <ul className="flex flex-col gap-4 pt-4 px-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium"
                  style={{ color: 'var(--text-muted)' }}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  )
}
