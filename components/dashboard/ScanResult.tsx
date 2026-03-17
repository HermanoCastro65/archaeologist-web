import Card from '../ui/Card'

export default function ScanResult({
  repositoryName,
  files,
}: {
  repositoryName: string
  files: number
}) {
  return (
    <Card>
      <div className="text-sm text-graySoft">Repository</div>

      <div className="text-matrixSoft font-mono text-sm mb-4 break-all">{repositoryName}</div>

      <div className="text-sm text-graySoft">Files indexed</div>

      <div className="text-matrixSoft text-2xl font-semibold">{files}</div>
    </Card>
  )
}
