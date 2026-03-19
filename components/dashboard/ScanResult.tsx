'use client'

import { motion } from 'framer-motion'
import Card from '../ui/Card'

export default function ScanResult({
  repositoryName,
  files,
}: {
  repositoryName: string
  files: number
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: -50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      <motion.div
        initial={{ scale: 0.96 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <Card>
          <div className="text-sm text-graySoft">Repository</div>

          <div className="font-mono text-sm mb-4 break-all text-matrix">{repositoryName}</div>

          <div className="text-sm text-graySoft">Files indexed</div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="text-2xl font-semibold text-matrix"
          >
            {files}
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
