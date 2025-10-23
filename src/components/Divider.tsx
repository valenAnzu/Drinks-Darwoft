import { View } from 'react-native';
import normalize from '../helpers/normalize';

interface Props {
  type?: 'horizontal' | 'vertical';
  size?: number;
}
const Divider = ({ type = 'vertical', size = normalize(10) }: Props) => {
  return (
    <View
      testID='Divider'
      style={ type === 'vertical'
        ? {paddingVertical: size}
        : { paddingHorizontal: size}
      }
    />
  );
};

export default Divider;
