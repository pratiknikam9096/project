import { useState } from 'react'
import { motion } from 'framer-motion'

function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'home', label: 'Home Decor' },
    { id: 'office', label: 'Office Spaces' },
    { id: 'industrial', label: 'Industrial' },
    { id: 'commercial', label: 'Commercial' }
  ]

  const projects = [
    {
      id: 1,
      title: 'Modern Living Room',
      category: 'home',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3',
      description: 'Contemporary design with warm color palette'
    },
    {
      id: 2,
      title: 'Corporate Office',
      category: 'office',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
      description: 'Professional space with elegant finish'
    },
    {
      id: 3,
      title: 'Factory Interior',
      category: 'industrial',
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c',
      description: 'Durable industrial coating'
    },
    {
      id: 4,
      title: 'Retail Store',
      category: 'commercial',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
      description: 'Vibrant retail environment'
    }
  ]

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter)

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Our Projects</h1>
          <p className="text-xl text-gray-600">Explore our completed painting projects</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeFilter === filter.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects