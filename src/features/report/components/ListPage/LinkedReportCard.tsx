import React from 'react'
import { Button, RadioGroup, Radio } from '@blueprintjs/core'
import { ConsolidateModalResultItemFragment } from './schema.generated'

interface LinkedReportCardProps {
  report: {
    id: string
    type: 'stateNumber' | 'formNumber'
    value: string
    reportId: number
    results: ConsolidateModalResultItemFragment[]
    selectedResultId: number
  }
  onResultChange: (reportId: string, resultId: number) => void
  onRemove: (reportId: string) => void
}

export const LinkedReportCard: React.FC<LinkedReportCardProps> = ({
  report,
  onResultChange,
  onRemove
}) => {
  return (
    <div className="flex gap-2 justify-between items-start p-2 bg-white border">
      <div className="flex flex-col gap-1 flex-1">
        <span>
          {report.value}{' '}
          <em className="text-gray-400">
            ({report.type === 'stateNumber' ? 'гос. номер' : 'номер бланка'}) -
            ID: {report.reportId}
          </em>
        </span>
        <RadioGroup
          selectedValue={report.selectedResultId.toString()}
          onChange={(e) =>
            onResultChange(report.id, Number(e.currentTarget.value))
          }
          inline
        >
          {report.results.map((r) => (
            <Radio
              key={r.id}
              label={`№${r.formNumber} — ${r.oilType.name}`}
              value={r.id.toString()}
            />
          ))}
        </RadioGroup>
      </div>
      <Button icon="cross" minimal small onClick={() => onRemove(report.id)} />
    </div>
  )
}
