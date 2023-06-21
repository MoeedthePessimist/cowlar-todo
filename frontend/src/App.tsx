/* eslint-disable react/react-in-jsx-scope */

import './App.scss';
import SideBar from './components/side-bar/side-bar';
import TodoPage from './pages/todo-page/todo-page';
import { useState } from 'react';

function App() {
  const [ filters, setFilters ] = useState<string[]>([]);

  const handlePressFilters = (filter: string) => {
    if (filters.includes(filter)) {
      setFilters(filters.filter((f: string) => f !== filter));
    } else {
      setFilters([ ...filters, filter ]);
    }
  };

  return (
    <div className="App">
      <SideBar onPressFilter={handlePressFilters} />
      <TodoPage searchFilters={filters} onPressSearchFilters={handlePressFilters} />
    </div>
  );
}

export default App;
