import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 2000,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const MainProvider = ({children}: {children: ReactNode | ReactNode[]}) => {
  return (
    <View style={styles.flexOne}>
      <GestureHandlerRootView style={styles.flexOne}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
});

export {MainProvider};
