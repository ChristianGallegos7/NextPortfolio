'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Blob de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="h-[560px] w-[560px] rounded-full blur-[140px]"
          style={{ background: 'var(--gradient-glow)', opacity: 0.18 }}
        />
      </div>

      {/* Grid decorativo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(var(--border-subtle) 1px, transparent 1px),
                            linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
          opacity: 0.35,
        }}
      />

      {/* Contenido */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        style={{ y, opacity }}
      >
        <motion.p
          className="mb-4 font-mono text-sm"
          style={{ color: 'var(--accent)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hola, soy
        </motion.p>

        <motion.h1
          className="mb-4 text-6xl font-bold leading-tight md:text-8xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* ← cambia "Tu Nombre" */}
          <span className="gradient-text">Tu Nombre</span>
        </motion.h1>

        <motion.p
          className="mb-4 text-xl font-light md:text-2xl"
          style={{ color: 'var(--text-muted)' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* ← cambia tu rol */}
          Desarrollador Full Stack
        </motion.p>

        <motion.p
          className="mx-auto mb-10 max-w-lg text-base"
          style={{ color: 'var(--text-subtle)' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* ← cambia tu descripción corta */}
          Construyo experiencias digitales rápidas, accesibles y con diseño que
          deja huella.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href="#projects"
            className="rounded-lg px-7 py-3 text-sm font-semibold text-white shadow-lg"
            style={{ background: 'var(--gradient)', boxShadow: `0 0 24px var(--accent-glow)` }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 36px var(--accent-glow)' }}
            whileTap={{ scale: 0.97 }}
          >
            Ver proyectos
          </motion.a>

          <motion.a
            href="#contact"
            className="gradient-border rounded-lg px-7 py-3 text-sm font-semibold"
            style={{
              background: 'var(--surface)',
              color: 'var(--text)',
            }}
            whileHover={{ scale: 1.05, background: 'var(--surface-raised)' }}
            whileTap={{ scale: 0.97 }}
          >
            Contactar
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.span
          className="text-xs tracking-widest uppercase"
          style={{ color: 'var(--text-subtle)' }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        >
          scroll
        </motion.span>
        <motion.div
          className="h-10 w-px"
          style={{ background: 'var(--gradient)' }}
          animate={{ scaleY: [0.4, 1, 0.4], originY: 'top' }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
