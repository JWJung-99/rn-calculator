import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Button, { ButtonTypes } from './components/button';
import { useState } from 'react';

const Operators = {
  CLEAR: 'C',
  PLUS: '+',
  MINUS: '-',
  EQUAL: '=',
};

const App = () => {
  const [result, setResult] = useState(0);
  const [formula, setFormula] = useState([]);

  const onPressNumber = (number) => {
    const last = formula[formula.length - 1]; // 제일 마지막에 저장된 값

    if (isNaN(last)) {
      // 처음 입력되는 값이거나, 이전에 연산자가 입력된 경우
      setResult(number);
      setFormula((prev) => [...prev, number]);
    } else {
      // 새로운 숫자 --> 새로운 값으로 대체
      const newNumber = (last ?? 0) * 10 + number;
      setResult(newNumber);
      setFormula((prev) => {
        prev.pop();
        return [...prev, newNumber];
      });
    }
  };

  const calculate = () => {
    let calculatedNumber = 0;
    let operator = '';

    formula.forEach((value) => {
      if ([Operators.PLUS, Operators.MINUS].includes(value)) {
        operator = value;
      } else {
        if (operator === Operators.PLUS) {
          calculatedNumber += value;
        } else if (operator === Operators.MINUS) {
          calculatedNumber -= value;
        } else {
          calculatedNumber = value;
        }
      }
    });

    setResult(calculatedNumber);
    console.log('result: ', result);
    // setFormula([]);
    console.log('formula: ', formula);
  };

  const onPressOperator = (operator) => {
    switch (operator) {
      case Operators.CLEAR: {
        setFormula([]);
        setResult(0);
        return;
      }
      case Operators.EQUAL: {
        calculate();
        return;
      }
      default: {
        const last = formula[formula.length - 1];
        if ([Operators.PLUS, Operators.MINUS].includes(last)) {
          // 마지막 값이 연산자라면 마지막 값 삭제
          setFormula((prev) => {
            prev.pop();
            return [...prev, operator];
          });
        } else {
          setFormula((prev) => [...prev, operator]);
        }

        return;
      }
    }
  };

  const windowWidth = useWindowDimensions().width;
  const buttonWidth = (windowWidth - 5) / 4;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.resultContainer}>
        <Text style={styles.text}>{result.toLocaleString()}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.leftPad}>
          <View style={styles.numberPad}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                title={num.toString()}
                onPress={() => onPressNumber(num)}
                buttonStyle={{
                  width: buttonWidth,
                  height: buttonWidth,
                  marginBottom: 1,
                }}
                buttonType={ButtonTypes.NUMBER}
              />
            ))}
          </View>
          <View style={styles.bottomPad}>
            <Button
              title="0"
              onPress={() => onPressNumber(0)}
              buttonStyle={{
                width: buttonWidth * 2,
                height: buttonWidth,
                marginTop: 1,
              }}
              buttonType={ButtonTypes.NUMBER}
            />

            <Button
              title={Operators.EQUAL}
              onPress={() => onPressOperator(Operators.EQUAL)}
              buttonStyle={{
                width: buttonWidth,
                height: buttonWidth,
                marginTop: 1,
              }}
              buttonType={ButtonTypes.OPERATOR}
            />
          </View>
        </View>

        <View style={styles.operatorPad}>
          <Button
            title={Operators.CLEAR}
            onPress={() => onPressOperator(Operators.CLEAR)}
            buttonStyle={{
              width: buttonWidth,
              height: buttonWidth,
              marginTop: 1,
            }}
            buttonType={ButtonTypes.OPERATOR}
          />

          <Button
            title={Operators.MINUS}
            onPress={() => onPressOperator(Operators.MINUS)}
            buttonStyle={{
              width: buttonWidth,
              height: buttonWidth,
              marginTop: 1,
            }}
            buttonType={ButtonTypes.OPERATOR}
          />

          <Button
            title={Operators.PLUS}
            onPress={() => onPressOperator(Operators.PLUS)}
            buttonStyle={{
              width: buttonWidth,
              height: buttonWidth * 2 + 1,
              marginTop: 1,
            }}
            buttonType={ButtonTypes.OPERATOR}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  text: {
    fontSize: 60,
    fontWeight: '700',
    color: '#ffffff',
    paddingBottom: 30,
    paddingRight: 30,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    //backgroundColor: '#A5B4FC',
    justifyContent: 'space-evenly',
  },
  leftPad: {
    width: '75%',
  },
  numberPad: {
    flexWrap: 'wrap-reverse',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  bottomPad: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  operatorPad: {},
});

export default App;
