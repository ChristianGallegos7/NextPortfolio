import Header           from './components/header'
import Hero             from './components/hero'
import About            from './components/about'
import Skills           from './components/skills'
import Projects         from './components/projects'
import Certifications   from './components/certifications'
import Contact          from './components/contact'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
    </>
  )
}
