/* eslint-disable react/react-in-jsx-scope */

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import './App.scss';
import SideBar from './components/side-bar/side-bar';
import TodoPage from './pages/todo-page/todo-page';
import { useState } from 'react';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql', // Update the URL to your GraphQL server
  cache: new InMemoryCache(),
});

function App() {
  const [filters, setFilters] = useState<string[]>([]);

  const handlePressFilters = (filter: string) => {
    if (filters.includes(filter)) {
      setFilters(filters.filter((f: string) => f !== filter));
    } else {
      setFilters([...filters, filter]);
    }
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <SideBar onPressFilter={handlePressFilters} />
        <TodoPage searchFilters={filters} onPressSearchFilters={handlePressFilters} />
      </div>
    </ApolloProvider>
  );
}

export default App;
