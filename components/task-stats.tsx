import type { Task } from "./task-manager"
import { CheckCircle, Clock, AlertCircle, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface TaskStatsProps {
  tasks: Task[]
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.status === "completed").length
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress").length
  const todoTasks = tasks.filter((task) => task.status === "todo").length
  const overdueTasks = tasks.filter((task) => {
    if (!task.dueDate) return false
    return new Date(task.dueDate) < new Date() && task.status !== "completed"
  }).length

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  const urgentTasks = tasks.filter((task) => task.priority === "urgent" && task.status !== "completed").length

  const stats = [
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: Target,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      progress: completionRate,
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: CheckCircle,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      progress: completionRate,
    },
    {
      label: "In Progress",
      value: inProgressTasks,
      icon: Clock,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
      progress: totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0,
    },
    {
      label: "Overdue",
      value: overdueTasks,
      icon: AlertCircle,
      color: "text-red-400",
      bgColor: "bg-red-500/20",
      progress: totalTasks > 0 ? Math.round((overdueTasks / totalTasks) * 100) : 0,
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.label}
            className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-200"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-3xl font-bold text-white">{stat.value}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-300">{stat.label}</p>
                  <p className="text-xs text-slate-400">{stat.progress}%</p>
                </div>
                <Progress value={stat.progress} className="h-2 bg-white/10" />
              </div>
              {stat.label === "Completed" && totalTasks > 0 && (
                <p className="text-xs text-slate-400 mt-2">
                  {completedTasks} of {totalTasks} tasks complete
                </p>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
