import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const RandomNumber = props => {
  const onRandomNumberPress = () => {
    if (props.numberSelected) {
      return;
    }
    props.addSelectedNumber(props.id);
  };

  return (
    <TouchableOpacity onPress={onRandomNumberPress}>
      <Text
        style={[
          styles.randomNumber,
          props.numberSelected && styles.selectedNumber,
        ]}>
        {props.number}
      </Text>
    </TouchableOpacity>
  );
};

RandomNumber.prototype = {
  number: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  numberSelected: PropTypes.bool.isRequired,
  addSelectedNumber: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  randomNumber: {
    fontSize: 40,
    color: 'black',
    backgroundColor: 'grey',
    width: 100,
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  selectedNumber: {
    opacity: 0.2,
  },
});

export default RandomNumber;
