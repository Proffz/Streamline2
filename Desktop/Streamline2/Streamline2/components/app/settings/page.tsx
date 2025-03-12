"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash } from "lucide-react"

const SettingsPage = () => {
  const [iceTypes, setIceTypes] = useState(["Pebble", "Crescent", "Cube"])
  const [newIceType, setNewIceType] = useState("")

  const handleAddIceType = () => {
    if (newIceType.trim() !== "") {
      setIceTypes([...iceTypes, newIceType.trim()])
      setNewIceType("")
    }
  }

  const handleRemoveIceType = (index: number) => {
    const updatedIceTypes = [...iceTypes]
    updatedIceTypes.splice(index, 1)
    setIceTypes(updatedIceTypes)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Ice Types</h2>
        <ul>
          {iceTypes.map((iceType, index) => (
            <li key={index} className="flex items-center justify-between py-2 border-b">
              <span>{iceType}</span>
              <Button variant="ghost" size="icon" onClick={() => handleRemoveIceType(index)} className="h-8 w-8">
                <Trash className="h-4 w-4" />
                <span className="sr-only">Remove ice type</span>
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Add New Ice Type</h2>
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Enter ice type"
            value={newIceType}
            onChange={(e) => setNewIceType(e.target.value)}
            className="mr-2"
          />
          <Button onClick={handleAddIceType}>Add</Button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage

