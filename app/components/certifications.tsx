'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CredentialModal from './credential-modal'

/* =========================================
   ← Agrega / edita tus certificaciones
   image: ruta en /public  (ej: '/certs/az-900.png')
          pon null mientras no tengas la imagen
   ========================================= */
const certs = [
  {
    code:   'AZ-900',
    name:   'Microsoft Azure Fundamentals',
    level:  'Fundamentals',
    date:   'Ene 2024',
    image:  null as string | null,   /* ← '/certs/az-900.png' */
  },
  {
    code:   'AZ-104',
    name:   'Microsoft Azure Administrator',
    level:  'Associate',
    date:   'Mar 2024',
    image:  null as string | null,
  },
  {
    code:   'AZ-204',
    name:   'Developing Solutions for Microsoft Azure',
    level:  'Associate',
    date:   'Jun 2024',
    image:  null as string | null,
  },
  {
    code:   'AZ-305',
    name:   'Designing Azure Infrastructure Solutions',
    level:  'Expert',
    date:   'Sep 2024',
    image:  null as string | null,
  },
]

const levelColor: Record<string, { bg: string; text: string; border: string }> = {
  Fundamentals: { bg: 'rgba(34,197,94,0.1)',   text: '#4ade80',          border: '#16a34a'         },
  Associate:    { bg: 'rgba(99,102,241,0.15)',  text: 'var(--accent)',    border: 'var(--accent-dark)' },
  Expert:       { bg: 'rgba(192,132,252,0.15)', text: 'var(--accent-2)', border: '#9333ea'         },
}

function AzureIcon({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" aria-hidden>
      <defs>
        <linearGradient id="az-a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#818cf8" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      <path d="M33.3 7.5H57L34.8 72.9l25.5 15.6H9L33.3 7.5Z"                        fill="url(#az-a)" />
      <path d="M57 7.5l-22.2 37.8L48 64.5 87 88.5H60.3L34.8 72.9 57 7.5Z"           fill="url(#az-a)" opacity="0.7" />
    </svg>
  )
}

const slideVariants = {
  enter:  (dir: number) => ({ x: dir > 0 ? 180 : -180, opacity: 0, scale: 0.94 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.38, ease: [0.32, 0.72, 0, 1] as number[] } },
  exit:   (dir: number) => ({ x: dir > 0 ? -180 : 180, opacity: 0, scale: 0.94, transition: { duration: 0.28, ease: [0.32, 0.72, 0, 1] as number[] } }),
}

function ChevronLeft()  {
  return <svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
function ChevronRight() {
  return <svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
function ImageIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden>
      <path d="M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2 1.586-1.586a2 2 0 0 1 2.828 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Certifications() {
  const [[index, dir], setPage] = useState([0, 0])
  const [modalOpen, setModalOpen]   = useState(false)

  const go = useCallback((newDir: number) => {
    setPage(([prev]) => {
      const next = (prev + newDir + certs.length) % certs.length
      return [next, newDir]
    })
  }, [])

  /* Teclado ← → solo cuando el modal está cerrado */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (modalOpen) return
      if (e.key === 'ArrowLeft')  go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [go, modalOpen])

  const cert  = certs[index]
  const color = levelColor[cert.level] ?? levelColor.Associate

  return (
    <>
      <section id="certifications" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div
            className="mb-14 text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-sm mb-2" style={{ color: 'var(--accent)' }}>
              04. Certificaciones
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Certificaciones <span className="gradient-text">Microsoft Azure</span>
            </h2>
          </motion.div>

          {/* Slider */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative flex items-center gap-4">

              {/* Prev */}
              <motion.button
                onClick={() => go(-1)}
                aria-label="Anterior"
                className="shrink-0 rounded-xl p-3 hidden sm:flex items-center justify-center"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                whileHover={{ scale: 1.08, color: 'var(--accent)', borderColor: 'var(--accent)' }}
                whileTap={{ scale: 0.94 }}
              >
                <ChevronLeft />
              </motion.button>

              {/* Card */}
              <div className="relative flex-1 overflow-hidden" style={{ minHeight: 300 }}>
                <AnimatePresence mode="popLayout" custom={dir}>
                  <motion.div
                    key={index}
                    custom={dir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -60) go(1)
                      if (info.offset.x >  60) go(-1)
                    }}
                  >
                    <div
                      className="gradient-border h-full rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center select-none cursor-grab active:cursor-grabbing"
                      style={{ background: 'var(--surface)' }}
                    >
                      {/* Ícono + código */}
                      <div className="flex flex-col items-center gap-3 shrink-0">
                        <div
                          className="rounded-2xl p-5 flex items-center justify-center"
                          style={{
                            background: 'var(--accent-glow)',
                            border: '1px solid var(--accent-dark)',
                            boxShadow: '0 0 32px var(--accent-glow)',
                          }}
                        >
                          <AzureIcon size={48} />
                        </div>
                        <span
                          className="font-mono text-sm font-bold px-3 py-1 rounded-full"
                          style={{ background: color.bg, color: color.text, border: `1px solid ${color.border}` }}
                        >
                          {cert.code}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex flex-col gap-4">
                        <span
                          className="self-start rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                          style={{ background: color.bg, color: color.text, border: `1px solid ${color.border}` }}
                        >
                          {cert.level}
                        </span>

                        <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                          {cert.name}
                        </h3>

                        <p className="text-sm" style={{ color: 'var(--text-subtle)' }}>
                          Microsoft · Emitido {cert.date}
                        </p>

                        {/* Botón abrir modal */}
                        <motion.button
                          onClick={(e) => { e.stopPropagation(); setModalOpen(true) }}
                          className="self-start flex items-center gap-2 text-sm font-semibold mt-1 px-4 py-2 rounded-lg cursor-pointer"
                          style={{
                            background: 'var(--accent-glow)',
                            color:      'var(--accent)',
                            border:     '1px solid var(--accent-dark)',
                          }}
                          whileHover={{
                            scale:      1.05,
                            background: 'rgba(99,102,241,0.28)',
                            boxShadow:  '0 0 18px var(--accent-glow)',
                          }}
                          whileTap={{ scale: 0.96 }}
                          transition={{ duration: 0.18 }}
                        >
                          <ImageIcon />
                          Ver credencial
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next */}
              <motion.button
                onClick={() => go(1)}
                aria-label="Siguiente"
                className="shrink-0 rounded-xl p-3 hidden sm:flex items-center justify-center"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                whileHover={{ scale: 1.08, color: 'var(--accent)', borderColor: 'var(--accent)' }}
                whileTap={{ scale: 0.94 }}
              >
                <ChevronRight />
              </motion.button>
            </div>

            {/* Mobile buttons */}
            <div className="flex sm:hidden justify-center gap-4 mt-6">
              {([{ label: 'Anterior', d: -1, Icon: ChevronLeft }, { label: 'Siguiente', d: 1, Icon: ChevronRight }] as const).map(({ label, d, Icon }) => (
                <motion.button
                  key={label}
                  onClick={() => go(d)}
                  aria-label={label}
                  className="rounded-xl p-3 flex items-center justify-center"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                >
                  <Icon />
                </motion.button>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {certs.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setPage(([prev]) => [i, i > prev ? 1 : -1])}
                  aria-label={`Ir a certificación ${i + 1}`}
                  className="rounded-full"
                  animate={{
                    width:      i === index ? 24 : 8,
                    background: i === index ? 'var(--accent)' : 'var(--surface-raised)',
                  }}
                  style={{ height: 8 }}
                  whileHover={{ scale: 1.3 }}
                  transition={{ duration: 0.25 }}
                />
              ))}
            </div>

            <p className="text-center mt-3 text-xs tabular-nums" style={{ color: 'var(--text-subtle)' }}>
              {index + 1} / {certs.length}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modal — renderizado fuera del flujo de la sección */}
      <CredentialModal
        open={modalOpen}
        name={cert.name}
        code={cert.code}
        image={cert.image}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
