'use client'

import React, { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { updateEntry } from '../../utils/api'

const Editor = ({ entry }) => {
  const [analysis, setAnalysis] = useState(entry?.analysis || {})

  const { mood, summary, color, subject, negative } = analysis

  const analysisData = [
    {
      name: 'Summary',
      value: summary,
    },
    {
      name: 'Subject',
      value: subject,
    },
    {
      name: 'Mood',
      value: mood,
    },
    {
      name: 'Negative',
      value: `${negative}`,
    },
  ]

  const [value, setValue] = useState(entry.content)

  const [isLoading, setIsLoading] = useState(false)

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      console.log(_value)
      const updatedEntry = await updateEntry(entry.id, _value)
      setAnalysis(updatedEntry?.analysis)
      setIsLoading(false)
    },
  })

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        {isLoading && <div>...loading </div>}
        <textarea
          className="w-full h-full p-8 text-xl outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="px-2 py-4 flex items-center justify-between  gap-4 border-b border-t border-black/10"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span className="capitalize">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Editor
