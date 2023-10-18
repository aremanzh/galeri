import { StyleSheet, Image } from 'react-native';

export default function ImageViewer({ placeholderImageSource, style }) {
    return (
      <Image source={{uri: placeholderImageSource}} style={style} />
    );
  }