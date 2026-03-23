'use client'

import { motion } from 'framer-motion'

/* ← personaliza tus proyectos */
const projects = [
  {
    number: '01',
    title: 'Nombre del Proyecto',
    description:
      'Descripción del proyecto. Qué problema resuelve, cómo lo construiste y cuál fue el impacto o resultado.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    href: '#',      /* ← link al proyecto / demo */
    repo: '#',      /* ← link al repo, o null para ocultar */
    featured: true,
  },
  {
    number: '02',
    title: 'Otro Proyecto',
    description:
      'Descripción del proyecto. Qué problema resuelve, cómo lo construiste y cuál fue el impacto o resultado.',
    tags: ['React', 'Node.js', 'MongoDB'],
    href: '#',
    repo: '#',
    featured: false,
  },
  {
    number: '03',
    title: 'Tercer Proyecto',
    description:
      'Descripción del proyecto. Qué problema resuelve, cómo lo construiste y cuál fue el impacto o resultado.',
    tags: ['Three.js', 'Framer Motion', 'Tailwind'],
    href: '#',
    repo: '#',
    featured: false,
  },
]

function ArrowIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-sm mb-2" style={{ color: 'var(--accent)' }}>
            03. Proyectos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Cosas que <span className="gradient-text">he construido</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <motion.article
              key={project.number}
              className="group gradient-border rounded-2xl p-8"
              style={{ background: 'var(--surface)' }}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">

                {/* Número */}
                <span
                  className="font-mono text-4xl font-bold tabular-nums shrink-0 select-none"
                  style={{ color: 'var(--border)' }}
                >
                  {project.number}
                </span>

                {/* Contenido */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="mb-5 leading-relaxed text-sm md:text-base" style={{ color: 'var(--text-muted)' }}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <ul className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full px-3 py-1 font-mono text-xs"
                        style={{
                          background: 'var(--accent-glow)',
                          color: 'var(--accent)',
                          border: '1px solid var(--accent-dark)',
                        }}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {/* Links */}
                  <div className="flex items-center gap-5">
                    <motion.a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-medium"
                      style={{ color: 'var(--accent)' }}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.15 }}
                    >
                      Ver proyecto <ArrowIcon />
                    </motion.a>

                    {project.repo && (
                      <motion.a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm"
                        style={{ color: 'var(--text-muted)' }}
                        whileHover={{ color: 'var(--text)', scale: 1.1 }}
                        transition={{ duration: 0.15 }}
                        aria-label="Ver código"
                      >
                        <GithubIcon />
                      </motion.a>
                    )}
                  </div>
                </div>

              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}
