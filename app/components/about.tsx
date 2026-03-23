'use client'

import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Foto / avatar */}
        <motion.div
          className="flex justify-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div
            className="gradient-border relative h-64 w-64 rounded-2xl overflow-hidden md:h-80 md:w-80"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* ← reemplaza con <Image> cuando tengas foto */}
            <div
              className="h-full w-full flex items-center justify-center text-6xl select-none"
              style={{ background: 'var(--surface)' }}
            >
              👤
            </div>
            {/* Glow corner */}
            <div
              className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full blur-2xl"
              style={{ background: 'var(--accent)', opacity: 0.25 }}
            />
          </motion.div>
        </motion.div>

        {/* Texto */}
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p variants={fadeUp} className="font-mono text-sm mb-3" style={{ color: 'var(--accent)' }}>
            01. Sobre mí
          </motion.p>

          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-6">
            {/* ← cambia el tagline */}
            Apasionado por construir{' '}
            <span className="gradient-text">cosas que importan</span>
          </motion.h2>

          {/* ← personaliza los párrafos */}
          <motion.p variants={fadeUp} className="mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Soy desarrollador con X años de experiencia creando productos web de
            alto impacto. Me enfoco en escribir código limpio, escalable y en
            entregar interfaces que los usuarios disfruten usar.
          </motion.p>
          <motion.p variants={fadeUp} className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Cuando no estoy programando, me encuentras explorando nuevas
            tecnologías, leyendo sobre diseño de sistemas o tomando un buen café
            ☕.
          </motion.p>

          {/* Stats rápidos */}
          <motion.div variants={fadeUp} className="mt-8 flex gap-8">
            {[
              { value: 'X+',  label: 'Años de exp.' },
              { value: 'XX+', label: 'Proyectos'    },
              { value: 'XX+', label: 'Clientes'     },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold gradient-text">{value}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-subtle)' }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
