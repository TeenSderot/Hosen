import React from 'react';
import { StyleSheet, I18nManager } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Index from './pages/Index';

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function Wisdom1() {
  return (
    <>
      <StatusBar style="dark" />
      <Index />
    </>
  );
}
