import React from "react";

export default function SearchBar() {
  return (
    <div>
      <div className="flex-1 max-w-lg mx-8">
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder="Buscar productos..."
            className="pr-20"
          />
          <div className="absolute right-2 flex items-center space-x-1">
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
