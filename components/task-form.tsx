"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Calendar, Star, Tag, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Task } from "./task-manager"

interface TaskFormProps {
  task?: Task | null
  onSubmit: (task: Omit<Task, "id" | "createdAt">) => void
  onCancel: () => void
  open: boolean
}

export function TaskForm({ task, onSubmit, onCancel, open }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo" as Task["status"],
    priority: "medium" as Task["priority"],
    category: "",
    dueDate: "",
    tags: [] as string[],
  })
  const [newTag, setNewTag] = useState("")

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        category: task.category,
        dueDate: task.dueDate || "",
        tags: task.tags || [],
      })
    }
  }, [task])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    onSubmit({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category.trim(),
      dueDate: formData.dueDate || undefined,
    })
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag.trim()] }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((tag) => tag !== tagToRemove) }))
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent className="w-full max-w-lg bg-slate-800 border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto text-white animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-300 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-bottom-2">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">{task ? "Edit Task" : "Create New Task"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-white mb-2 block font-medium">
              Task Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Enter a clear, actionable task title..."
              className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-white mb-2 block font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Add details, context, or notes about this task..."
              className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-white mb-2 block font-medium">
                <Star className="w-4 h-4 inline mr-1" />
                Priority
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value: Task["priority"]) => setFormData((prev) => ({ ...prev, priority: value }))}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="low" className="text-white">
                    Low Priority
                  </SelectItem>
                  <SelectItem value="medium" className="text-white">
                    Medium Priority
                  </SelectItem>
                  <SelectItem value="high" className="text-white">
                    High Priority
                  </SelectItem>
                  <SelectItem value="urgent" className="text-white">
                    🔥 Urgent
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white mb-2 block font-medium">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Task["status"]) => setFormData((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="todo" className="text-white">
                    📋 To Do
                  </SelectItem>
                  <SelectItem value="in-progress" className="text-white">
                    ⚡ In Progress
                  </SelectItem>
                  <SelectItem value="completed" className="text-white">
                    ✅ Completed
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="category" className="text-white mb-2 block font-medium">
              <Tag className="w-4 h-4 inline mr-1" />
              Category
            </Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
              placeholder="e.g., Work, Personal, Shopping, Health..."
              className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
            />
          </div>

          <div>
            <Label htmlFor="dueDate" className="text-white mb-2 block font-medium">
              <Calendar className="w-4 h-4 inline mr-1" />
              Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, dueDate: e.target.value }))}
              className="bg-slate-700 border-slate-600 text-white"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div>
            <Label className="text-white mb-2 block font-medium">Tags</Label>
            <div className="flex gap-2 mb-3">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag..."
                className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} size="sm" className="bg-slate-600 hover:bg-slate-500">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-blue-500/20 text-blue-300 border-blue-500/30 cursor-pointer hover:bg-red-500/20 hover:text-red-300"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium"
            >
              {task ? "Update Task" : "Create Task"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
