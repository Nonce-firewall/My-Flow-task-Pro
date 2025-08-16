"use client"

import { useState } from "react"
import { Calendar, Star, Clock, CheckCircle2, Circle, AlertCircle, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Task } from "./task-manager"

interface TaskCardProps {
  task: Task
  onUpdate: (taskId: string, updates: Partial<Task>) => void
  onDelete: (taskId: string) => void
  onEdit: (task: Task) => void
}

export function TaskCard({ task, onUpdate, onDelete, onEdit }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-400" />
      default:
        return <Circle className="w-5 h-5 text-gray-400" />
    }
  }

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      default:
        return "bg-green-500/20 text-green-300 border-green-500/30"
    }
  }

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "in-progress":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const toggleStatus = () => {
    const statusOrder: Task["status"][] = ["todo", "in-progress", "completed"]
    const currentIndex = statusOrder.indexOf(task.status)
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length]
    onUpdate(task.id, { status: nextStatus })
  }

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "completed"

  return (
    <Card
      className={`bg-white/10 backdrop-blur-sm border-white/20 transition-all duration-200 hover:bg-white/15 hover:shadow-lg ${
        task.status === "completed" ? "opacity-75" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <button onClick={toggleStatus} className="mt-1 hover:scale-110 transition-transform duration-200">
              {getStatusIcon(task.status)}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3
                  className={`text-lg font-semibold text-white ${
                    task.status === "completed" ? "line-through opacity-75" : ""
                  }`}
                >
                  {task.title}
                </h3>

                <div className={`opacity-0 transition-opacity duration-200 ${isHovered ? "opacity-100" : ""}`}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-slate-800 border-slate-700">
                      <DropdownMenuItem onClick={() => onEdit(task)} className="text-white hover:bg-slate-700">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-red-400 hover:bg-slate-700">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {task.description && (
                <p className={`text-blue-200 mb-3 ${task.status === "completed" ? "opacity-75" : ""}`}>
                  {task.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className={getPriorityColor(task.priority)}>
                  <Star className="w-3 h-3 mr-1" />
                  {task.priority}
                </Badge>

                <Badge className={getStatusColor(task.status)}>{task.status.replace("-", " ")}</Badge>

                {task.category && (
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">{task.category}</Badge>
                )}
              </div>

              {task.dueDate && (
                <div className={`flex items-center gap-2 text-sm ${isOverdue ? "text-red-400" : "text-blue-200"}`}>
                  <Calendar className="w-4 h-4" />
                  <span>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                    {isOverdue && (
                      <span className="ml-2 text-red-400 font-medium">
                        <AlertCircle className="w-4 h-4 inline ml-1" />
                        Overdue
                      </span>
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
