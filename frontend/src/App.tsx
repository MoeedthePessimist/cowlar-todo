/* eslint-disable react/react-in-jsx-scope */

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import './App.scss';
import SideBar from './components/side-bar/side-bar';
import TodoPage from './pages/todo-page/todo-page';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // Update the URL to your GraphQL server
  cache: new InMemoryCache(),
});

function App() {
  const handleOptionPress = (type: string) => {
    console.log(type);
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <SideBar onPressOption={handleOptionPress} />
        <TodoPage />
      </div>
    </ApolloProvider>
  );
}

export default App;
