// @flow

import React, { useState } from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import { Button, Text } from '@core';
import TextInput from '../TextInput';

const ModalContainer = styled.View`
  margin: 15% 5%;
  padding: 5%;
  background-color: white;
  flex: 1;
  justify-content: center;
  border-radius: 7px;
`;

type Props = {
  value: Date,
  onChange: (Date) => void,
  label: string,
  placeholder: string,
  mt: string,
};

export default function DatePicker({
  value, onChange, label, placeholder, mt,
}: Props) {
  const [show, setShow] = useState(false);
  const showPicker = () => setShow(true);
  const hidePicker = () => setShow(false);
  const onDate = (ev, date) => onChange(date);
  const onTextChange = () => null;
  const formattedDate = moment(value).format('DD/MM/YYYY');
  return (
    <>
      <Modal
        transparent
        visible={show}
        onRequestClose={hidePicker}
      >
        <ModalContainer>
          <Text color="primary" align="center">
            Pick your date of birth
          </Text>
          <DateTimePicker
            value={value}
            mode="date"
            display="default"
            onChange={onDate}
          />
          <Button onPress={hidePicker}>
            Done
          </Button>
        </ModalContainer>
      </Modal>
      <TextInput
        label={label}
        placeholder={placeholder}
        value={formattedDate}
        onChange={onTextChange}
        onFocus={showPicker}
        onBlur={hidePicker}
        mt={mt}
      />
    </>

  );
}
