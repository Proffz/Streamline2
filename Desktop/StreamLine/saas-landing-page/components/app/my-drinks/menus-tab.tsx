"use client"

import { useState } from "react"
import { useAppState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Plus, PlusCircle, Edit, Trash } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { MenuEditor } from "./menu-editor"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function MenusTab() {
  const { state, dispatch } = useAppState()
  const { toast } = useToast()
  const [selectedMenu, setSelectedMenu] = useState<(typeof state.menus)[0] | null>(null)
  const [isCreatingNewMenu, setIsCreatingNewMenu] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleRowClick = (menu: (typeof state.menus)[0]) => {
    setSelectedMenu(menu)
    setIsCreatingNewMenu(false)
  }

  const handleAddNewMenu = () => {
    setSelectedMenu(null)
    setIsCreatingNewMenu(true)
  }

  const handleCloseDialog = () => {
    setSelectedMenu(null)
    setIsCreatingNewMenu(false)
  }

  const handleSaveNewMenu = (newMenu: (typeof state.menus)[0]) => {
    dispatch({ type: "ADD_MENU", menu: newMenu })
    setIsCreatingNewMenu(false)
    toast({
      title: "Menu created",
      description: `${newMenu.name} has been added to your menus.`,
    })
  }

  const handleUpdateMenu = (updatedMenu: (typeof state.menus)[0]) => {
    dispatch({ type: "UPDATE_MENU", menu: updatedMenu })
    setSelectedMenu(null)
    toast({
      title: "Menu updated",
      description: `${updatedMenu.name} has been updated.`,
    })
  }

  const handleDeleteMenu = () => {
    if (selectedMenu) {
      dispatch({ type: "DELETE_MENU", id: selectedMenu.id })
      setSelectedMenu(null)
      setIsDeleteDialogOpen(false)
      toast({
        title: "Menu deleted",
        description: `${selectedMenu.name} has been deleted.`,
        variant: "destructive",
      })
    }
  }

  const toggleActive = (id: number) => {
    dispatch({ type: "SET_ACTIVE_MENU", id })
    toast({
      title: "Menu activated",
      description: `This menu is now active and will be used throughout the application.`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-bold">Menus</h2>
        </div>
        <Button onClick={handleAddNewMenu}>
          <Plus className="mr-2 h-4 w-4" /> Create New Menu
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {state.menus.length > 0 ? (
            state.menus.map((menu) => (
              <TableRow key={menu.id} className="cursor-pointer hover:bg-muted" onClick={() => handleRowClick(menu)}>
                <TableCell className="font-medium">{menu.name}</TableCell>
                <TableCell>{menu.description}</TableCell>
                <TableCell>{menu.drinks.length} items</TableCell>
                <TableCell>{menu.created}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Switch checked={menu.active} onCheckedChange={() => toggleActive(menu.id)} disabled={menu.active} />
                </TableCell>
                <TableCell className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" onClick={() => handleRowClick(menu)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedMenu(menu)
                        }}
                        disabled={menu.active}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will permanently delete the menu "{menu.name}". This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            dispatch({ type: "DELETE_MENU", id: menu.id })
                            toast({
                              title: "Menu deleted",
                              description: `${menu.name} has been deleted.`,
                              variant: "destructive",
                            })
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <PlusCircle className="h-10 w-10 mb-2 text-muted-foreground/50" />
                  <p className="text-lg font-medium mb-1">No menus yet</p>
                  <p className="mb-4">Create your first menu to get started</p>
                  <Button onClick={handleAddNewMenu}>
                    <Plus className="mr-2 h-4 w-4" /> Create Your First Menu
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={selectedMenu !== null || isCreatingNewMenu} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isCreatingNewMenu ? "Create New Menu" : selectedMenu?.name}</DialogTitle>
            <DialogDescription>
              {isCreatingNewMenu ? "Add a new menu to your collection" : "Edit menu details and items"}
            </DialogDescription>
          </DialogHeader>
          <MenuEditor
            menu={
              selectedMenu || {
                id: Date.now(),
                name: "",
                description: "",
                drinks: [],
                active: false,
                created: new Date().toISOString().split("T")[0],
              }
            }
            onClose={handleCloseDialog}
            onSave={isCreatingNewMenu ? handleSaveNewMenu : handleUpdateMenu}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

