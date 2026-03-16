import Card from '../ui/Card'

export default function ScanResult({
  repositoryId,
  files,
}: {
  repositoryId: string
  files: number
}) {
  return (
    <Card>
      <div className="text-sm text-graySoft">Repository ID</div>

      <div className="text-matrix font-mono text-sm mb-4 break-all">{repositoryId}</div>

      <div className="text-sm text-graySoft">Files indexed</div>

      <div className="text-green-400 text-2xl font-semibold">{files}</div>
    </Card>
  )
}
