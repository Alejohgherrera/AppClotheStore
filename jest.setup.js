import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.spyOn(console, 'warn').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  const frame = { width: 390, height: 844, x: 0, y: 0 };

  return {
    SafeAreaProvider: ({ children }) => React.createElement(React.Fragment, null, children),
    SafeAreaConsumer: ({ children }) => children(inset),
    SafeAreaView: ({ children, ...props }) => React.createElement(View, props, children),
    SafeAreaInsetsContext: React.createContext(inset),
    SafeAreaFrameContext: React.createContext(frame),
    useSafeAreaInsets: () => inset,
    useSafeAreaFrame: () => frame,
    initialWindowMetrics: { insets: inset, frame },
  };
});