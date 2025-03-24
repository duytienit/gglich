
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { X, Edit, Trash, Plus } from 'lucide-react';
import { EventCategory, CategoryData } from '@/types/calendar';

interface ManageCategoriesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryData[];
  onUpdateCategories: (categories: CategoryData[]) => void;
}

const ManageCategoriesDialog: React.FC<ManageCategoriesDialogProps> = ({
  isOpen,
  onClose,
  categories,
  onUpdateCategories
}) => {
  const [activeTab, setActiveTab] = useState('existing');
  const [editingCategory, setEditingCategory] = useState<CategoryData | null>(null);

  const handleEditCategory = (category: CategoryData) => {
    setEditingCategory({ ...category });
  };

  const handleDeleteCategory = (id: EventCategory) => {
    const updatedCategories = categories.filter(cat => cat.id !== id);
    onUpdateCategories(updatedCategories);
  };

  const handleSaveCategory = () => {
    if (editingCategory) {
      const updatedCategories = categories.map(cat => 
        cat.id === editingCategory.id ? editingCategory : cat
      );
      onUpdateCategories(updatedCategories);
      setEditingCategory(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div 
        className="dialog-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium">Manage Categories</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-muted-foreground mb-6">
          Create, edit, or delete event categories
        </p>

        <Tabs defaultValue="existing" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="existing">Existing Categories</TabsTrigger>
            <TabsTrigger value="add">Add New</TabsTrigger>
          </TabsList>
          
          <TabsContent value="existing" className="space-y-4">
            {categories.map(category => (
              <div 
                key={category.id} 
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center mr-3 text-lg" 
                        style={{ color: category.color }}>
                    {category.icon}
                  </span>
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEditCategory(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="add">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category Name</label>
                <Input placeholder="Enter category name" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Icon</label>
                <Input placeholder="Enter icon or emoji" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Color</label>
                <Input placeholder="Enter color (e.g., #ff0000)" />
              </div>
              
              <Button className="w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {editingCategory && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-card rounded-lg shadow-2xl w-full max-w-md p-6 mx-4 animate-scale-in">
              <h3 className="text-xl font-medium mb-4">Edit Category</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category Name</label>
                  <Input 
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({
                      ...editingCategory,
                      name: e.target.value
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Icon</label>
                  <Input 
                    value={editingCategory.icon}
                    onChange={(e) => setEditingCategory({
                      ...editingCategory,
                      icon: e.target.value
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Color</label>
                  <Input 
                    value={editingCategory.color}
                    type="color"
                    onChange={(e) => setEditingCategory({
                      ...editingCategory,
                      color: e.target.value
                    })}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setEditingCategory(null)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveCategory}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-end space-x-2 pt-6 border-t mt-6">
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManageCategoriesDialog;
