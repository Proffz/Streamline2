"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { GripVertical, Plus, Settings, X } from "lucide-react"
import Link from "next/link"

// Define widget types
type Widget = {
  id: string
  title: string
  type: string
  size: "small" | "medium" | "large"
  visible: boolean
}

// Initial widgets
const initialWidgets: Widget[] = [
  { id: "quick-stats", title: "Quick Stats", type: "stats", size: "small", visible: true },
  { id: "recent-activity", title: "Recent Activity", type: "activity", size: "medium", visible: true },
  { id: "low-stock", title: "Low Stock Alerts", type: "alerts", size: "medium", visible: true },
  { id: "sales-chart", title: "Sales Overview", type: "chart", size: "large", visible: true },
  { id: "popular-drinks", title: "Popular Drinks", type: "list", size: "medium", visible: true },
  { id: "quick-actions", title: "Quick Actions", type: "actions", size: "small", visible: true },
]

// Available widgets to add
const availableWidgets = [
  { id: "profit-margin", title: "Profit Margins", type: "chart" },
  { id: "upcoming-events", title: "Upcoming Events", type: "calendar" },
  { id: "staff-schedule", title: "Staff Schedule", type: "schedule" },
  { id: "inventory-value", title: "Inventory Value", type: "stats" },
  { id: "weather", title: "Weather Forecast", type: "weather" },
]

export default function CustomizeDashboardPage() {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets)
  const [activeRole, setActiveRole] = useState("owner")
  const [editingWidget, setEditingWidget] = useState<string | null>(null)

  // Handle drag and drop reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(widgets)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setWidgets(items)
  }

  // Toggle widget visibility
  const toggleWidgetVisibility = (id: string) => {
    setWidgets(widgets.map((widget) => (widget.id === id ? { ...widget, visible: !widget.visible } : widget)))
  }

  // Change widget size
  const changeWidgetSize = (id: string, size: "small" | "medium" | "large") => {
    setWidgets(widgets.map((widget) => (widget.id === id ? { ...widget, size } : widget)))
  }

  // Add a new widget
  const addWidget = (widgetId: string) => {
    const widgetToAdd = availableWidgets.find((w) => w.id === widgetId)
    if (widgetToAdd) {
      setWidgets([
        ...widgets,
        {
          ...widgetToAdd,
          size: "medium",
          visible: true,
        },
      ])
    }
  }

  // Remove a widget
  const removeWidget = (id: string) => {
    setWidgets(widgets.filter((widget) => widget.id !== id))
  }

  // Get column class based on widget size
  const getColumnClass = (size: string) => {
    switch (size) {
      case "small":
        return "col-span-1"
      case "medium":
        return "col-span-2"
      case "large":
        return "col-span-3"
      default:
        return "col-span-1"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Customize Dashboard</h1>
          <p className="text-muted-foreground">Drag and drop widgets to customize your dashboard layout</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={activeRole} onValueChange={setActiveRole}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="owner">Owner View</SelectItem>
              <SelectItem value="bartender">Bartender View</SelectItem>
              <SelectItem value="custom">Custom View</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild>
            <Link href="/dashboard">Save & Exit</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="layout">
        <TabsList>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="widgets">Widgets</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="layout" className="space-y-4">
          <div className="rounded-lg border bg-card p-4">
            <h2 className="mb-4 text-lg font-medium">Dashboard Preview</h2>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="widgets" direction="vertical">
                {(provided) => (
                  <div
                    className="grid grid-cols-1 gap-4 md:grid-cols-3"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {widgets
                      .filter((widget) => widget.visible)
                      .map((widget, index) => (
                        <Draggable key={widget.id} draggableId={widget.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`${getColumnClass(widget.size)} rounded-lg border bg-card shadow-sm`}
                            >
                              <div className="flex items-center justify-between border-b p-4">
                                <div className="flex items-center gap-2">
                                  <div {...provided.dragHandleProps}>
                                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                  <h3 className="font-medium">{widget.title}</h3>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setEditingWidget(widget.id === editingWidget ? null : widget.id)}
                                  >
                                    <Settings className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => removeWidget(widget.id)}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              {editingWidget === widget.id && (
                                <div className="border-b bg-muted/50 p-4">
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <Label htmlFor={`size-${widget.id}`}>Size</Label>
                                      <Select
                                        value={widget.size}
                                        onValueChange={(value: any) => changeWidgetSize(widget.id, value)}
                                      >
                                        <SelectTrigger id={`size-${widget.id}`} className="w-[120px]">
                                          <SelectValue placeholder="Size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="small">Small</SelectItem>
                                          <SelectItem value="medium">Medium</SelectItem>
                                          <SelectItem value="large">Large</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <Label htmlFor={`visible-${widget.id}`}>Visible</Label>
                                      <Switch
                                        id={`visible-${widget.id}`}
                                        checked={widget.visible}
                                        onCheckedChange={() => toggleWidgetVisibility(widget.id)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}

                              <div className="flex h-32 items-center justify-center p-4">
                                <p className="text-sm text-muted-foreground">Widget Preview: {widget.type}</p>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <div className="mt-4 flex justify-center">
              <Select onValueChange={addWidget}>
                <SelectTrigger className="w-[200px]">
                  <div className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Add Widget</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {availableWidgets.map((widget) => (
                    <SelectItem key={widget.id} value={widget.id}>
                      {widget.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="widgets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manage Widgets</CardTitle>
              <CardDescription>Enable or disable widgets and configure their settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {widgets.map((widget) => (
                  <div key={widget.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-medium">{widget.title}</h3>
                      <p className="text-sm text-muted-foreground">Type: {widget.type}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`toggle-${widget.id}`}
                          checked={widget.visible}
                          onCheckedChange={() => toggleWidgetVisibility(widget.id)}
                        />
                        <Label htmlFor={`toggle-${widget.id}`}>{widget.visible ? "Visible" : "Hidden"}</Label>
                      </div>
                      <Select value={widget.size} onValueChange={(value: any) => changeWidgetSize(widget.id, value)}>
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon" onClick={() => removeWidget(widget.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Select onValueChange={addWidget}>
                <SelectTrigger className="w-[200px]">
                  <div className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Add Widget</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {availableWidgets.map((widget) => (
                    <SelectItem key={widget.id} value={widget.id}>
                      {widget.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-20 w-20 cursor-pointer rounded-md border-2 border-primary bg-background"></div>
                      <span className="text-sm">Light</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-20 w-20 cursor-pointer rounded-md border bg-zinc-900"></div>
                      <span className="text-sm">Dark</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-20 w-20 cursor-pointer rounded-md border bg-gradient-to-b from-blue-100 to-white"></div>
                      <span className="text-sm">Blue</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Density</Label>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="compact" name="density" className="h-4 w-4" />
                      <Label htmlFor="compact">Compact</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="normal" name="density" className="h-4 w-4" checked />
                      <Label htmlFor="normal">Normal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="comfortable" name="density" className="h-4 w-4" />
                      <Label htmlFor="comfortable">Comfortable</Label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Animations</Label>
                    <p className="text-sm text-muted-foreground">Enable smooth transitions and animations</p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compact Sidebar</Label>
                    <p className="text-sm text-muted-foreground">Use icons only in the sidebar to save space</p>
                  </div>
                  <Switch id="compact-sidebar" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Welcome Card</Label>
                    <p className="text-sm text-muted-foreground">Display the welcome card on your dashboard</p>
                  </div>
                  <Switch id="welcome-card" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline">Reset to Default</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" asChild>
          <Link href="/dashboard">Cancel</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard">Save & Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}

