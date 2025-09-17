import { motion } from 'framer-motion';
import { MessageCenter } from '@/components/messaging/MessageCenter';

export const MessagesPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600">Communiquez avec vos professeurs et étudiants</p>
      </div>
      
      <div className="h-[calc(100vh-200px)]">
        <MessageCenter />
      </div>
    </motion.div>
  );
};