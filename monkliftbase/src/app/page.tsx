'use client'

import { supabase } from "../../utils/supabase"
import { useState, useEffect } from "react"

export default function Home() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [examples, setExamples] = useState([])

  useEffect(() => {
    fetchExamples()
  }, [])

  const fetchExamples = async () => {
    const { data, error } = await supabase
      .from('example')
      .select('*')
    
    if (error) {
      console.error('Error fetching data:', error)
    } else {
      setExamples(data)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const { data, error } = await supabase
      .from('example')
      .insert([
        { name, description }
      ])

    if (error) {
      console.error('Error inserting data:', error)
    } else {
      console.log('Data inserted successfully:', data)
      setName('')
      setDescription('')
      fetchExamples() // Refresh the table after insert
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
        <div className="mb-4">
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2"
          />
        </div>
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {examples.map((example) => (
              <tr key={example.id}>
                <td className="border p-2">{example.name}</td>
                <td className="border p-2">{example.description}</td>
                <td className="border p-2">{new Date(example.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}