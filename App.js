import HomeNavigator from './navigators/HomeNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <HomeNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

