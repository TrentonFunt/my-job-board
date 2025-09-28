import React from 'react';
import { motion } from 'framer-motion';
import { 
  BriefcaseIcon, 
  HomeIcon, 
  PaintBrushIcon, 
  CodeBracketIcon,
  ChartBarIcon,
  HeartIcon,
  AcademicCapIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const CategoryFilters = ({ onCategoryClick }) => {
  const categories = [
    { name: 'Full-time', icon: BriefcaseIcon, color: 'bg-blue-500' },
    { name: 'Remote', icon: HomeIcon, color: 'bg-emerald-500' },
    { name: 'Design', icon: PaintBrushIcon, color: 'bg-pink-500' },
    { name: 'Development', icon: CodeBracketIcon, color: 'bg-purple-500' },
    { name: 'Marketing', icon: ChartBarIcon, color: 'bg-orange-500' },
    { name: 'Healthcare', icon: HeartIcon, color: 'bg-red-500' },
    { name: 'Education', icon: AcademicCapIcon, color: 'bg-indigo-500' },
    { name: 'Finance', icon: CurrencyDollarIcon, color: 'bg-green-500' }
  ];

  return (
    <section className="py-12 px-4 bg-slate-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Browse by Category</h2>
          <p className="text-slate-300 text-lg">Find the perfect job in your field</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group cursor-pointer"
              onClick={() => onCategoryClick(category.name)}
            >
              <div className="bg-slate-700 hover:bg-slate-600 rounded-xl p-6 text-center transition-all duration-300 border border-slate-600 hover:border-emerald-500 group-hover:shadow-lg group-hover:shadow-emerald-500/20">
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-white font-medium group-hover:text-emerald-400 transition-colors duration-300">
                  {category.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilters;
