"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TaskFiltersProps {
  selectedStatus: string
  selectedPriority: string
  selectedCategory: string
  categories: string[]
  onStatusChange: (status: string) => void
  onPriorityChange: (priority: string) => void
  onCategoryChange: (category: string) => void
}

export function TaskFilters({
  selectedStatus,
  selectedPriority,
  selectedCategory,
  categories,
  onStatusChange,
  onPriorityChange,
  onCategoryChange,
}: TaskFiltersProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem
                value="all"
                className="text-white hover:bg-slate-700 focus:bg-slate-700 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[highlighted]:bg-blue-600 data-[highlighted]:text-white"
              >
                All Status
              </SelectItem>
              <SelectItem
                value="todo"
                className="text-white hover:bg-slate-700 focus:bg-slate-700 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[highlighted]:bg-blue-600 data-[highlighted]:text-white"
              >
                To Do
              </SelectItem>
              <SelectItem
                value="in-progress"
                className="text-white hover:bg-slate-700 focus:bg-slate-700 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[highlighted]:bg-blue-600 data-[highlighted]:text-white"
              >
                In Progress
              </SelectItem>
              <SelectItem
                value="completed"
                className="text-white hover:bg-slate-700 focus:bg-slate-700 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[highlighted]:bg-blue-600 data-[highlighted]:text-white"
              >
                Completed
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Priority</label>
          <Select value={selectedPriority} onValueChange={onPriorityChange}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem
                value="all"
                className="text-white hover:bg-slate-700 focus:bg-slate-700 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[highlighted]:bg-blue-600 data-[highlighted]:text-white"
              >
                All Priority
              </SelectItem>
              <SelectItem
                value="urgent"
                className="text-white hover:bg-slate-700 focus:bg-slate-700 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[highlighted]:bg-blue-600 data-[highlighted]:text-white"
              >
                Urgent
              </SelectItem>
              <SelectItem
                value="high"
                className="text-white hover:bg-slate-700 focus:bg-slate-700 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[highlighted]:bg-blue-600 data-[highlighted]:text-white"
              >
                High
              </SelectItem>
              <SelectItem
                value="medium"
                className="text-white hover:bg-slate-700 focus:bg-slate-700 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[highlighted]:bg-blue-600 data-[highlighted]:text-white"
              >
                Medium
              </SelectItem>
              <SelectItem
                value="low"
                className="text-white hover:bg-slate-700 focus:bg-slate-700 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[highlighted]:bg-blue-600 data-[highlighted]:text-white"
              >
                Low
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem
                value="all"
                className="text-white hover:bg-slate-700 focus:bg-slate-700 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[highlighted]:bg-blue-600 data-[highlighted]:text-white"
              >
                All Categories
              </SelectItem>
              {categories.map((category) => (
                <SelectItem
                  key={category}
                  value={category}
                  className="text-white hover:bg-slate-700 focus:bg-slate-700 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[highlighted]:bg-blue-600 data-[highlighted]:text-white"
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
