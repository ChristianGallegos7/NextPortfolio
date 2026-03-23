'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  open:    boolean
  name:    string
  code:    string
  image:   string | null   /* ruta de la imagen, ej: '/certs/az-900.png' */
  onClose: () => void
}

function XIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function CredentialModal({ open, name, code, image, onClose }: Props) {
  /* Escape para cerrar */
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  /* Bloquear scroll del body */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        /* Backdrop — clic fuera cierra */
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          style={{
            background:           'rgba(9, 9, 11, 0.6)',
            backdropFilter:       'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{   opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* Glow de fondo */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            <div
              className="h-[480px] w-[480px] rounded-full blur-[120px]"
              style={{ background: 'var(--gradient-glow)', opacity: 0.12 }}
            />
          </div>

          {/* Card del modal — clic dentro NO cierra */}
          <motion.div
            className="gradient-border relative w-full max-w-2xl rounded-2xl overflow-hidden"
            style={{ background: 'var(--surface)' }}
            initial={{ opacity: 0, scale: 0.86, y: 28 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.86, y: 28  }}
            transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: 'var(--accent-glow)',
                    color:      'var(--accent)',
                    border:     '1px solid var(--accent-dark)',
                  }}
                >
                  {code}
                </span>
                <h3 className="text-sm font-semibold truncate max-w-xs md:max-w-md">
                  {name}
                </h3>
              </div>

              <motion.button
                onClick={onClose}
                aria-label="Cerrar"
                className="rounded-lg p-2 ml-2 shrink-0"
                style={{
                  background: 'var(--surface-raised)',
                  color:      'var(--text-muted)',
                  border:     '1px solid var(--border)',
                }}
                whileHover={{ scale: 1.1, color: 'var(--text)' }}
                whileTap={{   scale: 0.92 }}
              >
                <XIcon />
              </motion.button>
            </div>

            {/* Imagen de la credencial */}
            <div
              className="relative w-full"
              style={{ background: 'var(--bg)', minHeight: 260 }}
            >
              {image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={image}
                  alt={`Certificado ${code}`}
                  className="w-full h-auto object-contain"
                  draggable={false}
                />
              ) : (
                /* Placeholder mientras no hay imagen */
                <div className="flex flex-col items-center justify-center gap-4 py-20 px-6">
                  <div
                    className="rounded-2xl p-6"
                    style={{
                      background: 'var(--accent-glow)',
                      border:     '1px dashed var(--accent-dark)',
                    }}
                  >
                    <svg width="48" height="48" fill="none" viewBox="0 0 24 24"
                      style={{ color: 'var(--accent)' }}>
                      <path d="M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2 1.586-1.586a2 2 0 0 1 2.828 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-sm text-center" style={{ color: 'var(--text-subtle)' }}>
                    Agrega la imagen en{' '}
                    <code
                      className="font-mono px-1.5 py-0.5 rounded text-xs"
                      style={{ background: 'var(--surface-raised)', color: 'var(--accent)' }}
                    >
                      /public/certs/{code.toLowerCase()}.png
                    </code>
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              className="flex items-center justify-between px-6 py-4 border-t"
              style={{ borderColor: 'var(--border)' }}
            >
              <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>
                Haz clic fuera o presiona{' '}
                <kbd
                  className="font-mono px-1.5 py-0.5 rounded text-xs"
                  style={{
                    background: 'var(--surface-raised)',
                    border:     '1px solid var(--border)',
                    color:      'var(--text-muted)',
                  }}
                >
                  Esc
                </kbd>{' '}
                para cerrar
              </p>

              <motion.button
                onClick={onClose}
                className="text-xs font-medium px-4 py-2 rounded-lg"
                style={{
                  background: 'var(--gradient)',
                  color:      '#fff',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{   scale: 0.96 }}
              >
                Cerrar
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
