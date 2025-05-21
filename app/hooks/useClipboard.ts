import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import Toast from 'react-native-toast-message';

export const useClipboard = () => {
  const copyToClipboard = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Toast.show({
        type: 'success',
        text1: 'Color copied',
        text2: text,
        position: 'top',
        visibilityTime: 2000,
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      Toast.show({
        type: 'error',
        text1: 'Error copying color',
        position: 'top',
        visibilityTime: 2000,
      });
    }
  };

  return { copyToClipboard };
};
