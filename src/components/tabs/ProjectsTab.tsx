import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight, FolderOpen } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  images: string[];
  link: string;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce application with cart management, payment integration, and admin dashboard. Built with modern technologies for optimal performance.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Stripe"],
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    ],
    link: "#",
  },
  {
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates, drag-and-drop boards, and team analytics for productive workflows.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Socket.io"],
    images: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop",
    ],
    link: "#",
  },
  {
    title: "AI Chat Dashboard",
    description: "An intelligent chatbot interface powered by machine learning with customizable conversation flows and analytics.",
    tech: ["Vue.js", "FastAPI", "Python", "TensorFlow", "Redis"],
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1676299081847-824916de030a?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=600&h=400&fit=crop",
    ],
    link: "#",
  },
  {
    title: "Portfolio CMS",
    description: "A headless content management system with a visual editor, media library, and API-first architecture for modern websites.",
    tech: ["Angular", "NestJS", "MySQL", "Docker", "GraphQL"],
    images: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
    ],
    link: "#",
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => setCurrentImage((p) => (p + 1) % project.images.length);
  const prevImage = () => setCurrentImage((p) => (p - 1 + project.images.length) % project.images.length);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-xl"
    >
      {/* Image carousel */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <motion.img
          key={currentImage}
          src={project.images[currentImage]}
          alt={project.title}
          className="h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        {/* Nav arrows */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-1.5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
        >
          <ChevronLeft className="h-4 w-4 text-foreground" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-1.5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
        >
          <ChevronRight className="h-4 w-4 text-foreground" />
        </button>
        {/* Dots */}
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
          {project.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`h-1.5 rounded-full transition-all ${i === currentImage ? "w-4 bg-primary-foreground" : "w-1.5 bg-primary-foreground/50"}`}
            />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-foreground">{project.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
        <motion.a
          href={project.link}
          whileHover={{ x: 3 }}
          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          Visit Site <ExternalLink className="h-3 w-3" />
        </motion.a>
      </div>
    </motion.div>
  );
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const ProjectsTab = () => {
  return (
    <div className="mx-auto max-w-5xl p-6 md:p-10">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="mb-8 flex items-center gap-3">
          <FolderOpen className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-3xl font-bold gradient-text">Projects</h2>
            <p className="text-sm text-muted-foreground">Featured work and case studies</p>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <motion.div key={project.title} variants={item}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectsTab;
