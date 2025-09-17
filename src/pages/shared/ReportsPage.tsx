import { motion } from 'framer-motion';
import { ReportsGenerator } from '@/components/reports/ReportsGenerator';

export const ReportsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <ReportsGenerator />
    </motion.div>
  );
};