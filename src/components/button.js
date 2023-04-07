import { Text, StyleSheet, Pressable } from 'react-native';
import Proptypes from 'prop-types'; // 컴포넌트 타입 체크

const ButtonTypes = {
  NUMBER: 'NUMBER',
  OPERATOR: 'OPERATOR',
};

const Colors = {
  NUMBER: ['#71717a', '#3f3f46'],
  OPERATOR: ['#f59e0b', '#b45309'],
};

const Button = ({ title, onPress, buttonStyle, buttonType }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: Colors[buttonType][0] },
        pressed && { backgroundColor: Colors[buttonType][1] },
        buttonStyle,
      ]}
      onPressOut={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

Button.defaultProps = {
  buttonType: ButtonTypes.NUMBER,
};

Button.propTypes = {
  title: Proptypes.string.isRequired,
  onPress: Proptypes.func.isRequired,
  buttonStyle: Proptypes.object,
  buttonType: Proptypes.oneOf(Object.values(ButtonTypes)),
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#71717a',
  },
  title: {
    color: '#ffffff',
    fontSize: 50,
  },
});

export { ButtonTypes };
export default Button;
