'use client'

import { motion } from 'framer-motion'

/* ← personaliza / agrega tus tecnologías */
const categories = [
  {
    name: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  },
  {
    name: 'Backend',
    items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL'],
  },
  {
    name: 'Herramientas',
    items: ['Git', 'Docker', 'Vercel', 'CI/CD', 'Figma', 'Linux'],
  },
]

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 12 },
  show:   { opacity: 1, scale: 1,    y: 0,   transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6" style={{ background: 'var(--surface)' }}>
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
            02. Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Mi <span className="gradient-text">stack técnico</span>
          </h2>
        </motion.div>

        {/* Categorías */}
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              className="gradient-border rounded-2xl p-6"
              style={{ background: 'var(--bg)' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
                {cat.name}
              </h3>

              <motion.ul
                className="flex flex-wrap gap-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {cat.items.map((item) => (
                  <motion.li key={item} variants={itemVariants}>
                    <motion.span
                      className="inline-block rounded-md px-3 py-1.5 text-sm font-medium cursor-default"
                      style={{
                        background: 'var(--surface-raised)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border)',
                      }}
                      whileHover={{
                        scale: 1.08,
                        color: 'var(--accent)',
                        borderColor: 'var(--accent)',
                        background: 'var(--accent-glow)',
                      }}
                      transition={{ duration: 0.18 }}
                    >
                      {item}
                    </motion.span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
