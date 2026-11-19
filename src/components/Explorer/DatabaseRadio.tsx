import { useColorModeColors } from '@/lib/useColorModeColors';
import { CheckIcon } from '@chakra-ui/icons/Check';
import { Box, useRadio, UseRadioProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

export const DatabaseRadio = (props: UseRadioProps & { children: ReactNode }) => {
  const { state, getInputProps, getRadioProps } = useRadio(props);
  const colors = useColorModeColors();
  return (
    <Box as="label">
      <input {...getInputProps()} />
      <Box
        {...getRadioProps()}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="full"
        px={3}
        py={1}
        fontSize="sm"
        whiteSpace="nowrap"
        _checked={{
          bg: colors.highlightBackground,
          color: colors.highlightForeground,
          borderColor: colors.highlightBackground,
        }}
        _focus={{ boxShadow: 'outline' }}
      >
        {state.isChecked && <CheckIcon mr={1} boxSize={3} />}
        {props.children}
      </Box>
    </Box>
  );
};
