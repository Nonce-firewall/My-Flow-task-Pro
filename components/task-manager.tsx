"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Search, Circle, Download, Upload, SortAsc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TaskForm } from "./task-form"
import { TaskCard } from "./task-card"
import { TaskStats } from "./task-stats"
import Image from "next/image"

export interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "completed"
  priority: "low" | "medium" | "high" | "urgent"
  category: string
  dueDate?: string
  createdAt: string
  tags?: string[]
}

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "todo" | "in-progress" | "completed">("all")
  const [filterPriority, setFilterPriority] = useState<"all" | "low" | "medium" | "high" | "urgent">("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"dueDate" | "priority" | "created" | "title">("created")
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
    setTimeout(() => setIsLoading(false), 300)
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [newTask, ...prev])
    setShowTaskForm(false)
  }

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task)))
    setEditingTask(null)
  }

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  const filteredAndSortedTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === "all" || task.status === filterStatus
      const matchesPriority = filterPriority === "all" || task.priority === filterPriority
      const matchesCategory = filterCategory === "all" || task.category === filterCategory
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

  const categories = Array.from(new Set(tasks.map((task) => task.category).filter(Boolean)))

  const exportTasks = () => {
    const dataStr = JSON.stringify(tasks, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `tasks-${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const importTasks = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedTasks = JSON.parse(e.target?.result as string)
        if (Array.isArray(importedTasks)) {
          setTasks((prev) => [...prev, ...importedTasks])
        }
      } catch (error) {
        console.error("Failed to import tasks:", error)
      }
    }
    reader.readAsText(file)
    event.target.value = ""
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl">
        <div className="animate-pulse">
          <div className="h-8 bg-white/10 rounded-lg mb-4 w-64"></div>
          <div className="h-4 bg-white/5 rounded mb-8 w-96"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-white/10 rounded-xl"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-white/10 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-4 sm:mb-6 animate-in slide-in-from-top duration-700">
          <div className="text-center sm:text-left animate-in slide-in-from-left duration-700 delay-100">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-1 sm:mb-2">
              <Image
                src="/images/nonce-firewall-logo.png"
                alt="Nonce Firewall Logo"
                width={40}
                height={40}
                className="transition-transform duration-300 hover:scale-110"
              />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">TaskFlow Pro</h1>
            </div>
            <p className="text-sm sm:text-base text-blue-200">Professional task management with advanced features</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 animate-in slide-in-from-right duration-700 delay-200">
            <div className="flex gap-2 sm:gap-3">
              <Button
                onClick={exportTasks}
                variant="outline"
                className="flex-1 sm:flex-none bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                size="sm"
              >
                <Download className="w-4 h-4 mr-1 sm:mr-2 transition-transform duration-200 group-hover:scale-110" />
                <span className="hidden xs:inline">Export</span>
              </Button>
              <label className="flex-1 sm:flex-none">
                <input type="file" accept=".json" onChange={importTasks} className="hidden" />
                <span className="inline-flex items-center justify-center w-full h-8 px-3 text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 cursor-pointer rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <Upload className="w-4 h-4 mr-1 sm:mr-2 transition-transform duration-200 hover:scale-110" />
                  <span className="hidden xs:inline">Import</span>
                </span>
              </label>
            </div>
            <Button
              onClick={() => setShowTaskForm(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
              size="default"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2 transition-transform duration-200 group-hover:rotate-90" />
              New Task
            </Button>
          </div>
        </div>

        <div className="animate-in slide-in-from-bottom duration-700 delay-300">
          <TaskStats tasks={tasks} />
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 mb-4 sm:mb-6 animate-in slide-in-from-bottom duration-700 delay-400 hover:bg-white/15 transition-all duration-300">
          <div className="flex flex-col gap-4">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 transition-colors duration-200 group-focus-within:text-white" />
              <Input
                placeholder="Search tasks, descriptions, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 transition-all duration-300 focus:bg-white/20 focus:border-white/40 focus:scale-[1.02]"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-2 sm:gap-3">
              <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white text-sm [&>svg]:text-white [&>svg]:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-105">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white animate-in slide-in-from-top duration-200">
                  <SelectItem
                    value="all"
                    className="text-white hover:bg-slate-700 focus:bg-slate-700 transition-colors duration-200"
                  >
                    All Status
                  </SelectItem>
                  <SelectItem
                    value="todo"
                    className="text-white hover:bg-slate-700 focus:bg-slate-700 transition-colors duration-200"
                  >
                    To Do
                  </SelectItem>
                  <SelectItem
                    value="in-progress"
                    className="text-white hover:bg-slate-700 focus:bg-slate-700 transition-colors duration-200"
                  >
                    In Progress
                  </SelectItem>
                  <SelectItem
                    value="completed"
                    className="text-white hover:bg-slate-700 focus:bg-slate-700 transition-colors duration-200"
                  >
                    Completed
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPriority} onValueChange={(value: any) => setFilterPriority(value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white text-sm [&>svg]:text-white [&>svg]:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-105">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white animate-in slide-in-from-top duration-200">
                  <SelectItem
                    value="all"
                    className="text-white hover:bg-slate-700 focus:bg-slate-700 transition-colors duration-200"
                  >
                    All Priority
                  </SelectItem>
                  <SelectItem
                    value="urgent"
                    className="text-white hover:bg-slate-700 focus:bg-slate-700 transition-colors duration-200"
                  >
                    Urgent
                  </SelectItem>
                  <SelectItem
                    value="high"
                    className="text-white hover:bg-slate-700 focus:bg-slate-700 transition-colors duration-200"
                  >
                    High
                  </SelectItem>
                  <SelectItem
                    value="medium"
                    className="text-white hover:bg-slate-700 focus:bg-slate-700 transition-colors duration-200"
                  >
                    Medium
                  </SelectItem>
                  <SelectItem
                    value="low"
                    className="text-white hover:bg-slate-700 focus:bg-slate-700 transition-colors duration-200"
                  >
                    Low
                  </SelectItem>
                </SelectContent>
              </Select>

              {categories.length > 0 && (
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="col-span-2 sm:col-span-1 bg-white/10 border-white/20 text-white text-sm [&>svg]:text-white [&>svg]:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-105">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white animate-in slide-in-from-top duration-200">
                    <SelectItem
                      value="all"
                      className="text-white hover:bg-slate-700 focus:bg-slate-700 transition-colors duration-200"
                    >
                      All Categories
                    </SelectItem>
                    {categories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="text-white hover:bg-slate-700 focus:bg-slate-700 transition-colors duration-200"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger
                  className={`bg-white/10 border-white/20 text-white text-sm [&>svg]:text-white [&>svg]:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-105 ${categories.length === 0 ? "col-span-2 sm:col-span-1" : ""}`}
                >
                  <SortAsc className="w-4 h-4 mr-1 sm:mr-2 text-white transition-transform duration-200 group-hover:scale-110" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white animate-in slide-in-from-top duration-200">
                  <SelectItem
                    value="created"
                    className="text-white hover:bg-slate-700 focus:bg-slate-700 transition-colors duration-200"
                  >
                    Created
                  </SelectItem>
                  <SelectItem
                    value="dueDate"
                    className="text-white hover:bg-slate-700 focus:bg-slate-700 transition-colors duration-200"
                  >
                    Due Date
                  </SelectItem>
                  <SelectItem
                    value="priority"
                    className="text-white hover:bg-slate-700 focus:bg-slate-700 transition-colors duration-200"
                  >
                    Priority
                  </SelectItem>
                  <SelectItem
                    value="title"
                    className="text-white hover:bg-slate-700 focus:bg-slate-700 transition-colors duration-200"
                  >
                    Title
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3 sm:space-y-4">
        {filteredAndSortedTasks.length === 0 ? (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 animate-in fade-in duration-500 delay-500">
            <CardContent className="p-6 sm:p-8 lg:p-12 text-center">
              <div className="text-blue-200 mb-4 sm:mb-6">
                <Circle className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 opacity-50 animate-pulse" />
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3 animate-in slide-in-from-bottom duration-500 delay-700">
                  No tasks found
                </h3>
                <p className="text-base sm:text-lg px-4 animate-in slide-in-from-bottom duration-500 delay-800">
                  {searchTerm || filterStatus !== "all" || filterPriority !== "all" || filterCategory !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "Create your first task to get started with TaskFlow Pro"}
                </p>
              </div>
              {!searchTerm && filterStatus === "all" && filterPriority === "all" && filterCategory === "all" && (
                <Button
                  onClick={() => setShowTaskForm(true)}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white w-full sm:w-auto transition-all duration-300 hover:scale-105 transform animate-in slide-in-from-bottom duration-500 delay-900"
                  size="lg"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2 transition-transform duration-200 group-hover:rotate-90" />
                  Create Your First Task
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredAndSortedTasks.map((task, index) => (
            <div
              key={task.id}
              className="animate-in slide-in-from-bottom duration-500"
              style={{ animationDelay: `${Math.min(index * 100, 800)}ms` }}
            >
              <TaskCard task={task} onUpdate={updateTask} onDelete={deleteTask} onEdit={setEditingTask} />
            </div>
          ))
        )}
      </div>

      {/* Task Form Modal */}
      {(showTaskForm || editingTask) && (
        <TaskForm
          task={editingTask}
          open={showTaskForm || !!editingTask}
          onSubmit={editingTask ? (data) => updateTask(editingTask.id, data) : addTask}
          onCancel={() => {
            setShowTaskForm(false)
            setEditingTask(null)
          }}
        />
      )}

      <footer className="mt-12 pt-8 border-t border-white/10 animate-in fade-in duration-700 delay-1000">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 text-blue-200/80 text-sm">
            <span>Powered by</span>
            <div className="flex items-center gap-2">
              <Image
                src="/images/nonce-firewall-logo.png"
                alt="Nonce Firewall"
                width={20}
                height={20}
                className="transition-transform duration-300 hover:scale-110"
              />
              <a
                href="https://noncefirewall.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white hover:text-blue-300 hover:underline transition-colors duration-300"
              >
                Nonce Firewall
              </a>
            </div>
          </div>
          <div className="text-blue-200/60 text-xs">© 2025 TaskFlow Pro. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
